import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Shield, Upload, Check } from 'lucide-react';

export const TotemGenerator: React.FC = () => {
  const [skinPath, setSkinPath] = useState<string>('');
  const [is3D, setIs3D] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('');

  const handleGenerate = async () => {
    if (!skinPath) return;
    try {
      setStatus('Generating Totem...');
      await invoke('create_totem', {
        skinPath,
        outputPath: skinPath + '_totem.png',
        is3d: is3D,
      });
      setStatus('Custom Totem Created Successfully!');
    } catch (err: any) {
      setStatus(`Error: ${err.message || err}`);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Custom Totem Generator</h2>
        <p className="text-sm text-gray-400">Convert your Minecraft Skin into an In-Game Totem of Undying</p>
      </div>

      <div className="p-6 rounded-xl bg-[#14171d] border border-[#222731] space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Skin PNG Path</label>
          <input
            type="text"
            placeholder="/path/to/skin.png"
            value={skinPath}
            onChange={(e) => setSkinPath(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0e1013] border border-[#222731] text-white text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Totem Render Style</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setIs3D(true)}
              className={`p-4 rounded-xl border text-left transition-all ${
                is3D ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-[#222731] bg-[#0e1013] text-gray-400'
              }`}
            >
              <div className="font-bold text-sm">3D Sitting Model</div>
              <div className="text-xs text-gray-500">Mini player sitting on totem hand base</div>
            </button>
            <button
              onClick={() => setIs3D(false)}
              className={`p-4 rounded-xl border text-left transition-all ${
                !is3D ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-[#222731] bg-[#0e1013] text-gray-400'
              }`}
            >
              <div className="font-bold text-sm">2D Classic Texture</div>
              <div className="text-xs text-gray-500">Pixelated classic Minecraft head icon</div>
            </button>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all"
        >
          <Shield className="w-5 h-5" />
          Generate & Assign Totem
        </button>

        {status && <div className="text-center text-sm font-medium text-emerald-400 pt-2">{status}</div>}
      </div>
    </div>
  );
};
