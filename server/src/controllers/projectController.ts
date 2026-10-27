import { Request, Response } from 'express';
import { supabase, isSupabaseConfigured, inMemoryStore } from '../config/supabase.js';
import { Project } from '../types/index.js';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;

    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('projects').select('*').order('display_order', { ascending: true });
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error) {
        console.warn('Supabase getProjects error, falling back to local store:', error.message);
        const fallback = await inMemoryStore.getProjects(category);
        res.status(200).json({ success: true, data: fallback });
        return;
      }
      res.status(200).json({ success: true, data });
      return;
    }

    const projects = await inMemoryStore.getProjects(category);
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve projects', details: (err as Error).message });
  }
};

export const getProjectBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
      if (error || !data) {
        // Try fallback store
        const fallback = await inMemoryStore.getProjectBySlug(slug);
        if (fallback) {
          res.status(200).json({ success: true, data: fallback });
          return;
        }
        res.status(404).json({ success: false, error: `Project with slug '${slug}' not found` });
        return;
      }
      res.status(200).json({ success: true, data });
      return;
    }

    const project = await inMemoryStore.getProjectBySlug(slug);
    if (!project) {
      res.status(404).json({ success: false, error: `Project with slug '${slug}' not found` });
      return;
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve project', details: (err as Error).message });
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('projects').insert([payload]).select().single();
      if (error) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      // Also sync to inMemoryStore
      await inMemoryStore.createProject(payload);
      res.status(201).json({ success: true, data });
      return;
    }

    const created = await inMemoryStore.createProject(payload);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create project', details: (err as Error).message });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .update(payload)
        .or(`id.eq.${id},slug.eq.${id}`)
        .select()
        .single();

      if (error) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      await inMemoryStore.updateProject(id, payload);
      res.status(200).json({ success: true, data });
      return;
    }

    const updated = await inMemoryStore.updateProject(id, payload);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Project not found for update' });
      return;
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update project', details: (err as Error).message });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .or(`id.eq.${id},slug.eq.${id}`);

      if (error) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      await inMemoryStore.deleteProject(id);
      res.status(200).json({ success: true, message: 'Project deleted successfully' });
      return;
    }

    const deleted = await inMemoryStore.deleteProject(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Project not found for deletion' });
      return;
    }
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete project', details: (err as Error).message });
  }
};
