import React, { useState, useEffect, useRef } from 'react';
import { useSafety } from '../context/SafetyContext';
import { ChatMessage, SourceCitation, ChatQuickAction } from '../types/chat';
import { grokService } from '../services/grokService';
import { voiceService } from '../services/voiceService';
import { detectEmergency } from '../services/emergencyDetector';
import { ASSETS } from '../config/assets';
import { CONTACT_INFO } from '../config/contactInfo';
import { useLanguage } from '../context/LanguageContext';
import { EmergencyResponseCard } from '../components/ai/EmergencyResponseCard';
import { NearbyCentersCard } from '../components/ai/NearbyCentersCard';
import { LocationConsentModal } from '../components/ai/LocationConsentModal';
import { PrivacyInfoModal } from '../components/ai/PrivacyInfoModal';
import { VoiceInputButton } from '../components/ai/VoiceInputButton';
import {
  Sparkles,
  Send,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  Compass,
  PhoneCall,
  BookOpen,
  MapPin,
  Heart,
  Lock,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AssistantPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { triggerSafetyInterruption, openEmergencyModal } = useSafety();
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<'si' | 'en' | 'ta'>(language);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync active language when context language changes
  useEffect(() => {
    setActiveLanguage(language);
  }, [language]);

  const getWelcomeContent = (lang: 'si' | 'en' | 'ta'): string => {
    if (lang === 'si') {
      return `ආයුබෝවන්. මම AASHI, Beyond the Darkness හි නිල සුවතා සහ සහන සහායකයා.\n\nමත්ද්‍රව්‍ය භාවිතය, ඇබ්බැහිවීම්, පුනරුත්ථාපන සේවා හෝ හදිසි අනතුරු පිළිබඳව ඔබගේම වචනවලින් මා සමඟ කතා කළ හැකිය. මම කිසිදු විනිශ්චයකින් තොරව, පූර්ණ රහස්‍යභාවයෙන් ඔබට මඟපෙන්වීමට සූදානම්.\n\nකරුණාකර සලකන්න: මම AI සහායකයෙකු වන අතර වෛද්‍යවරයෙකු හෝ හදිසි ප්‍රතිකාර සේවාවක් නොවේ.`;
    }
    if (lang === 'ta') {
      return `வணக்கம். நான் AASHI, Beyond the Darkness இன் அதிகாரப்பூர்வ மீட்பு உதவியாளர்.\n\nபோதைப்பொருள் விழிப்புணர்வு, அடிமையாதல், மறுவாழ்வு மையங்கள் அல்லது அவசர உதவி குறித்து உங்களுடைய சொந்த வார்த்தைகளில் கேட்கலாம். எந்தவித தீர்ப்பும் இன்றி உங்களுக்கு உதவ தயாராக உள்ளேன்.\n\nகுறிப்பு: நான் தானியங்கி உதவியாளர் மட்டுமே; மருத்துவர் அல்ல.`;
    }
    return `Hello. I am AASHI, the official recovery companion of Beyond the Darkness.\n\nYou can speak openly in your own words about substance concerns, addiction, recovery, supporting a friend, or finding nearby treatment centres. I am here to guide you with compassion, dignity, and zero judgment.\n\nPlease note: I am an AI assistant and not a medical doctor or emergency service.`;
  };

  const getInitialQuickActions = (lang: 'si' | 'en' | 'ta'): ChatQuickAction[] => {
    if (lang === 'si') {
      return [
        { label: '🚨 හදිසි ආධාර (1990)', action: 'call', payload: '1990' },
        { label: '📍 ළඟම ප්‍රතිකාර මධ්‍යස්ථාන', action: 'location' },
        { label: '💊 මත්ද්‍රව්‍ය තොරතුරු (ICE / අයිස්)', action: 'chat', payload: 'අයිස් (ICE / Meth) මත්ද්‍රව්‍යයේ සෞඛ්‍ය අවදානම් මොනවාද?' },
        { label: '🌱 ඇබ්බැහිවීමෙන් මිදෙන්නේ කෙසේද?', action: 'chat', payload: 'මත්ද්‍රව්‍ය භාවිතයෙන් ආරක්ෂිතව මිදෙන්නේ කෙසේද?' },
        { label: '🤝 මිතුරෙකුට උදව් කරන්නේ කෙසේද?', action: 'chat', payload: 'මගේ මිතුරෙකු මත්ද්‍රව්‍ය ගන්නවා, මම කොහොමද උදව් කරන්නේ?' },
      ];
    }
    if (lang === 'ta') {
      return [
        { label: '🚨 அவசர உதவி (1990)', action: 'call', payload: '1990' },
        { label: '📍 அருகிலுள்ள மையங்கள்', action: 'location' },
        { label: '💊 போதைப்பொருள் ஆபத்துகள்', action: 'chat', payload: 'போதைப்பொருள் பயன்பாட்டின் முக்கிய ஆபத்துகள் என்ன?' },
        { label: '🌱 மீட்பு வழிகாட்டல்', action: 'chat', payload: 'போதைப்பழக்கத்திலிருந்து விடுபடுவது எப்படி?' },
        { label: '🤝 நண்பருக்கு உதவுவது எப்படி?', action: 'chat', payload: 'போதைப்பொருளுக்கு அடிமையான நண்பருக்கு எப்படி உதவுவது?' },
      ];
    }
    return [
      { label: '🚨 Emergency Help (1990)', action: 'call', payload: '1990' },
      { label: '📍 Find Nearby Help', action: 'location' },
      { label: '💊 Drug Information (ICE)', action: 'chat', payload: 'What are the health risks and effects of Crystal Meth / ICE?' },
      { label: '🌱 Recovery Support', action: 'chat', payload: 'How can someone safely begin addiction recovery?' },
      { label: '🤝 Help a Friend or Family', action: 'chat', payload: 'How can I support a friend or family member struggling with substance use?' },
    ];
  };

  // Initialize or reset welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: 'msg-welcome-aashi',
        sender: 'assistant',
        content: getWelcomeContent(activeLanguage),
        timestamp: new Date().toISOString(),
        safetyLevel: 1,
        suggestedQuickActions: getInitialQuickActions(activeLanguage),
      },
    ]);
  }, [activeLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customPrompt?: string, userLocation?: { latitude: number; longitude: number }) => {
    const text = (customPrompt || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      language: activeLanguage,
    };

    setInput('');
    setLastFailedMessage(null);

    // Auto resize textarea back to single row
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // -------------------------------------------------------------------------
    // CRITICAL: DETERMINISTIC EMERGENCY OVERRIDE LAYER
    // Do NOT send the message to Gemini.
    // Immediately activate the emergency response UI without waiting for network.
    // -------------------------------------------------------------------------
    const emergencyCheck = detectEmergency(text, activeLanguage);
    if (emergencyCheck.isEmergency) {
      const emergencyResponse = grokService.buildEmergencyResponse(emergencyCheck, activeLanguage);

      const emergencyAiMsg: ChatMessage = {
        id: `ai-emerg-${Date.now()}`,
        sender: 'assistant',
        content: emergencyResponse.content,
        timestamp: new Date().toISOString(),
        language: emergencyResponse.language || activeLanguage,
        safetyLevel: emergencyResponse.safetyLevel,
        safetyReason: emergencyResponse.safetyReason,
        emergencyData: emergencyResponse.emergencyData,
        suggestedQuickActions: emergencyResponse.suggestedQuickActions,
      };

      setMessages((prev) => [...prev, userMsg, emergencyAiMsg]);
      setIsLoading(false);

      triggerSafetyInterruption(
        emergencyResponse.safetyLevel,
        emergencyResponse.safetyReason || (emergencyResponse.safetyLevel === 4 ? t('emergency.reason.crisis') : t('emergency.reason.medical'))
      );
      return; // STOP: Normal AI flow is bypassed completely for emergencies!
    }

    // -------------------------------------------------------------------------
    // Normal Non-Emergency AI Flow
    // -------------------------------------------------------------------------
    setMessages((prev) => [...prev, userMsg]);
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

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        language: response.language || activeLanguage,
        safetyLevel: response.safetyLevel,
        safetyReason: response.safetyReason,
        emergencyData: response.emergencyData,
        nearbyCenters: response.nearbyCenters,
        sources: response.sources,
        suggestedQuickActions: response.suggestedQuickActions,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setLastFailedMessage(text);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          content:
            activeLanguage === 'si'
              ? `සම්බන්ධතාවයේ බාධාවක් ඇතිවිය. හදිසි වෛද්‍ය ආධාර සඳහා 1990 සුවසැරිය අමතන්න. රහසිගත උපදේශන සඳහා NDDCB 1927 අමතන්න.`
              : activeLanguage === 'ta'
              ? `இணைப்பில் பிழை ஏற்பட்டது. அவசர சிகிச்சைக்கு 1990 ஐயும், ஆலோசனைக்கு 1927 ஐயும் அழைக்கவும்.`
              : `I could not complete your request. For urgent medical danger, call 1990 (Ambulance); for substance counseling, call 1927 (NDDCB).`,
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

  const handleToggleSpeak = (id: string, text: string, lang?: 'si' | 'en' | 'ta') => {
    if (speakingId === id) {
      voiceService.stopSpeaking();
      setSpeakingId(null);
    } else {
      voiceService.stopSpeaking();
      const started = voiceService.speakText(text, lang || activeLanguage);
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

  const handleReset = () => {
    voiceService.stopSpeaking();
    setSpeakingId(null);
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'assistant',
        content: getWelcomeContent(activeLanguage),
        timestamp: new Date().toISOString(),
        safetyLevel: 1,
        suggestedQuickActions: getInitialQuickActions(activeLanguage),
      },
    ]);
  };

  const handleLocationSelected = (location?: { latitude: number; longitude: number }, districtName?: string) => {
    if (location) {
      const prompt =
        activeLanguage === 'si'
          ? 'මගේ වත්මන් ස්ථානයට ආසන්නතම ප්‍රතිකාර මධ්‍යස්ථාන සහ රෝහල් මොනවාද?'
          : activeLanguage === 'ta'
          ? 'என் இருப்பிடத்திற்கு அருகிலுள்ள சிகிச்சை மையங்களைக் கண்டறியவும்'
          : 'Find verified rehabilitation centres and hospital psychiatric clinics near my current location.';
      handleSend(prompt, location);
    } else if (districtName) {
      const prompt =
        activeLanguage === 'si'
          ? `${districtName} දිස්ත්‍රික්කයේ ඇති ප්‍රතිකාර මධ්‍යස්ථාන මොනවාද?`
          : activeLanguage === 'ta'
          ? `${districtName} மாவட்டத்தில் உள்ள சிகிச்சை மையங்கள் யாவை?`
          : `Find verified rehabilitation centres and support facilities in ${districtName} district.`;
      handleSend(prompt);
    }
  };

  const handleQuickAction = (qa: ChatQuickAction) => {
    if (qa.action === 'call' && qa.payload) {
      window.location.href = `tel:${qa.payload}`;
    } else if (qa.action === 'location') {
      setIsLocationModalOpen(true);
    } else if (qa.action === 'wizard') {
      navigate('/wizard');
    } else if (qa.action === 'navigate' && qa.payload) {
      navigate(qa.payload);
    } else if (qa.payload) {
      handleSend(qa.payload);
    }
  };

  // Auto-grow textarea input
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto min-w-0 w-full max-w-5xl space-y-4 px-3 py-4 sm:space-y-5 sm:px-6 sm:py-6 lg:px-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-charcoal-light pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold/50 shadow-gold-subtle flex-shrink-0 bg-midnight">
            <img src={ASSETS.logoIcon} alt="AASHI AI Recovery Companion" className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-midnight"></span>
          </div>
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h1 className="min-w-0 break-words text-lg sm:text-xl font-bold font-heading text-ivory">
                AASHI — Recovery Companion
              </h1>
              <span className="shrink-0 rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                Beyond the Darkness
              </span>
            </div>
            <p className="text-xs text-ivory/60 mt-0.5 flex items-center gap-1.5">
              <span>Compassionate • Evidence-Based • 100% Confidential</span>
            </p>
          </div>
        </div>

        {/* Language selector & Header Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {/* Language Selector Dropdown */}
          <div className="relative flex items-center rounded-xl border border-charcoal-light bg-charcoal/80 px-2.5 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-gold mr-1.5" />
            <select
              value={activeLanguage}
              onChange={(e) => {
                const newLang = e.target.value as 'si' | 'en' | 'ta';
                setActiveLanguage(newLang);
                setLanguage(newLang);
              }}
              className="bg-transparent text-xs text-ivory focus:outline-none cursor-pointer pr-1"
              aria-label="Select conversation language"
            >
              <option value="en" className="bg-midnight text-ivory">English</option>
              <option value="si" className="bg-midnight text-ivory">සිංහල (Sinhala)</option>
              <option value="ta" className="bg-midnight text-ivory">தமிழ் (Tamil)</option>
            </select>
          </div>

          {/* Privacy Button */}
          <button
            onClick={() => setIsPrivacyModalOpen(true)}
            className="p-2 rounded-xl bg-charcoal/80 border border-charcoal-light text-ivory/60 hover:text-gold transition-colors"
            title="Privacy & Data Protection"
            aria-label="View privacy information"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Reset Conversation Button */}
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-charcoal/80 border border-charcoal-light text-ivory/60 hover:text-gold transition-colors"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="charcoal-card flex h-[min(650px,calc(100dvh-12rem))] min-h-[22rem] min-w-0 flex-col overflow-hidden border border-gold/30 shadow-2xl rounded-2xl bg-midnight/95">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const hasEmergency = msg.emergencyData?.isEmergency || (msg.safetyLevel || 1) >= 3;

            return (
              <div
                key={msg.id}
                className={`flex min-w-0 gap-2.5 sm:gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0 mt-1 shadow-gold-subtle">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`min-w-0 max-w-full break-words p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                    isUser
                      ? 'bg-gradient-to-r from-gold to-champagne text-midnight font-medium rounded-tr-none shadow-gold-subtle'
                      : hasEmergency
                      ? 'bg-midnight border border-red-500/50 text-ivory rounded-tl-none shadow-lg'
                      : msg.isError
                      ? 'bg-red-950/40 border border-red-500/30 text-red-200 rounded-tl-none'
                      : 'bg-charcoal/90 text-ivory/95 border border-charcoal-light rounded-tl-none shadow-md'
                  }`}
                >
                  {/* Emergency Response Card if emergency detected */}
                  {!isUser && msg.emergencyData && (
                    <EmergencyResponseCard guidance={msg.emergencyData} />
                  )}

                  {/* Text Message Content */}
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>

                  {/* Nearby Support Centers Card if present */}
                  {!isUser && msg.nearbyCenters && msg.nearbyCenters.length > 0 && (
                    <NearbyCentersCard centers={msg.nearbyCenters} />
                  )}

                  {/* Verified Sources citation */}
                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="pt-2 border-t border-charcoal-light/60 text-[11px] space-y-1">
                      <span className="text-gold font-bold uppercase tracking-wider block">
                        Verified Evidence Sources:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((s, idx) => (
                          <a
                            key={idx}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-champagne hover:text-gold underline"
                          >
                            <span>{s.title} ({s.organization})</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested quick action buttons */}
                  {!isUser && msg.suggestedQuickActions && msg.suggestedQuickActions.length > 0 && (
                    <div className="pt-2 border-t border-charcoal-light/60 flex flex-wrap gap-1.5">
                      {msg.suggestedQuickActions.map((qa, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickAction(qa)}
                          className="px-3 py-1.5 rounded-lg bg-midnight/90 border border-gold/30 hover:border-gold text-gold text-xs font-semibold transition-all hover:scale-102 flex items-center gap-1.5 shadow-sm"
                        >
                          {qa.action === 'call' && <PhoneCall className="w-3 h-3 text-red-400" />}
                          {qa.action === 'location' && <MapPin className="w-3 h-3 text-gold" />}
                          {qa.action === 'wizard' && <Compass className="w-3 h-3 text-gold" />}
                          <span>{qa.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Timestamp & Utilities */}
                  <div className="pt-1 flex items-center justify-between text-[10px] text-ivory/40">
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>

                    {!isUser && (
                      <div className="flex items-center gap-2">
                        {/* Read Aloud Button */}
                        <button
                          onClick={() => handleToggleSpeak(msg.id, msg.content, msg.language)}
                          className={`hover:text-gold transition-colors ${speakingId === msg.id ? 'text-gold animate-pulse' : ''}`}
                          title={speakingId === msg.id ? 'Stop reading' : 'Read aloud'}
                          aria-label="Read message aloud"
                        >
                          {speakingId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 text-gold" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-gold transition-colors"
                          title="Copy text"
                          aria-label="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing/Thinking Indicator */}
          {isLoading && (
            <div className="flex gap-2.5 mr-auto items-center text-xs text-gold animate-pulse p-2.5 rounded-xl bg-charcoal/50 border border-charcoal-light w-fit">
              <Sparkles className="w-4 h-4 animate-spin text-gold" />
              <span>AASHI is preparing a medically safe, compassionate response...</span>
            </div>
          )}

          {/* Retry notice if error occurred */}
          {lastFailedMessage && !isLoading && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs">
              <span>Message could not be sent.</span>
              <button
                onClick={() => handleSend(lastFailedMessage)}
                className="flex items-center gap-1 text-gold font-bold hover:underline"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry Message</span>
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-midnight border-t border-charcoal-light space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2"
          >
            {/* Auto-growing Textarea */}
            <div className="relative flex-1 rounded-xl bg-charcoal border border-charcoal-light focus-within:border-gold transition-all">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder={
                  activeLanguage === 'si'
                    ? 'ඔබේ ගැටලුව හෝ අවශ්‍යතාවය මෙහි ලියන්න (Enter යවන්න, Shift+Enter නව පේළියකට)...'
                    : activeLanguage === 'ta'
                    ? 'உங்கள் கேள்வியை உள்ளிடவும் (Enter அனுப்ப, Shift+Enter புதிய வரி)...'
                    : 'Share what you are going through (Enter to send, Shift+Enter for newline)...'
                }
                disabled={isLoading}
                className="w-full resize-none bg-transparent px-3.5 py-3 text-xs sm:text-sm text-ivory placeholder:text-ivory/40 focus:outline-none max-h-36"
              />
            </div>

            {/* Voice Input Button */}
            <VoiceInputButton
              language={activeLanguage}
              onTranscript={(transcript) => {
                setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
              }}
              disabled={isLoading}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-gold px-4 py-3 rounded-xl font-bold shadow-gold-subtle disabled:opacity-40 transition-all flex items-center justify-center gap-2 flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-midnight" />
              <span className="hidden md:inline text-midnight text-xs sm:text-sm">Send</span>
            </button>
          </form>

          {/* Safety Disclaimer and Hotlines Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-ivory/50 gap-1 px-1">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-gold shrink-0" />
              <span>Not a doctor. In emergency call 1990 (Ambulance) or 1927 (NDDCB).</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="text-gold hover:underline flex items-center gap-1"
              >
                <MapPin className="w-3 h-3" />
                <span>Find Near Me</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-ivory/60 hover:text-gold transition-colors"
              >
                Privacy Notice
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Consent Modal */}
      <LocationConsentModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelected={handleLocationSelected}
      />

      {/* Privacy Information Modal */}
      <PrivacyInfoModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};
