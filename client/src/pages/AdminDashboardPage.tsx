import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getStoredAuthToken,
  getStoredAdminUser,
  clearStoredAuthSession
} from '../lib/supabaseClient.js';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar.js';
import { ProjectManagerTable } from '../components/admin/ProjectManagerTable.js';
import { SkillManagerTable } from '../components/admin/SkillManagerTable.js';
import { InquiryInbox } from '../components/admin/InquiryInbox.js';
import { fetchProjects, fetchSkills, adminGetInquiries } from '../lib/api.js';
import { Project, Skill, ContactInquiry } from '../types/index.js';
import { Cpu } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const adminUser = getStoredAdminUser();

  const loadAllData = useCallback(async () => {
    try {
      const [projData, skillData, inqData] = await Promise.all([
        fetchProjects(),
        fetchSkills(),
        adminGetInquiries().catch(() => [])
      ]);
      setProjects(projData);
      setSkills(skillData.data);
      setInquiries(inqData);
    } catch (err) {
      console.warn('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getStoredAuthToken();
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadAllData();
  }, [navigate, loadAllData]);

  const handleLogout = () => {
    clearStoredAuthSession();
    navigate('/admin/login');
  };

  const unreadCount = inquiries.filter(i => !i.is_read).length;

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-zinc-50 dark:bg-[#050505]">
        <div className="flex items-center gap-3 text-zinc-900 dark:text-white font-mono text-sm">
          <Cpu className="w-5 h-5 animate-spin text-zinc-900 dark:text-white" />
          <span>Synchronizing Admin CMS State...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-zinc-50 dark:bg-[#050505] text-zinc-800 dark:text-zinc-200 transition-colors duration-200 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={tab => setActiveTab(tab)}
        onLogout={handleLogout}
        unreadCount={unreadCount}
        userEmail={adminUser?.email || 'admin@kairosvance.dev'}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl overflow-y-auto">
        {activeTab === 'projects' && (
          <ProjectManagerTable
            projects={projects}
            onRefresh={loadAllData}
          />
        )}

        {activeTab === 'skills' && (
          <SkillManagerTable
            skills={skills}
            onRefresh={loadAllData}
          />
        )}

        {activeTab === 'messages' && (
          <InquiryInbox
            inquiries={inquiries}
            onRefresh={loadAllData}
          />
        )}
      </main>
    </div>
  );
};
