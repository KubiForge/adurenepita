import React from 'react';
import { Shield, Lock, EyeOff, Trash2, X, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PrivacyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyInfoModal: React.FC<PrivacyInfoModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-gold/40 bg-midnight p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-ivory/60 hover:text-gold hover:bg-charcoal transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 border-b border-charcoal-light pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 border border-gold/30 text-gold">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-ivory">
              {language === 'si'
                ? 'පෞද්ගලිකත්වය හා දත්ත ආරක්ෂාව'
                : language === 'ta'
                ? 'தனியுரிமை மற்றும் தரவுப் பாதுகாப்பு'
                : 'AASHI Privacy & Data Protection'}
            </h3>
            <p className="text-[11px] text-ivory/60">
              Beyond the Darkness • Human Safety First
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3.5 text-xs sm:text-sm text-ivory/80 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <EyeOff className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-ivory block font-semibold">
                {language === 'si' ? 'ගිණුමක් හෝ ලියාපදිංචියක් අවශ්‍ය නොවේ' : '100% Anonymous — No Account Required'}
              </strong>
              <span>
                {language === 'si'
                  ? 'AASHI සහායකයා භාවිතා කිරීමට ඔබගේ නම, දුරකථන අංකය හෝ විද්‍යුත් ලිපිනය ලබාදීම කිසිසේත්ම අවශ්‍ය නොවේ.'
                  : 'You do not need to register, log in, or provide your real name, email, or phone number to talk with AASHI.'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Trash2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-ivory block font-semibold">
                {language === 'si' ? 'තාවකාලික මතකය (Ephemeral Session)' : 'Session Memory & Instant Wipe'}
              </strong>
              <span>
                {language === 'si'
                  ? 'ඔබේ සංවාදය රඳවා තබාගන්නේ ඔබ බ්‍රවුසරයේ රැඳී සිටින කාලය තුළ පමණි. "Reset Conversation" ක්ලික් කිරීමෙන් සංවාද ඉතිහාසය වහාම මකා දැමිය හැක.'
                  : 'Your conversation history is stored strictly in your browser tab’s temporary memory. Clearing the chat or closing your browser erases it immediately.'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Shield className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-ivory block font-semibold">
                {language === 'si' ? 'දත්ත තෙවන පාර්ශවයකට බෙදා නොගැනීම' : 'Zero Data Sharing with Authorities or Police'}
              </strong>
              <span>
                {language === 'si'
                  ? 'Beyond the Darkness යනු විශ්වවිද්‍යාලයීය මානුෂීය ප්‍රජා ව්‍යාපෘතියකි. අපි කිසි විටෙකත් ඔබේ සංවාද තොරතුරු පොලිසියට, සේවායෝජකයන්ට හෝ තෙවන පාර්ශවයන්ට ලබා නොදෙමු.'
                  : 'We never share conversation logs, user queries, or identities with police, law enforcement, employers, or advertisers.'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-ivory block font-semibold">
                {language === 'si' ? 'ආරක්ෂිත තාක්ෂණික සැලසුම' : 'Serverless AI & Secret Isolation'}
              </strong>
              <span>
                {language === 'si'
                  ? 'Grok AI API යතුර Vercel ආරක්ෂිත සේවාදායකයේ පමණක් ක්‍රියාත්මක වන අතර කිසිවිටෙකත් වෙබ් අඩවියේ කේතය තුළ අනාවරණය නොවේ.'
                  : 'All AI requests are handled via secure HTTPS Vercel serverless functions. The Grok API key is never exposed to the client browser.'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-charcoal-light flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-gold hover:bg-champagne text-midnight font-bold px-5 py-2 text-xs transition-colors"
          >
            {language === 'si' ? 'තේරුම් ගත්තා' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
