import React from 'react';
import { EmergencyGuidance } from '../../types/chat';
import { PhoneCall, ShieldAlert, HeartPulse, CheckCircle2, XCircle, AlertOctagon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface EmergencyResponseCardProps {
  guidance: EmergencyGuidance;
}

export const EmergencyResponseCard: React.FC<EmergencyResponseCardProps> = ({ guidance }) => {
  const { language } = useLanguage();

  return (
    <div className="my-3 overflow-hidden rounded-2xl border-2 border-red-500 bg-gradient-to-br from-red-950 via-midnight to-charcoal p-4 sm:p-6 shadow-2xl shadow-red-950/70 animate-fade-in">
      {/* Alert Header Banner */}
      <div className="flex items-start gap-3 border-b border-red-500/40 pb-3.5">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-600 border-2 border-white/80 text-white shadow-lg animate-pulse">
          <AlertOctagon className="h-6 w-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-red-600 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-white shadow-sm">
              EMERGENCY DETECTED
            </span>
            <span className="text-xs font-bold text-red-300">
              {language === 'si'
                ? 'ජීවිතාරක්ෂක හදිසි පියවර'
                : language === 'ta'
                ? 'உடனடி அவசர நெறிமுறை'
                : 'Immediate Life-Safety Protocol'}
            </span>
          </div>
          <h3 className="mt-1 font-heading text-base sm:text-lg font-bold text-white leading-snug">
            {language === 'si'
              ? 'ඔබේ මිතුරාට/රෝගියාට ක්ෂණික වෛද්‍ය ප්‍රතිකාර අවශ්‍ය විය හැක.'
              : language === 'ta'
              ? 'உங்கள் நண்பருக்கு உடனடி மருத்துவ உதவி தேவைப்படலாம்.'
              : 'Your friend may need immediate medical attention.'}
          </h3>
          <p className="mt-0.5 text-xs text-red-200/90 font-medium">
            {language === 'si'
              ? 'AI පිළිතුරු ලැබෙන තෙක් බලා නොසිටින්න. දැන්ම හදිසි වෛද්‍ය සහය ලබාගන්න.'
              : language === 'ta'
              ? 'AI பதிலுக்காகக் காத்திருக்க வேண்டாம். அவசர மருத்துவ உதவியை உடனே பெறுங்கள்.'
              : 'Do not wait for an AI response. Get emergency medical help now.'}
          </p>
        </div>
      </div>

      {/* Prominent CALL 1990 Button */}
      <div className="mt-4">
        <a
          href="tel:1990"
          className="group flex w-full items-center justify-center gap-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 active:scale-98 text-white font-black py-4 px-6 shadow-xl shadow-red-600/50 transition-all text-base sm:text-lg border-2 border-white/30"
          aria-label="Call 1990 Suwaseriya Ambulance"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-600 shadow-md group-hover:scale-110 transition-transform">
            <PhoneCall className="h-5 w-5 animate-bounce" />
          </div>
          <div className="text-left">
            <span className="block text-base sm:text-lg font-extrabold tracking-wide">
              {language === 'si' ? '1990 සුවසැරිය අමතන්න (නොමිලේ)' : language === 'ta' ? '1990 அவசர ஊர்தி (இலவசம்)' : 'CALL 1990 NOW'}
            </span>
            <span className="block text-[11px] font-normal text-white/90">
              {language === 'si' ? 'ශ්‍රී ලංකා ජාතික ගිලන්රථ සේවය' : 'Suwaseriya Free National Ambulance Service'}
            </span>
          </div>
        </a>
      </div>

      {/* Secondary hotlines */}
      <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {guidance.nddcbNumber && (
          <a
            href={`tel:${guidance.nddcbNumber}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-midnight/90 hover:bg-charcoal text-gold font-bold py-2.5 px-3 transition-all"
          >
            <HeartPulse className="h-4 w-4" />
            <span>Call 1927 (NDDCB Drug Helpline)</span>
          </a>
        )}
        {guidance.crisisNumber && (
          <a
            href={`tel:${guidance.crisisNumber}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-midnight/90 hover:bg-charcoal text-cyan-300 font-bold py-2.5 px-3 transition-all"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Call 1333 (CCC Crisis Support)</span>
          </a>
        )}
      </div>

      {/* Structured First-Aid Guidance */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
        {/* DO: Life-Saving First Aid */}
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3.5 space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-300 text-xs uppercase tracking-wider">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>
              {language === 'si'
                ? 'ක්ෂණික ප්‍රථමාධාර උපදෙස්'
                : language === 'ta'
                ? 'உடனடி முதலுதவி வழிகாட்டல்'
                : 'Immediate Safe First-Aid Guidance'}
            </span>
          </div>
          <ul className="space-y-2 text-emerald-100 text-xs leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400">1.</span>
              <span>
                <strong>Stay with the affected person:</strong> Do not leave them alone under any circumstances.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400">2.</span>
              <span>
                <strong>Check breathing:</strong> Check whether they are breathing normally. If not, call 1990 immediately and follow dispatcher instructions.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400">3.</span>
              <span>
                <strong>Recovery Position:</strong> If unconscious but breathing, place them gently on their side to keep their airway tilted and clear.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400">4.</span>
              <span>
                <strong>No delay:</strong> Do not delay calling emergency services to collect additional details.
              </span>
            </li>
          </ul>
        </div>

        {/* DO NOT: Critical Warnings */}
        <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-3.5 space-y-2">
          <div className="flex items-center gap-2 font-bold text-red-300 text-xs uppercase tracking-wider">
            <XCircle className="h-4 w-4 text-red-400" />
            <span>
              {language === 'si'
                ? 'කිසිසේත්ම නොකළ යුතු දෑ'
                : language === 'ta'
                ? 'செய்யக் கூடாதவை'
                : 'Critical Warnings — DO NOT DO'}
            </span>
          </div>
          <ul className="space-y-2 text-red-100 text-xs leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-bold text-red-400">✕</span>
              <span>
                <strong>DO NOT give food, water, or drinks:</strong> Giving liquids, coffee, milk, or medicines to an unconscious or drowsy person can cause fatal lung choking.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-red-400">✕</span>
              <span>
                <strong>DO NOT induce vomiting:</strong> Inducing vomiting poses an immediate life-threatening risk of airway aspiration.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-red-400">✕</span>
              <span>
                <strong>DO NOT give unverified antidotes:</strong> Only hospital paramedics can safely administer clinical medication.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Reassurance banner */}
      <div className="mt-3 pt-2.5 border-t border-red-500/30 flex items-center justify-between text-[11px] text-red-200/80">
        <span>In Sri Lanka, 1990 Suwaseriya paramedics prioritize medical care. You can call safely without fear.</span>
      </div>
    </div>
  );
};
