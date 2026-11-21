/**
 * Voice Service: Progressive enhancement for Speech-to-Text and Text-to-Speech
 * using standard Web Speech API (webkitSpeechRecognition & speechSynthesis).
 */

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export interface VoiceRecognitionOptions {
  language: 'si' | 'en' | 'ta';
  onStart?: () => void;
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

class VoiceService {
  private recognition: any = null;
  private isListening: boolean = false;
  private currentLanguage: string = 'en-US';

  isSpeechRecognitionSupported(): boolean {
    return typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  isSpeechSynthesisSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  getLanguageCode(lang: 'si' | 'en' | 'ta'): string {
    switch (lang) {
      case 'si':
        return 'si-LK';
      case 'ta':
        return 'ta-LK';
      case 'en':
      default:
        return 'en-US';
    }
  }

  startListening(options: VoiceRecognitionOptions): boolean {
    if (!this.isSpeechRecognitionSupported()) {
      options.onError?.('Speech recognition is not supported in this browser.');
      return false;
    }

    // If already listening, stop first
    if (this.isListening && this.recognition) {
      try {
        this.recognition.stop();
      } catch {}
    }

    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    try {
      this.recognition = new SpeechRecognitionConstructor();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = this.getLanguageCode(options.language);

      this.recognition.onstart = () => {
        this.isListening = true;
        options.onStart?.();
      };

      this.recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const text = finalTranscript || interimTranscript;
        if (text) {
          options.onResult(text);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn('[VoiceService] Recognition error:', event.error);
        this.isListening = false;
        options.onError?.(event.error === 'not-allowed' ? 'Microphone permission denied.' : event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        options.onEnd?.();
      };

      this.recognition.start();
      return true;
    } catch (err: any) {
      console.error('[VoiceService] Could not initialize speech recognition:', err);
      this.isListening = false;
      options.onError?.(err?.message || 'Failed to start microphone');
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListening = false;
    }
  }

  getIsListening(): boolean {
    return this.isListening;
  }

  /**
   * Reads text aloud using browser SpeechSynthesis with appropriate language voice
   */
  speakText(text: string, lang: 'si' | 'en' | 'ta'): boolean {
    if (!this.isSpeechSynthesisSupported()) return false;

    try {
      window.speechSynthesis.cancel(); // Stop any currently speaking audio

      // Strip markdown asterisks or special characters for cleaner speech
      const cleanedText = text
        .replace(/[*#_`>]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/https?:\/\/\S+/g, '')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = this.getLanguageCode(lang);
      utterance.rate = 0.95; // Slightly slower for clarity in recovery assistance
      utterance.pitch = 1.0;

      // Find an appropriate voice if available
      const voices = window.speechSynthesis.getVoices();
      const targetPrefix = lang === 'si' ? 'si' : lang === 'ta' ? 'ta' : 'en';
      const matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.warn('[VoiceService] Speech synthesis failed:', err);
      return false;
    }
  }

  stopSpeaking() {
    if (this.isSpeechSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  isSpeaking(): boolean {
    return this.isSpeechSynthesisSupported() && window.speechSynthesis.speaking;
  }
}

export const voiceService = new VoiceService();
