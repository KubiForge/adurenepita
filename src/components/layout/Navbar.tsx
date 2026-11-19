import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Menu, X, Heart, Shield, Compass, UserRound, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenAiChat?: () => void;
  onOpenWizard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiChat, onOpenWizard }) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
          ? 'border-gold/25 bg-midnight/95 shadow-[0_16px_36px_-24px_rgba(216,190,130,0.72)] backdrop-blur-xl'
          : 'border-gold/15 shadow-[0_12px_36px_-24px_rgba(216,190,130,0.5)]'
      } ${
        location.pathname === '/'
          ? isScrolled ? '' : 'bg-midnight/45 backdrop-blur-md'
          : isScrolled ? '' : 'bg-midnight/90 backdrop-blur-xl'
      }`}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[60px] items-center justify-between gap-2.5 px-0 sm:h-[76px] sm:gap-4">
          <Logo size="md" className="min-w-0" />

          <div className="hidden items-center gap-2.5 lg:flex">
            <Link
              to="/profile"
              className="navbar-action inline-flex items-center gap-1.5 rounded-full border border-gold/20 px-3 py-2 text-xs text-ivory/75"
            >
              <UserRound className="h-3.5 w-3.5" />
              <span>{t('nav.account')}</span>
            </Link>

            {onOpenWizard && (
              <button
                onClick={onOpenWizard}
                className="navbar-action hidden 2xl:inline-flex items-center gap-2 rounded-full border border-gold/25 bg-charcoal/50 px-3.5 py-2 text-xs font-medium text-ivory"
                title={t('nav.launchWizard')}
              >
                <Compass className="h-4 w-4 text-gold" />
                <span>{t('nav.launchWizard')}</span>
              </button>
            )}

            <Link
              to="/donate"
              className="navbar-action inline-flex items-center gap-2 rounded-full border border-gold/35 bg-charcoal/60 px-3.5 py-2 text-xs font-semibold text-champagne"
            >
              <Heart className="h-3.5 w-3.5 fill-gold/20 text-gold" />
              <span>{t('nav.donate')}</span>
            </Link>

            <button
              onClick={onOpenAiChat}
              className="navbar-ai btn-gold inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold shadow-gold-subtle"
            >
              <Sparkles className="h-4 w-4" />
              <span>{t('nav.aiAssistant')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAiChat}
              className="navbar-mobile-ai btn-gold inline-flex h-11 w-11 items-center justify-center rounded-full"
              aria-label={t('nav.openChat')}
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
              className={`navbar-hamburger inline-flex h-11 w-11 items-center justify-center rounded-full border text-ivory/80 ${mobileMenuOpen ? 'border-gold/60 bg-gold/10 text-gold' : 'border-gold/20'}`}
              aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav className="hidden h-12 items-center justify-center gap-1 border-t border-ivory/5 lg:flex" aria-label={t('nav.mainNavigation')}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `navbar-desktop-link relative rounded-full px-3 py-2 text-xs font-medium ${
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
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-ivory/80 hover:text-gold"
            >
              <UserRound className="h-4 w-4 text-gold" />
              <span>{t('nav.account')}</span>
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
