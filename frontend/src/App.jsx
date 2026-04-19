import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Lenis from 'lenis';
import { Brain, Database, Cpu, MessageSquare } from 'lucide-react';
import Hero3D from './components/Hero3D';
import DataUpload from './components/DataUpload';
import Modeling from './components/Modeling';
import LLMPlayground from './components/LLMPlayground';
import Chatbot from './components/Chatbot';
import CustomCursor from './components/CustomCursor';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Initialize Lenis for Awwwards-style buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#050505]">
        <CustomCursor />
        
        {/* Brutalist Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-transparent mix-blend-difference pt-6">
          <div className="max-w-[95%] mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4 group">
                <Brain className="h-10 w-10 text-white transition-transform group-hover:rotate-180 duration-700" />
                <span className="text-2xl font-black tracking-tighter uppercase text-white">
                  EasyML.
                </span>
              </div>
              <div className="flex space-x-8 text-sm font-bold uppercase tracking-widest text-white">
                <Link to="/" onClick={() => setActiveTab('home')} className="hover:line-through">Index</Link>
                <Link to="/data" onClick={() => setActiveTab('data')} className="hover:line-through">Upload</Link>
                <Link to="/models" onClick={() => setActiveTab('models')} className="hover:line-through">Train</Link>
                <Link to="/llm" onClick={() => setActiveTab('llm')} className="hover:line-through">Ask AI</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow z-10 w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Hero3D />} />
            <Route path="/data" element={<div className="pt-32 pb-20"><DataUpload /></div>} />
            <Route path="/models" element={<div className="pt-32 pb-20"><Modeling /></div>} />
            <Route path="/llm" element={<div className="pt-32 pb-20"><LLMPlayground /></div>} />
          </Routes>
        </main>
        
        {/* Assistant */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
