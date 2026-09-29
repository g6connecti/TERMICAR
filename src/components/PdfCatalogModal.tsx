import { useState } from 'react';
import { X, FileDown, BookOpen, Check, Printer, Share2 } from 'lucide-react';
import { COMPANY_INFO, PRODUCTS_DATA } from '../data/products';

interface PdfCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PdfCatalogModal({ isOpen, onClose }: PdfCatalogModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);

    setTimeout(() => {
      // Create a formatted printable technical catalog document
      const catalogData = `TERMICAR INDÚSTRIA E COMÉRCIO DE AUTO PEÇAS LTDA.
CATÁLOGO TÉCNICO OFICIAL DE PEÇAS - EDIÇÃO INDUSTRIAL
Fundada em 1969 | São Paulo - SP - Brasil
Rua Princesa Maria Pia, 100 - Bairro Santa Clara - CEP 03274-120
Tel: (11) 2301-0277 | E-mail: termicar@termicar.com.br
================================================================================

ÍNDICE TÉCNICO DE PRODUTOS TERMICAR:

SEÇÃO 1: TERMINAIS ARTICULADOS ESFÉRICOS (DIN 71802)
${PRODUCTS_DATA.filter((p) => p.category === 'terminais')
  .map(
    (p) =>
      `• [${p.code}] ${p.name}\n  Rosca: ${p.thread}\n  Material: ${p.material}\n  Norma: ${p.norm}\n  Ref OEM: ${p.oemReference || 'N/A'}\n  Aplicações: ${p.application.join(', ')}`
  )
  .join('\n\n')}

--------------------------------------------------------------------------------
SEÇÃO 2: PINOS ESFÉRICOS E RETENTORES
${PRODUCTS_DATA.filter((p) => p.category === 'pinos')
  .map(
    (p) =>
      `• [${p.code}] ${p.name}\n  Encaixe: ${p.thread}\n  Material: ${p.material}\n  Norma: ${p.norm}\n  Ref OEM: ${p.oemReference || 'N/A'}\n  Aplicações: ${p.application.join(', ')}`
  )
  .join('\n\n')}

--------------------------------------------------------------------------------
SEÇÃO 3: ESTICADORES E TIRANTES REGULÁVEIS
${PRODUCTS_DATA.filter((p) => p.category === 'esticadores')
  .map(
    (p) =>
      `• [${p.code}] ${p.name}\n  Rosca/Ajuste: ${p.thread}\n  Material: ${p.material}\n  Ref OEM: ${p.oemReference || 'N/A'}\n  Aplicações: ${p.application.join(', ')}`
  )
  .join('\n\n')}

--------------------------------------------------------------------------------
SEÇÃO 4: PARAFUSOS OCOS, NIPLES E PEÇAS ESPECIAIS
${PRODUCTS_DATA.filter((p) => p.category === 'parafusos' || p.category === 'especiais')
  .map(
    (p) =>
      `• [${p.code}] ${p.name}\n  Especificação: ${p.thread}\n  Material: ${p.material}\n  Ref OEM: ${p.oemReference || 'N/A'}\n  Aplicações: ${p.application.join(', ')}`
  )
  .join('\n\n')}

================================================================================
INFORMAÇÕES COMERCIAIS & PEDIDOS:
Fábrica / Televendas: (11) 2301-0277
E-mail: termicar@termicar.com.br
Atendimento a frotas, oficinas, retíficas e distribuidores em todo o território nacional.
© 1969 - ${new Date().getFullYear()} Termicar Indústria de Auto Peças. Todos os direitos reservados.`;

      const blob = new Blob([catalogData], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Catalogo-Oficial-Termicar-AutoPecas.txt`;
      link.click();
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloaded(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl z-10 my-8">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-red-500" />
            <h3 className="text-base font-bold text-white">
              Catálogo Oficial de Peças Termicar
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {/* Catalog Graphic representation */}
            <div className="w-36 h-48 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 border border-slate-700 shadow-xl p-4 flex flex-col justify-between shrink-0 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-red-600/20 rounded-full blur-xl" />
              <div>
                <div className="h-10 w-10 rounded-lg bg-white p-1 mb-2 shadow">
                  <img src="/termicar.png" alt="Termicar" className="h-full w-full object-contain" />
                </div>
                <div className="font-display font-black text-sm text-white tracking-wider">
                  TERMI<span className="text-red-500">CAR</span>
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">Auto Peças</div>
              </div>
              <div className="space-y-1">
                <div className="h-0.5 w-8 bg-red-500" />
                <div className="text-[11px] font-bold text-white leading-tight">
                  Catálogo Técnico Geral
                </div>
                <div className="text-[9px] text-slate-400 font-mono">Edição Completa</div>
              </div>
              <div className="text-[8px] text-slate-500 font-mono">Desde 1969 · São Paulo</div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white leading-snug">
                Download do Catálogo Técnico com Medidas, Roscas e Códigos OEM
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Documento técnico consolidado contendo a linha integral de terminais esféricos
                articulados (DIN 71802), pinos de engate rápido, esticadores para alternadores de
                linha pesada, parafusos ocos e especificações para montadoras.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>Versão Atualizada</span>
                <span>·</span>
                <span>+500 Códigos</span>
                <span>·</span>
                <span>Pronto para Impressão</span>
              </div>
            </div>
          </div>

          {/* Chapters Outline */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Conteúdo Incluso no Documento:
            </h5>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Terminais Articulados DIN 71802 Forma BS e CS (Roscas M5 a M16)</li>
              <li>Pinos Esféricos para Freio, Alavanca de Embreagem (1618M) e Amortecedores</li>
              <li>Esticadores Mecânicos de Correia para motores Mercedes-Benz, Scania e Volvo</li>
              <li>Parafusos Ocos Simples e Duplos (DIN 7643) e Niples Pneumáticos</li>
              <li>Tabela de Correspondência com Códigos Originais de Montadora</li>
            </ul>
          </div>

          {/* Download Action */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/50 hover:bg-red-500 transition-colors disabled:opacity-75"
            >
              {downloading ? (
                <span>Gerando arquivo...</span>
              ) : downloaded ? (
                <>
                  <Check className="h-4 w-4 text-white" />
                  <span>Download Concluído (Baixar Novamente)</span>
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4" />
                  <span>Baixar Catálogo de Peças (.txt / Dados Técnicos)</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
