import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Circle, Copy, Check } from 'lucide-react';

const COMMANDS = [
  {
    cmd: 'kairos.getProfile()',
    output: `{
  "name": "Kairos Vance",
  "title": "Senior Full-Stack & Enterprise AI Systems Architect",
  "focus": ["Multi-Agent RAG", "Real-Time CRDTs", "Low-Latency Edge Systems"],
  "theme": "Dual Dynamic: Luxury Monochrome & Minimalist Clean Light",
  "status": "Available for select architectural contracts & advisory"
}`
  },
  {
    cmd: 'kairos.benchmark("Enterprise RAG")',
    output: `[BENCHMARK] Enterprise RAG Mesh v2 (Grounding Engine)
✓ Hybrid retrieval: dense pgvector + sparse BM25 fusion
✓ p99 search latency: 84ms (optimized from 1,280ms)
✓ Grounding validation: 100% token offset citation verified`
  },
  {
    cmd: 'kairos.inspectStack()',
    output: `Languages: TypeScript, Python, Go, Rust, SQL
Frontend:  React, Next.js, Tailwind, Zustand, HTML5 Canvas
Backend:   Node.js, FastAPI, PostgreSQL, Redis, Docker
AI / ML:   Google GenAI SDK (Gemini 2.5), pgvector, LangChain`
  }
];

export const TerminalCard: React.FC = () => {
  const [commandIndex, setCommandIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeEntry = COMMANDS[commandIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (typedText.length < activeEntry.cmd.length) {
        timeout = setTimeout(() => {
          setTypedText(activeEntry.cmd.slice(0, typedText.length + 1));
        }, 55);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setShowOutput(true);
        }, 200);
      }
    } else if (showOutput) {
      timeout = setTimeout(() => {
        setShowOutput(false);
        setTypedText('');
        setIsTyping(true);
        setCommandIndex(prev => (prev + 1) % COMMANDS.length);
      }, 4200);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isTyping, showOutput, activeEntry]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeEntry.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#0a0a0d] border border-zinc-200 dark:border-white/10 shadow-xl overflow-hidden font-mono text-xs sm:text-sm transition-colors duration-200">
      {/* Terminal Title Bar */}
      <div className="bg-zinc-100 dark:bg-[#121216] px-4 py-2.5 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 fill-zinc-400 dark:fill-zinc-600 text-zinc-400 dark:text-zinc-600" />
          <Circle className="w-3 h-3 fill-zinc-300 dark:fill-zinc-400 text-zinc-300 dark:text-zinc-400" />
          <Circle className="w-3 h-3 fill-zinc-200 dark:fill-zinc-200 text-zinc-200 dark:text-zinc-200" />
          <span className="text-[11px] text-zinc-700 dark:text-zinc-300 font-medium ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-zinc-950 dark:text-white" />
            enterprise-node ~ aegis@kairos-vance
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors p-1"
          title="Copy command"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-zinc-950 dark:text-white" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Terminal Content Body */}
      <div className="p-4 sm:p-5 min-h-[220px] max-h-[300px] overflow-y-auto space-y-3 bg-zinc-50/70 dark:bg-[#050507]">
        {/* Active Command Line */}
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <span className="text-zinc-950 dark:text-white font-bold">$</span>
          <span>{typedText}</span>
          <span className={`inline-block w-2 h-4 bg-zinc-950 dark:bg-white ${isTyping ? 'opacity-100' : 'animate-pulse'}`} />
        </div>

        {/* Output */}
        {showOutput && (
          <pre className="text-zinc-800 dark:text-zinc-200 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap animate-fade-in text-opacity-95 font-mono bg-white dark:bg-[#0d0d10] p-3 rounded-lg border border-zinc-200 dark:border-white/10 shadow-xs">
            {activeEntry.output}
          </pre>
        )}

        {/* Command Quick Selector Pills */}
        <div className="pt-2 flex flex-wrap gap-1.5 border-t border-zinc-200 dark:border-white/10">
          {COMMANDS.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                setCommandIndex(i);
                setTypedText(c.cmd);
                setIsTyping(false);
                setShowOutput(true);
              }}
              className={`text-[11px] px-2.5 py-1 rounded transition-colors ${
                i === commandIndex
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                  : 'bg-zinc-200/80 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white border border-zinc-300 dark:border-white/10'
              }`}
            >
              Preset #{i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
