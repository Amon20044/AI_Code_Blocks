'use client';

import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { CheckIcon } from 'lucide-react';
import 'highlight.js/styles/github-dark.css'; // You can try other themes like atom-one-dark, vs2015

interface ChatParserProps {
  message: string;
}

const ChatParser: React.FC<ChatParserProps> = ({ message }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const segments: (string | { lang: string; code: string })[] = [];

  let lastIndex = 0;
  let match;

  while ((match = codeRegex.exec(message)) !== null) {
    if (match.index > lastIndex) {
      segments.push(message.slice(lastIndex, match.index));
    }
    segments.push({ lang: match[1] || 'plaintext', code: match[2] });
    lastIndex = codeRegex.lastIndex;
  }

  if (lastIndex < message.length) {
    segments.push(message.slice(lastIndex));
  }

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 text-gray-200 leading-relaxed">
      {segments.map((seg, index) => {
        if (typeof seg === 'string') {
          return (
            <Markdown
              key={index}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} className="text-indigo-400 hover:underline" />
                ),
                ul: ({ node, ...props }) => <ul className="list-disc pl-6" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-indigo-200" {...props} />
                ),
              }}
            >
              {seg}
            </Markdown>
          );
        } else {
          const isCopied = copiedIndex === index;
          return (
            <div
              key={index}
              className="relative rounded-lg bg-zinc-900 border border-indigo-500/20 overflow-hidden"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-indigo-500/30">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-indigo-300 font-mono text-sm uppercase tracking-wide">
                    {seg.lang}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(seg.code, index)}
                  className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all duration-300
                    ${isCopied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-zinc-800/80 hover:bg-indigo-500/20 text-zinc-300 hover:text-indigo-300 border border-zinc-700 hover:border-indigo-500/50'
                    }`}
                >
                  {isCopied ? (
                    <>
                      <CheckIcon size={14} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <span>Copy code</span>
                  )}
                </button>
              </div>

              {/* Code container */}
              <div className="relative group bg-zinc-950/70 px-4 py-3 overflow-auto min-h-[6rem] max-h-[65vh]">
                <pre className="text-sm font-mono text-gray-100 whitespace-pre">
                  <code className={`language-${seg.lang}`}>{seg.code}</code>
                </pre>
                <div className="absolute inset-0 pointer-events-none group-hover:bg-indigo-500/5 transition-colors duration-300" />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ChatParser;
