import React, { useState } from 'react';
import { Sparkles, MessageSquare, AlignLeft, Smile } from 'lucide-react';
import { generateLLM } from '../api';

export default function LLMPlayground() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const tools = [
    { id: 'summarize', name: 'Summarize', icon: AlignLeft },
    { id: 'qa', name: 'Ask Question', icon: MessageSquare },
    { id: 'sentiment', name: 'Analyze Sentiment', icon: Smile },
  ];

  const handleTool = async (taskId) => {
    if (!text.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await generateLLM(text, taskId);
      setResponse(res.result);
    } catch (err) {
      setResponse("Error generating response. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-purple-500" size={40} />
          Large Language Model Playground
        </h2>
        <p className="text-slate-400">Interact with powerful LLMs (like GPT-4) instantly. Provide some text or context, and choose an action below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel flex flex-col">
          <label className="text-sm font-medium text-slate-300 mb-2">Your Input Text</label>
          <textarea
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all flex-grow min-h-[250px] resize-none"
            placeholder="Paste an article to summarize, a question to ask, or a review for sentiment analysis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => handleTool(t.id)}
                  disabled={loading || !text.trim()}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-slate-700 whitespace-nowrap disabled:opacity-50"
                >
                  <Icon size={16} className="text-purple-400" />
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-panel flex flex-col border-purple-500/20 bg-purple-900/5">
          <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-purple-400"/> AI Response
          </label>
          <div className="flex-grow bg-slate-900/50 border border-purple-500/20 rounded-xl p-4 min-h-[250px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center gap-3 text-purple-400 animate-pulse">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <span className="ml-2 content-center text-sm">Processing...</span>
              </div>
            ) : response ? (
              <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">{response}</p>
            ) : (
              <div className="h-full flex items-center justify-center text-center px-4">
                <p className="text-slate-500 italic">Select an action on the left to generate insights securely via the API.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
