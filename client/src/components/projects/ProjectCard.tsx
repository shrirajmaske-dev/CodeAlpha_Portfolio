import React from 'react';
import { ExternalLink, Github, Layers, Bot, ArrowRight } from 'lucide-react';
import { Project } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
  onAskAI: (slug: string, prompt: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
  onAskAI
}) => {
  const categoryLabels = {
    full_stack: 'Full-Stack Platform',
    ai_systems: 'Autonomous AI / RAG',
    infrastructure: 'Dev Infrastructure'
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-zinc-400 dark:hover:border-white/30 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        <img
          src={project.thumbnail_url}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#050505] via-white/30 dark:via-[#050505]/40 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-black/90 backdrop-blur-md text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/20 font-mono text-[11px] font-semibold uppercase tracking-wider shadow-xs">
            {categoryLabels[project.category] || project.category}
          </span>
        </div>

        {/* Featured Tag */}
        {project.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded bg-zinc-950 text-white dark:bg-white/10 dark:text-white border border-zinc-950 dark:border-white/30 text-[10px] font-mono font-bold uppercase shadow-xs">
              Flagship
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-950 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Technologies Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies.slice(0, 4).map(tech => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[11px] font-mono border border-zinc-200 dark:border-white/10"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900/60 text-zinc-500 text-[11px] font-mono border border-zinc-200 dark:border-white/5">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onOpenCaseStudy(project)}
              icon={<Layers className="w-3.5 h-3.5" />}
            >
              Case Study
            </Button>

            <Link to={`/projects/${project.slug}`} className="flex-1">
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Deep Dive
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              onClick={() => onAskAI(project.slug, `Explain the architectural decisions and concurrency model in ${project.title}.`)}
              className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors font-medium text-[11px]"
            >
              <Bot className="w-3.5 h-3.5 text-zinc-900 dark:text-white" /> Ask Aegis AI
            </button>

            <div className="flex items-center gap-3">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  title="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
