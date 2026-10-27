import React from 'react';
import { ArrowRight, Bot, Shield, Cpu, Layers } from 'lucide-react';
import { Button } from '../common/Button.js';
import { TerminalCard } from './TerminalCard.js';

interface HeroSectionProps {
  onOpenAI: (initialPrompt?: string) => void;
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAI,
  onExploreProjects
}) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-200">
      {/* Background Subtle Monochrome Glow & Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-25">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-zinc-200/50 dark:bg-white/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-zinc-200/50 dark:bg-white/5 rounded-full blur-[160px]" />
        <div
          className="w-full h-full opacity-60 dark:opacity-100"
          style={{
            backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-zinc-400 dark:text-zinc-600">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-300 dark:border-white/20 text-zinc-800 dark:text-zinc-200 text-xs font-medium tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-zinc-950 dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse inline-block" />
              <span>Available for Principal Engineering & Technical Advisory</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
              Architecting <span className="text-gradient">Enterprise AI Platforms</span> & Scalable Cloud Systems.
            </h1>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Hi, I&apos;m <span className="text-zinc-950 dark:text-white font-semibold">Kairos Vance</span> — a Senior Full-Stack Engineer & Enterprise AI Systems Architect. I build high-availability cloud platforms, verifiable RAG intelligence engines, and mission-critical distributed services engineered for scale, zero-trust security, and strict type safety.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onExploreProjects}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Case Studies
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => onOpenAI('Can you summarize Kairos Vance\'s core architectural philosophy and flagship systems?')}
                icon={<Bot className="w-4 h-4 text-zinc-900 dark:text-white" />}
              >
                Interrogate AI Assistant
              </Button>
            </div>

            {/* Trust / Metric Badges */}
            <div className="pt-6 border-t border-zinc-200 dark:border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white font-mono">8+ <span className="text-zinc-500 dark:text-zinc-400 text-xl">yrs</span></p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">Production Eng</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white font-mono">400k+ <span className="text-zinc-500 dark:text-zinc-400 text-xl">/d</span></p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">Daily RAG Queries</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white font-mono">99.99%</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">Uptime Engineered</p>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Component & Quick Stats */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4">
            <TerminalCard />

            {/* Architectural Pillars Pills */}
            <div className="w-full grid grid-cols-3 gap-2 text-center text-xs text-zinc-700 dark:text-zinc-300 font-mono">
              <div className="glass-card px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 border-zinc-200 dark:border-white/10">
                <Shield className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
                <span>Zero-Trust</span>
              </div>
              <div className="glass-card px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 border-zinc-200 dark:border-white/10">
                <Cpu className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
                <span>Gemini 2.5</span>
              </div>
              <div className="glass-card px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 border-zinc-200 dark:border-white/10">
                <Layers className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
                <span>TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
