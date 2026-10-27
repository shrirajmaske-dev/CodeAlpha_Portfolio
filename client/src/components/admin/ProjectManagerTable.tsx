import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, X, Save, AlertCircle } from 'lucide-react';
import { Project, ProjectCategory } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { adminCreateProject, adminUpdateProject, adminDeleteProject } from '../../lib/api.js';
import { ProjectSchema, ProjectFormData } from '../../lib/schemas.js';
import { ZodError } from 'zod';

interface ProjectManagerTableProps {
  projects: Project[];
  onRefresh: () => void;
}

export const ProjectManagerTable: React.FC<ProjectManagerTableProps> = ({
  projects,
  onRefresh
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    slug: string;
    title: string;
    tagline: string;
    category: ProjectCategory;
    description: string;
    architecture_overview: string;
    technologies: string;
    thumbnail_url: string;
    banner_url: string;
    demo_url: string;
    repo_url: string;
    is_featured: boolean;
    display_order: number;
    challenges: { challenge: string; solution: string }[];
  }>({
    slug: '',
    title: '',
    tagline: '',
    category: 'full_stack',
    description: '',
    architecture_overview: '',
    technologies: '',
    thumbnail_url: '',
    banner_url: '',
    demo_url: '',
    repo_url: '',
    is_featured: false,
    display_order: 0,
    challenges: [{ challenge: '', solution: '' }]
  });

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      slug: '',
      title: '',
      tagline: '',
      category: 'full_stack',
      description: '',
      architecture_overview: '',
      technologies: '',
      thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      banner_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
      demo_url: '',
      repo_url: '',
      is_featured: false,
      display_order: projects.length + 1,
      challenges: [{ challenge: '', solution: '' }]
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      slug: project.slug,
      title: project.title,
      tagline: project.tagline,
      category: project.category,
      description: project.description,
      architecture_overview: project.architecture_overview || '',
      technologies: project.technologies.join(', '),
      thumbnail_url: project.thumbnail_url,
      banner_url: project.banner_url || '',
      demo_url: project.demo_url || '',
      repo_url: project.repo_url || '',
      is_featured: project.is_featured,
      display_order: project.display_order,
      challenges: project.challenges_and_solutions?.length > 0
        ? project.challenges_and_solutions
        : [{ challenge: '', solution: '' }]
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleAddChallenge = () => {
    setFormData(prev => ({
      ...prev,
      challenges: [...prev.challenges, { challenge: '', solution: '' }]
    }));
  };

  const handleRemoveChallenge = (index: number) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.filter((_, i) => i !== index)
    }));
  };

  const handleChallengeChange = (index: number, field: 'challenge' | 'solution', val: string) => {
    setFormData(prev => {
      const nextChallenges = [...prev.challenges];
      nextChallenges[index] = { ...nextChallenges[index], [field]: val };
      return { ...prev, challenges: nextChallenges };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Prepare payload
    const parsedTechs = formData.technologies
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const filteredChallenges = formData.challenges.filter(
      c => c.challenge.trim() && c.solution.trim()
    );

    const payload: ProjectFormData = {
      slug: formData.slug.trim().toLowerCase(),
      title: formData.title.trim(),
      tagline: formData.tagline.trim(),
      category: formData.category,
      description: formData.description.trim(),
      architecture_overview: formData.architecture_overview.trim() || undefined,
      challenges_and_solutions: filteredChallenges,
      technologies: parsedTechs.length > 0 ? parsedTechs : ['TypeScript'],
      thumbnail_url: formData.thumbnail_url.trim(),
      banner_url: formData.banner_url.trim() || undefined,
      demo_url: formData.demo_url.trim() || undefined,
      repo_url: formData.repo_url.trim() || undefined,
      is_featured: formData.is_featured,
      display_order: Number(formData.display_order)
    };

    try {
      ProjectSchema.parse(payload);
    } catch (err) {
      if (err instanceof ZodError) {
        setErrorMsg(err.errors[0]?.message || 'Validation error');
        return;
      }
    }

    setIsSaving(true);
    try {
      if (editingProject) {
        await adminUpdateProject(editingProject.id, payload);
      } else {
        await adminCreateProject(payload);
      }
      setIsModalOpen(false);
      onRefresh();
    } catch (err) {
      setErrorMsg((err as Error).message || 'Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminDeleteProject(id);
      setDeleteConfirmId(null);
      onRefresh();
    } catch (err) {
      alert(`Delete failed: ${(err as Error).message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Project Case Studies</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, update, or adjust live case studies displayed across the showcase.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenCreate}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Case Study
        </Button>
      </div>

      {/* Projects Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Project Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {projects.map(proj => (
                <tr key={proj.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-semibold text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.thumbnail_url}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-slate-800 flex-shrink-0"
                      />
                      <div>
                        <div>{proj.title}</div>
                        <div className="text-[11px] text-slate-500 font-normal truncate max-w-xs">
                          {proj.tagline}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 font-mono text-[11px] text-zinc-300 border border-white/10">
                      {proj.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-400 text-xs">
                    {proj.slug}
                  </td>
                  <td className="px-4 py-3">
                    {proj.is_featured ? (
                      <span className="inline-flex items-center gap-1 text-white text-xs">
                        <Star className="w-3.5 h-3.5 fill-white text-white" /> Yes
                      </span>
                    ) : (
                      <span className="text-zinc-500 text-xs">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {deleteConfirmId === proj.id ? (
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(proj.id)}
                            className="px-2 py-1 rounded bg-red-600 text-white text-[11px] font-bold"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-[11px]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(proj.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#08080a] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto z-10 p-6 sm:p-8 space-y-6 text-zinc-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingProject ? 'Edit Project Case Study' : 'Create New Project Case Study'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                    Slug (lowercase, hyphens) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. quantum-gateway"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                  >
                    <option value="full_stack">Full-Stack</option>
                    <option value="ai_systems">AI Systems / RAG</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Quantum Gateway Distributed Proxy"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                  Tagline (10-300 chars) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Ultra low latency edge proxy with sliding-window Redis token bucket rate limiting"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                  Full Description (50+ chars) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed breakdown of system purpose, business context, and operational capabilities..."
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                  Architecture Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.architecture_overview}
                  onChange={e => setFormData({ ...formData, architecture_overview: e.target.value })}
                  placeholder="Deep dive into system topologies, queues, caching layers, and storage models..."
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                  Technologies (comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="TypeScript, Python, FastAPI, Docker, Redis"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                />
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                    Thumbnail Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.thumbnail_url}
                    onChange={e => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                    Banner Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.banner_url}
                    onChange={e => setFormData({ ...formData, banner_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demo_url}
                    onChange={e => setFormData({ ...formData, demo_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.repo_url}
                    onChange={e => setFormData({ ...formData, repo_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>
              </div>

              {/* Featured & Display Order */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-black bg-zinc-900 border-white/20 focus:ring-white accent-white"
                  />
                  <span className="text-white text-xs font-medium">Highlight as Featured Flagship</span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="text-zinc-400 text-xs font-mono">Display Order:</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={e => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="w-16 px-2 py-1 rounded bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                    Key Challenges & Solutions
                  </span>
                  <button
                    type="button"
                    onClick={handleAddChallenge}
                    className="text-xs text-white hover:text-zinc-300 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Challenge
                  </button>
                </div>

                {formData.challenges.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-zinc-900/60 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center text-[11px] text-zinc-400">
                      <span>Item #{idx + 1}</span>
                      {formData.challenges.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveChallenge(idx)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Challenge (e.g. Memory allocation spikes in proxy hot path)"
                      value={c.challenge}
                      onChange={e => handleChallengeChange(idx, 'challenge', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-zinc-900 border border-white/10 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                    />
                    <input
                      type="text"
                      placeholder="Solution (e.g. Designed zero-copy byte buffer pool)"
                      value={c.solution}
                      onChange={e => handleChallengeChange(idx, 'solution', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-zinc-900 border border-white/10 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                    />
                  </div>
                ))}
              </div>

              {/* Submit Buttons */}
              <div className="border-t border-white/10 pt-4 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSaving}
                  icon={<Save className="w-4 h-4" />}
                >
                  Save Case Study
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
