import React from 'react';

function Base({ visible, data, fetchNui }) {
  if (!visible) return null;

  const handleClose = () => {
    fetchNui('nuicallback', { type: 'close' });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black/50">
      <div className="bg-slate-800 rounded-lg shadow-xl w-[600px] max-w-[80%] p-6 border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">FiveM NUI Interface</h1>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="bg-slate-700 rounded p-4">
          <h2 className="text-lg font-semibold text-white mb-2">Welcome</h2>
          <div className="text-gray-300">
            <p>This is a basic FiveM NUI React interface built with Vite and Tailwind CSS.</p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700 rounded p-4">
            <h2 className="text-lg font-semibold text-white mb-2">Basic Usage</h2>
            <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
              <li>Edit <code className="bg-slate-800 px-1 rounded">src/components/Base.jsx</code> to modify this UI</li>
              <li>Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">ESC</kbd> to close this interface</li>
              <li>Use Tailwind classes for styling components</li>
            </ul>
          </div>
          
          <div className="bg-slate-700 rounded p-4">
            <h2 className="text-lg font-semibold text-white mb-2">FiveM Integration</h2>
            <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
              <li>Import <code className="bg-slate-800 px-1 rounded">fetchNui</code> from utils/NuiUtils</li>
              <li>Use <code className="bg-slate-800 px-1 rounded">fetchNui('eventName', data)</code> to send data</li>
              <li>Set resource name in <code className="bg-slate-800 px-1 rounded">NuiUtils.js</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Base;
