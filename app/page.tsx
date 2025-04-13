'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';
import ChatParser from '@/utils/parser'; // adjust if path is different


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`flex flex-col w-full max-w-md py-24 mx-auto stretch ${isLoading ? 'opacity-90' : ''}`}>
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap mb-4 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="font-semibold mb-1">
            {message.role === 'user' ? 'User: ' : 'AI: '}
          </div>
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <ChatParser key={`${message.id}-${i}`} message={part.text} />;
            }
          })}
        </div>
      ))}

      {isLoading && (
        <div className="whitespace-pre-wrap mb-4 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 animate-pulse">
          <div className="font-semibold mb-1">AI: </div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-2/3"></div>
        </div>
      )}

      {mounted && messages.length === 0 && !isLoading && (
        <div className="text-center text-zinc-500 dark:text-zinc-400 my-8">
          Start a conversation by typing a message below.
        </div>
      )}

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md mb-8">
        <input
          className={`w-full p-3 border ${isLoading ? 'border-blue-300 dark:border-blue-800' : 'border-zinc-300 dark:border-zinc-800'} rounded-lg shadow-xl dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
          value={input}
          placeholder={isLoading ? "AI is thinking..." : "Say something..."}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <div className="w-5 h-5 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute left-3 top-3 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-1"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150 mr-1"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
          </div>
        )}
      </form>
      
      {isLoading && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
          Processing...
        </div>
      )}
    </div>
  );
}