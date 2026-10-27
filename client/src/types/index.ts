export type SkillCategory = 'languages' | 'frontend' | 'backend' | 'ai_ml' | 'cloud_devops';
export type ProjectCategory = 'full_stack' | 'ai_systems' | 'infrastructure';

export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency_level: number;
  icon_name: string;
  display_order: number;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  description: string;
  architecture_overview?: string | null;
  challenges_and_solutions: ChallengeSolution[];
  technologies: string[];
  thumbnail_url: string;
  banner_url?: string | null;
  demo_url?: string | null;
  repo_url?: string | null;
  is_featured: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip_hash?: string | null;
  is_read: boolean;
  created_at: string;
}

export interface PortfolioChatResponse {
  answer: string;
  referencedProjects: string[];
  highlightedSkills: string[];
  suggestedFollowUps: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  data?: PortfolioChatResponse;
  timestamp: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role?: string;
}
