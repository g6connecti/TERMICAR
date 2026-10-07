import { useState } from 'react';
import {
  X,
  Download,
  Laptop,
  Check,
  ArrowRight,
  HardDrive,
  ShieldCheck,
  FileDown,
  Monitor,
  CheckCircle2,
} from 'lucide-react';
import { COMPANY_INFO, PRODUCTS_DATA } from '../data/products';

interface CatalogDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCatalog: () => void;
}

export function CatalogDownloadModal({
  isOpen,
  onClose,
  onNavigateToCatalog,
}: CatalogDownloadModalProps) {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'starting' | 'done'>('idle');

  if (!isOpen) return null;

  const handleDownloadInstaller = () => {
    setDownloadStatus('starting');

    // Trigger direct native download from the site's own public directory
    const link = document.createElement('a');
    link.href = COMPANY_INFO.catalogInstaller.directDownloadUrl;
    link.download = COMPANY_INFO.catalogInstaller.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadStatus('done');
      setTimeout(() => setDownloadStatus('idle'), 4000);
    }, 1200);
  };

  const handleDownloadTechnicalList = () => {
    // Generate text technical catalog as instant alternative
    const catalogData = `TERMICAR INDÚSTRIA E COMÉRCIO DE AUTO PEÇAS LTDA.
CATÁLOGO TÉCNICO OFICIAL DE PEÇAS - EDIÇÃO INDUSTRIAL
Fundada em 1969 | São Paulo - SP - Brasil
Rua Princesa Maria Pia, 100 - Bairro Santa Clara - CEP 03274-120
Tel: ${COMPANY_INFO.contact.phone} | WhatsApp: ${COMPANY_INFO.contact.whatsapp} | E-mail: ${COMPANY_INFO.contact.email}
================================================================================

PRODUTOS EM LINHA DE FABRICAÇÃO:
${PRODUCTS_DATA.map(
  (p) =>
    `• [${p.code}] ${p.name}\n  Categoria: ${p.categoryLabel} | Norma: ${p.norm}\n  Rosca: ${p.thread} | Material: ${p.material}\n  Ref OEM: ${p.oemReference || 'Padrão Montadora'}\n  Aplicações: ${p.application.join(', ')}`
).join('\n\n')}
`;

    const blob = new Blob([catalogData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Catalogo-Termicar-AutoPecas.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/10 text-red-500 border border-red-900/30">
              <Laptop className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Catálogo de Peças Termicar</h3>
              <p className="text-xs text-slate-400">
                Download direto e opções de consulta para a sua oficina ou distribuidora
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Card: Direct Executable Installer from Site Server */}
          <div className="relative rounded-2xl border-2 border-red-600/40 bg-gradient-to-b from-red-950/20 via-slate-950 to-slate-950 p-6 shadow-xl">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-red-600/20 border border-red-500/40 text-red-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              <HardDrive className="h-3.5 w-3.5" />
              <span>Download Direto (.EXE)</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 p-2 shadow-inner">
                <img
                  src="/termicar.png"
                  alt="Termicar"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-red-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Servidor Próprio Termicar · Sem intermediários</span>
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  {COMPANY_INFO.catalogInstaller.fileName}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
                  Instale o programa completo do Catálogo Eletrônico Termicar para consultar
                  offline todas as dimensões, normas DIN, esquemas técnicos, fotos e referências
                  cruzadas de montadoras no seu computador.
                </p>
              </div>
            </div>

            {/* Feature points */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-800/80 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{COMPANY_INFO.catalogInstaller.compatibility}</span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>100% Offline e Rápido</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>1 Clique · Download Direto</span>
              </div>
            </div>

            {/* Action Download Buttons */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadInstaller}
                className="flex-1 flex items-center justify-center gap-2.5 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-950/60 transition-all hover:bg-red-500 active:scale-95 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>
                  {downloadStatus === 'starting'
                    ? 'Iniciando Download Direto...'
                    : downloadStatus === 'done'
                    ? 'Download Iniciado!'
                    : `Baixar ${COMPANY_INFO.catalogInstaller.fileName}`}
                </span>
              </button>

              <a
                href={COMPANY_INFO.catalogInstaller.directDownloadUrl}
                download={COMPANY_INFO.catalogInstaller.fileName}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
              >
                <span>Link Direto de Arquivo</span>
              </a>
            </div>

            {/* Notice explaining self-hosted advantage */}
            <div className="mt-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 p-2.5 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>
                Download hospedado diretamente no site da Termicar. Não requer conta no Google Drive e não exibe avisos de permissão.
              </span>
            </div>
          </div>

          {/* Secondary Option: Browse Online Web Catalog */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-sm font-bold text-white">
                Prefere consultar no navegador sem instalar?
              </div>
              <p className="text-xs text-slate-400">
                Explore nosso catálogo interativo com busca instantânea por código, rosca e montadora.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onNavigateToCatalog();
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-200 hover:border-slate-500 hover:bg-slate-700 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Navegar no Catálogo Online</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Technical Data Sheet Download (.txt) */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Também disponível: Tabela técnica resumida com todas as medidas</span>
            <button
              onClick={handleDownloadTechnicalList}
              className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold cursor-pointer"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>Baixar Resumo (.txt)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
