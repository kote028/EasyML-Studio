import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { chatLLM } from '../api';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm your Data Assistant. Need help understanding Machine Learning or what to do with your dataset? Let me know!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await chatLLM(userMessage.text);
      setMessages(prev => [...prev, { sender: 'ai', text: res.result }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I'm having trouble connecting to the server currently." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 transform hover:scale-110 z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-[400px] h-[500px] glass-panel p-0 flex flex-col overflow-hidden z-50 border-purple-500/50 flex shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="bg-slate-900/80 p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-blue-900/40 to-purple-900/40">
            <div className="flex items-center gap-2">
              <Bot className="text-purple-400" />
              <h3 className="font-semibold text-white">AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-full h-8 w-8 flex items-center justify-center ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                    {msg.sender === 'user' ? <User size={16}/> : <Bot size={16}/>}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-blue-600/20 text-white border border-blue-500/30' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="flex gap-2 items-center p-3 rounded-2xl bg-slate-800 border border-slate-700">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 bg-slate-900/80 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a data question..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || loading}
              className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 disabled:opacity-50 transition-colors flex items-center justify-center w-10"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
