import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Menu, X, Heart, Shield, Compass, UserRound } from 'lucide-react';

interface NavbarProps {
  onOpenAiChat?: () => void;
  onOpenWizard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiChat, onOpenWizard }) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/learn', label: t('nav.learn') },
    { to: '/get-help', label: t('nav.getHelp') },
    { to: '/assessment', label: 'Assessment' },
    { to: '/support-directory', label: t('nav.findSupport') },
    { to: '/awareness-hub', label: t('nav.awarenessHub') },
    { to: '/campaigns', label: t('nav.campaigns') },
    { to: '/statistics', label: t('nav.statistics') },
  ];

  return (
    <header
      className={`sticky top-0 z-40 border-b border-gold/15 shadow-[0_12px_36px_-24px_rgba(216,190,130,0.5)] ${
        location.pathname === '/'
          ? 'bg-midnight/45 backdrop-blur-md'
          : 'bg-midnight/90 backdrop-blur-xl'
      }`}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[64px] items-center justify-between gap-3 sm:h-[76px] sm:gap-4">
          <Logo size="md" className="min-w-0" />

          <div className="hidden items-center gap-2.5 lg:flex">
            <Link
              to="/profile"
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 px-3 py-2 text-xs text-ivory/75 hover:border-gold/50 hover:text-gold"
            >
              <UserRound className="h-3.5 w-3.5" />
              <span>Account</span>
            </Link>

            {onOpenWizard && (
              <button
                onClick={onOpenWizard}
                className="hidden 2xl:inline-flex items-center gap-2 rounded-full border border-gold/25 bg-charcoal/50 px-3.5 py-2 text-xs font-medium text-ivory transition hover:border-gold/60 hover:bg-charcoal"
                title="Guided Step-by-Step Navigation"
              >
                <Compass className="h-4 w-4 text-gold" />
                <span>Creative Wizard</span>
              </button>
            )}

            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-charcoal/60 px-3.5 py-2 text-xs font-semibold text-champagne transition hover:border-gold/70 hover:bg-charcoal"
            >
              <Heart className="h-3.5 w-3.5 fill-gold/20 text-gold" />
              <span>{t('nav.donate')}</span>
            </Link>

            <button
              onClick={onOpenAiChat}
              className="btn-gold inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold shadow-gold-subtle"
            >
              <Sparkles className="h-4 w-4" />
              <span>{t('nav.aiAssistant')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAiChat}
              className="btn-gold rounded-full p-2.5"
              aria-label="Open AI Assistant"
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
              className="rounded-full border border-gold/20 p-2 text-ivory/80 transition hover:border-gold/50 hover:bg-charcoal hover:text-gold"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav className="hidden h-12 items-center justify-center gap-1 border-t border-ivory/5 lg:flex" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-gold/10 text-gold'
                    : 'text-ivory/70 hover:bg-ivory/5 hover:text-ivory'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain border-t border-gold/15 bg-midnight/98 px-4 pb-6 pt-3 backdrop-blur-xl sm:max-h-[calc(100dvh-76px)] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border border-gold/20 bg-gold/10 text-gold'
                      : 'text-ivory/85 hover:bg-charcoal/60 hover:text-gold'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-2.5 border-t border-ivory/10 pt-4">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-ivory/80 hover:text-gold"
            >
              <UserRound className="h-4 w-4 text-gold" />
              <span>Account</span>
            </Link>
            {onOpenWizard && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWizard();
                }}
                className="btn-charcoal flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
              >
                <Compass className="h-4 w-4 text-gold" />
                <span>Launch Creative Wizard</span>
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
              <span>{t('nav.adminPortal')} (Admin & Technical Crew)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
