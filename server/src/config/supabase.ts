import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Project, Skill, ContactInquiry, AIKnowledgeBase } from '../types/index.js';
import { initialSkills, initialProjects, initialKnowledgeBase } from '../seed/seedData.js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseServiceKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-supabase-project')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

if (isSupabaseConfigured) {
  console.log('✓ Supabase Client initialized with target:', supabaseUrl);
} else {
  console.log('ℹ Supabase credentials not detected or using placeholder. Running with resilient local data store.');
}

// Resilient in-memory fallback store
class InMemoryStore {
  private skills: Skill[] = [...initialSkills];
  private projects: Project[] = [...initialProjects];
  private contactInquiries: ContactInquiry[] = [];
  private knowledgeBase: AIKnowledgeBase[] = [...initialKnowledgeBase];

  // Skills
  async getSkills(category?: string): Promise<Skill[]> {
    if (category) {
      return this.skills.filter(s => s.category === category);
    }
    return [...this.skills].sort((a, b) => a.display_order - b.display_order);
  }

  async createSkill(skillData: Omit<Skill, 'id' | 'created_at' | 'updated_at'>): Promise<Skill> {
    const newSkill: Skill = {
      ...skillData,
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.skills.push(newSkill);
    return newSkill;
  }

  async updateSkill(id: string, skillData: Partial<Skill>): Promise<Skill | null> {
    const index = this.skills.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.skills[index] = {
      ...this.skills[index],
      ...skillData,
      updated_at: new Date().toISOString()
    };
    return this.skills[index];
  }

  async deleteSkill(id: string): Promise<boolean> {
    const prevLen = this.skills.length;
    this.skills = this.skills.filter(s => s.id !== id);
    return this.skills.length < prevLen;
  }

  // Projects
  async getProjects(category?: string): Promise<Project[]> {
    let list = [...this.projects];
    if (category && category !== 'all') {
      list = list.filter(p => p.category === category);
    }
    return list.sort((a, b) => a.display_order - b.display_order);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const proj = this.projects.find(p => p.slug === slug);
    return proj || null;
  }

  async createProject(projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.projects.push(newProject);
    return newProject;
  }

  async updateProject(id: string, projectData: Partial<Project>): Promise<Project | null> {
    const index = this.projects.findIndex(p => p.id === id || p.slug === id);
    if (index === -1) return null;
    this.projects[index] = {
      ...this.projects[index],
      ...projectData,
      updated_at: new Date().toISOString()
    };
    return this.projects[index];
  }

  async deleteProject(id: string): Promise<boolean> {
    const prevLen = this.projects.length;
    this.projects = this.projects.filter(p => p.id !== id && p.slug !== id);
    return this.projects.length < prevLen;
  }

  // Inquiries
  async getInquiries(): Promise<ContactInquiry[]> {
    return [...this.contactInquiries].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async createInquiry(inquiryData: Omit<ContactInquiry, 'id' | 'created_at' | 'is_read'>): Promise<ContactInquiry> {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      is_read: false,
      created_at: new Date().toISOString()
    };
    this.contactInquiries.unshift(newInquiry);
    return newInquiry;
  }

  async markInquiryRead(id: string, isRead = true): Promise<ContactInquiry | null> {
    const item = this.contactInquiries.find(i => i.id === id);
    if (!item) return null;
    item.is_read = isRead;
    return item;
  }

  async deleteInquiry(id: string): Promise<boolean> {
    const prevLen = this.contactInquiries.length;
    this.contactInquiries = this.contactInquiries.filter(i => i.id !== id);
    return this.contactInquiries.length < prevLen;
  }

  // Knowledge base
  async getKnowledgeBase(): Promise<AIKnowledgeBase[]> {
    return [...this.knowledgeBase];
  }
}

export const inMemoryStore = new InMemoryStore();
