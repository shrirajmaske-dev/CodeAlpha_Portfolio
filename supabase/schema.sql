-- =========================================================================
-- Developer Portfolio & AI Project Showcase Platform - PostgreSQL Schema
-- Target: Supabase (PostgreSQL with RLS and UUID extensions)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('languages', 'frontend', 'backend', 'ai_ml', 'cloud_devops')),
    proficiency_level INT NOT NULL CHECK (proficiency_level BETWEEN 1 AND 100),
    icon_name VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(120) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    tagline VARCHAR(300) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('full_stack', 'ai_systems', 'infrastructure')),
    description TEXT NOT NULL,
    architecture_overview TEXT,
    challenges_and_solutions JSONB DEFAULT '[]'::jsonb,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    thumbnail_url TEXT NOT NULL,
    banner_url TEXT,
    demo_url TEXT,
    repo_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    ip_hash VARCHAR(64),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Portfolio Profile Grounding Table (Context for AI Chatbot)
CREATE TABLE IF NOT EXISTS public.ai_knowledge_base (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automatic UpdatedAt Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply modtime triggers
DROP TRIGGER IF EXISTS update_skills_modtime ON public.skills;
CREATE TRIGGER update_skills_modtime 
BEFORE UPDATE ON public.skills 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_modtime ON public.projects;
CREATE TRIGGER update_projects_modtime 
BEFORE UPDATE ON public.projects 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_knowledge_base ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running
DROP POLICY IF EXISTS "Allow public read access to skills" ON public.skills;
DROP POLICY IF EXISTS "Allow admin full access to skills" ON public.skills;

DROP POLICY IF EXISTS "Allow public read access to projects" ON public.projects;
DROP POLICY IF EXISTS "Allow admin full access to projects" ON public.projects;

DROP POLICY IF EXISTS "Allow public insert to contact_inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Allow admin read and update on contact_inquiries" ON public.contact_inquiries;

DROP POLICY IF EXISTS "Allow public read to knowledge base" ON public.ai_knowledge_base;
DROP POLICY IF EXISTS "Allow admin full access to knowledge base" ON public.ai_knowledge_base;

-- 1. Skills: Public read; Authenticated admin write
CREATE POLICY "Allow public read access to skills"
    ON public.skills FOR SELECT
    USING (true);

CREATE POLICY "Allow admin full access to skills"
    ON public.skills FOR ALL
    TO authenticated
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 2. Projects: Public read; Authenticated admin write
CREATE POLICY "Allow public read access to projects"
    ON public.projects FOR SELECT
    USING (true);

CREATE POLICY "Allow admin full access to projects"
    ON public.projects FOR ALL
    TO authenticated
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 3. Contact Inquiries: Public insert only; Authenticated admin read/manage
CREATE POLICY "Allow public insert to contact_inquiries"
    ON public.contact_inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow admin read and update on contact_inquiries"
    ON public.contact_inquiries FOR ALL
    TO authenticated
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 4. AI Knowledge Base: Public read for AI worker; Authenticated admin write
CREATE POLICY "Allow public read to knowledge base"
    ON public.ai_knowledge_base FOR SELECT
    USING (true);

CREATE POLICY "Allow admin full access to knowledge base"
    ON public.ai_knowledge_base FOR ALL
    TO authenticated
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
