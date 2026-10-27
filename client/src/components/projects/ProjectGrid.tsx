import React, { useState } from 'react';
import { Project, ProjectCategory } from '../../types/index.js';
import { ProjectCard } from './ProjectCard.js';
import { CaseStudyModal } from './CaseStudyModal.js';
import { Sparkles, Layers, Cpu, Terminal } from 'lucide-react';

interface ProjectGridProps {
  projects: Project[];
  onAskAI: (slug: string, prompt: string) => void;
}

const CATEGORIES: { id: ProjectCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Architectures', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'ai_systems', label: 'Autonomous AI & RAG', icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: 'full_stack', label: 'Full-Stack Platforms', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'infrastructure', label: 'Developer Infrastructure', icon: <Terminal className="w-3.5 h-3.5" /> }
];

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onAskAI }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 relative border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-[#050505] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300 font-mono font-bold bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15">
            Featured Systems & Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white mt-4 tracking-tight">
            Production Engineering Showcase
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-2">
            Click into each system for architecture diagrams, performance metrics, and concurrency solutions.
          </p>
        </div>

        {/* Category Filters with Counters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => {
            const count = cat.id === 'all'
              ? projects.length
              : projects.filter(p => p.category === cat.id).length;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black font-bold' : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={p => setModalProject(p)}
              onAskAI={onAskAI}
            />
          ))}
        </div>

        {/* Modal Case Study Deep-Dive */}
        <CaseStudyModal
          project={modalProject}
          onClose={() => setModalProject(null)}
          onAskAI={onAskAI}
        />
      </div>
    </section>
  );
};
