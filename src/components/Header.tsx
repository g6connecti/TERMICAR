import { useState } from 'react';
import { Menu, X, FileDown, ShoppingCart, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface HeaderProps {
  quoteCount: number;
  onOpenQuoteModal: () => void;
  onOpenPdfModal?: () => void;
}

export function Header({ quoteCount, onOpenQuoteModal, onOpenPdfModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Official Termicar Logomarca in Upper-Left Corner */}
        <a
          href="#"
          className="group flex items-center transition-transform duration-200 hover:scale-105"
          aria-label="Termicar - Início"
        >
          <div className="flex h-12 w-14 sm:h-14 sm:w-16 items-center justify-center rounded-xl bg-white p-1 shadow-lg shadow-black/50 ring-1 ring-slate-800">
            <img
              src="/termicar.png"
              alt="Logomarca Termicar"
              className="h-full w-full object-contain"
            />
          </div>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#inicio" className="transition-colors hover:text-white">
            Início
          </a>
          <a href="#empresa" className="transition-colors hover:text-white">
            A Empresa
          </a>
          <a href="#produtos" className="transition-colors hover:text-white">
            Produtos
          </a>
          <a href="#aplicacoes" className="transition-colors hover:text-white">
            Aplicações
          </a>
          <a href="#sob-medida" className="transition-colors hover:text-white">
            Sob Medida
          </a>
          <a href="#contato" className="transition-colors hover:text-white">
            Contato
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuoteModal}
            className="relative inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:bg-red-500 active:scale-95 whitespace-nowrap"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Orçamento</span>
            {quoteCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-red-600 tabular-nums">
                {quoteCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex lg:hidden items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 pt-2 text-base font-medium text-slate-200">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900"
            >
              Início
            </a>
            <a
              href="#empresa"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900"
            >
              A Empresa (Desde 1969)
            </a>
            <a
              href="#produtos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900"
            >
              Catálogo de Produtos
            </a>
            <a
              href="#aplicacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900"
            >
              Aplicações por Montadora
            </a>
            <a
              href="#sob-medida"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900"
            >
              Peças Sob Medida
            </a>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900"
            >
              Fale Conosco
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            {onOpenPdfModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPdfModal?.();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 py-2.5 text-sm font-semibold text-slate-200"
              >
                <FileDown className="h-4 w-4 text-red-400" />
                <span>Baixar Catálogo Técnico Completo</span>
              </button>
            )}
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-800 py-2.5 text-sm font-semibold text-slate-200"
            >
              <Phone className="h-4 w-4 text-red-400" />
              <span>Ligar: {COMPANY_INFO.contact.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
