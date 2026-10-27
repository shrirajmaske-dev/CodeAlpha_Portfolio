import { GoogleGenAI, Type, Schema } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
export const GEMINI_MODEL = 'gemini-2.5-flash';

export const isGeminiConfigured = Boolean(
  GEMINI_API_KEY &&
  GEMINI_API_KEY.length > 10 &&
  !GEMINI_API_KEY.includes('your-gemini-api-key')
);

export const ai = isGeminiConfigured
  ? new GoogleGenAI({ apiKey: GEMINI_API_KEY })
  : null;

if (isGeminiConfigured) {
  console.log('✓ Google GenAI SDK initialized with model:', GEMINI_MODEL);
} else {
  console.log('ℹ GEMINI_API_KEY not detected or placeholder. Server will provide grounded algorithmic AI responses until key is provided.');
}

export const AI_SYSTEM_PROMPT = `You are "Aegis", an AI Technical Representative and Career Assistant representing Kairos Vance, a Senior Full-Stack Engineer and Autonomous AI Systems Architect.

Your role:
- Answer technical queries from engineering hiring managers, recruiters, and technical leaders about Kairos's projects, architectural philosophy, stack expertise, and career background.
- Emphasize deep architectural decisions: why specific databases were chosen, how concurrency was handled, performance optimizations, and trade-offs.
- Only reference facts, projects, and experiences provided in the injected grounding context.
- If a question asks about details not present in the verified context, respond politely: "I don't have recorded data on that specific topic for Kairos, but you can inquire directly via the contact form on this page."
- Maintain an articulate, confident, and professional engineering tone.
- Never invent experience, companies, or credentials.`;

export const portfolioChatResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    answer: {
      type: Type.STRING,
      description: "Direct, articulate response addressing the user's inquiry regarding the candidate's skills or projects."
    },
    referencedProjects: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of project slugs explicitly referenced in the explanation."
    },
    highlightedSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of relevant technical skills/tools mentioned in the answer."
    },
    suggestedFollowUps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2 to 3 concise, highly relevant technical questions the visitor might ask next."
    }
  },
  required: ["answer", "referencedProjects", "highlightedSkills", "suggestedFollowUps"]
};
