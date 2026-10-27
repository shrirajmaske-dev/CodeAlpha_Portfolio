import React from 'react';
import { Bot, User, ArrowRight, Sparkles } from 'lucide-react';
import { ChatMessage } from '../../types/index.js';

interface MessageItemProps {
  message: ChatMessage;
  onSelectFollowUp: (prompt: string) => void;
  onSelectProject: (slug: string) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onSelectFollowUp,
  onSelectProject
}) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start group`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold shadow-xs ${
          isUser
            ? 'bg-zinc-950 text-white dark:bg-white dark:text-black'
            : 'bg-zinc-100 text-zinc-900 border border-zinc-300 dark:bg-zinc-900 dark:text-white dark:border-white/20'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Bubble Content */}
      <div
        className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
          isUser
            ? 'bg-zinc-950 text-white dark:bg-white dark:text-black font-medium rounded-tr-none shadow-xs'
            : 'glass-panel bg-zinc-100/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 rounded-tl-none space-y-3'
        }`}
      >
        {/* Main Text */}
        <div className="whitespace-pre-wrap">{message.text}</div>

        {/* Structured Output Metadata (when from assistant) */}
        {!isUser && message.data && (
          <div className="space-y-2.5 pt-2 border-t border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300">
            {/* Referenced Projects */}
            {message.data.referencedProjects && message.data.referencedProjects.length > 0 && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
                  Referenced Case Studies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {message.data.referencedProjects.map(slug => (
                    <button
                      key={slug}
                      onClick={() => onSelectProject(slug)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white text-[11px] font-mono border border-zinc-200 dark:border-white/10 transition-colors shadow-xs"
                    >
                      <span>{slug}</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Highlighted Skills */}
            {message.data.highlightedSkills && message.data.highlightedSkills.length > 0 && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
                  Validated Stack Proficiencies:
                </span>
                <div className="flex flex-wrap gap-1">
                  {message.data.highlightedSkills.map(skill => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] font-mono text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Follow-Ups */}
            {message.data.suggestedFollowUps && message.data.suggestedFollowUps.length > 0 && (
              <div className="pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-zinc-900 dark:text-white" />
                  Suggested Deep Dives:
                </span>
                <div className="flex flex-col gap-1.5">
                  {message.data.suggestedFollowUps.map((question, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => onSelectFollowUp(question)}
                      className="text-left text-[11px] text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white bg-white hover:bg-zinc-50 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 p-2 rounded-lg border border-zinc-200 dark:border-white/10 transition-colors flex items-center justify-between group/q shadow-xs"
                    >
                      <span>{question}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/q:opacity-100 transition-opacity flex-shrink-0 ml-1 text-zinc-900 dark:text-white" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className={`text-[10px] mt-1 text-right ${isUser ? 'text-zinc-400 dark:text-black/60 font-mono font-medium' : 'text-zinc-500 font-mono'}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};
