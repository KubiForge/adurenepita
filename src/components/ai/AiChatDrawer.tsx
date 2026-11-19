import React, { useState, useEffect, useRef } from 'react';
import { useSafety } from '../../context/SafetyContext';
import { ChatMessage, SourceCitation } from '../../types/chat';
import { grokService } from '../../services/grokService';
import { CONTACT_INFO } from '../../config/contactInfo';
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
  const { language, t } = useLanguage();
  const { triggerSafetyInterruption } = useSafety();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeLanguage = useRef(language);

  const getWelcomeMessage = (): string => {
    return t('chat.welcome');
  };

  // Initialize welcome message
  useEffect(() => {
    activeLanguage.current = language;
    setInput('');
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'assistant',
        content: getWelcomeMessage(),
        timestamp: new Date().toISOString(),
        safetyLevel: 1,
        suggestedQuickActions: [
          { label: t('chat.quickIce'), action: 'chat', payload: t('chat.quickIcePrompt') },
          { label: t('chat.quickFriend'), action: 'chat', payload: t('chat.quickFriendPrompt') },
          { label: t('chat.quickCenters'), action: 'navigate', payload: '/support-directory' },
          { label: t('chat.quickWizard'), action: 'wizard' },
        ],
      },
    ]);
  }, [language]);

  // Handle external prompt (e.g. from Guided Wizard handover)
  useEffect(() => {
    if (initialMessage && isOpen) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      language,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await grokService.generateResponse(text, messages, language);

      if (activeLanguage.current !== language) return;

      // Trigger global modal if level 3 or 4
      if (response.safetyLevel >= 3) {
        triggerSafetyInterruption(
          response.safetyLevel,
          t(response.safetyLevel === 4 ? 'emergency.reason.crisis' : 'emergency.reason.medical'),
        );
      }

      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        safetyLevel: response.safetyLevel,
        safetyReason: response.safetyReason,
        sources: response.sources,
        suggestedQuickActions: response.suggestedQuickActions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      if (activeLanguage.current !== language) return;
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
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

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: getWelcomeMessage(),
        timestamp: new Date().toISOString(),
        safetyLevel: 1,
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-midnight/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Surface */}
      <div className="relative z-10 flex h-full min-h-0 w-full max-w-xl flex-col border-l border-gold/30 bg-midnight pb-[env(safe-area-inset-bottom)] shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-charcoal-light bg-charcoal/90 backdrop-blur-md flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-gold-subtle">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="flex flex-wrap items-center gap-1.5 font-heading text-base font-bold text-ivory">
                <span className="break-words">{t('chat.title')}</span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-midnight text-gold border border-gold/20 font-sans">
                  {t('chat.engine')}
                </span>
              </h2>
              <p className="text-[11px] text-ivory/60">
                {t('chat.subtitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              className="p-2 rounded-lg text-ivory/60 hover:text-gold hover:bg-charcoal-light transition-colors"
              title={t('chat.reset')}
              aria-label={t('chat.reset')}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-ivory/60 hover:text-gold hover:bg-charcoal-light transition-colors"
              aria-label={t('cta.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Guided Wizard Banner Callout */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-charcoal-light bg-charcoal/60 px-4 py-2.5 text-xs">
          <span className="text-ivory/70 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>{t('chat.notSure')}</span>
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenWizard();
            }}
            className="text-gold font-semibold hover:underline flex items-center gap-1"
          >
            <span>{t('cta.startWizard')}</span>
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isEmergency = (msg.safetyLevel || 1) >= 3;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[94%] min-w-0 break-words rounded-2xl p-3 text-sm leading-relaxed sm:max-w-[85%] sm:p-4 ${
                    isUser
                      ? 'bg-gold text-midnight font-medium rounded-tr-none shadow-md'
                      : isEmergency
                      ? 'bg-red-950/60 border border-red-500/50 text-red-100 rounded-tl-none'
                      : 'bg-charcoal border border-charcoal-light text-ivory rounded-tl-none shadow-sm'
                  }`}
                >
                  {/* Safety Alert Badge on Assistant Messages */}
                  {!isUser && isEmergency && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-2 pb-1.5 border-b border-red-500/30">
                      <ShieldAlert className="w-4 h-4 animate-pulse" />
                      <span>{msg.safetyReason || t('chat.emergencyProtocol')}</span>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="whitespace-pre-line">{msg.content}</div>

                  {/* Sources Citations */}
                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-charcoal-light/60">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gold/80 block mb-1.5">
                        {t('chat.verifiedSources')}
                      </span>
                      <div className="space-y-1">
                        {msg.sources.map((src) => (
                          <a
                            key={src.id}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-champagne hover:underline flex items-center gap-1.5 py-0.5"
                          >
                            <ExternalLink className="w-3 h-3 text-gold flex-shrink-0" />
                            <span>{src.title} ({src.organization})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions & Timestamp Bar */}
                  <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-ivory/40">
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>

                    {!isUser && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-gold transition-colors"
                          title={t('chat.copy')}
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

                {/* Quick Action Chips */}
                {!isUser && msg.suggestedQuickActions && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[85%]">
                    {msg.suggestedQuickActions.map((qa, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (qa.action === 'wizard') {
                            onClose();
                            onOpenWizard();
                          } else if (qa.action === 'call' && qa.payload) {
                            window.location.href = `tel:${qa.payload}`;
                          } else if (qa.payload) {
                            handleSendMessage(qa.payload);
                          }
                        }}
                        className="text-xs px-3 py-1.5 rounded-full bg-charcoal hover:bg-gold/15 text-gold border border-gold/30 hover:border-gold transition-all text-left flex items-center gap-1"
                      >
                        {qa.action === 'call' && <PhoneCall className="w-3 h-3" />}
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
            <div className="flex items-center gap-2 text-ivory/50 text-xs p-3 rounded-xl bg-charcoal/50 border border-charcoal-light w-fit">
              <Sparkles className="w-4 h-4 text-gold animate-spin" />
              <span>{t('chat.thinking')}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-charcoal-light bg-charcoal/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex min-w-0 items-center gap-2"
          >
            <input
              type="text"
              placeholder={t('chat.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-xl border border-charcoal-light bg-midnight px-3 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none sm:px-4"
            />
            <Button
              type="submit"
              variant="gold"
              disabled={!input.trim() || isLoading}
              className="px-4 py-3"
              aria-label={t('chat.send')}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-[10px] text-ivory/40 text-center mt-2 leading-tight">
            {t('chat.disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
};
