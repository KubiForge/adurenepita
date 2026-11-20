import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
// AuthProvider removed – authentication not used
import { SafetyProvider } from './context/SafetyContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EmergencyBanner } from './components/layout/EmergencyBanner';
import { CinematicBackground } from './components/layout/CinematicBackground';
import { EmergencyModal } from './components/common/EmergencyModal';
import { AccessibilityPanel } from './components/common/AccessibilityPanel';
import { CreativeWizardModal } from './components/wizard/CreativeWizardModal';
import { AiChatDrawer } from './components/ai/AiChatDrawer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WelcomePage } from './pages/WelcomePage';
import { DrugKnowledgePage } from './pages/DrugKnowledgePage';
import { DrugDetailPage } from './pages/DrugDetailPage';
import { GetHelpPage } from './pages/GetHelpPage';
import { SupportDirectoryPage } from './pages/SupportDirectoryPage';
import { AwarenessHubPage } from './pages/AwarenessHubPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { CommunityPage } from './pages/CommunityPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { DonatePage } from './pages/DonatePage';
import { AssistantPage } from './pages/AssistantPage';
import { JourneyPage } from './pages/JourneyPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { LegalPolicyPage } from './pages/LegalPolicyPage';
import { ConfidentialAssessmentPage } from './pages/ConfidentialAssessmentPage';
import { ProfessionalNetworkPage } from './pages/ProfessionalNetworkPage';

import { Compass } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

export const AppContent: React.FC = () => {
  const location = useLocation();
  const { language, t } = useLanguage();
  const isHome = location.pathname === '/';
  const isAdmin = location.pathname.startsWith('/admin');
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
      <a className="accessibility-skip-link" href="#main-content">
        {t('accessibility.skip')}
      </a>
      {isHome && <CinematicBackground />}
      {!isAdmin && <EmergencyBanner />}
      {!isAdmin && (
        <Navbar
          onOpenAiChat={() => handleOpenAiChat()}
          onOpenWizard={handleOpenWizard}
        />
      )}

      <main id="main-content" lang={language} tabIndex={-1} className="relative z-10 flex-1 w-full overflow-x-hidden">
        <Routes>
          {/* Public User Platform (12 Core Screens + Home, About, Stats) */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenAiChat={() => handleOpenAiChat()}
                onOpenWizard={handleOpenWizard}
              />
            }
          />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Screen 02 & 03: Drug Knowledge Centre & Detail */}
          <Route path="/drugs" element={<DrugKnowledgePage />} />
          <Route path="/learn" element={<DrugKnowledgePage />} />
          <Route
            path="/drugs/:slug"
            element={
              <DrugDetailPage
                onOpenAiChatWithPrompt={(prompt) => handleOpenAiChat(prompt)}
              />
            }
          />
          <Route
            path="/learn/:slug"
            element={
              <DrugDetailPage
                onOpenAiChatWithPrompt={(prompt) => handleOpenAiChat(prompt)}
              />
            }
          />

          {/* Screen 04: Find Support Services */}
          <Route path="/support" element={<SupportDirectoryPage />} />
          <Route path="/support-directory" element={<SupportDirectoryPage />} />

          {/* Screen 05: Awareness & Campaigns */}
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/network" element={<ProfessionalNetworkPage />} />

          {/* Screen 06: Community & Volunteering */}
          <Route path="/community" element={<CommunityPage />} />

          {/* Screen 07: Donate & Support */}
          <Route path="/donate" element={<DonatePage />} />

          {/* Screen 08: Dedicated AI Assistant */}
          <Route path="/assistant" element={<AssistantPage />} />

          {/* Screen 09 & 10: Guided Support Wizard Entry Route */}
          <Route
            path="/wizard"
            element={
              <div className="py-12 max-w-4xl mx-auto px-4 text-center space-y-6">
                <h1 className="text-3xl font-heading font-bold text-gold">{t('wizard.title')}</h1>
                <p className="text-sm text-ivory/70 max-w-lg mx-auto">
                  {t('wizard.description')}
                </p>
                <button
                  onClick={handleOpenWizard}
                  className="btn-gold px-6 py-3 rounded-xl font-bold shadow-gold-subtle inline-flex items-center gap-2"
                >
                  <Compass className="w-5 h-5 text-midnight" />
                  <span className="text-midnight">{t('cta.startWizard')}</span>
                </button>
              </div>
            }
          />

          {/* Screen 11: My Journey */}
          <Route path="/journey" element={<JourneyPage />} />

          {/* Screen 12: Profile & Settings */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Additional Public Pages */}
          <Route
            path="/get-help"
            element={
              <GetHelpPage
                onOpenAiChat={(prompt) => handleOpenAiChat(prompt)}
                onOpenWizard={handleOpenWizard}
              />
            }
          />
          <Route path="/awareness-hub" element={<AwarenessHubPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/legal-policy" element={<LegalPolicyPage />} />
          <Route path="/privacy" element={<LegalPolicyPage />} />
          <Route path="/terms" element={<LegalPolicyPage />} />
          <Route path="/assessment" element={<ConfidentialAssessmentPage />} />

          {/* Administrator Portal */}
          <Route path="/admin/*" element={<AdminPortalPage />} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}
      <AccessibilityPanel onOpenAiChat={isAdmin ? undefined : () => handleOpenAiChat()} />

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
        <SafetyProvider>
          <AppContent />
        </SafetyProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
