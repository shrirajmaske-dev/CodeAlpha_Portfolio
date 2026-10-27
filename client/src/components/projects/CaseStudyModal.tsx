import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Bot, Layers, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Project } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { Link } from 'react-router-dom';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onAskAI: (slug: string, prompt: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onAskAI
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#08080a] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-y-auto z-10 text-zinc-800 dark:text-zinc-200 transition-colors duration-200">
        {/* Banner Image / Header */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-white/10">
          <img
            src={project.banner_url || project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 dark:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#08080a] via-white/70 dark:via-[#08080a]/70 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Case Study Modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-black/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-white/10 transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Tagline in banner */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-2.5 py-1 rounded bg-zinc-950 text-white dark:bg-white/10 dark:text-white border border-zinc-950 dark:border-white/20 font-mono text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
              {project.category.replace('_', ' ')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm mt-1 max-w-2xl line-clamp-2">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Action Links & AI CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 dark:text-black dark:bg-white dark:hover:bg-zinc-200 px-3.5 py-1.5 rounded-lg border border-zinc-950 dark:border-white shadow-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demonstration
                </a>
              )}
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 hover:text-zinc-950 bg-zinc-200/80 hover:bg-zinc-300 dark:text-zinc-300 dark:hover:text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-white/10 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" /> Source Code
                </a>
              )}
              <Link
                to={`/projects/${project.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white px-2 py-1.5 transition-colors"
              >
                Open Full Dedicated Page <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onAskAI(project.slug, `What were the architectural trade-offs and performance achievements in ${project.title}?`);
              }}
              icon={<Bot className="w-4 h-4 text-zinc-900 dark:text-white" />}
            >
              Ask Aegis AI about this System
            </Button>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold mb-2">
              System Summary & Business Impact
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture Overview */}
          {project.architecture_overview && (
            <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-zinc-950 dark:text-white font-bold text-sm">
                <Layers className="w-4 h-4" />
                <span>Architecture & System Design</span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-sans">
                {project.architecture_overview}
              </p>
            </div>
          )}

          {/* Key Challenges & Solutions */}
          {project.challenges_and_solutions && project.challenges_and_solutions.length > 0 && (
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold mb-4">
                Engineering Hurdles & Verifiable Solutions
              </h3>
              <div className="space-y-4">
                {project.challenges_and_solutions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-white/10 space-y-2.5"
                  >
                    <div className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
                      <AlertTriangle className="w-4 h-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold uppercase tracking-wider text-[11px] text-zinc-500 dark:text-zinc-400 block font-mono">
                          Challenge
                        </span>
                        <span>{item.challenge}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-zinc-950 dark:text-white text-xs sm:text-sm pl-0 pt-2 border-t border-zinc-200 dark:border-white/10">
                      <CheckCircle className="w-4 h-4 text-zinc-900 dark:text-white flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold uppercase tracking-wider text-[11px] text-zinc-600 dark:text-zinc-300 block font-mono">
                          Solution Engineered
                        </span>
                        <span className="text-zinc-700 dark:text-zinc-300">{item.solution}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Badges */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold mb-3">
              Integrated Technologies & Toolchain
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-mono border border-zinc-200 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-zinc-50 dark:bg-[#08080a] p-4 sm:p-6 border-t border-zinc-200 dark:border-white/10 flex justify-end">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close Case Study
          </Button>
        </div>
      </div>
    </div>
  );
};
