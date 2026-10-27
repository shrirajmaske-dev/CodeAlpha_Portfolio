import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, AlertCircle } from 'lucide-react';
import { Skill, SkillCategory } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { adminCreateSkill, adminUpdateSkill, adminDeleteSkill } from '../../lib/api.js';
import { SkillSchema, SkillFormData } from '../../lib/schemas.js';
import { ZodError } from 'zod';

interface SkillManagerTableProps {
  skills: Skill[];
  onRefresh: () => void;
}

export const SkillManagerTable: React.FC<SkillManagerTableProps> = ({
  skills,
  onRefresh
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    category: 'languages',
    proficiency_level: 90,
    icon_name: 'Code',
    display_order: 1,
    is_featured: true
  });

  const handleOpenCreate = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'languages',
      proficiency_level: 90,
      icon_name: 'Code',
      display_order: skills.length + 1,
      is_featured: true
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency_level: skill.proficiency_level,
      icon_name: skill.icon_name,
      display_order: skill.display_order,
      is_featured: skill.is_featured
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      SkillSchema.parse(formData);
    } catch (err) {
      if (err instanceof ZodError) {
        setErrorMsg(err.errors[0]?.message || 'Validation error');
        return;
      }
    }

    setIsSaving(true);
    try {
      if (editingSkill) {
        await adminUpdateSkill(editingSkill.id, formData);
      } else {
        await adminCreateSkill(formData);
      }
      setIsModalOpen(false);
      onRefresh();
    } catch (err) {
      setErrorMsg((err as Error).message || 'Failed to save skill');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await adminDeleteSkill(id);
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
          <h2 className="text-xl sm:text-2xl font-bold text-white">Skills & Competency Management</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Update technical proficiencies and categories in real time.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenCreate}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Skill
        </Button>
      </div>

      {/* Skills Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-zinc-300">
            <thead className="bg-zinc-900/80 text-[11px] font-mono uppercase tracking-wider text-zinc-400 border-b border-white/10">
              <tr>
                <th className="px-4 py-3">Skill Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Proficiency</th>
                <th className="px-4 py-3">Icon</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {skills.map(s => (
                <tr key={s.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3 font-semibold text-white">
                    {s.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 font-mono text-[11px] text-zinc-300 border border-white/10">
                      {s.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 h-full rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                          style={{ width: `${s.proficiency_level}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs">{s.proficiency_level}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-400 text-xs">
                    {s.icon_name}
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-400 text-xs">
                    {s.display_order}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Edit Skill"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-white/10 transition-colors"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#08080a] border border-white/10 rounded-2xl shadow-2xl p-6 space-y-4 text-zinc-200 z-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Next.js"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as SkillCategory })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                >
                  <option value="languages">Languages</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="ai_ml">AI / ML</option>
                  <option value="cloud_devops">Cloud & DevOps</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                    Proficiency (1-100) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    required
                    value={formData.proficiency_level}
                    onChange={e => setFormData({ ...formData, proficiency_level: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono text-xs uppercase mb-1">
                    Icon Name (Lucide)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.icon_name}
                    onChange={e => setFormData({ ...formData, icon_name: e.target.value })}
                    placeholder="Code, Server, Database"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-black bg-zinc-900 border-white/20 focus:ring-white accent-white"
                  />
                  <span className="text-white text-xs font-medium">Featured in Matrix</span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="text-zinc-400 text-xs font-mono">Order:</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={e => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="w-16 px-2 py-1 rounded bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>
              </div>

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
                  Save Skill
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
