import React from 'react';
import { Layers, Database, Inbox, LogOut, ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export type AdminTab = 'projects' | 'skills' | 'messages';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  unreadCount?: number;
  userEmail?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  unreadCount = 0,
  userEmail
}) => {
  return (
    <aside className="w-full lg:w-64 glass-panel border-r border-zinc-200 dark:border-white/10 p-4 sm:p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-black flex items-center justify-center font-mono font-bold text-xs border border-zinc-950 dark:border-white">
              <Shield className="w-4 h-4 text-white dark:text-black" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Admin CMS</h2>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">Kairos Vance</p>
            </div>
          </div>
          <Link
            to="/"
            title="Return to Public Portfolio"
            className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Links */}
        <nav className="space-y-1">
          <button
            onClick={() => onTabChange('projects')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-zinc-950 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <Layers className={`w-4 h-4 ${activeTab === 'projects' ? 'text-white dark:text-black' : 'text-zinc-500 dark:text-zinc-400'}`} />
            <span>Projects & Studies</span>
          </button>

          <button
            onClick={() => onTabChange('skills')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'skills'
                ? 'bg-zinc-950 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <Database className={`w-4 h-4 ${activeTab === 'skills' ? 'text-white dark:text-black' : 'text-zinc-500 dark:text-zinc-400'}`} />
            <span>Skills Matrix</span>
          </button>

          <button
            onClick={() => onTabChange('messages')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'messages'
                ? 'bg-zinc-950 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className={`w-4 h-4 ${activeTab === 'messages' ? 'text-white dark:text-black' : 'text-zinc-500 dark:text-zinc-400'}`} />
              <span>Inquiry Inbox</span>
            </div>
            {unreadCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                activeTab === 'messages' ? 'bg-white dark:bg-black text-black dark:text-white' : 'bg-zinc-950 dark:bg-white text-white dark:text-black'
              }`}>
                {unreadCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Footer User Info & Logout */}
      <div className="pt-6 border-t border-zinc-200 dark:border-white/10 space-y-3">
        {userEmail && (
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono truncate">
            Logged in: <span className="text-zinc-900 dark:text-white font-medium">{userEmail}</span>
          </div>
        )}

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
};
