import { Router } from 'express';
import publicRoutes from './publicRoutes.js';
import adminRoutes from './adminRoutes.js';

const apiRouter = Router();

// Mount public routes under /api/v1
apiRouter.use('/', publicRoutes);

// Mount protected admin routes under /api/v1/admin
apiRouter.use('/admin', adminRoutes);

export default apiRouter;
