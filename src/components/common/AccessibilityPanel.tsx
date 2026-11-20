import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, Volume2, VolumeX, WifiOff } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

type TextSize = 'normal' | 'large';

interface AccessibilityPanelProps {
  onOpenAiChat?: () => void;
}

const readPreference = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn(`Accessibility preference "${key}" could not be read.`, error);
    return null;
  }
};

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ onOpenAiChat }) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>(
    () => readPreference('btd_text_size') === 'large' ? 'large' : 'normal'
  );
  const [highContrast, setHighContrast] = useState(
    () => readPreference('btd_high_contrast') === 'true'
  );
  const [easyRead, setEasyRead] = useState(
    () => readPreference('btd_easy_read') === 'true'
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechStatus, setSpeechStatus] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>('[data-dialog-close]')?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus();
      else triggerRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.textSize = textSize;
    root.dataset.highContrast = String(highContrast);
    root.dataset.easyRead = String(easyRead);
    try {
      window.localStorage.setItem('btd_text_size', textSize);
      window.localStorage.setItem('btd_high_contrast', String(highContrast));
      window.localStorage.setItem('btd_easy_read', String(easyRead));
    } catch (error) {
      console.warn('Accessibility preferences could not be saved.', error);
    }
  }, [textSize, highContrast, easyRead]);

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  const handleReadPage = () => {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setSpeechStatus(t('accessibility.speechUnavailable'));
      return;
    }

    const text = document.getElementById('main-content')?.innerText.replace(/\s+/g, ' ').trim();
    if (!text) {
      setSpeechStatus(t('accessibility.speechError'));
      return;
    }

    window.speechSynthesis.cancel();
    const words = text.split(' ');
    const chunks: string[] = [];
    let currentChunk = '';
    words.forEach((word) => {
      if (currentChunk.length + word.length > 1400 && currentChunk) {
        chunks.push(currentChunk);
        currentChunk = word;
      } else {
        currentChunk = currentChunk ? `${currentChunk} ${word}` : word;
      }
    });
    if (currentChunk) chunks.push(currentChunk);

    const speechLanguage = language === 'si' ? 'si-LK' : language === 'ta' ? 'ta-LK' : 'en-LK';
    setIsSpeaking(true);
    setSpeechStatus(t('accessibility.speechReading'));
    chunks.forEach((chunk, index) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = speechLanguage;
      utterance.onend = () => {
        if (index === chunks.length - 1) {
          setIsSpeaking(false);
          setSpeechStatus(t('accessibility.speechReady'));
        }
      };
      utterance.onerror = (event) => {
        if (event.error !== 'canceled') {
          setIsSpeaking(false);
          setSpeechStatus(t('accessibility.speechError'));
        }
      };
      window.speechSynthesis.speak(utterance);
    });
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSpeechStatus(t('accessibility.speechStopped'));
  };

  return createPortal(
    <>
      {isOpen && (
        <>
          <button
          type="button"
          className="fixed inset-0 z-[80] cursor-default bg-black/75 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
          aria-label={t('cta.close')}
          />
          <section
          ref={dialogRef}
          id="accessibility-settings"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-settings-title"
          tabIndex={-1}
          className="accessibility-dialog fixed left-1/2 top-1/2 z-[90] w-[min(28rem,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-3xl border border-gold/40 bg-[#151617] p-5 text-ivory shadow-[0_32px_100px_rgba(0,0,0,0.85)] sm:p-7"
          >
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-ivory/10 pb-4">
            <div>
              <h2 id="accessibility-settings-title" className="font-heading text-xl font-bold text-champagne">
                {t('accessibility.title')}
              </h2>
              <p className="mt-1 text-xs text-ivory/60">{t('accessibility.description')}</p>
            </div>
            <button
              type="button"
              data-dialog-close
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ivory/15 bg-charcoal text-lg text-ivory transition hover:border-gold/50 hover:bg-charcoal-light hover:text-champagne"
              aria-label={t('cta.close')}
            >
              ×
            </button>
          </div>

          <div className="space-y-5 text-sm">
            <fieldset>
              <legend className="mb-2 text-xs font-semibold text-ivory/75">
                {t('accessibility.textSize')}
              </legend>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  aria-pressed={textSize === 'normal'}
                  onClick={() => setTextSize('normal')}
                  className={`min-h-11 rounded-xl border px-3 text-xs font-semibold transition-colors ${
                    textSize === 'normal' ? 'border-gold bg-gold/15 text-champagne' : 'border-charcoal-light bg-[#1d1e20] text-ivory/75 hover:border-gold/40'
                  }`}
                >
                  {t('accessibility.normal')}
                </button>
                <button
                  type="button"
                  aria-pressed={textSize === 'large'}
                  onClick={() => setTextSize('large')}
                  className={`min-h-11 rounded-xl border px-3 text-xs font-semibold transition-colors ${
                    textSize === 'large' ? 'border-gold bg-gold/15 text-champagne' : 'border-charcoal-light bg-[#1d1e20] text-ivory/75 hover:border-gold/40'
                  }`}
                >
                  {t('accessibility.large')}
                </button>
              </div>
            </fieldset>

            <div className="space-y-2">
              <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-charcoal-light bg-[#1d1e20] px-3 transition-colors hover:border-gold/35">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(event) => setHighContrast(event.currentTarget.checked)}
                  className="h-4 w-4 accent-yellow-300"
                />
                <span>{t('accessibility.highContrast')}</span>
              </label>

              <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-charcoal-light bg-[#1d1e20] px-3 transition-colors hover:border-gold/35">
                <input
                  type="checkbox"
                  checked={easyRead}
                  onChange={(event) => setEasyRead(event.currentTarget.checked)}
                  className="h-4 w-4 accent-yellow-300"
                />
                <span>{t('accessibility.easyRead')}</span>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={isSpeaking ? stopReading : handleReadPage}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gold/35 bg-[#1d1e20] px-3 text-xs font-semibold text-champagne transition-colors hover:border-gold/60 hover:bg-gold/10"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
                {isSpeaking ? t('accessibility.stop') : t('accessibility.listen')}
              </button>
              <a
                href="/offline-emergency.html"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-red-300/45 bg-[#211819] px-3 text-center text-xs font-semibold text-red-100 transition-colors hover:border-red-200/70 hover:bg-red-950/60"
              >
                <WifiOff className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t('emergency.offline')}
              </a>
            </div>

            <p role="status" aria-live="polite" className="min-h-4 text-[11px] text-gold">
              {speechStatus}
            </p>
          </div>
          </section>
        </>
      )}

      <div className="accessibility-panel fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-[70] sm:bottom-6 sm:right-6">
        <div
          role="group"
          aria-label={t('accessibility.title')}
          className="inline-flex items-center rounded-full border border-gold/35 bg-[#151617] p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
        >
          {onOpenAiChat && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onOpenAiChat();
            }}
            aria-label={t('cta.talkToAi')}
            title={t('cta.talkToAi')}
            className="group relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-[#252628]/95 text-champagne shadow-[0_14px_36px_rgba(0,0,0,0.55),0_0_24px_rgba(216,190,130,0.12)] backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:border-gold/60 hover:bg-gold/15 hover:shadow-[0_18px_40px_rgba(0,0,0,0.6),0_0_26px_rgba(216,190,130,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:scale-95"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-lg border border-gold/20 bg-midnight px-3 py-1.5 text-xs font-semibold text-ivory opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {t('cta.talkToAi')}
            </span>
          </button>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};
