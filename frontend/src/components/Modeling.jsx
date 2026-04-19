import React, { useState } from 'react';
import { Network, Activity, ScatterChart } from 'lucide-react';
import { trainModel } from '../api';

export default function Modeling() {
  const [selectedType, setSelectedType] = useState('classification');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleTrain = async () => {
    setLoading(true);
    try {
      const res = await trainModel(selectedType);
      setResults(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const models = [
    { id: 'classification', name: 'Classification', icon: Network, desc: 'Predict categorical labels (e.g., Spam or Not Spam)' },
    { id: 'regression', name: 'Regression', icon: Activity, desc: 'Predict continuous ranges (e.g., Housing Prices)' },
    { id: 'clustering', name: 'Clustering', icon: ScatterChart, desc: 'Group similar unlabeled data points (e.g., Customer Specs)' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">Machine Learning Studio</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Select a machine learning task to automatically train a model on your uploaded dataset. We handle the feature engineering and hyperparameter tuning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {models.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedType === m.id;
          return (
            <div 
              key={m.id} 
              onClick={() => setSelectedType(m.id)}
              className={`glass-panel cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-blue-500 bg-blue-900/20' : 'hover:bg-slate-800/50'}`}
            >
              <Icon className={`w-10 h-10 mb-4 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
              <h3 className="text-xl font-bold mb-2">{m.name}</h3>
              <p className="text-slate-400 text-sm">{m.desc}</p>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center mb-10">
        <button 
          onClick={handleTrain} 
          disabled={loading}
          className="glass-button text-xl px-12 py-4 flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Training Model...' : 'Train Selected Model'}
        </button>
      </div>

      {results && (
        <div className="glass-panel border-green-500/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <CheckCircle className="text-green-500" />
            Training Complete: <span className="capitalize">{results.model_type}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <h4 className="text-slate-400 uppercase text-sm font-semibold tracking-wider mb-4">Metrics</h4>
              <div className="space-y-4">
                {Object.entries(results.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-lg capitalize">{key.replace('_', ' ')}:</span>
                    <span className="text-2xl font-bold text-blue-400">
                      {(value * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900/50 flex items-center justify-center rounded-xl border border-slate-800 min-h-[200px]">
              <p className="text-slate-500 italic">Visualizations would render here via Plotly.js</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const CheckCircle = ({ className }) => <Network className={className} />;
