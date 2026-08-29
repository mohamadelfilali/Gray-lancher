import React from 'react';
import { Play, Activity, Server, Cpu } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Banner Area */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#171b22] to-[#1a202c] border border-[#262c38] p-8 overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active Instance
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Minecraft 1.20.4</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Fabric Loader 0.15.7 • 12 Mods Installed • Custom Totem Active
          </p>

          <div className="pt-4 flex items-center gap-4">
            <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg shadow-lg shadow-emerald-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Play className="w-6 h-6 fill-current" />
              PLAY NOW
            </button>
          </div>
        </div>
      </div>

      {/* System Quick Status Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-[#14171d] border border-[#222731] space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-medium">Memory Allocation</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white">4.0 / 8.0 GB</div>
          <div className="w-full h-1.5 bg-[#222731] rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-emerald-500" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#14171d] border border-[#222731] space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-medium">Java Runtime</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white">OpenJDK 21.0.2</div>
          <div className="text-xs text-emerald-500">Auto-detected for 1.20.4</div>
        </div>

        <div className="p-5 rounded-xl bg-[#14171d] border border-[#222731] space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-medium">Last Session</span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white">2.4 Hours</div>
          <div className="text-xs text-gray-500">No Crashes Detected</div>
        </div>
      </div>
    </div>
  );
};
