import React, { useState, useEffect, useRef } from 'react';
import { useSafety } from '../context/SafetyContext';
import { ChatMessage, SourceCitation } from '../types/chat';
import { grokService } from '../services/grokService';
import { ASSETS } from '../config/assets';
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
  const language = 'en';
  const { triggerSafetyInterruption, openEmergencyModal } = useSafety();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getWelcome = (): string => {
    return "Hello, I'm BEYOND THE DARKNESS AI Assistant. I can help you explore reliable information, talk through what you are concerned about, and find appropriate professional support. You can write naturally or use guided options. I'm an AI assistant, not a healthcare professional or emergency service.";
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
          { label: "I'm trying to stop using drugs. What should I do first?", action: 'chat', payload: "I'm trying to stop using drugs. What should I do first?" },
          { label: 'What are the risks and warning signs of Ice (Meth)?', action: 'chat', payload: 'What are the risks and warning signs of Ice (Methamphetamine)?' },
          { label: 'How can I support a family member who is struggling?', action: 'chat', payload: 'How can I safely support a family member who is struggling with addiction?' },
          { label: 'Find Verified Rehabilitation Centers in Sri Lanka', action: 'navigate', payload: '/support-directory' },
        ],
      },
    ]);
  }, []);

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

      if (response.safetyLevel >= 3) {
        triggerSafetyInterruption(response.safetyLevel, response.safetyReason || response.content);
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
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          content: 'I apologize, but I am temporarily unable to connect to the knowledge engine. If you require immediate guidance, please call the NDDCB hotline at 1927 or 1990 for emergency medical care.',
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-light pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/40 shadow-gold-subtle flex-shrink-0">
            <img src={ASSETS.logoIcon} alt="AI Assistant" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-ivory">
                BEYOND THE DARKNESS AI Assistant
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-bold uppercase tracking-wider">
                Active 24/7
              </span>
            </div>
            <p className="text-xs text-ivory/60 mt-0.5">
              Empathetic, non-judgmental guidance and verified medical service routing in English.
            </p>
          </div>
        </div>

        {/* Language & Actions */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory/60 hover:text-gold transition-colors"
            title="Reset Conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="charcoal-card border-gold/30 overflow-hidden flex flex-col h-[650px] shadow-2xl">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 ${
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
                        Verified Sources:
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
              <span>BEYOND THE DARKNESS is consulting verified knowledge sources...</span>
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
              placeholder="Ask a confidential question, discuss your situation, or ask about support..."
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
              <span className="hidden sm:inline text-midnight">Send</span>
            </button>
          </form>

          {/* Clinical Limitation Disclaimer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-ivory/50 gap-1 px-1">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-gold" />
              <span>Confidential • AI Assistant does not replace medical or psychological diagnosis.</span>
            </span>
            <span>Emergency? Call <strong>1927 (NDDCB)</strong> or <strong>1990 (Suwa Seriya)</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
