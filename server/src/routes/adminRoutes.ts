import { Router } from 'express';
import {
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import {
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';
import {
  getInquiries,
  markInquiryRead,
  deleteInquiry
} from '../controllers/contactController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { ProjectSchema, SkillSchema } from '../schemas/validationSchemas.js';

const router = Router();

// Protect all routes under /admin
router.use(authMiddleware);

// Project management
router.post('/projects', validateBody(ProjectSchema), createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Skill management
router.post('/skills', validateBody(SkillSchema), createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// Contact messages inbox management
router.get('/messages', getInquiries);
router.patch('/messages/:id/read', markInquiryRead);
router.delete('/messages/:id', deleteInquiry);

export default router;
