import { Project, Skill, SkillCategory, ContactInquiry, PortfolioChatResponse } from '../types/index.js';
import { ContactFormData, ProjectFormData, SkillFormData } from './schemas.js';
import { getStoredAuthToken } from './supabaseClient.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/v1';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getStoredAuthToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = json?.error || json?.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return json;
}

// Public API
export async function fetchProjects(category?: string): Promise<Project[]> {
  const query = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
  const res = await request<{ success: boolean; data: Project[] }>(`/projects${query}`);
  return res.data;
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  const res = await request<{ success: boolean; data: Project }>(`/projects/${encodeURIComponent(slug)}`);
  return res.data;
}

export async function fetchSkills(category?: string): Promise<{ data: Skill[]; grouped: Record<SkillCategory, Skill[]> }> {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  const res = await request<{ success: boolean; data: Skill[]; grouped: Record<SkillCategory, Skill[]> }>(`/skills${query}`);
  return {
    data: res.data,
    grouped: res.grouped
  };
}

export async function sendContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  const res = await request<{ success: boolean; message: string }>(`/contact`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return res;
}

export async function queryAIAssistant(userQuery: string, contextSlug?: string): Promise<PortfolioChatResponse> {
  const res = await request<{ success: boolean; data: PortfolioChatResponse }>(`/ai/chat`, {
    method: 'POST',
    body: JSON.stringify({ userQuery, contextSlug })
  });
  return res.data;
}

// Protected Admin API
export async function adminCreateProject(data: ProjectFormData): Promise<Project> {
  const res = await request<{ success: boolean; data: Project }>(`/admin/projects`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return res.data;
}

export async function adminUpdateProject(id: string, data: Partial<ProjectFormData>): Promise<Project> {
  const res = await request<{ success: boolean; data: Project }>(`/admin/projects/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
  return res.data;
}

export async function adminDeleteProject(id: string): Promise<void> {
  await request<{ success: boolean }>(`/admin/projects/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}

export async function adminCreateSkill(data: SkillFormData): Promise<Skill> {
  const res = await request<{ success: boolean; data: Skill }>(`/admin/skills`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return res.data;
}

export async function adminUpdateSkill(id: string, data: Partial<SkillFormData>): Promise<Skill> {
  const res = await request<{ success: boolean; data: Skill }>(`/admin/skills/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
  return res.data;
}

export async function adminDeleteSkill(id: string): Promise<void> {
  await request<{ success: boolean }>(`/admin/skills/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}

export async function adminGetInquiries(): Promise<ContactInquiry[]> {
  const res = await request<{ success: boolean; data: ContactInquiry[] }>(`/admin/messages`);
  return res.data;
}

export async function adminMarkInquiryRead(id: string, isRead = true): Promise<ContactInquiry> {
  const res = await request<{ success: boolean; data: ContactInquiry }>(`/admin/messages/${encodeURIComponent(id)}/read`, {
    method: 'PATCH',
    body: JSON.stringify({ is_read: isRead })
  });
  return res.data;
}

export async function adminDeleteInquiry(id: string): Promise<void> {
  await request<{ success: boolean }>(`/admin/messages/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}
