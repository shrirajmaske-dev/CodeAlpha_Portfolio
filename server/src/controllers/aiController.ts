import { Request, Response } from 'express';
import { ai, GEMINI_MODEL, AI_SYSTEM_PROMPT, portfolioChatResponseSchema, isGeminiConfigured } from '../config/gemini.js';
import { supabase, isSupabaseConfigured, inMemoryStore } from '../config/supabase.js';
import { PortfolioChatResponse, AIKnowledgeBase, Project } from '../types/index.js';

/**
 * Intelligent grounded fallback responder when GEMINI_API_KEY is not yet supplied by user,
 * guaranteeing zero crash, strict schema compliance, and grounded facts about Alex Vance.
 */
function generateGroundedFallbackResponse(
  query: string,
  contextSlug?: string,
  knowledgeBase: AIKnowledgeBase[] = [],
  projects: Project[] = []
): PortfolioChatResponse {
  const lower = query.toLowerCase();

  // If a specific project is selected in contextSlug or mentioned
  const targetProject = contextSlug
    ? projects.find(p => p.slug === contextSlug)
    : projects.find(p => lower.includes(p.slug) || lower.includes(p.title.toLowerCase()));

  if (targetProject) {
    const tech = targetProject.technologies.slice(0, 4);
    const challenge1 = targetProject.challenges_and_solutions[0];

    return {
      answer: `In ${targetProject.title}, Kairos designed an architecture addressing high reliability and performance using ${tech.join(', ')}. ${
        targetProject.architecture_overview || targetProject.description
      } A critical engineering hurdle solved was: "${challenge1?.challenge || 'Ensuring low latency and concurrency'}" — which Kairos resolved by "${
        challenge1?.solution || 'implementing fine-grained asynchronous worker pipelines'
      }".`,
      referencedProjects: [targetProject.slug],
      highlightedSkills: tech,
      suggestedFollowUps: [
        `How was state management or database indexing configured in ${targetProject.title}?`,
        `What performance benchmarks were achieved in ${targetProject.title}?`,
        `Can you describe the CI/CD and deployment strategy for this system?`
      ]
    };
  }

  // Database / PostgreSQL / Vector / Storage queries
  if (lower.includes('database') || lower.includes('postgres') || lower.includes('sql') || lower.includes('vector') || lower.includes('redis')) {
    return {
      answer: `Kairos relies heavily on PostgreSQL with pgvector for unified relational transactions and high-dimensional semantic search. Rather than fragmenting the data architecture into isolated vector DBs, utilizing pgvector provides atomic ACID guarantees alongside business entities. Redis is deployed for sliding-window token bucket rate limiting, real-time message brokering, and transient query caching.`,
      referencedProjects: ['synthetix-rag', 'aegis-flow', 'hyper-gateway'],
      highlightedSkills: ['PostgreSQL', 'pgvector', 'Redis', 'SQL', 'FastAPI'],
      suggestedFollowUps: [
        'How did Kairos optimize p99 query latency in Synthetix RAG Mesh?',
        'Why choose PostgreSQL and pgvector over dedicated vector stores like Pinecone?',
        'How does Redis handle rate limiting across distributed edge nodes?'
      ]
    };
  }

  // Concurrency, State Management, WebSockets
  if (lower.includes('state') || lower.includes('concurrency') || lower.includes('websocket') || lower.includes('realtime') || lower.includes('crdt')) {
    return {
      answer: `For real-time collaboration and concurrent state manipulation, Kairos avoids traditional locking mechanisms in favor of Conflict-Free Replicated Data Types (CRDTs via Yjs) over multiplexed WebSockets. In Aegis Flow, this decoupled peer sync from central database locks and supported offline-first mutation logging via IndexedDB. On the UI layer, Zustand and hardware-accelerated Canvas rendering guarantee 60 FPS under 10,000+ interactive nodes.`,
      referencedProjects: ['aegis-flow'],
      highlightedSkills: ['React', 'Zustand', 'Yjs', 'WebSockets', 'HTML5 Canvas'],
      suggestedFollowUps: [
        'Why were CRDTs chosen over Operational Transformation (OT) in Aegis Flow?',
        'How does the canvas rendering pipeline prevent DOM reflow bottlenecks?',
        'What is Kairos\'s approach to offline data synchronization?'
      ]
    };
  }

  // AI / ML / RAG / Gemini
  if (lower.includes('ai') || lower.includes('llm') || lower.includes('rag') || lower.includes('gemini') || lower.includes('hallucination')) {
    return {
      answer: `Kairos specializes in production AI systems engineering with the Google GenAI SDK (Gemini 2.5 Flash/Pro), hybrid RAG pipelines, and strict schema-constrained outputs. In Synthetix RAG, hallucination is eradicated using citation grounding hashes that anchor factual assertions to token offsets in the original corpus, verified by an automated reflection judge prior to response streaming.`,
      referencedProjects: ['synthetix-rag', 'omnivision-ai'],
      highlightedSkills: ['Google GenAI SDK', 'RAG Architectures', 'pgvector', 'Python', 'FastAPI'],
      suggestedFollowUps: [
        'How does the multi-hop query decomposition work in Synthetix RAG?',
        'How are structured outputs enforced using the Gemini SDK responseSchema?',
        'What computer vision models were deployed in OmniVision AI?'
      ]
    };
  }

  // Background / Experience / Role
  if (lower.includes('experience') || lower.includes('career') || lower.includes('role') || lower.includes('background') || lower.includes('education')) {
    return {
      answer: `Kairos Vance is a Senior Full-Stack Engineer and Autonomous AI Systems Architect with 8+ years of expertise spanning distributed backends, modern React applications, and production GenAI pipelines. Currently Principal AI Systems Engineer at NeuraGrid Technologies, Kairos holds a B.S. in Computer Science & Applied Mathematics (Magna Cum Laude) with AWS Solutions Architect and CKAD certifications.`,
      referencedProjects: ['synthetix-rag', 'aegis-flow', 'hyper-gateway'],
      highlightedSkills: ['TypeScript', 'Python', 'React', 'Go', 'Docker', 'Kubernetes'],
      suggestedFollowUps: [
        'What leadership accomplishments did Kairos drive at NeuraGrid Technologies?',
        'Can Kairos consult or join an enterprise team as a Principal Architect?',
        'How can I schedule an interview or technical discussion with Kairos?'
      ]
    };
  }

  // General default grounded response
  return {
    answer: `Kairos Vance architecturally focuses on high-performance distributed systems, type-safe full-stack engineering (React/TypeScript/Node), and verifiable Generative AI platforms (Gemini SDK & pgvector). Kairos's portfolio includes flagship systems like Synthetix RAG Mesh (enterprise RAG), Aegis Flow (CRDT-driven collaborative canvas), and HyperGateway (low-latency edge proxy).`,
    referencedProjects: ['synthetix-rag', 'aegis-flow', 'hyper-gateway'],
    highlightedSkills: ['TypeScript', 'React', 'Node.js', 'Google GenAI SDK', 'PostgreSQL', 'Docker'],
    suggestedFollowUps: [
      'What were the key architectural trade-offs in Synthetix RAG Mesh?',
      'How does Kairos approach state synchronization in real-time collaborative web apps?',
      'What is Kairos\'s technical background and availability for new projects?'
    ]
  };
}

export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userQuery, contextSlug } = req.body;

    // 1. Gather Grounding Context
    let knowledgeBase: AIKnowledgeBase[] = [];
    let projects: Project[] = [];

    if (isSupabaseConfigured && supabase) {
      const [kbRes, projRes] = await Promise.all([
        supabase.from('ai_knowledge_base').select('*'),
        supabase.from('projects').select('*')
      ]);
      knowledgeBase = kbRes.data || [];
      projects = projRes.data || [];
    } else {
      knowledgeBase = await inMemoryStore.getKnowledgeBase();
      projects = await inMemoryStore.getProjects();
    }

    // Filter or highlight context if contextSlug is passed
    let targetedContext = knowledgeBase;
    if (contextSlug) {
      const activeProject = projects.find(p => p.slug === contextSlug);
      if (activeProject) {
        targetedContext = [
          ...knowledgeBase,
          {
            id: 'active-project-context',
            topic: `Target Project Deep-Dive: ${activeProject.title}`,
            content: `Title: ${activeProject.title}
Category: ${activeProject.category}
Tagline: ${activeProject.tagline}
Description: ${activeProject.description}
Architecture Overview: ${activeProject.architecture_overview || 'N/A'}
Technologies: ${activeProject.technologies.join(', ')}
Key Challenges & Solutions: ${JSON.stringify(activeProject.challenges_and_solutions)}`,
            metadata: { slug: activeProject.slug },
            created_at: new Date().toISOString()
          }
        ];
      }
    }

    // 2. If Gemini SDK is configured with valid API key, execute through Google GenAI
    if (isGeminiConfigured && ai) {
      try {
        const groundingPayload = {
          candidate: 'Kairos Vance',
          role: 'Senior Full-Stack Engineer and Autonomous AI Systems Architect',
          knowledgeBase: targetedContext.map(k => ({ topic: k.topic, content: k.content })),
          availableProjects: projects.map(p => ({
            slug: p.slug,
            title: p.title,
            category: p.category,
            technologies: p.technologies,
            tagline: p.tagline
          }))
        };

        const response = await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Grounding Context:\n${JSON.stringify(groundingPayload, null, 2)}\n\nVisitor Question: "${userQuery}"`
                }
              ]
            }
          ],
          config: {
            systemInstruction: AI_SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            responseSchema: portfolioChatResponseSchema,
            temperature: 0.2
          }
        });

        const rawText = response.text;
        if (rawText) {
          const parsed: PortfolioChatResponse = JSON.parse(rawText);
          res.status(200).json({
            success: true,
            data: parsed,
            meta: {
              model: GEMINI_MODEL,
              grounded: true
            }
          });
          return;
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed or quota exceeded. Falling back to grounded local synthesizer:', (geminiError as Error).message);
      }
    }

    // 3. Fallback grounded synthesizer
    const fallbackResponse = generateGroundedFallbackResponse(userQuery, contextSlug, knowledgeBase, projects);
    res.status(200).json({
      success: true,
      data: fallbackResponse,
      meta: {
        model: 'grounded-portfolio-synthesizer',
        grounded: true
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to process AI query',
      details: (err as Error).message
    });
  }
};
