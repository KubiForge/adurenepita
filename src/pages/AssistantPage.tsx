import React, { useState, useEffect, useRef } from 'react';
import { useSafety } from '../context/SafetyContext';
import { ChatMessage, SourceCitation } from '../types/chat';
import { grokService } from '../services/grokService';
import { ASSETS } from '../config/assets';
import { CONTACT_INFO } from '../config/contactInfo';
import { useLanguage } from '../context/LanguageContext';
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
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AssistantPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { triggerSafetyInterruption, openEmergencyModal } = useSafety();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeLanguage = useRef(language);

  useEffect(() => {
    activeLanguage.current = language;
    setInput('');
  }, [language]);

  const getWelcome = (): string => {
    return t('chat.welcome');
  };

  useEffect(() => {
    setMessages([
      {
        id: 'msg-welcome-main',
        sender: 'assistant',
        content: getWelcome(),
        timestamp: new Date().toISOString(),
        safetyLevel: 1,
        suggestedQuickActions: [
          { label: t('chat.quickStop'), action: 'chat', payload: t('chat.quickStopPrompt') },
          { label: t('chat.quickIce'), action: 'chat', payload: t('chat.quickIcePrompt') },
          { label: t('chat.quickFriend'), action: 'chat', payload: t('chat.quickFriendPrompt') },
          { label: t('chat.quickCenters'), action: 'navigate', payload: '/support-directory' },
        ],
      },
    ]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customPrompt?: string) => {
    const text = (customPrompt || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      language,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await grokService.sendMessage({
        message: text,
        conversationHistory: messages,
        language,
      });

      if (activeLanguage.current !== language) return;

      if (response.safetyLevel >= 3) {
        triggerSafetyInterruption(
          response.safetyLevel,
          t(response.safetyLevel === 4 ? 'emergency.reason.crisis' : 'emergency.reason.medical'),
        );
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        safetyLevel: response.safetyLevel,
        sources: response.sources,
        suggestedQuickActions: response.suggestedQuickActions,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      if (activeLanguage.current !== language) return;
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          content: t('chat.connectionError', {
            hotline: CONTACT_INFO.emergency.drugHelpline.number,
            ambulance: CONTACT_INFO.emergency.ambulance.number,
          }),
          timestamp: new Date().toISOString(),
          safetyLevel: 1,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'assistant',
        content: getWelcome(),
        timestamp: new Date().toISOString(),
        safetyLevel: 1,
      },
    ]);
  };

  return (
    <div className="mx-auto min-w-0 w-full max-w-6xl space-y-5 px-3 py-5 sm:space-y-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-light pb-4">
        <div className="flex min-w-0 items-center gap-3.5">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/40 shadow-gold-subtle flex-shrink-0">
            <img src={ASSETS.logoIcon} alt="AI Assistant" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h1 className="min-w-0 break-words text-xl font-bold font-heading text-ivory sm:text-2xl">
                {t('chat.title')}
              </h1>
              <span className="shrink-0 rounded-full border border-gold/30 bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                {t('chat.active')}
              </span>
            </div>
            <p className="text-xs text-ivory/60 mt-0.5">
              {t('chat.subtitle')}
            </p>
          </div>
        </div>

        {/* Language & Actions */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory/60 hover:text-gold transition-colors"
            title={t('chat.reset')}
            aria-label={t('chat.reset')}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="charcoal-card flex h-[min(650px,calc(100dvh-12rem))] min-h-[20rem] min-w-0 flex-col overflow-hidden border-gold/30 shadow-2xl sm:h-[650px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex min-w-0 gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`min-w-0 max-w-full break-words p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 ${
                    isUser
                      ? 'bg-gradient-to-r from-gold/90 to-champagne/90 text-midnight font-medium rounded-tr-none shadow-gold-subtle'
                      : 'bg-midnight/90 text-ivory/90 border border-charcoal-light rounded-tl-none shadow-lg'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Sources citation */}
                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="pt-2 border-t border-charcoal-light/60 text-[11px] space-y-1">
                      <span className="text-gold font-bold uppercase tracking-wider block">
                        {t('chat.verifiedSources')}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((s, idx) => (
                          <a
                            key={idx}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-gold/80 hover:text-champagne underline"
                          >
                            <span>{s.title} ({s.organization})</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested quick action buttons */}
                  {!isUser && msg.suggestedQuickActions && (
                    <div className="pt-2 border-t border-charcoal-light/60 flex flex-wrap gap-2">
                      {msg.suggestedQuickActions.map((qa, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (qa.action === 'chat' && qa.payload) {
                              handleSend(qa.payload);
                            } else if (qa.action === 'navigate' && qa.payload) {
                              window.location.href = qa.payload;
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-charcoal border border-gold/30 hover:border-gold text-gold text-xs font-semibold transition-all hover:scale-105"
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 mr-auto items-center text-xs text-gold animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>{t('chat.thinking')}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-midnight border-t border-charcoal-light space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder={t('chat.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-charcoal border border-charcoal-light text-ivory text-xs sm:text-sm focus:outline-none focus:border-gold placeholder:text-ivory/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-gold px-5 py-3 rounded-xl font-bold shadow-gold-subtle disabled:opacity-40 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-midnight" />
              <span className="hidden sm:inline text-midnight">{t('chat.send')}</span>
            </button>
          </form>

          {/* Clinical Limitation Disclaimer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-ivory/50 gap-1 px-1">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-gold" />
              <span>{t('chat.disclaimer')}</span>
            </span>
            <span>{t('chat.emergencyContact', {
              hotline: CONTACT_INFO.emergency.drugHelpline.number,
              ambulance: CONTACT_INFO.emergency.ambulance.number,
            })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
