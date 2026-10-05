import React from 'react';
import { POPULAR_EXAMPLES } from '../utils/basaWalikan';
import { Sparkles, ArrowRightLeft } from 'lucide-react';

interface QuickExamplesProps {
  onSelect: (word: string) => void;
}

export const QuickExamples: React.FC<QuickExamplesProps> = ({ onSelect }) => {
  return (
    <div className="bg-stone-900/40 border border-stone-800/80 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-sm font-semibold text-stone-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Contoh Kosakata Ikonik Basa Walikan</span>
        </h3>
        <span className="text-xs text-stone-500">Klik untuk langsung mencoba</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {POPULAR_EXAMPLES.slice(0, 10).map((item) => (
          <button
            key={item.original}
            onClick={() => onSelect(item.original)}
            className="group flex flex-col p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-700/60 hover:bg-stone-900 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs font-semibold text-stone-200 group-hover:text-amber-300 transition-colors">
                {item.original}
              </span>
              <ArrowRightLeft className="w-2.5 h-2.5 text-stone-600 group-hover:text-amber-400" />
              <span className="text-xs font-bold text-amber-400">
                {item.walikan}
              </span>
            </div>
            <span className="text-[10px] text-stone-500 line-clamp-1 leading-tight">
              {item.meaning}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
