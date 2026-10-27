import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Trash2, Maximize2, Minimize2, AlertCircle } from 'lucide-react';
import { MessageItem } from './MessageItem.js';
import { ChatMessage } from '../../types/index.js';
import { useNavigate } from 'react-router-dom';

interface AIAssistantWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  contextSlug: string | null;
  onClearContext: () => void;
  onSendMessage: (query: string) => void;
  onClearChat: () => void;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  isOpen,
  onToggle,
  messages,
  isLoading,
  error,
  contextSlug,
  onClearContext,
  onSendMessage,
  onClearChat
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;
    if (inputQuery.trim().length < 3 || inputQuery.trim().length > 500) return;

    onSendMessage(inputQuery);
    setInputQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleProjectSelect = (slug: string) => {
    navigate(`/projects/${slug}`);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          aria-label="Open AI Career Assistant"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-black font-semibold text-sm shadow-xl dark:shadow-2xl hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white border border-zinc-800 dark:border-white"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white dark:text-black animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white dark:bg-black rounded-full border-2 border-zinc-950 dark:border-white" />
          </div>
          <span className="font-semibold tracking-tight text-white dark:text-black">Ask Aegis AI</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 dark:bg-black/10 font-mono text-white dark:text-black font-medium">
            Gemini
          </span>
        </button>
      )}

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div
          className={`glass-panel border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up transition-all duration-300 bg-white dark:bg-[#050508] ${
            isExpanded
              ? 'fixed inset-4 sm:inset-10 z-50 w-auto h-auto'
              : 'w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-zinc-100 dark:bg-[#0e0e12] px-4 py-3 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold shadow-xs">
                <Bot className="w-4 h-4 text-white dark:text-black" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-zinc-950 dark:text-white text-sm">Aegis</h3>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 font-mono font-semibold border border-zinc-300 dark:border-white/10">
                    AI Assistant
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white inline-block shadow-xs dark:shadow-[0_0_4px_#ffffff]" />
                  Gemini 2.5 Flash • Grounded
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onClearChat}
                title="Clear Chat History"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(prev => !prev)}
                title={isExpanded ? 'Restore' : 'Maximize'}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors hidden sm:inline-block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onToggle}
                title="Close AI Assistant"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Badge (if scoped to a specific project) */}
          {contextSlug && (
            <div className="bg-zinc-100 dark:bg-white/5 border-b border-zinc-200 dark:border-white/10 px-3.5 py-1.5 text-xs flex items-center justify-between text-zinc-700 dark:text-zinc-300">
              <span className="truncate font-mono">
                Scoped to: <strong>{contextSlug}</strong>
              </span>
              <button
                onClick={onClearContext}
                className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white ml-2 text-xs"
                title="Clear project scope"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white dark:bg-[#050508] text-xs sm:text-sm">
            {messages.map(msg => (
              <MessageItem
                key={msg.id}
                message={msg}
                onSelectFollowUp={q => onSendMessage(q)}
                onSelectProject={handleProjectSelect}
              />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center text-zinc-700 dark:text-zinc-300 text-xs font-mono p-2 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-white/10 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-zinc-950 dark:text-white animate-spin" />
                <span>Aegis is synthesizing grounded architectural response...</span>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSubmit} className="p-3 bg-zinc-50 dark:bg-[#0d0d10] border-t border-zinc-200 dark:border-white/10 space-y-1.5">
            <div className="relative flex items-center">
              <textarea
                value={inputQuery}
                onChange={e => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Kairos's architectures, PostgreSQL, RAG..."
                rows={1}
                maxLength={500}
                className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none focus:outline-none"
              />

              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading || inputQuery.trim().length < 3}
                aria-label="Send Message"
                className="absolute right-2 p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono px-1">
              <span>Press Enter to send, Shift+Enter for newline</span>
              <span className={inputQuery.length > 450 ? 'text-zinc-950 dark:text-white font-bold' : ''}>
                {inputQuery.length}/500
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
