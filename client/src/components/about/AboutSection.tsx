import React from 'react';
import { ShieldCheck, Zap, Database, Terminal, CheckCircle2, Award, BookOpen } from 'lucide-react';

const PRINCIPLES = [
  {
    icon: <Database className="w-5 h-5 text-white" />,
    title: 'Atomic Data & Storage Integrity',
    description: 'Relational ACID persistence via PostgreSQL unified with pgvector. Zero isolated data silos; transactional predictability across vector retrieval and business records.'
  },
  {
    icon: <Zap className="w-5 h-5 text-zinc-300" />,
    title: 'Sub-Millisecond Edge Latency',
    description: 'Radix tree routing, two-tier token bucket rate limiters, and hardware-accelerated Canvas rendering ensuring p99 SLAs under massive concurrency.'
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-white" />,
    title: 'Strict Type-Safe Contracts',
    description: 'Unified Zod validations and TypeScript interfaces synchronized from client interactions to Express middleware down to PostgreSQL Row Level Security.'
  },
  {
    icon: <Terminal className="w-5 h-5 text-zinc-300" />,
    title: 'Grounded Generative AI',
    description: 'Structured outputs using Google GenAI SDK (gemini-2.5-flash) with citation token anchoring and multi-hop agent reflection to eliminate hallucination.'
  }
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-[#050505] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300 font-mono font-bold bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15">
            About & Architectural Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white mt-4 tracking-tight">
            Engineering for Predictability at Scale
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-3">
            Over eight years of building distributed services, real-time engines, and mission-critical AI infrastructure.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-5 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
            <p>
              I build software that balances <span className="text-zinc-950 dark:text-white font-semibold">architectural rigor</span> with <span className="text-zinc-950 dark:text-white font-semibold">user empathy</span>. My philosophy stems from a fundamental conviction: modern software failures are rarely due to missing features; they arise from accidental complexity, unmanaged concurrency, and loose data contracts.
            </p>
            <p>
              Currently serving as <span className="text-zinc-950 dark:text-white font-medium">Principal AI Systems Engineer & Full-Stack Architect</span> at NeuraGrid Technologies, I spearhead autonomous agent frameworks and high-throughput retrieval pipelines handling over 400,000 queries per day.
            </p>
            <p>
              Whether engineering decentralized CRDT conflict resolution for collaborative canvases in Aegis Flow, or shaving p99 query latency from 1.2s to 84ms in hybrid vector catalogs, I design every component for observability, horizontal elasticity, and verifiable correctness.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-950 dark:text-white flex-shrink-0" />
                <span>B.S. Computer Science & Applied Math</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-950 dark:text-white flex-shrink-0" />
                <span>AWS Certified Solutions Architect</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-950 dark:text-white flex-shrink-0" />
                <span>Certified Kubernetes Application Developer (CKAD)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-950 dark:text-white flex-shrink-0" />
                <span>Zero-Trust Security & OWASP Compliant</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase / Profile Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:border-zinc-400 dark:hover:border-white/30 transition-all duration-300 shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-200/40 dark:bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-black flex items-center justify-center font-mono font-bold text-2xl shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-zinc-950 dark:border-white">
                    KV
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-white dark:border-[#050505] flex items-center justify-center" title="Online & Available">
                    <span className="w-2 h-2 rounded-full bg-zinc-950 dark:bg-black animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Kairos Vance</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 font-mono">Senior Full-Stack & AI Architect</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">San Francisco, CA (Open to Global Remote)</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-zinc-200 dark:border-white/10 pt-4 text-xs font-mono">
                <div className="flex justify-between items-center text-zinc-500 dark:text-zinc-400">
                  <span>Core Focus:</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-medium">Enterprise AI & Cloud Platforms</span>
                </div>
                <div className="flex justify-between items-center text-zinc-500 dark:text-zinc-400">
                  <span>Primary Stacks:</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-medium">TypeScript, Python, Go, React</span>
                </div>
                <div className="flex justify-between items-center text-zinc-500 dark:text-zinc-400">
                  <span>Design Aesthetic:</span>
                  <span className="text-zinc-950 dark:text-white font-semibold">Dual: Monochrome & Light</span>
                </div>
                <div className="flex justify-between items-center text-zinc-500 dark:text-zinc-400">
                  <span>Response SLA:</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold">&lt; 24 Hours Guaranteed</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
                  <Award className="w-3.5 h-3.5 text-zinc-900 dark:text-white" /> Lead Architect
                </span>
                <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-400" /> Continuous Innovation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl relative group hover:border-zinc-400 dark:hover:border-white/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-zinc-400 dark:group-hover:border-white/30 transition-all">
                <span className="text-zinc-900 dark:text-white">{item.icon}</span>
              </div>
              <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-2">{item.title}</h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
