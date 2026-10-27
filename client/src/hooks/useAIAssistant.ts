import { useState, useCallback } from 'react';
import { ChatMessage, PortfolioChatResponse } from '../types/index.js';
import { queryAIAssistant } from '../lib/api.js';

const INITIAL_GREETING: ChatMessage = {
  id: 'msg-init',
  sender: 'assistant',
  text: "Hello! I'm Aegis, Kairos Vance's AI Career & Architecture Assistant. Ask me anything about Kairos's system designs, concurrency patterns, RAG pipelines, or career background.",
  data: {
    answer: "Hello! I'm Aegis, Kairos Vance's AI Career & Architecture Assistant. Ask me anything about Kairos's system designs, concurrency patterns, RAG pipelines, or career background.",
    referencedProjects: ['synthetix-rag', 'aegis-flow'],
    highlightedSkills: ['React', 'TypeScript', 'Google GenAI SDK', 'PostgreSQL', 'Docker'],
    suggestedFollowUps: [
      'How was state management architected in Aegis Flow?',
      'Why choose PostgreSQL and pgvector for Synthetix RAG Mesh?',
      'What is Kairos\'s engineering philosophy and career background?'
    ]
  },
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export function useAIAssistant() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [contextSlug, setContextSlug] = useState<string | null>(null);

  const sendMessage = useCallback(async (query: string, overrideSlug?: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const effectiveSlug = overrideSlug !== undefined ? overrideSlug : (contextSlug || undefined);

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const responseData: PortfolioChatResponse = await queryAIAssistant(trimmed, effectiveSlug);

      const assistantMsg: ChatMessage = {
        id: `msg-assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseData.answer,
        data: responseData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const msg = (err as Error).message || 'Failed to reach AI assistant. Please try again.';
      setError(msg);

      const errorReply: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        text: `Error: ${msg}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  }, [contextSlug]);

  const openWithContext = useCallback((slug: string, initialPrompt?: string) => {
    setContextSlug(slug);
    setIsOpen(true);
    if (initialPrompt) {
      sendMessage(initialPrompt, slug);
    }
  }, [sendMessage]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([INITIAL_GREETING]);
    setError(null);
  }, []);

  return {
    isOpen,
    setIsOpen,
    toggleChat,
    messages,
    isLoading,
    error,
    contextSlug,
    setContextSlug,
    sendMessage,
    openWithContext,
    clearChat
  };
}
