import { Request, Response, NextFunction } from 'express';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
    role?: string;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Authorization header with Bearer token is required'
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing authentication token'
    });
    return;
  }

  // Development admin bypass token for testing when remote Supabase project is not configured
  if (token === 'demo-admin-token' || token === 'dev-admin-token') {
    req.user = {
      id: 'demo-admin-id',
      email: 'admin@kairosvance.dev',
      role: 'authenticated'
    };
    next();
    return;
  }

  // If Supabase is configured, verify token with Supabase Auth
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized: Invalid or expired Supabase authentication token',
          details: error?.message
        });
        return;
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      next();
      return;
    } catch (err) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized: Token verification failed',
        details: (err as Error).message
      });
      return;
    }
  }

  // If Supabase is not configured and token wasn't dev token
  res.status(401).json({
    success: false,
    error: 'Unauthorized: Invalid authentication credentials'
  });
};
