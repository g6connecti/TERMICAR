import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="inline-flex items-center transition-transform hover:scale-105"
              aria-label="Termicar - Início"
            >
              <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-md ring-1 ring-slate-800">
                <img
                  src="/termicar.png"
                  alt="Logomarca Termicar"
                  className="h-full w-full object-contain"
                />
              </div>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Indústria e Comércio de Auto Peças fundada em 1969 em São Paulo/SP. Fabricação especializada
              em terminais articulados, pinos esféricos, esticadores e componentes para veículos pesados
              e utilitários.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              CNPJ: {COMPANY_INFO.cnpj}
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#empresa" className="hover:text-white transition-colors">
                  A Empresa (História 1969)
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Catálogo de Peças
                </a>
              </li>
              <li>
                <a href="#aplicacoes" className="hover:text-white transition-colors">
                  Montadoras & Frotas
                </a>
              </li>
              <li>
                <a href="#sob-medida" className="hover:text-white transition-colors">
                  Usinagem Sob Medida
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">
                  Fale Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Product Lines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Linhas de Produtos
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Terminais Articulados DIN 71802
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Pinos Esféricos e Rótulas
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Esticadores para Alternadores
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Parafusos Ocos & Buchas
                </a>
              </li>
              <li>
                <a href="#sob-medida" className="hover:text-white transition-colors">
                  Peças Conforme Amostra / Desenho
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Atendimento de Fábrica
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 font-mono font-medium">
                {COMPANY_INFO.contact.phone}
              </p>
              <p className="text-slate-400 font-mono">
                {COMPANY_INFO.contact.email}
              </p>
              <p className="text-slate-400 leading-snug">
                Rua Princesa Maria Pia, 100 - Bairro Santa Clara - São Paulo/SP - CEP 03274-120
              </p>
              <p className="text-slate-500 pt-1">
                {COMPANY_INFO.contact.hours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 1969 – {new Date().getFullYear()} {COMPANY_INFO.name}. Todos os direitos reservados.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
