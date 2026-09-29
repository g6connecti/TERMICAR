import { useState, useEffect } from 'react';
import {
  X,
  Download,
  Laptop,
  ExternalLink,
  Check,
  Settings,
  ArrowRight,
  HardDrive,
  ShieldCheck,
  FileDown,
} from 'lucide-react';
import { COMPANY_INFO, PRODUCTS_DATA } from '../data/products';
import { getGoogleDriveDirectDownloadUrl } from '../utils/googleDrive';

interface CatalogDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCatalog: () => void;
}

const STORAGE_KEY = 'termicar_catalog_installer_drive_url';

export function CatalogDownloadModal({
  isOpen,
  onClose,
  onNavigateToCatalog,
}: CatalogDownloadModalProps) {
  const [driveUrlInput, setDriveUrlInput] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'starting' | 'done'>('idle');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load saved Google Drive link from localStorage or fallback to default
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setDriveUrlInput(saved);
    } else {
      setDriveUrlInput(
        import.meta.env.VITE_CATALOG_DRIVE_URL || COMPANY_INFO.catalogInstaller.driveUrl
      );
    }
  }, []);

  if (!isOpen) return null;

  const currentDriveDirectUrl = getGoogleDriveDirectDownloadUrl(driveUrlInput);
  const isDefaultPlaceholder =
    !driveUrlInput ||
    driveUrlInput.includes('YOUR_DRIVE_FILE_ID') ||
    driveUrlInput.includes('YOUR_GOOGLE_DRIVE_FILE_ID');

  const handleSaveDriveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveUrlInput.trim()) return;

    localStorage.setItem(STORAGE_KEY, driveUrlInput.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    setIsConfiguring(false);
  };

  const handleDownloadInstaller = () => {
    if (isDefaultPlaceholder) {
      // If still placeholder, prompt configuration
      setIsConfiguring(true);
      return;
    }

    setDownloadStatus('starting');

    // Create a temporary link to trigger the direct download from Google Drive
    const directUrl = getGoogleDriveDirectDownloadUrl(driveUrlInput);
    const link = document.createElement('a');
    link.href = directUrl;
    link.download = COMPANY_INFO.catalogInstaller.fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadStatus('done');
      setTimeout(() => setDownloadStatus('idle'), 4000);
    }, 1500);
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
                Escolha como deseja consultar nossa linha de autopeças
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Card: Executable Installer */}
          <div className="relative rounded-2xl border-2 border-red-600/40 bg-gradient-to-b from-red-950/20 via-slate-950 to-slate-950 p-6 shadow-xl">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-red-600/20 border border-red-500/40 text-red-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              <HardDrive className="h-3.5 w-3.5" />
              <span>Instalador Windows (.EXE)</span>
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
                <div className="text-xs font-bold text-red-400 font-mono uppercase tracking-wider">
                  Download Oficial Google Drive
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  {COMPANY_INFO.catalogInstaller.fileName}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
                  Instale o programa completo do Catálogo Eletrônico Termicar para consultar
                  offline todas as dimensões, normas DIN, esquemas técnicos, fotos e referências
                  cruzadas de montadoras.
                </p>
              </div>
            </div>

            {/* Feature points */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-800/80 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Arquivo Seguro (.exe)</span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Consulta Rápida Offline</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Atualizado para 2026</span>
              </div>
            </div>

            {/* Action Download Button */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadInstaller}
                className="flex-1 flex items-center justify-center gap-2.5 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-950/60 transition-all hover:bg-red-500 active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span>
                  {downloadStatus === 'starting'
                    ? 'Iniciando Download...'
                    : downloadStatus === 'done'
                    ? 'Download Iniciado!'
                    : `Baixar ${COMPANY_INFO.catalogInstaller.fileName}`}
                </span>
              </button>

              <button
                onClick={() => setIsConfiguring(!isConfiguring)}
                title="Configurar Link do Google Drive"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-xs font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                <span>{isConfiguring ? 'Fechar Link' : 'Configurar Link Drive'}</span>
              </button>
            </div>

            {/* Notice if still using placeholder or direct link info */}
            {isDefaultPlaceholder && !isConfiguring && (
              <div className="mt-3 rounded-lg bg-amber-950/30 border border-amber-800/40 p-2.5 text-xs text-amber-300 flex items-center justify-between">
                <span>
                  Você pode colar o link compartilhado do seu arquivo no Google Drive para download imediato.
                </span>
                <button
                  onClick={() => setIsConfiguring(true)}
                  className="font-bold underline ml-2 whitespace-nowrap"
                >
                  Informar Link
                </button>
              </div>
            )}

            {/* Configuration Panel for Google Drive URL */}
            {isConfiguring && (
              <form
                onSubmit={handleSaveDriveUrl}
                className="mt-4 rounded-xl border border-slate-700 bg-slate-900/90 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-200">
                    Link do Arquivo no Google Drive:
                  </div>
                  {saveSuccess && (
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="h-3 w-3" /> Link salvo com sucesso!
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Cole o link de compartilhamento do Google Drive (ex: <code className="text-slate-300">https://drive.google.com/file/d/SEU_ID/view</code> ou o ID do arquivo). O sistema converte automaticamente para download direto!
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={driveUrlInput}
                    onChange={(e) => setDriveUrlInput(e.target.value)}
                    placeholder="Cole aqui o link do Google Drive (ex: https://drive.google.com/file/d/...)"
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-red-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            )}
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
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-200 hover:border-slate-500 hover:bg-slate-700 hover:text-white transition-colors whitespace-nowrap"
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
              className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold"
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
            className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
