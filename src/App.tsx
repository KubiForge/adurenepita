import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { SafetyProvider } from './context/SafetyContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EmergencyBanner } from './components/layout/EmergencyBanner';
import { CinematicBackground } from './components/layout/CinematicBackground';
import { EmergencyModal } from './components/common/EmergencyModal';
import { CreativeWizardModal } from './components/wizard/CreativeWizardModal';
import { AiChatDrawer } from './components/ai/AiChatDrawer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DrugKnowledgePage } from './pages/DrugKnowledgePage';
import { DrugDetailPage } from './pages/DrugDetailPage';
import { GetHelpPage } from './pages/GetHelpPage';
import { SupportDirectoryPage } from './pages/SupportDirectoryPage';
import { AwarenessHubPage } from './pages/AwarenessHubPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { DonatePage } from './pages/DonatePage';
import { AdminPortalPage } from './pages/AdminPortalPage';

import { Sparkles } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>();

  const handleOpenAiChat = (initialPrompt?: string) => {
    setChatInitialPrompt(initialPrompt);
    setIsAiChatOpen(true);
  };

  const handleOpenWizard = () => {
    setIsWizardOpen(true);
  };

  return (
    <div className={`relative isolate min-h-screen text-ivory flex flex-col font-sans ${isHome ? 'bg-transparent' : 'bg-midnight'}`}>
      <ScrollToTop />
      {isHome && <CinematicBackground />}
      <EmergencyBanner />
      <Navbar
        onOpenAiChat={() => handleOpenAiChat()}
        onOpenWizard={handleOpenWizard}
      />

      <main className="relative z-10 flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenAiChat={() => handleOpenAiChat()}
                onOpenWizard={handleOpenWizard}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/learn" element={<DrugKnowledgePage />} />
          <Route
            path="/learn/:slug"
            element={
              <DrugDetailPage
                onOpenAiChatWithPrompt={(prompt) => handleOpenAiChat(prompt)}
              />
            }
          />
          <Route
            path="/get-help"
            element={
              <GetHelpPage
                onOpenAiChat={(prompt) => handleOpenAiChat(prompt)}
                onOpenWizard={handleOpenWizard}
              />
            }
          />
          <Route path="/support-directory" element={<SupportDirectoryPage />} />
          <Route path="/awareness-hub" element={<AwarenessHubPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/admin" element={<AdminPortalPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating AI Action Pill */}
      <div className={`fixed bottom-6 right-6 z-40 ${isHome ? 'hidden' : ''}`}>
        <button
          onClick={() => handleOpenAiChat()}
          className="btn-gold px-4 py-3 rounded-full font-bold shadow-gold-glow flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          aria-label="Talk with Beyond the Darkness AI Assistant"
        >
          <Sparkles className="w-5 h-5 text-midnight animate-pulse" />
          <span className="text-sm font-semibold text-midnight hidden sm:inline">
            Talk to AI Assistant
          </span>
        </button>
      </div>

      {/* Global Modals & Drawers */}
      <EmergencyModal />

      <CreativeWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSwitchToChat={(prompt) => handleOpenAiChat(prompt)}
      />

      <AiChatDrawer
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onOpenWizard={handleOpenWizard}
        initialMessage={chatInitialPrompt}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <SafetyProvider>
            <AppContent />
          </SafetyProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
