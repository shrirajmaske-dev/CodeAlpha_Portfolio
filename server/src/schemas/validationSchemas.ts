import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60, "Name must not exceed 60 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(100, "Subject must not exceed 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message exceeds 2000 character limit"),
  honeypot: z.string().max(0, "Bot submission detected").optional().default("")
});

export const AIChatRequestSchema = z.object({
  userQuery: z.string().min(3, "Query must be at least 3 characters").max(500, "Query exceeds 500 characters"),
  contextSlug: z.string().optional()
});

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must not exceed 200 characters"),
  tagline: z.string().min(10, "Tagline must be at least 10 characters").max(300, "Tagline must not exceed 300 characters"),
  category: z.enum(['full_stack', 'ai_systems', 'infrastructure']),
  description: z.string().min(50, "Description must be at least 50 characters"),
  architecture_overview: z.string().optional().nullable(),
  challenges_and_solutions: z.array(z.object({
    challenge: z.string(),
    solution: z.string()
  })).default([]),
  technologies: z.array(z.string()).min(1, "Specify at least one technology"),
  thumbnail_url: z.string().url("Must be a valid URL"),
  banner_url: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  demo_url: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  repo_url: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  is_featured: z.boolean().default(false),
  display_order: z.number().int().default(0)
});

export const SkillSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  category: z.enum(['languages', 'frontend', 'backend', 'ai_ml', 'cloud_devops']),
  proficiency_level: z.number().int().min(1).max(100),
  icon_name: z.string().min(2).max(100),
  display_order: z.number().int().default(0),
  is_featured: z.boolean().default(true)
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type AIChatRequestData = z.infer<typeof AIChatRequestSchema>;
export type ProjectFormData = z.infer<typeof ProjectSchema>;
export type SkillFormData = z.infer<typeof SkillSchema>;
