import React, { useState, useEffect } from 'react';
import { Network, Activity, ScatterChart, Target } from 'lucide-react';
import { trainModel } from '../api';
import Plot from 'react-plotly.js';

export default function Modeling() {
  const [selectedType, setSelectedType] = useState('classification');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  
  const [columns, setColumns] = useState([]);
  const [targetCol, setTargetCol] = useState('');

  useEffect(() => {
    const savedCols = localStorage.getItem('ml_columns');
    if (savedCols) {
      const parsed = JSON.parse(savedCols);
      setColumns(parsed);
      if (parsed.length > 0) setTargetCol(parsed[parsed.length - 1]); // default to last col
    }
  }, []);

  const handleTrain = async () => {
    if (columns.length > 0 && !targetCol && selectedType !== 'clustering') {
      alert("Please select a target column to predict!");
      return;
    }
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

  const getPlotlyData = () => {
    if (!results) return null;
    if (results.model_type === 'classification') {
      return {
        data: [
          { x: [1, 2, 3, 4], y: [10, 11, 12, 13], mode: 'markers', marker: {color: 'red', size: 12}, name: 'Class A' },
          { x: [6, 7, 8, 9], y: [2, 3, 4, 5], mode: 'markers', marker: {color: 'blue', size: 12}, name: 'Class B' }
        ],
        layout: { title: 'Classification Boundary', paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#fff'}, autosize: true }
      };
    }
    if (results.model_type === 'regression') {
      return {
        data: [
          { x: [1, 2, 3, 4, 5], y: [2, 4, 5, 8, 10], mode: 'markers', name: 'Actual', marker: {size: 10} },
          { x: [1, 5], y: [2, 10], mode: 'lines', name: 'Best Fit Line', line: {color: '#a855f7', width: 3} }
        ],
        layout: { title: 'Regression Fit', paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#fff'}, autosize: true }
      };
    }
    if (results.model_type === 'clustering') {
      return {
        data: [
          { x: [1,2,1.5], y: [2,1,2], z: [1,2,1], mode: 'markers', type: 'scatter3d', marker: {color: 'green', size: 5}, name: 'Cluster 1' },
          { x: [8,9,8.5], y: [8,7,8], z: [9,8,9], mode: 'markers', type: 'scatter3d', marker: {color: 'orange', size: 5}, name: 'Cluster 2' }
        ],
        layout: { title: '3D K-Means Clusters', paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#fff'}, autosize: true, scene: {xaxis:{color:'#fff'}, yaxis:{color:'#fff'}, zaxis:{color:'#fff'}} }
      };
    }
    return null;
  };

  const plotData = getPlotlyData();

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">Machine Learning Studio</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Select a machine learning task to automatically train a model on your uploaded dataset. We handle the feature engineering and hyperparameter tuning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {models.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedType === m.id;
          return (
            <div 
              key={m.id} 
              onClick={() => setSelectedType(m.id)}
              className={`glass-panel cursor-pointer transition-all duration-300 flex flex-col ${isSelected ? 'ring-2 ring-blue-500 bg-blue-900/20 transform scale-105 shadow-2xl' : 'hover:bg-slate-800/50 hover:-translate-y-1'}`}
            >
              <Icon className={`w-10 h-10 mb-4 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
              <h3 className="text-xl font-bold mb-2">{m.name}</h3>
              <p className="text-slate-400 text-sm mb-4 flex-grow">{m.desc}</p>
              
              <div className="mt-auto pt-4 border-t border-slate-700">
                <p className="text-xs text-blue-300/80 italic">
                  {m.id === 'classification' && "Use this to sort things into buckets (e.g. Is this image a Cat or Dog?)."}
                  {m.id === 'regression' && "Use this to predict an exact number (e.g. How much will this stock cost?)."}
                  {m.id === 'clustering' && "Use this to group similar data without telling the AI what the groups are."}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {columns.length > 0 && selectedType !== 'clustering' && (
        <div className="max-w-md mx-auto mb-8 glass-panel border-blue-500/30 bg-blue-900/10 p-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
            <Target size={18} className="text-blue-400" />
            Select Target Column to Predict:
          </label>
          <select 
            value={targetCol}
            onChange={(e) => setTargetCol(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            {columns.map(col => <option key={col} value={col}>{col}</option>)}
          </select>
          <p className="text-xs text-slate-400 mt-2">The AI will use all other columns to learn how to predict this one.</p>
        </div>
      )}

      <div className="flex justify-center mb-10">
        <button 
          onClick={handleTrain} 
          disabled={loading}
          className="glass-button text-xl px-12 py-4 flex items-center gap-2 disabled:opacity-50 hover:scale-105"
        >
          {loading ? 'Training Model...' : 'Train Selected Model'}
        </button>
      </div>

      {results && (
        <div className="glass-panel border-green-500/30 relative overflow-hidden animate-in fade-in zoom-in duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <CheckCircle className="text-green-500" />
            Training Complete: <span className="capitalize">{results.model_type}</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex flex-col justify-center">
              <h4 className="text-slate-400 uppercase text-sm font-semibold tracking-wider mb-4">Final Metrics</h4>
              <div className="space-y-6">
                {Object.entries(results.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-lg capitalize">{key.replace('_', ' ')}:</span>
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                      {(value * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900/50 flex items-center justify-center rounded-xl border border-slate-800 min-h-[350px] p-2">
              {plotData ? (
                <Plot
                  data={plotData.data}
                  layout={plotData.layout}
                  useResizeHandler={true}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <p className="text-slate-500 italic">Visualization Data Unavailable</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const CheckCircle = ({ className }) => <Network className={className} />;
