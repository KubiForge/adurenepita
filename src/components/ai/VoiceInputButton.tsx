import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { voiceService } from '../../services/voiceService';
import { useLanguage } from '../../context/LanguageContext';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  language?: 'si' | 'en' | 'ta';
  disabled?: boolean;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onTranscript,
  language = 'en',
  disabled = false,
}) => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  useEffect(() => {
    setIsSupported(voiceService.isSpeechRecognitionSupported());
  }, []);

  const handleToggleListening = () => {
    if (!isSupported) {
      setErrorNotice('Voice typing is not supported by your current browser.');
      setTimeout(() => setErrorNotice(null), 3000);
      return;
    }

    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      setErrorNotice(null);
      const started = voiceService.startListening({
        language,
        onStart: () => setIsListening(true),
        onResult: (transcript) => {
          onTranscript(transcript);
        },
        onError: (err) => {
          setIsListening(false);
          setErrorNotice(err);
          setTimeout(() => setErrorNotice(null), 4000);
        },
        onEnd: () => setIsListening(false),
      });

      if (!started) {
        setIsListening(false);
      }
    }
  };

  if (!isSupported) {
    return null; // Graceful degradation if Web Speech API is absent
  }

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleToggleListening}
        disabled={disabled}
        aria-label={isListening ? 'Stop voice recording' : 'Start voice input'}
        title={isListening ? 'Stop voice recording' : 'Voice input (Speech to Text)'}
        className={`relative p-2.5 rounded-xl border transition-all ${
          isListening
            ? 'bg-red-600/30 border-red-500 text-red-400 animate-pulse shadow-lg shadow-red-500/20'
            : 'bg-charcoal border-charcoal-light text-ivory/60 hover:text-gold hover:border-gold/40'
        } disabled:opacity-40`}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        {isListening && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        )}
      </button>

      {errorNotice && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-lg border border-amber-500/40 bg-midnight p-2 text-[10px] text-amber-300 shadow-xl flex items-center gap-1.5">
          <AlertCircle className="h-3 w-3 text-amber-400" />
          <span>{errorNotice}</span>
        </div>
      )}
    </div>
  );
};
