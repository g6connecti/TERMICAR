import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, Cog, Truck, Award, Download } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface HeroProps {
  onSearch: (query: string) => void;
  onOpenQuoteModal: () => void;
  onOpenCatalogModal: () => void;
}

export function Hero({ onSearch, onOpenQuoteModal, onOpenCatalogModal }: HeroProps) {
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      onSearch(localSearch.trim());
      const el = document.getElementById('produtos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-slate-800 bg-slate-950">
      {/* Background Media with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="Parque fabril Termicar de autopeças usinadas"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/hero_automotive_factory_1790651232441.jpg';
          }}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-30 brightness-75 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Subtle Top Marker without pill badge */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-500">
            <span>Indústria 100% Brasileira</span>
            <span aria-hidden="true">·</span>
            <span>Desde 1969</span>
            <span aria-hidden="true">·</span>
            <span>São Paulo / SP</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white [text-wrap:balance]">
            Precisão e durabilidade para a linha pesada{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
              há mais de 55 anos.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Fabricação seriada e sob medida de terminais articulados, pinos esféricos,
            esticadores para alternadores e peças usinadas de alta resistência mecânica para caminhões,
            ônibus e veículos utilitários.
          </p>

          {/* Quick Search Bar inside Hero */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Busque por código (ex: T 153, DIN 71802) ou aplicação..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 py-3.5 pl-12 pr-32 text-sm text-white placeholder-slate-400 shadow-xl focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="absolute right-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-red-500"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenCatalogModal}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-950/50 transition-all hover:bg-red-500 hover:gap-3 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Ver Catálogo de Peças</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-bold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800"
            >
              <span>Solicitar Orçamento Direto</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-8 sm:grid-cols-4 lg:gap-8">
          {COMPANY_INFO.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200">{stat.label}</div>
              <div className="text-xs text-slate-400">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
