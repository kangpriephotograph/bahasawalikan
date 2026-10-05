import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenRules: () => void;
  onOpenHistory: () => void;
  activeTab: 'converter' | 'matrix' | 'vocabulary' | 'history';
  setActiveTab: (tab: 'converter' | 'matrix' | 'vocabulary' | 'history') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="border-b border-stone-800 bg-stone-950/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('converter')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-900/30 font-jawa text-lg leading-none">
              ꦲ
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-stone-100 font-serif-cinzel">
                Basa Walikan
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('converter')}
            className={`transition-colors py-1 ${
              activeTab === 'converter'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Penerjemah
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`transition-colors py-1 ${
              activeTab === 'matrix'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Tabel Hanacaraka
          </button>
          <button
            onClick={() => setActiveTab('vocabulary')}
            className={`transition-colors py-1 ${
              activeTab === 'vocabulary'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Kosakata Ikonik
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`transition-colors py-1 ${
              activeTab === 'history'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Sejarah Sandi
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('matrix')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-800/60 rounded-lg hover:bg-amber-900/40 hover:border-amber-700 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Aturan</span> Aksara
          </button>
        </div>
      </div>
    </header>
  );
};
