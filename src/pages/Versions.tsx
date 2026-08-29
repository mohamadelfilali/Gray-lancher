import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { VersionManifest, VersionItem } from '../types/launcher';
import { Download, CheckCircle, RefreshCw } from 'lucide-react';

export const Versions: React.FC = () => {
  const [manifest, setManifest] = useState<VersionManifest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'all' | 'release' | 'snapshot'>('release');

  useEffect(() => {
    loadVersions();
  }, []);

  const loadVersions = async () => {
    setLoading(true);
    try {
      const data = await invoke<VersionManifest>('get_versions');
      setManifest(data);
    } catch (err) {
      console.error('Failed to load version manifest', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVersions = manifest?.versions.filter((v) => {
    if (filter === 'all') return true;
    return v.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#222731] pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Minecraft Versions</h2>
          <p className="text-sm text-gray-400">Official Mojang Versions API Manifest</p>
        </div>
        <div className="flex gap-2">
          {(['release', 'snapshot', 'all'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                filter === f
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-[#14171d] text-gray-400 hover:bg-[#1f242e]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-gray-500 gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
          <span>Fetching versions from Mojang servers...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredVersions?.slice(0, 30).map((ver) => (
            <div
              key={ver.id}
              className="flex items-center justify-between p-4 rounded-xl bg-[#14171d] border border-[#222731] hover:border-gray-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full ${ver.type === 'release' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div>
                  <div className="font-bold text-white text-base">{ver.id}</div>
                  <div className="text-xs text-gray-500">Released: {new Date(ver.releaseTime).toLocaleDateString()}</div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1f242e] hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-semibold text-xs transition-colors">
                <Download className="w-4 h-4" />
                Install
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
