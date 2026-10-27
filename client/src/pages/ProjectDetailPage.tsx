import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Bot, Layers, AlertTriangle, CheckCircle2, Cpu } from 'lucide-react';
import { fetchProjectBySlug } from '../lib/api.js';
import { Project } from '../types/index.js';
import { Button } from '../components/common/Button.js';
import { AIAssistantWidget } from '../components/ai-chat/AIAssistantWidget.js';
import { useAIAssistant } from '../hooks/useAIAssistant.js';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ai = useAIAssistant();

  useEffect(() => {
    async function loadProject() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProjectBySlug(slug);
        setProject(data);
        ai.setContextSlug(slug);
      } catch (err) {
        setError((err as Error).message || 'Case study not found');
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-zinc-50 dark:bg-[#050505]">
        <div className="flex items-center gap-3 text-zinc-900 dark:text-white font-mono text-sm">
          <Cpu className="w-5 h-5 animate-spin" />
          <span>Loading architectural case study...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 pb-20 max-w-3xl mx-auto px-4 text-center space-y-4 bg-zinc-50 dark:bg-[#050505]">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Case Study Not Found</h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">{error || "The requested project case study doesn't exist."}</p>
        <Link to="/">
          <Button variant="outline" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Showcase
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-zinc-50 dark:bg-[#050505] text-zinc-800 dark:text-zinc-200 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <Link to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Showcase
          </Link>
          <span>/</span>
          <span className="text-zinc-400 dark:text-zinc-600">projects</span>
          <span>/</span>
          <span className="text-zinc-900 dark:text-white">{project.slug}</span>
        </div>

        {/* Hero Header Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-2xl">
          <img
            src={project.banner_url || project.thumbnail_url}
            alt={project.title}
            className="w-full h-64 sm:h-96 object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-white/10 text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-wider">
                {project.category.replace('_', ' ')}
              </span>
              {project.is_featured && (
                <span className="px-3 py-1 rounded-md bg-white/20 text-white border border-white/40 font-mono text-xs font-bold uppercase">
                  Flagship Case Study
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>

            <p className="text-zinc-200 text-sm sm:text-lg max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="glass-panel p-4 sm:p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-zinc-200 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-semibold text-xs sm:text-sm shadow-sm transition-all border border-zinc-950 dark:border-white"
              >
                <ExternalLink className="w-4 h-4" /> Live System Demo
              </a>
            )}

            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium text-xs sm:text-sm border border-zinc-200 dark:border-white/10 transition-colors"
              >
                <Github className="w-4 h-4" /> Source Repository
              </a>
            )}
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => ai.openWithContext(project.slug, `What were the architectural trade-offs and performance achievements in ${project.title}?`)}
            icon={<Bot className="w-4 h-4 text-zinc-900 dark:text-white" />}
          >
            Interrogate Aegis AI on this Case Study
          </Button>
        </div>

        {/* Overview & System Scope */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4 border border-zinc-200 dark:border-white/10">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-zinc-900 dark:text-white" />
            <span>Executive Overview & System Scope</span>
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Architecture & Engineering Design */}
        {project.architecture_overview && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4 border border-zinc-200 dark:border-white/10">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-zinc-900 dark:text-white" />
              <span>Architectural Topology & Technical Trade-offs</span>
            </h2>
            <div className="p-5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              {project.architecture_overview}
            </div>
          </div>
        )}

        {/* Challenges & Engineered Solutions */}
        {project.challenges_and_solutions && project.challenges_and_solutions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
              Key Engineering Bottlenecks & Engineered Resolutions
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {project.challenges_and_solutions.map((item, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl space-y-4 border border-zinc-200 dark:border-white/10">
                  <div className="flex items-start gap-3 text-zinc-800 dark:text-zinc-300 text-sm sm:text-base">
                    <AlertTriangle className="w-5 h-5 text-zinc-500 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-0.5">
                        Specific Bottleneck #{idx + 1}
                      </span>
                      <span>{item.challenge}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-zinc-900 dark:text-white text-sm sm:text-base pt-3 border-t border-zinc-200 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-zinc-900 dark:text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 block mb-0.5">
                        Architectural Resolution
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
        <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-3 border border-zinc-200 dark:border-white/10">
          <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-semibold">
            Integrated Production Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(t => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-mono border border-zinc-200 dark:border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Return Button */}
        <div className="text-center pt-6">
          <Link to="/">
            <Button variant="secondary" size="lg" icon={<ArrowLeft className="w-4 h-4" />}>
              Return to Complete Portfolio
            </Button>
          </Link>
        </div>
      </div>

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
