import React, { useState, useCallback } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { uploadDataset } from '../api';

export default function DataUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [dataInfo, setDataInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (selectedFile) => {
    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please upload a valid CSV file.');
      return;
    }
    setFile(selectedFile);
    setError('');
    setLoading(true);

    try {
      const res = await uploadDataset(selectedFile);
      setDataInfo(res.data);
    } catch (err) {
      setError('Error uploading file. Make sure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><UploadCloud className="text-blue-500"/> Dataset Preprocessing</h2>
      
      {!dataInfo ? (
        <div 
          className={`glass-panel border-2 border-dashed ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600'} flex flex-col items-center justify-center p-16 transition-all duration-300`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".csv"
            onChange={handleChange}
          />
          <UploadCloud className="w-16 h-16 text-slate-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">Drag and drop your dataset</h3>
          <p className="text-slate-400 mb-6">Support for .CSV files</p>
          <label htmlFor="file-upload" className="glass-button cursor-pointer">
            {loading ? 'Uploading...' : 'Browse Files'}
          </label>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-panel flex items-center justify-between border-green-500/30 bg-green-500/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-full text-green-400">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium">{file.name}</h3>
                <p className="text-sm text-slate-400">({dataInfo.rows} rows, {dataInfo.columns.length} columns)</p>
              </div>
            </div>
            <button onClick={() => {setFile(null); setDataInfo(null)}} className="text-slate-400 hover:text-white transition-colors">
              Remove
            </button>
          </div>

          <div className="glass-panel overflow-x-auto">
            <h3 className="text-xl font-medium mb-4 flex items-center gap-2"><FileText size={20}/> Data Preview (First 5 rows)</h3>
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-800/50 text-slate-300">
                <tr>
                  {dataInfo.columns.map((col, i) => (
                    <th key={i} className="px-6 py-3">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataInfo.head.map((row, i) => (
                  <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                    {dataInfo.columns.map((col, j) => (
                      <td key={j} className="px-6 py-4 truncate max-w-xs">{String(row[col])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
