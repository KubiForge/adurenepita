import React, { useState, useEffect, useRef } from 'react';
import { useSafety } from '../../context/SafetyContext';
import { ChatMessage, SourceCitation } from '../../types/chat';
import { grokService } from '../../services/grokService';
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
  const language = 'en';
  const { triggerSafetyInterruption } = useSafety();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getWelcomeMessage = (): string => {
    return "Hello, I'm BEYOND THE DARKNESS AI Assistant. I can help you explore reliable information, talk through what you are concerned about, and find appropriate professional support. You can write naturally or use guided options. I'm an AI assistant, not a healthcare professional or emergency service.";
  };

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'msg-welcome',
          sender: 'assistant',
          content: getWelcomeMessage(),
          timestamp: new Date().toISOString(),
          safetyLevel: 1,
          suggestedQuickActions: [
            { label: 'What are the risks of ICE?', action: 'chat', payload: 'What are the dangers and health risks of ICE (Methamphetamine)?' },
            { label: 'How to support a worried friend?', action: 'chat', payload: 'How can I support a friend struggling with substance addiction?' },
            { label: 'Find Sri Lankan Centers', action: 'navigate', payload: '/support-directory' },
            { label: 'Creative Guided Wizard', action: 'wizard' },
          ],
        },
      ]);
    }
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

      // Trigger global modal if level 3 or 4
      if (response.safetyLevel >= 3) {
        triggerSafetyInterruption(response.safetyLevel, response.safetyReason);
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
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          content:
            'I experienced a brief connection disruption. Please remember that if this is an emergency, you can always reach the NDDCB hotline at 1927 or the 1990 Suwaseriya free ambulance immediately.',
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
      <div className="relative w-full max-w-xl bg-midnight border-l border-gold/30 shadow-2xl flex flex-col h-full z-10 animate-fade-in">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-charcoal-light bg-charcoal/90 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-gold-subtle">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-ivory flex items-center gap-2">
                <span>Beyond the Darkness AI</span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-midnight text-gold border border-gold/20 font-sans">
                  Grok RAG
                </span>
              </h2>
              <p className="text-[11px] text-ivory/60">
                Substance prevention and recovery support assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              className="p-2 rounded-lg text-ivory/60 hover:text-gold hover:bg-charcoal-light transition-colors"
              title="Clear conversation"
              aria-label="Reset chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-ivory/60 hover:text-gold hover:bg-charcoal-light transition-colors"
              aria-label="Close AI chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Guided Wizard Banner Callout */}
        <div className="px-4 py-2.5 bg-charcoal/60 border-b border-charcoal-light flex items-center justify-between text-xs">
          <span className="text-ivory/70 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>Not sure what to type?</span>
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenWizard();
            }}
            className="text-gold font-semibold hover:underline flex items-center gap-1"
          >
            <span>Launch 10-Step Wizard</span>
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
                  className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
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
                      <span>{msg.safetyReason || 'Medical Emergency / Crisis Protocol'}</span>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="whitespace-pre-line">{msg.content}</div>

                  {/* Sources Citations */}
                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-charcoal-light/60">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gold/80 block mb-1.5">
                        Verified Sources & References:
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
                          title="Copy message"
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
              <span>Grok AI is thinking and retrieving approved clinical evidence...</span>
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
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question or explain what's on your mind in English..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl bg-midnight border border-charcoal-light text-ivory text-sm focus:outline-none focus:border-gold placeholder:text-ivory/40"
            />
            <Button
              type="submit"
              variant="gold"
              disabled={!input.trim() || isLoading}
              className="px-4 py-3"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-[10px] text-ivory/40 text-center mt-2 leading-tight">
            Confidential & Anonymous. BEYOND THE DARKNESS is an AI assistant, not a doctor or emergency dispatch.
          </p>
        </div>
      </div>
    </div>
  );
};
