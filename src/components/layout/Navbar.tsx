import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Menu, X, Heart, Shield, Compass, ChevronRight, Languages, Search } from 'lucide-react';
import { LanguageSelector } from '../common/LanguageSelector';

interface NavbarProps {
  onOpenAiChat?: () => void;
  onOpenWizard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiChat, onOpenWizard }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const languageOptions = [
    { value: 'en' as const, label: t('language.en') },
    { value: 'si' as const, label: t('language.si') },
    { value: 'ta' as const, label: t('language.ta') },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/learn', label: t('nav.learn') },
    { to: '/get-help', label: t('nav.getHelp') },
    { to: '/assessment', label: t('nav.assessment') },
    { to: '/support-directory', label: t('nav.findSupport') },
    { to: '/awareness-hub', label: t('nav.awarenessHub') },
    { to: '/campaigns', label: t('nav.campaigns') },
    { to: '/statistics', label: t('nav.statistics') },
  ];

  return (
    <header
      className={`navbar-shell sticky top-0 z-40 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-[#eadfd7] bg-[#fffaf7]/95 shadow-[0_12px_30px_-22px_rgba(101,16,30,0.42)] backdrop-blur-xl'
          : 'border-[#eadfd7] bg-[#fffaf7]/92 shadow-[0_8px_24px_-20px_rgba(101,16,30,0.35)] backdrop-blur-lg'
      } ${
        location.pathname === '/'
          ? ''
          : ''
      }`}
    >
      <div className="mx-auto max-w-[1560px] px-3 sm:px-5 xl:px-6">
        <div className="flex h-[62px] items-center justify-between gap-3 px-0 sm:h-[68px] xl:h-[72px]">
          <Logo size="md" className="min-w-0" />

          <nav className="navbar-desktop-nav hidden items-center justify-center xl:flex" aria-label={t('nav.mainNavigation')}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `navbar-desktop-link relative whitespace-nowrap px-2.5 py-3 text-[12px] font-semibold ${
                    isActive
                      ? 'text-[#8B1E2D]'
                      : 'text-[#374151] hover:text-[#8B1E2D]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <LanguageSelector />
            <Link
              to="/learn"
              className="navbar-action inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e7d8cf] text-[#374151]"
              aria-label={t('nav.learn')}
              title={t('nav.learn')}
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              to="/donate"
              className="navbar-action inline-flex h-10 items-center gap-2 rounded-full border border-[#e2cdc3] px-3.5 text-xs font-bold text-[#65101E]"
            >
              <Heart className="h-3.5 w-3.5 text-[#8B1E2D]" />
              <span>{t('nav.donate')}</span>
            </Link>
            <button
              onClick={onOpenAiChat}
              className="navbar-ai inline-flex h-10 items-center gap-2 rounded-full bg-[#8B1E2D] px-4 text-xs font-bold text-white shadow-[0_8px_18px_-10px_rgba(139,30,45,0.75)]"
            >
              <Sparkles className="h-4 w-4" />
              <span>{t('nav.aiAssistant')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenAiChat}
              className="navbar-mobile-ai inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#8B1E2D] text-white"
              aria-label={t('nav.openChat')}
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
              className={`navbar-hamburger inline-flex h-10 w-10 items-center justify-center rounded-full border text-[#65101E] ${mobileMenuOpen ? 'border-[#D35D6E] bg-[#F6EDE6]' : 'border-[#e1d4cb]'}`}
              aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="navbar-mobile-panel max-h-[calc(100dvh-60px)] overflow-y-auto overscroll-contain border-t border-gold/15 bg-midnight/98 px-4 pb-6 pt-3 shadow-[0_24px_40px_-28px_rgba(216,190,130,0.55)] backdrop-blur-xl sm:max-h-[calc(100dvh-76px)] lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label={t('nav.mainNavigation')}>
            {navLinks.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{ '--navbar-delay': `${index * 32}ms` } as React.CSSProperties}
                className={({ isActive }) =>
                  `navbar-mobile-link flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? 'border border-gold/20 bg-gold/10 text-gold'
                      : 'text-ivory/85 hover:bg-charcoal/60 hover:text-gold'
                  }`
                }
              >
                <span>{link.label}</span>
                <ChevronRight className="h-4 w-4 text-gold/35" />
              </NavLink>
            ))}
          </nav>

          <div className="navbar-mobile-actions mx-auto mt-4 flex max-w-7xl flex-col gap-2.5 border-t border-ivory/10 pt-4">
            <div className="overflow-hidden rounded-xl border border-gold/20 bg-charcoal/50">
              <div className="flex min-h-12 items-center gap-2 px-4 text-sm text-ivory/80">
                <Languages className="h-4 w-4 text-gold" aria-hidden="true" />
                <span>{t('accessibility.language')}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 px-2 pb-2">
                {languageOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => setLanguage(option.value)}
                    aria-pressed={language === option.value}
                    className={`min-h-10 rounded-lg border text-xs font-semibold transition ${
                      language === option.value
                        ? 'border-gold/50 bg-gold/15 text-champagne'
                        : 'border-ivory/10 text-ivory/65 hover:border-gold/30 hover:text-gold'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>


            {onOpenWizard && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWizard();
                }}
                className="btn-charcoal flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
              >
                <Compass className="h-4 w-4 text-gold" />
                <span>{t('nav.launchWizard')}</span>
              </button>
            )}

            <Link
              to="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-charcoal flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-champagne"
            >
              <Heart className="h-4 w-4 text-gold" />
              <span>{t('nav.donate')}</span>
            </Link>

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-1.5 py-2.5 text-center text-xs text-ivory/60 transition-colors hover:text-gold"
            >
              <Shield className="h-3.5 w-3.5 text-gold/70" />
              <span>{t('nav.adminPortal')} ({t('nav.adminCrew')})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
