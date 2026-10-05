import React from 'react';
import { WalikanToken } from '../utils/basaWalikan';
import { ArrowRight, Info } from 'lucide-react';

interface TokenBreakdownProps {
  tokens: WalikanToken[];
  onSelectToken?: (token: WalikanToken) => void;
}

export const TokenBreakdown: React.FC<TokenBreakdownProps> = ({ tokens }) => {
  if (tokens.length === 0) return null;

  // Filter out pure whitespace for compact display, but keep track
  const displayTokens = tokens.filter((t) => t.original !== ' ' && t.original !== '\n');

  if (displayTokens.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-stone-800/80">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-stone-400">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Bedah Konversi Aksara (Karakter per Karakter):</span>
        </div>
        <span className="text-[11px] text-stone-500">
          {displayTokens.filter((t) => t.isChanged).length} aksara dibalik
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
        {displayTokens.map((token) => (
          <div
            key={token.id}
            className={`group inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${
              token.isChanged
                ? 'bg-amber-950/40 border border-amber-800/50 text-amber-200 hover:bg-amber-900/40 hover:border-amber-600'
                : 'bg-stone-900/60 border border-stone-800/60 text-stone-400'
            }`}
            title={`Aturan: ${token.rule}`}
          >
            {/* Original with Aksara if applicable */}
            <span className="font-mono font-medium text-stone-300">
              {token.original}
            </span>

            {token.aksaraOriginal && (
              <span className="font-jawa text-[11px] text-amber-500/80">
                {token.aksaraOriginal}
              </span>
            )}

            <ArrowRight className="w-2.5 h-2.5 text-stone-600 group-hover:text-amber-400 transition-colors" />

            {/* Converted with Aksara */}
            <span className="font-mono font-bold text-amber-400">
              {token.converted}
            </span>

            {token.aksaraConverted && (
              <span className="font-jawa text-[11px] text-amber-300">
                {token.aksaraConverted}
              </span>
            )}

            {token.rowPair && (
              <span className="text-[9px] text-stone-500 ml-0.5 px-1 py-0.2 bg-stone-950/70 rounded">
                B{token.rowPair}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
