import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar.js';
import { Footer } from './components/common/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { ProjectDetailPage } from './pages/ProjectDetailPage.js';
import { ResumePage } from './pages/ResumePage.js';
import { AdminLoginPage } from './pages/AdminLoginPage.js';
import { AdminDashboardPage } from './pages/AdminDashboardPage.js';
import { useScrollSpy } from './hooks/useScrollSpy.js';

// Helper component to scroll to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const { activeSection, scrollProgress, scrollToSection } = useScrollSpy(
    ['hero', 'about', 'skills', 'projects', 'experience', 'contact'],
    120
  );

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-950 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      <ScrollToTop />

      {/* Primary Sticky Navbar */}
      <Navbar
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Primary Footer (Hidden on Admin pages for clean CMS workspace) */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
