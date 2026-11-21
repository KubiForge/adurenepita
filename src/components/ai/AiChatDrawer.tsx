import React, { useState, useEffect, useRef } from 'react';
import { useSafety } from '../../context/SafetyContext';
import { ChatMessage, SourceCitation, ChatQuickAction } from '../../types/chat';
import { grokService } from '../../services/grokService';
import { voiceService } from '../../services/voiceService';
import { detectEmergency } from '../../services/emergencyDetector';
import { CONTACT_INFO } from '../../config/contactInfo';
import { EmergencyResponseCard } from './EmergencyResponseCard';
import { NearbyCentersCard } from './NearbyCentersCard';
import { LocationConsentModal } from './LocationConsentModal';
import { PrivacyInfoModal } from './PrivacyInfoModal';
import { VoiceInputButton } from './VoiceInputButton';
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  ShieldAlert,
  Compass,
  PhoneCall,
  Volume2,
  VolumeX,
  MapPin,
  Lock,
  Globe,
} from 'lucide-react';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

interface AiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWizard: () => void;
  initialMessage?: string;
}

export const AiChatDrawer: React.FC<AiChatDrawerProps> = ({
  isOpen,
  onClose,
  onOpenWizard,
  initialMessage,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { triggerSafetyInterruption } = useSafety();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<'si' | 'en' | 'ta'>(language);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setActiveLanguage(language);
  }, [language]);

  const getWelcomeMessage = (lang: 'si' | 'en' | 'ta'): string => {
    if (lang === 'si') {
      return `ආයුබෝවන්. මම AASHI, Beyond the Darkness හි නිල සුවතා සහ සහන සහායකයා.\n\nමත්ද්‍රව්‍ය භාවිතය, ඇබ්බැහිවීම්, පුනරුත්ථාපන සේවා හෝ හදිසි අනතුරු පිළිබඳව ඔබගේම වචනවලින් විමසන්න. මම සහය වීමට සූදානම්.`;
    }
    if (lang === 'ta') {
      return `வணக்கம். நான் AASHI, Beyond the Darkness இன் அதிகாரப்பூர்வ மீட்பு உதவியாளர்.\n\nபோதைப்பொருள் விழிப்புணர்வு, அடிமையாதல் மற்றும் மறுவாழ்வு மையங்கள் குறித்து எதையும் கேட்கலாம்.`;
    }
    return `Hello. I am AASHI, your recovery companion from Beyond the Darkness.\n\nAsk any question regarding substance concerns, addiction, recovery guidance, or finding certified support centres. How can I help you today?`;
  };

  const getInitialActions = (lang: 'si' | 'en' | 'ta'): ChatQuickAction[] => {
    if (lang === 'si') {
      return [
        { label: '🚨 හදිසි ආධාර (1990)', action: 'call', payload: '1990' },
        { label: '📍 ළඟම ප්‍රතිකාර මධ්‍යස්ථාන', action: 'location' },
        { label: '💊 අයිස් (ICE) තොරතුරු', action: 'chat', payload: 'අයිස් (ICE) මත්ද්‍රව්‍යයේ සෞඛ්‍ය අවදානම් මොනවාද?' },
        { label: '🧭 මඟපෙන්වූ Wizard', action: 'wizard' },
      ];
    }
    if (lang === 'ta') {
      return [
        { label: '🚨 அவசர உதவி (1990)', action: 'call', payload: '1990' },
        { label: '📍 அருகிலுள்ள மையங்கள்', action: 'location' },
        { label: '💊 போதைப்பொருள் தகவல்', action: 'chat', payload: 'போதைப்பொருள் பயன்பாட்டின் முக்கிய ஆபத்துகள் என்ன?' },
        { label: '🧭 வழிகாட்டி விஸார்ட்', action: 'wizard' },
      ];
    }
    return [
      { label: '🚨 Emergency (1990)', action: 'call', payload: '1990' },
      { label: '📍 Find Nearby Centers', action: 'location' },
      { label: '💊 ICE / Meth Risks', action: 'chat', payload: 'What are the risks and effects of Crystal Meth / ICE?' },
      { label: '🧭 Guided Wizard', action: 'wizard' },
    ];
  };

  // Initialize welcome message
  useEffect(() => {
    setInput('');
    setMessages([
      {
        id: 'msg-welcome-drawer',
        sender: 'assistant',
        content: getWelcomeMessage(activeLanguage),
        timestamp: new Date().toISOString(),
        safetyLevel: 1,
        suggestedQuickActions: getInitialActions(activeLanguage),
      },
    ]);
  }, [activeLanguage]);

  // Handle external prompt (e.g. from Guided Wizard handover)
  useEffect(() => {
    if (initialMessage && isOpen) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string, userLocation?: { latitude: number; longitude: number }) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      language: activeLanguage,
    };

    setInput('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // -------------------------------------------------------------------------
    // CRITICAL: DETERMINISTIC EMERGENCY OVERRIDE
    // Do NOT send to Gemini. Activate emergency response UI immediately.
    // -------------------------------------------------------------------------
    const emergencyCheck = detectEmergency(text, activeLanguage);
    if (emergencyCheck.isEmergency) {
      const emergencyResponse = grokService.buildEmergencyResponse(emergencyCheck, activeLanguage);

      const emergencyAiMsg: ChatMessage = {
        id: `asst-emerg-${Date.now()}`,
        sender: 'assistant',
        content: emergencyResponse.content,
        timestamp: new Date().toISOString(),
        safetyLevel: emergencyResponse.safetyLevel,
        safetyReason: emergencyResponse.safetyReason,
        emergencyData: emergencyResponse.emergencyData,
        suggestedQuickActions: emergencyResponse.suggestedQuickActions,
      };

      setMessages((prev) => [...prev, userMessage, emergencyAiMsg]);
      setIsLoading(false);

      triggerSafetyInterruption(
        emergencyResponse.safetyLevel,
        emergencyResponse.safetyReason || (emergencyResponse.safetyLevel === 4 ? t('emergency.reason.crisis') : t('emergency.reason.medical'))
      );
      return; // STOP: Bypasses Gemini network call entirely for emergencies
    }

    // Normal non-emergency flow
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await grokService.sendMessage({
        message: text,
        conversationHistory: messages,
        language: activeLanguage,
        userLocation,
      });

      if (response.safetyLevel >= 3) {
        triggerSafetyInterruption(
          response.safetyLevel,
          response.safetyReason || (response.safetyLevel === 4 ? t('emergency.reason.crisis') : t('emergency.reason.medical'))
        );
      }

      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        safetyLevel: response.safetyLevel,
        safetyReason: response.safetyReason,
        emergencyData: response.emergencyData,
        nearbyCenters: response.nearbyCenters,
        sources: response.sources,
        suggestedQuickActions: response.suggestedQuickActions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          content:
            activeLanguage === 'si'
              ? 'සම්බන්ධතාවයේ ගැටලුවක් මතු විය. හදිසි වෛද්‍ය ආධාර සඳහා 1990 අමතන්න.'
              : 'I could not connect to the recovery service. In an emergency, please call 1990 immediately.',
          timestamp: new Date().toISOString(),
          safetyLevel: 1,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSpeak = (id: string, text: string) => {
    if (speakingId === id) {
      voiceService.stopSpeaking();
      setSpeakingId(null);
    } else {
      voiceService.stopSpeaking();
      const started = voiceService.speakText(text, activeLanguage);
      if (started) {
        setSpeakingId(id);
        const checkDone = setInterval(() => {
          if (!voiceService.isSpeaking()) {
            setSpeakingId(null);
            clearInterval(checkDone);
          }
        }, 500);
      }
    }
  };

  const handleResetChat = () => {
    voiceService.stopSpeaking();
    setSpeakingId(null);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: getWelcomeMessage(activeLanguage),
        timestamp: new Date().toISOString(),
        safetyLevel: 1,
        suggestedQuickActions: getInitialActions(activeLanguage),
      },
    ]);
  };

  const handleLocationSelected = (location?: { latitude: number; longitude: number }, districtName?: string) => {
    if (location) {
      const prompt =
        activeLanguage === 'si'
          ? 'මගේ වත්මන් ස්ථානයට ආසන්නතම ප්‍රතිකාර මධ්‍යස්ථාන මොනවාද?'
          : 'Find verified treatment centres near my current location.';
      handleSendMessage(prompt, location);
    } else if (districtName) {
      const prompt =
        activeLanguage === 'si'
          ? `${districtName} දිස්ත්‍රික්කයේ ඇති ප්‍රතිකාර මධ්‍යස්ථාන මොනවාද?`
          : `Find verified rehabilitation centres in ${districtName} district.`;
      handleSendMessage(prompt);
    }
  };

  const handleQuickAction = (qa: ChatQuickAction) => {
    if (qa.action === 'wizard') {
      onClose();
      onOpenWizard();
    } else if (qa.action === 'call' && qa.payload) {
      window.location.href = `tel:${qa.payload}`;
    } else if (qa.action === 'location') {
      setIsLocationModalOpen(true);
    } else if (qa.payload) {
      handleSendMessage(qa.payload);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Surface */}
      <div className="relative z-10 flex h-full min-h-0 w-full max-w-xl flex-col border-l border-gold/30 bg-midnight pb-[env(safe-area-inset-bottom)] shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="p-3.5 sm:px-5 border-b border-charcoal-light bg-charcoal/90 backdrop-blur-md flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-gold-subtle flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="flex flex-wrap items-center gap-1.5 font-heading text-sm sm:text-base font-bold text-ivory">
                <span>AASHI Recovery Companion</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-midnight text-gold border border-gold/20 font-sans">
                  Grok AI
                </span>
              </h2>
              <p className="text-[11px] text-ivory/60 truncate">
                Beyond the Darkness • 100% Confidential
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Language Dropdown */}
            <select
              value={activeLanguage}
              onChange={(e) => {
                const newLang = e.target.value as 'si' | 'en' | 'ta';
                setActiveLanguage(newLang);
                setLanguage(newLang);
              }}
              className="bg-midnight border border-charcoal-light rounded-lg px-2 py-1 text-[11px] text-ivory focus:outline-none cursor-pointer"
              aria-label="Language selection"
            >
              <option value="en">English</option>
              <option value="si">සිංහල</option>
              <option value="ta">தமிழ்</option>
            </select>

            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="p-1.5 rounded-lg text-ivory/60 hover:text-gold hover:bg-charcoal-light transition-colors"
              title="Privacy Notice"
              aria-label="Privacy notice"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetChat}
              className="p-1.5 rounded-lg text-ivory/60 hover:text-gold hover:bg-charcoal-light transition-colors"
              title={t('chat.reset')}
              aria-label={t('chat.reset')}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-ivory/60 hover:text-gold hover:bg-charcoal-light transition-colors"
              aria-label={t('cta.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Guided Wizard Callout */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-charcoal-light bg-charcoal/60 px-4 py-2 text-xs">
          <span className="text-ivory/70 flex items-center gap-1.5 text-[11px]">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>Need a personalized step-by-step recommendation?</span>
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenWizard();
            }}
            className="text-gold font-semibold hover:underline text-[11px] flex items-center gap-1"
          >
            <span>{t('cta.startWizard')}</span>
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const hasEmergency = msg.emergencyData?.isEmergency || (msg.safetyLevel || 1) >= 3;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[94%] sm:max-w-[88%] min-w-0 break-words rounded-2xl p-3 sm:p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-gradient-to-r from-gold to-champagne text-midnight font-medium rounded-tr-none shadow-md'
                      : hasEmergency
                      ? 'bg-midnight border border-red-500/50 text-ivory rounded-tl-none shadow-md'
                      : msg.isError
                      ? 'bg-red-950/40 border border-red-500/30 text-red-200 rounded-tl-none'
                      : 'bg-charcoal border border-charcoal-light text-ivory rounded-tl-none shadow-sm'
                  }`}
                >
                  {/* Emergency Response Card */}
                  {!isUser && msg.emergencyData && (
                    <EmergencyResponseCard guidance={msg.emergencyData} />
                  )}

                  {/* Message Content */}
                  <div className="whitespace-pre-line leading-relaxed">{msg.content}</div>

                  {/* Nearby Centers Card */}
                  {!isUser && msg.nearbyCenters && msg.nearbyCenters.length > 0 && (
                    <NearbyCentersCard centers={msg.nearbyCenters} />
                  )}

                  {/* Sources Citations */}
                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-charcoal-light/60">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gold/80 block mb-1">
                        Verified Sources:
                      </span>
                      <div className="space-y-1">
                        {msg.sources.map((src) => (
                          <a
                            key={src.id}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-champagne hover:underline flex items-center gap-1.5 py-0.5"
                          >
                            <ExternalLink className="w-3 h-3 text-gold flex-shrink-0" />
                            <span>{src.title} ({src.organization})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions & Timestamp Bar */}
                  <div className="mt-2 pt-2 flex items-center justify-between text-[10px] text-ivory/40 border-t border-charcoal-light/40">
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>

                    {!isUser && (
                      <div className="flex items-center gap-2">
                        {/* Audio speak */}
                        <button
                          onClick={() => handleToggleSpeak(msg.id, msg.content)}
                          className={`hover:text-gold transition-colors ${speakingId === msg.id ? 'text-gold' : ''}`}
                          title="Read aloud"
                          aria-label="Read aloud"
                        >
                          {speakingId === msg.id ? (
                            <VolumeX className="w-3 h-3 text-gold" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                        </button>

                        {/* Copy */}
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-gold transition-colors"
                          title={t('chat.copy')}
                          aria-label="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Action Chips */}
                {!isUser && msg.suggestedQuickActions && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[94%]">
                    {msg.suggestedQuickActions.map((qa, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickAction(qa)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-charcoal hover:bg-gold/15 text-gold border border-gold/30 hover:border-gold transition-all text-left flex items-center gap-1"
                      >
                        {qa.action === 'call' && <PhoneCall className="w-3 h-3 text-red-400" />}
                        {qa.action === 'location' && <MapPin className="w-3 h-3" />}
                        {qa.action === 'wizard' && <Compass className="w-3 h-3" />}
                        <span>{qa.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-ivory/50 text-xs p-2.5 rounded-xl bg-charcoal/50 border border-charcoal-light w-fit">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
              <span>AASHI is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-charcoal-light bg-charcoal/80 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <div className="relative flex-1 rounded-xl border border-charcoal-light bg-midnight focus-within:border-gold transition-all">
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder={
                  activeLanguage === 'si'
                    ? 'ඔබේ ගැටලුව ලියන්න (Enter යවන්න)...'
                    : 'Ask AASHI anything confidentially...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                className="w-full resize-none bg-transparent px-3 py-2.5 text-xs sm:text-sm text-ivory placeholder:text-ivory/40 focus:outline-none max-h-32"
              />
            </div>

            {/* Voice input button */}
            <VoiceInputButton
              language={activeLanguage}
              onTranscript={(transcript) => {
                setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
              }}
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="gold"
              disabled={!input.trim() || isLoading}
              className="px-3.5 py-2.5 text-xs sm:text-sm"
              aria-label={t('chat.send')}
            >
              <Send className="w-4 h-4 text-midnight" />
            </Button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-ivory/40 px-1">
            <span>Not a doctor. Emergency? Call 1990 (Ambulance).</span>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="text-gold hover:underline flex items-center gap-0.5"
            >
              <MapPin className="w-2.5 h-2.5" />
              <span>Near Me</span>
            </button>
          </div>
        </div>
      </div>

      <LocationConsentModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelected={handleLocationSelected}
      />

      <PrivacyInfoModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};
