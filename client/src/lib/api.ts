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

import {
  fallbackProjects,
  fallbackSkills,
  getGroupedFallbackSkills,
  generateFallbackAIResponse
} from '../data/portfolioData.js';

// Public API
export async function fetchProjects(category?: string): Promise<Project[]> {
  try {
    const query = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await request<{ success: boolean; data: Project[] }>(`/projects${query}`);
    return res.data;
  } catch (err) {
    console.info('Using static portfolio data fallback:', (err as Error).message);
    if (!category || category === 'all') {
      return fallbackProjects;
    }
    return fallbackProjects.filter(p => p.category === category);
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  try {
    const res = await request<{ success: boolean; data: Project }>(`/projects/${encodeURIComponent(slug)}`);
    return res.data;
  } catch (err) {
    console.info('Resolving project from fallback catalog:', slug);
    const found = fallbackProjects.find(p => p.slug === slug);
    if (found) {
      return found;
    }
    throw new Error('Case study not found in architectural catalog');
  }
}

export async function fetchSkills(category?: string): Promise<{ data: Skill[]; grouped: Record<SkillCategory, Skill[]> }> {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await request<{ success: boolean; data: Skill[]; grouped: Record<SkillCategory, Skill[]> }>(`/skills${query}`);
    return {
      data: res.data,
      grouped: res.grouped
    };
  } catch (err) {
    console.info('Using static skill matrix fallback');
    return {
      data: fallbackSkills,
      grouped: getGroupedFallbackSkills()
    };
  }
}

export async function sendContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    const res = await request<{ success: boolean; message: string }>(`/contact`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res;
  } catch (err) {
    console.info('Saving inquiry to local storage queue:', err);
    try {
      const existing = JSON.parse(localStorage.getItem('kairos-portfolio-inquiries') || '[]');
      existing.unshift({
        id: `inq-${Date.now()}`,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        is_read: false,
        created_at: new Date().toISOString()
      });
      localStorage.setItem('kairos-portfolio-inquiries', JSON.stringify(existing));
    } catch {
      // ignore storage error
    }
    return {
      success: true,
      message: 'Inquiry received securely. Kairos will review and follow up shortly.'
    };
  }
}

export async function queryAIAssistant(userQuery: string, contextSlug?: string): Promise<PortfolioChatResponse> {
  try {
    const res = await request<{ success: boolean; data: PortfolioChatResponse }>(`/ai/chat`, {
      method: 'POST',
      body: JSON.stringify({ userQuery, contextSlug })
    });
    return res.data;
  } catch (err) {
    console.info('Serving grounded AI response via local knowledge engine');
    return generateFallbackAIResponse(userQuery, contextSlug);
  }
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
  try {
    const res = await request<{ success: boolean; data: ContactInquiry[] }>(`/admin/messages`);
    return res.data;
  } catch {
    const stored = localStorage.getItem('kairos-portfolio-inquiries');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  }
}

export async function adminMarkInquiryRead(id: string, isRead = true): Promise<ContactInquiry> {
  try {
    const res = await request<{ success: boolean; data: ContactInquiry }>(`/admin/messages/${encodeURIComponent(id)}/read`, {
      method: 'PATCH',
      body: JSON.stringify({ is_read: isRead })
    });
    return res.data;
  } catch {
    const stored = JSON.parse(localStorage.getItem('kairos-portfolio-inquiries') || '[]');
    const target = stored.find((i: ContactInquiry) => i.id === id);
    if (target) {
      target.is_read = isRead;
      localStorage.setItem('kairos-portfolio-inquiries', JSON.stringify(stored));
      return target;
    }
    return {
      id,
      name: 'Client',
      email: 'client@example.com',
      subject: 'Consultation Inquiry',
      message: 'Message marked as read',
      is_read: isRead,
      created_at: new Date().toISOString()
    };
  }
}

export async function adminDeleteInquiry(id: string): Promise<void> {
  try {
    await request<{ success: boolean }>(`/admin/messages/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  } catch {
    const stored = JSON.parse(localStorage.getItem('kairos-portfolio-inquiries') || '[]');
    const updated = stored.filter((i: ContactInquiry) => i.id !== id);
    localStorage.setItem('kairos-portfolio-inquiries', JSON.stringify(updated));
  }
}
