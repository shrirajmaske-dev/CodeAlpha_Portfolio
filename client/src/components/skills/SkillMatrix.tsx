import React, { useState } from 'react';
import {
  Code,
  FileCode2,
  Terminal,
  Cpu,
  Database,
  ShieldCheck,
  Atom,
  Layers,
  Palette,
  Boxes,
  Radio,
  Server,
  Zap,
  Flame,
  Network,
  Sparkles,
  Brain,
  Binary,
  GitFork,
  Activity,
  Container,
  Anchor,
  Cloud,
  Globe,
  Workflow,
  Search
} from 'lucide-react';
import { Skill, SkillCategory } from '../../types/index.js';

interface SkillMatrixProps {
  skills: Skill[];
}

const CATEGORIES: { id: SkillCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & Distributed' },
  { id: 'ai_ml', label: 'AI & Machine Learning' },
  { id: 'cloud_devops', label: 'Cloud & DevOps' }
];

const ICON_MAP: Record<string, React.ReactNode> = {
  FileCode2: <FileCode2 className="w-4 h-4 text-white" />,
  Terminal: <Terminal className="w-4 h-4 text-zinc-300" />,
  Cpu: <Cpu className="w-4 h-4 text-white" />,
  Database: <Database className="w-4 h-4 text-zinc-300" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-white" />,
  Code: <Code className="w-4 h-4 text-white" />,
  Atom: <Atom className="w-4 h-4 text-zinc-300" />,
  Layers: <Layers className="w-4 h-4 text-zinc-400" />,
  Palette: <Palette className="w-4 h-4 text-zinc-300" />,
  Boxes: <Boxes className="w-4 h-4 text-white" />,
  Radio: <Radio className="w-4 h-4 text-zinc-300" />,
  Server: <Server className="w-4 h-4 text-white" />,
  Zap: <Zap className="w-4 h-4 text-zinc-200" />,
  Flame: <Flame className="w-4 h-4 text-white" />,
  Network: <Network className="w-4 h-4 text-zinc-300" />,
  Sparkles: <Sparkles className="w-4 h-4 text-white" />,
  Brain: <Brain className="w-4 h-4 text-zinc-200" />,
  Binary: <Binary className="w-4 h-4 text-white" />,
  GitFork: <GitFork className="w-4 h-4 text-zinc-400" />,
  Activity: <Activity className="w-4 h-4 text-white" />,
  Container: <Container className="w-4 h-4 text-zinc-300" />,
  Anchor: <Anchor className="w-4 h-4 text-zinc-400" />,
  Cloud: <Cloud className="w-4 h-4 text-white" />,
  Globe: <Globe className="w-4 h-4 text-zinc-300" />,
  Workflow: <Workflow className="w-4 h-4 text-white" />
};

export const SkillMatrix: React.FC<SkillMatrixProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 relative border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-[#050505] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300 font-mono font-bold bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15">
              Technical Proficiencies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white mt-4 tracking-tight">
              Skill & Competency Matrix
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Categorized technical skills backed by production battle-testing, verified benchmarks, and continuous architectural application.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search skill (e.g. React)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white text-xs sm:text-sm text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-200 dark:border-white/10 pb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-xl text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/10">
            No technical skills found matching &ldquo;{searchTerm}&rdquo; in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map(skill => (
              <div
                key={skill.id}
                className="glass-card p-4 rounded-xl flex flex-col justify-between group hover:border-zinc-400 dark:hover:border-white/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {ICON_MAP[skill.icon_name] || <Code className="w-4 h-4 text-zinc-900 dark:text-white" />}
                    </div>
                    <div>
                      <span className="font-semibold text-zinc-950 dark:text-white text-sm block">
                        {skill.name}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                        {skill.category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10 px-2 py-0.5 rounded border border-zinc-300 dark:border-white/20">
                    {skill.proficiency_level}%
                  </span>
                </div>

                {/* Proficiency Bar */}
                <div className="w-full bg-zinc-200 dark:bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-200/50 dark:border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 rounded-full transition-all duration-500 shadow-xs dark:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    style={{ width: `${skill.proficiency_level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
