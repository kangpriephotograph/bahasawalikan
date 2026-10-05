import React, { useState } from 'react';
import { HANACARAKA_PAIRS, HanacarakaPair } from '../utils/basaWalikan';
import { ArrowLeftRight, Check, Sparkles } from 'lucide-react';

interface HanacarakaMatrixProps {
  onInsertWord?: (word: string) => void;
}

export const HanacarakaMatrix: React.FC<HanacarakaMatrixProps> = ({ onInsertWord }) => {
  const [selectedPair, setSelectedPair] = useState<HanacarakaPair | null>(null);

  const group1_3 = HANACARAKA_PAIRS.filter((p) => p.group === '1 ⇄ 3');
  const group2_4 = HANACARAKA_PAIRS.filter((p) => p.group === '2 ⇄ 4');

  return (
    <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-stone-100 font-serif-cinzel flex items-center gap-2">
            <span>Matriks Pasangan Aksara Jawa Hanacaraka</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            20 carakan dasar dibagi 4 baris, di mana Baris 1 berpasangan dengan Baris 3, dan Baris 2 berpasangan dengan Baris 4.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span>Involusi (Bisa dibolak-balik dua arah)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Kelompok 1 & 3 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Pasangan Baris 1 ⇄ Baris 3
            </span>
            <span className="text-[11px] text-stone-500">
              ha-na-ca-ra-ka ⇄ pa-dha-ja-ya-nya
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {group1_3.map((pair) => {
              const isSelected = selectedPair?.char1 === pair.char1;
              return (
                <button
                  key={pair.char1}
                  onClick={() => {
                    setSelectedPair(pair);
                    if (onInsertWord) onInsertWord(pair.nama1);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 relative ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/30 text-amber-200'
                      : 'bg-stone-950/70 border-stone-800 hover:border-amber-700/60 hover:bg-stone-900/80 text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 w-full">
                    {/* Left Char */}
                    <div className="flex flex-col items-center">
                      <span className="font-jawa text-lg text-amber-400 leading-tight">
                        {pair.aksara1}
                      </span>
                      <span className="font-mono text-xs font-bold text-stone-200">
                        {pair.char1}
                      </span>
                    </div>

                    <ArrowLeftRight className="w-3 h-3 text-stone-600 shrink-0" />

                    {/* Right Char */}
                    <div className="flex flex-col items-center">
                      <span className="font-jawa text-lg text-amber-400 leading-tight">
                        {pair.aksara2}
                      </span>
                      <span className="font-mono text-xs font-bold text-stone-200">
                        {pair.char2}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-stone-400 font-medium mt-1">
                    {pair.nama1} ⇄ {pair.nama2}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Kelompok 2 & 4 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Pasangan Baris 2 ⇄ Baris 4
            </span>
            <span className="text-[11px] text-stone-500">
              da-ta-sa-wa-la ⇄ ma-ga-ba-tha-nga
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {group2_4.map((pair) => {
              const isSelected = selectedPair?.char1 === pair.char1;
              return (
                <button
                  key={pair.char1}
                  onClick={() => {
                    setSelectedPair(pair);
                    if (onInsertWord) onInsertWord(pair.nama1);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 relative ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/30 text-amber-200'
                      : 'bg-stone-950/70 border-stone-800 hover:border-amber-700/60 hover:bg-stone-900/80 text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 w-full">
                    {/* Left Char */}
                    <div className="flex flex-col items-center">
                      <span className="font-jawa text-lg text-amber-400 leading-tight">
                        {pair.aksara1}
                      </span>
                      <span className="font-mono text-xs font-bold text-stone-200">
                        {pair.char1}
                      </span>
                    </div>

                    <ArrowLeftRight className="w-3 h-3 text-stone-600 shrink-0" />

                    {/* Right Char */}
                    <div className="flex flex-col items-center">
                      <span className="font-jawa text-lg text-amber-400 leading-tight">
                        {pair.aksara2}
                      </span>
                      <span className="font-mono text-xs font-bold text-stone-200">
                        {pair.char2}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-stone-400 font-medium mt-1">
                    {pair.nama1} ⇄ {pair.nama2}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Aturan Khusus Vokal Depan */}
      <div className="mt-6 pt-5 border-t border-stone-800/80 bg-amber-950/20 border border-amber-900/30 rounded-xl p-4 sm:p-5">
        <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Aturan Khusus: Vokal Depan & Huruf Mandiri (Dibaca Aksara Ha ꦲ ⇄ Pa ꦥ)</span>
        </h4>
        <p className="text-xs text-stone-300 leading-relaxed mb-3">
          Dalam aksara Jawa tidak terdapat huruf vokal mandiri Latin; vokal di awal kata ditulis menggunakan aksara dasar <strong className="text-amber-300 font-jawa">ꦲ (Ha)</strong> dengan sandhangan swara. Karena aksara <strong className="text-amber-300">Ha</strong> berpasangan dengan <strong className="text-amber-300">Pa</strong>, maka huruf vokal depan dikonversi sebagai berikut:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-stone-900/80 border border-amber-900/40 text-center">
            <span className="font-bold text-amber-300 block text-sm">a ⇄ pa</span>
            <span className="text-[11px] text-stone-400">contoh: <strong className="text-stone-200">aku</strong> ➔ <strong className="text-amber-400">panyu</strong></span>
          </div>
          <div className="p-2 rounded-lg bg-stone-900/80 border border-amber-900/40 text-center">
            <span className="font-bold text-amber-300 block text-sm">i ⇄ pi</span>
            <span className="text-[11px] text-stone-400">contoh: <strong className="text-stone-200">ibu</strong> ➔ <strong className="text-amber-400">pisu</strong></span>
          </div>
          <div className="p-2 rounded-lg bg-stone-900/80 border border-amber-900/40 text-center">
            <span className="font-bold text-amber-300 block text-sm">u ⇄ pu</span>
            <span className="text-[11px] text-stone-400">contoh: <strong className="text-stone-200">udan</strong> ➔ <strong className="text-amber-400">pumadh</strong></span>
          </div>
          <div className="p-2 rounded-lg bg-stone-900/80 border border-amber-900/40 text-center">
            <span className="font-bold text-amber-300 block text-sm">e ⇄ pe</span>
            <span className="text-[11px] text-stone-400">contoh: <strong className="text-stone-200">enak</strong> ➔ <strong className="text-amber-400">pedhany</strong></span>
          </div>
          <div className="p-2 rounded-lg bg-stone-900/80 border border-amber-900/40 text-center">
            <span className="font-bold text-amber-300 block text-sm">o ⇄ po</span>
            <span className="text-[11px] text-stone-400">contoh: <strong className="text-stone-200">omah</strong> ➔ <strong className="text-amber-400">podap</strong></span>
          </div>
        </div>
      </div>

      {/* Filosofi Ajisaka Card */}
      <div className="mt-6 pt-5 border-t border-stone-800/80 bg-stone-950/50 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Filosofi Aksara Jawa Hanacaraka</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs text-stone-400">
          <div className="p-2.5 rounded-lg bg-stone-900/50 border border-stone-800/60">
            <span className="font-semibold text-amber-300 block font-jawa text-sm mb-0.5">
              ꦲꦤꦕꦫꦏ (Ha-Na-Ca-Ra-Ka)
            </span>
            <span className="text-[11px] text-stone-400">
              "Ana utusan" (Ada dua orang utusan setia: Dora dan Sembada)
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-stone-900/50 border border-stone-800/60">
            <span className="font-semibold text-amber-300 block font-jawa text-sm mb-0.5">
              ꦢꦠꦱꦮꦭ (Da-Ta-Sa-Wa-La)
            </span>
            <span className="text-[11px] text-stone-400">
              "Padha pasulayan" (Keduanya saling berselisih menjaga titah pusaka)
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-stone-900/50 border border-stone-800/60">
            <span className="font-semibold text-amber-300 block font-jawa text-sm mb-0.5">
              ꦥꦝꦗꦪꦚ (Pa-Dha-Ja-Ya-Nya)
            </span>
            <span className="text-[11px] text-stone-400">
              "Padha digjayane" (Keduanya sama-sama tangguh, sakti, dan setia)
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-stone-900/50 border border-stone-800/60">
            <span className="font-semibold text-amber-300 block font-jawa text-sm mb-0.5">
              ꦩꦒꦧꦛꦔ (Ma-Ga-Ba-Tha-Nga)
            </span>
            <span className="text-[11px] text-stone-400">
              "Padha dadi bathang" (Keduanya akhirnya sama-sama gugur sebagai ksatria)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
