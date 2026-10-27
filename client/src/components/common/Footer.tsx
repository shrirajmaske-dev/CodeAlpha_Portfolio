import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.js';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#030304] text-zinc-600 dark:text-zinc-400 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Mission */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-zinc-950 dark:text-white text-lg">&lt;KV/&gt;</span>
            <span className="text-zinc-950 dark:text-white font-semibold">Kairos Vance</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-200/80 dark:bg-white/10 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-white/20 font-mono">
              {theme === 'dark' ? 'Luxury Monochrome Edition' : 'Minimalist Clean Light Edition'}
            </span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
            Architected for sub-millisecond p99 SLAs, strict end-to-end type invariants, and grounded conversational AI. Powered by Gemini 2.5 Flash, Supabase & React.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/kairosvance"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:border-zinc-950 dark:hover:border-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all hover:scale-105 shadow-xs"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/kairosvance"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:border-zinc-950 dark:hover:border-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all hover:scale-105 shadow-xs"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/kairosvance_ai"
            target="_blank"
            rel="noreferrer"
            aria-label="X / Twitter"
            className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:border-zinc-950 dark:hover:border-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all hover:scale-105 shadow-xs"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="mailto:contact@kairosvance.dev"
            aria-label="Email Kairos"
            className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:border-zinc-950 dark:hover:border-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all hover:scale-105 shadow-xs"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Back to top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500 font-mono">
            © {new Date().getFullYear()} Kairos Vance. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:border-zinc-950 dark:hover:border-white text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors shadow-xs"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
