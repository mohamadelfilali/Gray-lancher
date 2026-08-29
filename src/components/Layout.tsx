import React from 'react';
import { Home, Layers, Box, Cpu, Shirt, Shield, Settings, Terminal } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'versions', label: 'Versions', icon: Layers },
    { id: 'instances', label: 'Instances', icon: Box },
    { id: 'mods', label: 'Mods & Packs', icon: Cpu },
    { id: 'skins', label: 'Skins & Capes', icon: Shirt },
    { id: 'totems', label: 'Custom Totem', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#0e1013]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#14171d] border-r border-[#222731] flex flex-col justify-between">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-[#222731]">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3 animate-pulse" />
            <span className="font-bold text-lg tracking-wider text-white">CORE<span className="text-emerald-500">MC</span></span>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'text-gray-400 hover:bg-[#1c212b] hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Status Footer */}
        <div className="p-4 border-t border-[#222731] bg-[#111318]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#222731] flex items-center justify-center font-bold text-emerald-400">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-200">Offline Player</span>
              <span className="text-xs text-emerald-500">Ready to Launch</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-[#222731] bg-[#14171d]/50 flex items-center justify-between px-8">
          <div className="text-sm text-gray-400">Environment: <span className="text-gray-200 font-mono">Minecraft 1.21 borderless</span></div>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <span>JVM RAM: 4096MB</span>
            <span>Java 21 (64-Bit)</span>
          </div>
        </header>
        <section className="flex-1 overflow-y-auto p-8 bg-[#0e1013]">
          {children}
        </section>
      </main>
    </div>
  );
};
