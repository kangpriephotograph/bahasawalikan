import React, { useState, useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeftRight,
  Copy,
  Check,
  Volume2,
  Trash2,
  Sparkles,
  BookOpen,
  Share2,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { Header } from './components/Header';
import { TokenBreakdown } from './components/TokenBreakdown';
import { HanacarakaMatrix } from './components/HanacarakaMatrix';
import { QuickExamples } from './components/QuickExamples';
import { HistorySection } from './components/HistorySection';
import {
  convertBasaWalikan,
  latinToAksaraJawa,
  POPULAR_EXAMPLES,
} from './utils/basaWalikan';

export default function App() {
  const [inputText, setInputText] = useState<string>('Mas, aku bocah matamu');
  const [activeTab, setActiveTab] = useState<'converter' | 'matrix' | 'vocabulary' | 'history'>('converter');
  const [copied, setCopied] = useState<boolean>(false);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(true);
  const [showAksaraScript, setShowAksaraScript] = useState<boolean>(true);
  const [initialVowelAsHa, setInitialVowelAsHa] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Conversion result
  const { outputText, tokens, stats } = convertBasaWalikan(inputText, { initialVowelAsHa });
  const aksaraOutput = latinToAksaraJawa(outputText);
  const aksaraInput = latinToAksaraJawa(inputText);

  // Copy to clipboard
  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Text to speech
  const handleSpeak = (textToSpeak: string) => {
    if (!('speechSynthesis' in window) || !textToSpeak) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Swap input and output
  const handleSwap = () => {
    if (!outputText) return;
    setInputText(outputText);
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRules={() => setActiveTab('matrix')}
        onOpenHistory={() => setActiveTab('history')}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero Banner / Title */}
        <section className="text-center space-y-3 pt-2 pb-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-xs font-medium text-amber-300">
            <span className="font-jawa text-sm">ꦲꦤꦕꦫꦏ</span>
            <span aria-hidden="true">·</span>
            <span>Sandi Kriptografi Aksara Jawa Yogyakarta</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-100 font-serif-cinzel">
            Basa Walikan
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-stone-400 font-normal">
            Konversi langsung kata dan kalimat menggunakan aturan pasangan aksara Jawa{' '}
            <strong className="text-amber-400 font-mono font-medium">ha-na-ca-ra-ka</strong> ke{' '}
            <strong className="text-amber-400 font-mono font-medium">pa-dha-ja-ya-nya</strong>.
          </p>

          {/* Aturan Khusus Vokal Awal Notice */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-950/30 border border-amber-800/40 text-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>
                <strong className="text-amber-300">Aturan Khusus:</strong> Huruf depan vokal dibaca <em>Ha</em> ➔ <em>Pa</em> (contoh: <button onClick={() => setInputText('aku')} className="text-amber-400 underline font-mono">aku ➔ panyu</button>, <button onClick={() => setInputText('ibu')} className="text-amber-400 underline font-mono">ibu ➔ pisu</button>)
              </span>
            </div>
          </div>
        </section>

        {/* Tab Switching Navigation (Mobile friendly) */}
        <div className="flex sm:hidden items-center justify-center p-1 bg-stone-900/80 border border-stone-800 rounded-xl max-w-sm mx-auto">
          <button
            onClick={() => setActiveTab('converter')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'converter' ? 'bg-amber-500 text-stone-950 font-semibold shadow' : 'text-stone-400'
            }`}
          >
            Penerjemah
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'matrix' ? 'bg-amber-500 text-stone-950 font-semibold shadow' : 'text-stone-400'
            }`}
          >
            Matriks
          </button>
          <button
            onClick={() => setActiveTab('vocabulary')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'vocabulary' ? 'bg-amber-500 text-stone-950 font-semibold shadow' : 'text-stone-400'
            }`}
          >
            Kosakata
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'history' ? 'bg-amber-500 text-stone-950 font-semibold shadow' : 'text-stone-400'
            }`}
          >
            Sejarah
          </button>
        </div>

        {/* Main Content Area based on Active Tab */}
        {activeTab === 'converter' && (
          <div className="space-y-6">
            {/* Primary Interactive Converter Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 relative">
              {/* Card 1: Input Area */}
              <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-lg focus-within:border-amber-700/80 focus-within:ring-1 focus-within:ring-amber-500/30 transition-all">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                        Input Teks (Basa Normal / Walikan)
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {inputText && (
                        <button
                          onClick={handleClear}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                          title="Hapus teks input"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Ketik teks di sini (misal: hi, na, mas, bocah, matamu)..."
                      rows={5}
                      className="w-full bg-transparent text-stone-100 placeholder-stone-600 text-base sm:text-lg focus:outline-none resize-none leading-relaxed"
                    />

                    {/* Aksara Preview for Input */}
                    {showAksaraScript && aksaraInput && (
                      <div className="mt-2 pt-2 border-t border-stone-800/40 text-stone-500 font-jawa text-sm flex items-center gap-2">
                        <span className="text-[10px] text-stone-600 uppercase font-sans">Aksara:</span>
                        <span className="text-stone-400 select-all">{aksaraInput}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-800/60 text-xs text-stone-500 mt-2">
                  <div className="flex items-center gap-2">
                    <span>{stats.words} kata</span>
                    <span aria-hidden="true">·</span>
                    <span>{stats.totalChars} karakter</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeak(inputText)}
                      disabled={!inputText}
                      className="flex items-center gap-1 text-xs text-stone-400 hover:text-amber-300 transition-colors disabled:opacity-40"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengarkan</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Swap Center Button (Desktop & Mobile) */}
              <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 flex justify-center -my-2 lg:my-0">
                <button
                  onClick={handleSwap}
                  className="p-3 rounded-full bg-stone-900 border border-stone-700 hover:border-amber-500 hover:bg-stone-800 text-amber-400 shadow-xl hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  title="Tukar posisi (Konversi Dua Arah)"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>

              {/* Card 2: Output Area */}
              <div className="bg-gradient-to-br from-stone-900/90 to-stone-950 border border-amber-900/40 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                        Hasil Basa Walikan
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        disabled={!outputText}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          copied
                            ? 'bg-emerald-950/60 border border-emerald-600 text-emerald-300'
                            : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border border-stone-700/80 disabled:opacity-40'
                        }`}
                        title="Salin hasil"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleSpeak(outputText)}
                        disabled={!outputText}
                        className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-300 border border-stone-700/80 transition-colors disabled:opacity-40"
                        title="Dengarkan pelafalan Basa Walikan"
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-amber-400 animate-bounce' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Main Converted Text with Animation */}
                  <div className="min-h-[120px] flex flex-col justify-start">
                    {outputText ? (
                      <div className="space-y-3">
                        <motion.div
                          key={outputText}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15 }}
                          className="text-amber-200 text-lg sm:text-2xl font-semibold leading-relaxed tracking-wide select-all break-words"
                        >
                          {outputText}
                        </motion.div>

                        {/* Aksara Jawa Display */}
                        {showAksaraScript && aksaraOutput && (
                          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30">
                            <div className="text-[10px] text-amber-500/70 uppercase tracking-wider mb-0.5">
                              Tampilan Aksara Jawa:
                            </div>
                            <div className="font-jawa text-xl sm:text-2xl text-amber-400 tracking-wider leading-relaxed select-all">
                              {aksaraOutput}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-stone-600 text-sm italic py-8 text-center flex flex-col items-center justify-center gap-2">
                        <Sparkles className="w-6 h-6 text-stone-700" />
                        <span>Ketik teks di sisi kiri untuk melihat hasil Basa Walikan secara langsung</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls & Stats */}
                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-stone-800/60 text-xs text-stone-400 mt-2 gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-stone-200">
                      <input
                        type="checkbox"
                        checked={showBreakdown}
                        onChange={(e) => setShowBreakdown(e.target.checked)}
                        className="rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-0 w-3.5 h-3.5"
                      />
                      <span>Bedah Aksara</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-stone-200">
                      <input
                        type="checkbox"
                        checked={showAksaraScript}
                        onChange={(e) => setShowAksaraScript(e.target.checked)}
                        className="rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-0 w-3.5 h-3.5"
                      />
                      <span>Aksara Jawa</span>
                    </label>

                    <label
                      className="flex items-center gap-1.5 cursor-pointer hover:text-stone-200 text-amber-300/90"
                      title="Aturan khusus: Vokal di awal kata (a, i, u, e, o) dibaca aksara Ha sehingga berpasangan dengan Pa (contoh: aku ➔ panyu, ibu ➔ pisu)"
                    >
                      <input
                        type="checkbox"
                        checked={initialVowelAsHa}
                        onChange={(e) => setInitialVowelAsHa(e.target.checked)}
                        className="rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-0 w-3.5 h-3.5"
                      />
                      <span>Vokal Depan (a ➔ pa, i ➔ pi)</span>
                    </label>
                  </div>

                  <span className="text-[11px] text-stone-500">
                    {stats.changedChars} aksara ditransformasikan
                  </span>
                </div>
              </div>
            </div>

            {/* Token-by-token character breakdown inspection */}
            {showBreakdown && tokens.length > 0 && (
              <TokenBreakdown tokens={tokens} />
            )}

            {/* Quick Vocabulary Presets */}
            <QuickExamples onSelect={(word) => setInputText(word)} />
          </div>
        )}

        {/* Tab: Hanacaraka Matrix */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <HanacarakaMatrix onInsertWord={(word) => {
              setInputText(word);
              setActiveTab('converter');
            }} />
          </div>
        )}

        {/* Tab: Vocabulary */}
        {activeTab === 'vocabulary' && (
          <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-stone-100 font-serif-cinzel">
                  Kamus Kosakata Populer Basa Walikan
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Istilah sehari-hari yang sangat sering digunakan dalam pergaulan di Yogyakarta.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('converter')}
                className="text-xs text-amber-400 hover:underline self-start sm:self-auto"
              >
                Coba terjemahkan teks bebas &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {POPULAR_EXAMPLES.map((item) => (
                <div
                  key={item.original}
                  className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 hover:border-amber-800/60 flex flex-col justify-between gap-3 group transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-stone-200">
                        {item.original}
                      </div>
                      <div className="text-xs text-stone-500 font-jawa mt-0.5">
                        {latinToAksaraJawa(item.original)}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-amber-400 font-mono">
                        {item.walikan}
                      </div>
                      <div className="text-xs text-amber-500/70 font-jawa mt-0.5">
                        {latinToAksaraJawa(item.walikan)}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-stone-400 border-t border-stone-800/60 pt-2 flex items-center justify-between">
                    <span className="line-clamp-1">{item.meaning}</span>
                    <button
                      onClick={() => {
                        setInputText(item.original);
                        setActiveTab('converter');
                      }}
                      className="text-[11px] text-amber-400 hover:text-amber-300 ml-2 whitespace-nowrap"
                    >
                      Gunakan &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: History */}
        {activeTab === 'history' && (
          <HistorySection />
        )}
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-stone-800/80 py-6 mt-12 bg-stone-950/90 text-stone-500 text-xs text-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-300 font-serif-cinzel">Basa Walikan</span>
            <span aria-hidden="true">·</span>
            <span>Kriptografi Aksara Jawa Yogyakarta</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>h-n-c-r-k ⇄ p-dh-j-y-ny</span>
            <span aria-hidden="true">·</span>
            <span>d-t-s-w-l ⇄ m-g-b-th-ng</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
