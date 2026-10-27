import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, Lock, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { Button } from './Button.js';
import { useTheme } from '../../context/ThemeContext.js';

interface NavbarProps {
  activeSection?: string;
  scrollProgress?: number;
  onNavigateSection?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection = 'hero',
  scrollProgress = 0,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (isHomePage && onNavigateSection) {
      onNavigateSection(id);
    } else {
      navigate(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-40 transition-colors duration-200">
      {/* Scroll Progress Indicator Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-zinc-950 via-zinc-600 to-zinc-400 dark:from-white dark:via-zinc-200 dark:to-zinc-400 transition-all duration-150 ease-out z-50 shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.4)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Monogram */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none"
          onClick={() => {
            if (isHomePage && onNavigateSection) onNavigateSection('hero');
          }}
        >
          <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-white/20 group-hover:border-zinc-500 dark:group-hover:border-white/60 flex items-center justify-center font-mono font-bold text-zinc-900 dark:text-white transition-colors shadow-sm">
            &lt;KV/&gt;
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-zinc-950 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors text-sm sm:text-base">
              Kairos Vance
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono hidden sm:inline">
              Enterprise AI & Full-Stack Architect
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map(link => {
            const isActive = isHomePage && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-zinc-950 dark:text-white bg-zinc-100 dark:bg-white/10 font-bold border border-zinc-300 dark:border-white/20 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Controls & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Minimalist Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Minimalist Clean Light mode' : 'Switch to Luxury Monochrome Dark mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-lg text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/70 border border-zinc-200 dark:border-white/10 transition-all duration-200"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-zinc-200 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-800 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          <Link to="/resume">
            <Button
              variant="outline"
              size="sm"
              icon={<FileText className="w-3.5 h-3.5" />}
            >
              Resume
            </Button>
          </Link>

          <Link to="/admin/dashboard">
            <Button
              variant="ghost"
              size="sm"
              icon={<Lock className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
              title="Admin Portal"
            >
              Admin
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleNavClick('contact')}
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Initiate Contact
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1.5 sm:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-zinc-200" /> : <Moon className="w-5 h-5 text-zinc-800" />}
          </button>

          <Link to="/resume" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white p-1.5">
            <FileText className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-b border-zinc-200 dark:border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fade-in bg-white/95 dark:bg-[#08080a]/95">
          <div className="space-y-1">
            {navLinks.map(link => {
              const isActive = isHomePage && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-zinc-950 dark:text-white bg-zinc-100 dark:bg-white/10 font-semibold border border-zinc-300 dark:border-white/20'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-white/10 flex flex-col gap-2">
            <Link to="/resume" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center"
                icon={<FileText className="w-4 h-4" />}
              >
                View & Download Resume
              </Button>
            </Link>

            <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                size="md"
                className="w-full justify-center"
                icon={<Lock className="w-4 h-4" />}
              >
                Admin Management Portal
              </Button>
            </Link>

            <Button
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => handleNavClick('contact')}
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Initiate Contact
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
