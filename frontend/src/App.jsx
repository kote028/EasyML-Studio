import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Brain, Database, Cpu, MessageSquare } from 'lucide-react';
import Hero3D from './components/Hero3D';
import DataUpload from './components/DataUpload';
import Modeling from './components/Modeling';
import LLMPlayground from './components/LLMPlayground';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-blue-500" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  EasyML Studio
                </span>
              </div>
              <div className="flex space-x-4">
                <Link to="/" onClick={() => setActiveTab('home')} className={`px-3 py-2 rounded-md ${activeTab === 'home' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>Home</Link>
                <Link to="/data" onClick={() => setActiveTab('data')} className={`px-3 py-2 rounded-md flex items-center gap-2 ${activeTab === 'data' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}><Database size={18}/> Data</Link>
                <Link to="/models" onClick={() => setActiveTab('models')} className={`px-3 py-2 rounded-md flex items-center gap-2 ${activeTab === 'models' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}><Cpu size={18}/> Models</Link>
                <Link to="/llm" onClick={() => setActiveTab('llm')} className={`px-3 py-2 rounded-md flex items-center gap-2 ${activeTab === 'llm' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}><MessageSquare size={18}/> LLM Tools</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow pt-16 z-10 w-full">
          <Routes>
            <Route path="/" element={<Hero3D />} />
            <Route path="/data" element={<DataUpload />} />
            <Route path="/models" element={<Modeling />} />
            <Route path="/llm" element={<LLMPlayground />} />
          </Routes>
        </main>
        
        {/* Ambient background glows */}
        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none z-0"></div>
      </div>
    </Router>
  );
}

export default App;
