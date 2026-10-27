import { Request, Response } from 'express';
import { supabase, isSupabaseConfigured, inMemoryStore } from '../config/supabase.js';
import { Skill, SkillCategory } from '../types/index.js';

export const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;

    let skillsList: Skill[] = [];

    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('skills').select('*').order('display_order', { ascending: true });
      if (category) {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error) {
        console.warn('Supabase getSkills error, falling back to local store:', error.message);
        skillsList = await inMemoryStore.getSkills(category);
      } else {
        skillsList = data || [];
      }
    } else {
      skillsList = await inMemoryStore.getSkills(category);
    }

    // Group by category for convenience
    const grouped: Record<SkillCategory, Skill[]> = {
      languages: [],
      frontend: [],
      backend: [],
      ai_ml: [],
      cloud_devops: []
    };

    skillsList.forEach(s => {
      if (grouped[s.category]) {
        grouped[s.category].push(s);
      }
    });

    res.status(200).json({
      success: true,
      data: skillsList,
      grouped
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve skills', details: (err as Error).message });
  }
};

export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('skills').insert([payload]).select().single();
      if (error) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      await inMemoryStore.createSkill(payload);
      res.status(201).json({ success: true, data });
      return;
    }

    const created = await inMemoryStore.createSkill(payload);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create skill', details: (err as Error).message });
  }
};

export const updateSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('skills')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      await inMemoryStore.updateSkill(id, payload);
      res.status(200).json({ success: true, data });
      return;
    }

    const updated = await inMemoryStore.updateSkill(id, payload);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Skill not found for update' });
      return;
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update skill', details: (err as Error).message });
  }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      await inMemoryStore.deleteSkill(id);
      res.status(200).json({ success: true, message: 'Skill deleted successfully' });
      return;
    }

    const deleted = await inMemoryStore.deleteSkill(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Skill not found for deletion' });
      return;
    }
    res.status(200).json({ success: true, message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete skill', details: (err as Error).message });
  }
};
