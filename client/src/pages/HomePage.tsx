import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/hero/HeroSection.js';
import { AboutSection } from '../components/about/AboutSection.js';
import { SkillMatrix } from '../components/skills/SkillMatrix.js';
import { ProjectGrid } from '../components/projects/ProjectGrid.js';
import { TimelineSection } from '../components/timeline/TimelineSection.js';
import { ContactForm } from '../components/contact/ContactForm.js';
import { AIAssistantWidget } from '../components/ai-chat/AIAssistantWidget.js';
import { useAIAssistant } from '../hooks/useAIAssistant.js';
import { fetchProjects, fetchSkills } from '../lib/api.js';
import { Project, Skill } from '../types/index.js';

export const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const ai = useAIAssistant();

  useEffect(() => {
    async function loadData() {
      try {
        const [projData, skillData] = await Promise.all([
          fetchProjects(),
          fetchSkills()
        ]);
        setProjects(projData);
        setSkills(skillData.data);
      } catch (err) {
        console.warn('Could not load remote portfolio data, using defaults:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAskAI = (slug?: string, prompt?: string) => {
    if (slug) {
      ai.openWithContext(slug, prompt);
    } else {
      ai.setIsOpen(true);
      if (prompt) {
        ai.sendMessage(prompt);
      }
    }
  };

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-white/10 text-xs py-1.5 px-4 text-center font-mono backdrop-blur-md animate-pulse">
          Synchronizing portfolio case studies and skill matrix...
        </div>
      )}
      <HeroSection
        onOpenAI={prompt => handleAskAI(undefined, prompt)}
        onExploreProjects={handleExploreProjects}
      />

      <AboutSection />

      <SkillMatrix skills={skills} />

      <ProjectGrid
        projects={projects}
        onAskAI={(slug, prompt) => handleAskAI(slug, prompt)}
      />

      <TimelineSection />

      <ContactForm />

      {/* Floating AI Assistant */}
      <AIAssistantWidget
        isOpen={ai.isOpen}
        onToggle={ai.toggleChat}
        messages={ai.messages}
        isLoading={ai.isLoading}
        error={ai.error}
        contextSlug={ai.contextSlug}
        onClearContext={() => ai.setContextSlug(null)}
        onSendMessage={ai.sendMessage}
        onClearChat={ai.clearChat}
      />
    </div>
  );
};
