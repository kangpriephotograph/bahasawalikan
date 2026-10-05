import React from 'react';
import { ShieldCheck, History, Compass, Lightbulb } from 'lucide-react';

export const HistorySection: React.FC = () => {
  return (
    <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <div className="flex items-center gap-2 text-amber-400 mb-1">
          <History className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-semibold">Latar Belakang Budaya</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-100 font-serif-cinzel">
          Asal-Usul & Sejarah Sandi Basa Walikan Yogyakarta
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-stone-300">
        <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Sandi Gerilya Perang 1940-an</span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Basa Walikan bermula pada masa Agresi Militer Belanda di Yogyakarta. Para pejuang gerilya dan laskar rakyat membutuhkan sandi rahasia agar mata-mata Belanda yang paham bahasa Jawa standar tidak dapat memahami komunikasi taktis mereka.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Compass className="w-4 h-4" />
            <span>Kriptografi Sederhana Hanacaraka</span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Berbeda dengan Basa Walikan Malang yang membalik huruf terbalik (seperti <span className="text-amber-300 font-mono">arema ➔ amera</span>), Basa Walikan Jogja menggunakan sistem substitusi aksara Hanacaraka (baris 1 tukar baris 3, baris 2 tukar baris 4).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Lightbulb className="w-4 h-4" />
            <span>Identitas Bahasa Gaul Khas Jogja</span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Setelah era kemerdekaan, Basa Walikan diadopsi pemuda Malioboro, seniman, dan komunitas lokal. Kata seperti <strong className="text-amber-300 font-mono">Dab</strong> (dari <span className="text-stone-300">Mas</span>) dan <strong className="text-amber-300 font-mono">Dagadu</strong> (dari <span className="text-stone-300">Matamu</span>) menjadi ikon kultural hingga sekarang.
          </p>
        </div>
      </div>
    </div>
  );
};
