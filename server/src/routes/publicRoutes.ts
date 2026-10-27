import { Router } from 'express';
import { getProjects, getProjectBySlug } from '../controllers/projectController.js';
import { getSkills } from '../controllers/skillController.js';
import { submitContact } from '../controllers/contactController.js';
import { chatWithAI } from '../controllers/aiController.js';
import { validateBody } from '../middleware/validate.js';
import { contactRateLimiter, aiChatRateLimiter } from '../middleware/rateLimiter.js';
import { ContactFormSchema, AIChatRequestSchema } from '../schemas/validationSchemas.js';

const router = Router();

// Projects
router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);

// Skills
router.get('/skills', getSkills);

// Contact Submission (Rate-limited, Honeypot-guarded, Zod-validated)
router.post('/contact', contactRateLimiter, validateBody(ContactFormSchema), submitContact);

// AI Chatbot Query (Rate-limited, Grounded Context, Gemini Structured Output)
router.post('/ai/chat', aiChatRateLimiter, validateBody(AIChatRequestSchema), chatWithAI);

export default router;
