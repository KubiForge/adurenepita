import React, { useEffect, useState } from 'react';
import { Accessibility, Volume2, VolumeX, WifiOff } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

type TextSize = 'normal' | 'large';

const readPreference = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn(`Accessibility preference "${key}" could not be read.`, error);
    return null;
  }
};

export const AccessibilityPanel: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
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

  const handleLanguageChange = (value: string) => {
    if (value === 'en' || value === 'si' || value === 'ta') {
      setLanguage(value);
    }
  };

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

  return (
    <div className="accessibility-panel fixed bottom-5 left-4 z-40 sm:bottom-6 sm:left-6">
      {isOpen && (
        <section
          id="accessibility-settings"
          aria-labelledby="accessibility-settings-title"
          className="mb-3 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-gold/35 bg-midnight p-4 text-ivory shadow-2xl"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="accessibility-settings-title" className="font-heading text-lg font-bold">
              {t('accessibility.title')}
            </h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-2 py-1 text-sm text-ivory/70 hover:bg-charcoal"
              aria-label={t('cta.close')}
            >
              ×
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <label htmlFor="accessibility-language" className="mb-1 block text-xs font-semibold text-ivory/75">
                {t('accessibility.language')}
              </label>
              <select
                id="accessibility-language"
                value={language}
                onChange={(event) => handleLanguageChange(event.currentTarget.value)}
                className="min-h-11 w-full rounded-lg border border-charcoal-light bg-charcoal px-3 text-ivory focus-visible:outline"
              >
                <option value="en">English</option>
                <option value="si">සිංහල</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold text-ivory/75">
                {t('accessibility.textSize')}
              </legend>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  aria-pressed={textSize === 'normal'}
                  onClick={() => setTextSize('normal')}
                  className={`min-h-11 rounded-lg border px-3 text-xs font-semibold ${
                    textSize === 'normal' ? 'border-gold bg-gold/15 text-champagne' : 'border-charcoal-light text-ivory/75'
                  }`}
                >
                  {t('accessibility.normal')}
                </button>
                <button
                  type="button"
                  aria-pressed={textSize === 'large'}
                  onClick={() => setTextSize('large')}
                  className={`min-h-11 rounded-lg border px-3 text-xs font-semibold ${
                    textSize === 'large' ? 'border-gold bg-gold/15 text-champagne' : 'border-charcoal-light text-ivory/75'
                  }`}
                >
                  {t('accessibility.large')}
                </button>
              </div>
            </fieldset>

            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-charcoal-light px-3">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(event) => setHighContrast(event.currentTarget.checked)}
                className="h-4 w-4 accent-yellow-300"
              />
              <span>{t('accessibility.highContrast')}</span>
            </label>

            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-charcoal-light px-3">
              <input
                type="checkbox"
                checked={easyRead}
                onChange={(event) => setEasyRead(event.currentTarget.checked)}
                className="h-4 w-4 accent-yellow-300"
              />
              <span>{t('accessibility.easyRead')}</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={isSpeaking ? stopReading : handleReadPage}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gold/35 px-3 text-xs font-semibold text-champagne hover:bg-gold/10"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
                {isSpeaking ? t('accessibility.stop') : t('accessibility.listen')}
              </button>
              <a
                href="/offline-emergency.html"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-300/40 px-3 text-center text-xs font-semibold text-red-100 hover:bg-red-950/60"
              >
                <WifiOff className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t('emergency.offline')}
              </a>
            </div>

            <p className="text-[11px] leading-relaxed text-ivory/55">
              {t('accessibility.translationNotice')}
            </p>
            <p role="status" aria-live="polite" className="min-h-4 text-[11px] text-gold">
              {speechStatus}
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t('accessibility.open')}
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'accessibility-settings' : undefined}
        className="inline-flex min-h-12 items-center gap-2 rounded-full border border-gold/60 bg-midnight px-4 text-sm font-bold text-ivory shadow-xl hover:bg-charcoal focus-visible:outline"
      >
        <Accessibility className="h-5 w-5 text-gold" aria-hidden="true" />
        <span className="hidden sm:inline">{t('accessibility.title')}</span>
      </button>
    </div>
  );
};
