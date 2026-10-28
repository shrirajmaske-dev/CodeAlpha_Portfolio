import { Skill, Project, SkillCategory, PortfolioChatResponse } from '../types/index.js';

export const fallbackSkills: Skill[] = [
  // Languages
  {
    id: 'skill-1',
    name: 'TypeScript',
    category: 'languages',
    proficiency_level: 96,
    icon_name: 'FileCode2',
    display_order: 1,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-2',
    name: 'Python',
    category: 'languages',
    proficiency_level: 94,
    icon_name: 'Terminal',
    display_order: 2,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-3',
    name: 'Go',
    category: 'languages',
    proficiency_level: 88,
    icon_name: 'Cpu',
    display_order: 3,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-4',
    name: 'SQL',
    category: 'languages',
    proficiency_level: 92,
    icon_name: 'Database',
    display_order: 4,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-5',
    name: 'Rust',
    category: 'languages',
    proficiency_level: 82,
    icon_name: 'ShieldCheck',
    display_order: 5,
    is_featured: false,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-6',
    name: 'JavaScript',
    category: 'languages',
    proficiency_level: 98,
    icon_name: 'Code',
    display_order: 6,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },

  // Frontend
  {
    id: 'skill-7',
    name: 'React',
    category: 'frontend',
    proficiency_level: 98,
    icon_name: 'Atom',
    display_order: 1,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-8',
    name: 'Next.js',
    category: 'frontend',
    proficiency_level: 95,
    icon_name: 'Layers',
    display_order: 2,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-9',
    name: 'Tailwind CSS',
    category: 'frontend',
    proficiency_level: 96,
    icon_name: 'Palette',
    display_order: 3,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-10',
    name: 'Zustand / Redux',
    category: 'frontend',
    proficiency_level: 92,
    icon_name: 'Boxes',
    display_order: 4,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-11',
    name: 'WebSockets / SSE',
    category: 'frontend',
    proficiency_level: 90,
    icon_name: 'Radio',
    display_order: 5,
    is_featured: false,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },

  // Backend
  {
    id: 'skill-12',
    name: 'Node.js & Express',
    category: 'backend',
    proficiency_level: 96,
    icon_name: 'Server',
    display_order: 1,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-13',
    name: 'FastAPI',
    category: 'backend',
    proficiency_level: 90,
    icon_name: 'Zap',
    display_order: 2,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-14',
    name: 'PostgreSQL',
    category: 'backend',
    proficiency_level: 94,
    icon_name: 'Database',
    display_order: 3,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-15',
    name: 'Redis',
    category: 'backend',
    proficiency_level: 90,
    icon_name: 'Flame',
    display_order: 4,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-16',
    name: 'GraphQL',
    category: 'backend',
    proficiency_level: 86,
    icon_name: 'Network',
    display_order: 5,
    is_featured: false,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },

  // AI & ML
  {
    id: 'skill-17',
    name: 'Google GenAI SDK',
    category: 'ai_ml',
    proficiency_level: 96,
    icon_name: 'Sparkles',
    display_order: 1,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-18',
    name: 'RAG Architectures',
    category: 'ai_ml',
    proficiency_level: 94,
    icon_name: 'Brain',
    display_order: 2,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-19',
    name: 'Vector Embeddings & pgvector',
    category: 'ai_ml',
    proficiency_level: 92,
    icon_name: 'Binary',
    display_order: 3,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-20',
    name: 'LangChain / LlamaIndex',
    category: 'ai_ml',
    proficiency_level: 89,
    icon_name: 'GitFork',
    display_order: 4,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-21',
    name: 'PyTorch Fundamentals',
    category: 'ai_ml',
    proficiency_level: 84,
    icon_name: 'Activity',
    display_order: 5,
    is_featured: false,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },

  // Cloud & DevOps
  {
    id: 'skill-22',
    name: 'Docker',
    category: 'cloud_devops',
    proficiency_level: 94,
    icon_name: 'Container',
    display_order: 1,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-23',
    name: 'Kubernetes',
    category: 'cloud_devops',
    proficiency_level: 86,
    icon_name: 'Anchor',
    display_order: 2,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-24',
    name: 'AWS (ECS, S3, RDS, Lambda)',
    category: 'cloud_devops',
    proficiency_level: 90,
    icon_name: 'Cloud',
    display_order: 3,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-25',
    name: 'Cloudflare Workers & Edge',
    category: 'cloud_devops',
    proficiency_level: 92,
    icon_name: 'Globe',
    display_order: 4,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'skill-26',
    name: 'CI/CD GitHub Actions',
    category: 'cloud_devops',
    proficiency_level: 94,
    icon_name: 'Workflow',
    display_order: 5,
    is_featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  }
];

export const fallbackProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'synthetix-rag',
    title: 'Synthetix RAG Mesh',
    tagline: 'Enterprise-grade multi-agent autonomous retrieval & reasoning mesh with hybrid vector search and strict verifiable provenance.',
    category: 'ai_systems',
    description: 'Synthetix RAG is an autonomous reasoning engine designed to orchestrate complex domain-specific research tasks. Built for enterprise teams requiring zero hallucination tolerance, it integrates dense semantic retrieval via pgvector, BM25 keyword matching with reciprocal rank fusion (RRF), and recursive validation pipelines using Google Gemini models.',
    architecture_overview: 'The architecture implements an asynchronous ingestion pipeline streaming partitioned markdown and PDF documents into an embedding worker queue. High-dimensional vector embeddings are computed via Gemini text-embedding models and stored in PostgreSQL with pgvector indexes. Queries undergo multi-hop decomposition into sub-queries routed to parallel agent workers. A synthesized answer is evaluated by a reflection judge before delivery over WebSockets.',
    challenges_and_solutions: [
      {
        challenge: 'Mitigating model hallucination in domain-specific financial and medical documentation.',
        solution: 'Introduced strict schema-constrained outputs combined with citation grounding hashes that map every asserted fact to precise token offsets in the original context documents.'
      },
      {
        challenge: 'High query latency on large vector catalogs with multi-faceted filtering.',
        solution: 'Engineered partitioned HNSW index hierarchies with pre-filtering on tenant tags, reducing p99 latency from 1,280ms to 84ms.'
      },
      {
        challenge: 'Rate limit bottlenecks when executing concurrent multi-hop sub-queries.',
        solution: 'Built an adaptive token-bucket rate limiter with exponential jitter and local vector cache caching deterministic prompt completions.'
      }
    ],
    technologies: ['Python', 'TypeScript', 'FastAPI', 'Google GenAI SDK', 'PostgreSQL', 'pgvector', 'Redis', 'Docker'],
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://synthetix-rag.demo.internal',
    repo_url: 'https://github.com/kairosvance/synthetix-rag-mesh',
    is_featured: true,
    display_order: 1,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'proj-2',
    slug: 'aegis-flow',
    title: 'Aegis Flow Collaborative Engine',
    tagline: 'Real-time distributed workspace orchestrator supporting CRDT conflict resolution, live cursor multiplexing, and dynamic DAG execution.',
    category: 'full_stack',
    description: 'Aegis Flow provides distributed engineering and design teams with a unified canvas for live workflow choreography. Features include decentralized peer-to-peer state synchronization, distributed lock management, transactional undo/redo trees, and automated execution of cloud worker tasks directly from visual DAG nodes.',
    architecture_overview: 'Fronted by React with canvas rendering and Zustand state persistence. Real-time changes are synchronized across nodes using Yjs CRDTs encapsulated over multiplexed WebSockets with binary protocol buffers. The Node.js/Express backend handles tenant authorization, snapshot compaction into PostgreSQL, and event streaming via Redis Streams to worker pods.',
    challenges_and_solutions: [
      {
        challenge: 'Resolving simultaneous concurrent state modifications on complex nested graph nodes without data corruption.',
        solution: 'Adopted Conflict-Free Replicated Data Types (Yjs CRDT) combined with deterministic vector clocks for state compaction.'
      },
      {
        challenge: 'Frame rate degradation when rendering 10,000+ interactive graph entities on standard DOM.',
        solution: 'Migrated node rendering to hardware-accelerated Canvas with spatial indexing (R-Tree), achieving consistent 60 FPS viewport navigation.'
      },
      {
        challenge: 'Handling WebSocket client reconnections across ephemeral container restarts.',
        solution: 'Implemented Redis pub/sub backplane with monotonic connection heartbeat checkpoints and state replay logs.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Yjs', 'WebSockets', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://aegisflow.demo.internal',
    repo_url: 'https://github.com/kairosvance/aegis-flow-engine',
    is_featured: true,
    display_order: 2,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'proj-3',
    slug: 'hyper-gateway',
    title: 'HyperGateway Distributed Edge Proxy',
    tagline: 'Ultra-low-latency edge proxy and reverse API gateway featuring dynamic eBPF-inspired traffic shaping, JWT verification, and sliding window rate limiting.',
    category: 'infrastructure',
    description: 'HyperGateway is an open-source reverse proxy engineered for microservice topographies requiring sub-millisecond route resolution. Provides automated SSL termination, distributed sliding-window rate limiting backed by Redis, dynamic circuit breaking with exponential backoff, and end-to-end distributed tracing via OpenTelemetry.',
    architecture_overview: 'Constructed in Go and TypeScript with a hybrid data-plane and control-plane split. The data plane maintains in-memory radix tree routing with zero allocations in the hot path. The control plane exposes an Express REST management API and Supabase-backed event webhooks to reconfigure routing rules with zero downtime.',
    challenges_and_solutions: [
      {
        challenge: 'Memory allocation overhead in request parsing during high volumetric traffic spikes (100k+ RPS).',
        solution: 'Designed a zero-copy byte buffer pool and non-blocking radix tree router, decreasing GC pauses from 14ms to under 0.2ms.'
      },
      {
        challenge: 'Synchronizing sliding-window rate limit counters across 50 global edge locations.',
        solution: 'Constructed two-tier token bucket counters: atomic in-memory local buckets synchronized asynchronously with Redis clusters using pipeline scripts.'
      }
    ],
    technologies: ['Go', 'TypeScript', 'Node.js', 'Redis', 'Docker', 'OpenTelemetry', 'Kubernetes'],
    thumbnail_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://hypergateway.demo.internal',
    repo_url: 'https://github.com/kairosvance/hyper-gateway-proxy',
    is_featured: true,
    display_order: 3,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'proj-4',
    slug: 'omnivision-ai',
    title: 'OmniVision Edge Detection Mesh',
    tagline: 'Distributed multi-modal vision pipeline for real-time video stream telemetry, anomaly detection, and semantic visual tagging.',
    category: 'ai_systems',
    description: 'OmniVision deploys lightweight inference models to edge appliances to ingest multi-channel RTSP streams. Provides instant zero-shot categorization, optical flow velocity calculation, and structured metadata output ingested into a central analytical data lake.',
    architecture_overview: 'Edge micro-nodes run quantized TensorRT models, relaying JSON bounding box coordinates and semantic metadata over lightweight gRPC channels. The central control node (Express + PostgreSQL) aggregates event streams, verifies anomaly confidence thresholds, and triggers automated alerting hooks.',
    challenges_and_solutions: [
      {
        challenge: 'Extreme network bandwidth consumption streaming continuous 4K video feeds to central servers.',
        solution: 'Pushed spatial inference to edge devices, transmitting only cryptographic visual hashes and structured bounding vectors, reducing uplink bandwidth by 98.4%.'
      },
      {
        challenge: 'Frame dropped bottlenecks under variable lighting conditions and model inference spikes.',
        solution: 'Built dynamic frame-skipping with optical flow interpolation, preserving perceptual accuracy while ensuring zero latency drift.'
      }
    ],
    technologies: ['Python', 'TypeScript', 'PyTorch', 'Node.js', 'FastAPI', 'gRPC', 'PostgreSQL', 'Docker'],
    thumbnail_url: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://omnivision.demo.internal',
    repo_url: 'https://github.com/kairosvance/omnivision-edge',
    is_featured: false,
    display_order: 4,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'proj-5',
    slug: 'pulse-metrics',
    title: 'PulseMetrics High-Throughput Analytics',
    tagline: 'High-volume event streaming and time-series telemetry platform processing billions of data points with instant OLAP aggregations.',
    category: 'full_stack',
    description: 'PulseMetrics provides developers with granular observability into application performance, web vitals, and user interaction trajectories. Features real-time anomaly detection, customizable KPI canvas boards, and sub-second SQL queries over terabytes of event logs.',
    architecture_overview: 'Event collectors ingest telemetry through high-concurrency Node.js endpoints that queue into Kafka/Redis buffers. Data is batch-written to ClickHouse and PostgreSQL, with a React + Tailwind analytical dashboard rendering real-time metrics with SVG canvas charts.',
    challenges_and_solutions: [
      {
        challenge: 'Handling sudden unannounced traffic surges exceeding 50,000 telemetry events per second.',
        solution: 'Built backpressure-aware ingestion buffers using Redis memory streams, batching disk commits every 250ms.'
      },
      {
        challenge: 'Rendering interactive timeline charts with hundreds of thousands of data points on consumer browsers.',
        solution: 'Applied Largest-Triangle-Three-Buckets (LTTB) downsampling algorithm on the backend to reduce payload size to 1,000 representative points without visual fidelity loss.'
      }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://pulsemetrics.demo.internal',
    repo_url: 'https://github.com/kairosvance/pulse-metrics-telemetry',
    is_featured: false,
    display_order: 5,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'proj-6',
    slug: 'kubecraft-cli',
    title: 'KubeCraft CLI & Developer Toolkit',
    tagline: 'Declarative CLI utility and local environment orchestrator for ephemeral microservice testbeds and automated cloud migrations.',
    category: 'infrastructure',
    description: 'KubeCraft streamlines the developer lifecycle by synthesizing multi-service Kubernetes manifests into localized Docker Compose sandboxes with zero configuration drift. Built for engineering teams transitioning to cloud-native topologies.',
    architecture_overview: 'Engineered in TypeScript with Node.js and compiled into standalone binaries using pkg. Implements interactive terminal UI with ink, real-time log tailing, automated port conflict resolution, and one-command staging cluster spin-ups.',
    challenges_and_solutions: [
      {
        challenge: 'High ramp-up time for junior engineers navigating thousands of lines of Kubernetes YAML.',
        solution: 'Developed an interactive TUI (Terminal User Interface) with intelligent syntax validation and instant dry-run diffing.'
      },
      {
        challenge: 'Port contention and dangling container orphans during forced CLI exits.',
        solution: 'Implemented robust OS POSIX signal interception (SIGINT, SIGTERM) with cleanup routines guaranteeing complete namespace tear-downs.'
      }
    ],
    technologies: ['TypeScript', 'Node.js', 'Docker', 'Kubernetes', 'Go', 'Zod'],
    thumbnail_url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
    banner_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
    demo_url: 'https://kubecraft.demo.internal',
    repo_url: 'https://github.com/kairosvance/kubecraft-cli',
    is_featured: false,
    display_order: 6,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  }
];

export function getGroupedFallbackSkills(): Record<SkillCategory, Skill[]> {
  const categories: SkillCategory[] = ['languages', 'frontend', 'backend', 'ai_ml', 'cloud_devops'];
  const grouped = {} as Record<SkillCategory, Skill[]>;

  for (const cat of categories) {
    grouped[cat] = fallbackSkills
      .filter(s => s.category === cat)
      .sort((a, b) => a.display_order - b.display_order);
  }

  return grouped;
}

export function generateFallbackAIResponse(query: string, contextSlug?: string): PortfolioChatResponse {
  const normalized = query.toLowerCase();

  if (contextSlug) {
    const project = fallbackProjects.find(p => p.slug === contextSlug);
    if (project) {
      return {
        answer: `**${project.title}** is an enterprise ${project.category.replace('_', ' ')} system engineered by Kairos Vance.\n\n**Architecture Highlights**:\n${project.architecture_overview}\n\n**Primary Stack**: ${project.technologies.join(', ')}.\n\n**Key Engineered Resolution**: ${project.challenges_and_solutions[0]?.solution || 'Optimized for high-throughput distributed scale.'}`,
        suggestedFollowUps: [
          `What performance bottlenecks were solved in ${project.title}?`,
          `How does ${project.title} compare to other architectures?`,
          'Can I schedule an architectural consultation with Kairos?'
        ],
        referencedProjects: [project.slug],
        highlightedSkills: project.technologies.slice(0, 4)
      };
    }
  }

  if (normalized.includes('project') || normalized.includes('work') || normalized.includes('built')) {
    return {
      answer: 'Kairos Vance has architected several flagship production platforms:\n\n1. **Synthetix RAG Mesh**: Multi-agent enterprise RAG with pgvector and strict token offset grounding.\n2. **Aegis Flow**: Real-time collaborative DAG engine with Yjs CRDTs and hardware-accelerated Canvas.\n3. **HyperGateway**: Low-latency edge proxy in Go with radix tree routing.\n4. **OmniVision**: Distributed edge multi-modal vision pipeline.\n\nWould you like an architectural deep dive into any specific case study?',
      suggestedFollowUps: [
        'Tell me more about Synthetix RAG Mesh',
        'How was CRDT implemented in Aegis Flow?',
        'What is Kairos\'s experience with Kubernetes?'
      ],
      referencedProjects: ['synthetix-rag', 'aegis-flow', 'hyper-gateway'],
      highlightedSkills: ['TypeScript', 'Python', 'Go', 'React', 'PostgreSQL']
    };
  }

  if (normalized.includes('skill') || normalized.includes('stack') || normalized.includes('tech')) {
    return {
      answer: 'Kairos Vance specializes in modern full-stack and autonomous AI engineering:\n\n- **Languages**: TypeScript, Python, Go, SQL, Rust\n- **Frontend**: React 18+, Next.js, Tailwind CSS, Canvas, Zustand\n- **Backend & Data**: Node.js/Express, FastAPI, PostgreSQL, pgvector, Redis\n- **AI Systems**: Google GenAI SDK (Gemini), RAG Meshes, LangChain, PyTorch\n- **Cloud / DevOps**: Docker, Kubernetes, AWS, Cloudflare Workers, CI/CD',
      suggestedFollowUps: [
        'What is Kairos\'s experience with pgvector?',
        'Can Kairos design distributed WebSocket architectures?',
        'View complete printable resume'
      ],
      referencedProjects: ['synthetix-rag', 'aegis-flow'],
      highlightedSkills: ['TypeScript', 'Python', 'React', 'Google GenAI SDK', 'Docker']
    };
  }

  return {
    answer: `I am **Aegis**, the autonomous AI representative for **Kairos Vance** (Senior Full-Stack Engineer & AI Systems Architect). Kairos brings 8+ years of production experience scaling distributed architectures, multi-agent RAG reasoning pipelines, and real-time collaborative workspaces. How can I assist your team or evaluate alignment for your role?`,
    suggestedFollowUps: [
      'What are Kairos\'s flagship AI case studies?',
      'Tell me about Kairos\'s technical competencies',
      'How can I get in touch with Kairos?'
    ],
    referencedProjects: ['synthetix-rag', 'aegis-flow'],
    highlightedSkills: ['TypeScript', 'Python', 'React', 'Google GenAI SDK']
  };
}
