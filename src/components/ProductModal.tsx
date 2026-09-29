import { useState } from 'react';
import { X, Check, ShoppingCart, Shield, FileText, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product, quantity: number) => void;
  isInQuote: boolean;
}

export function ProductModal({ product, onClose, onAddToQuote, isInQuote }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToQuote(product, quantity);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(product.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl z-10 my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-red-400 bg-red-950/50 px-2.5 py-1 rounded border border-red-800/60">
              {product.code}
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              {product.categoryLabel}
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Fechar janela"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Visual Column */}
          <div className="flex flex-col space-y-4">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 relative group">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes('terminals.jpg')) {
                    target.src = '/images/terminals.jpg';
                  }
                }}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm border border-slate-700 rounded px-2 py-0.5 text-[11px] font-mono text-slate-300">
                Padrão Termicar 1969
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>Garantia de Qualidade Termicar</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Produzida sob rigorosos parâmetros dimensionais, usinagem CNC de precisão e acabamento
                anticorrosivo para máxima vida útil em regime severo de transporte.
              </p>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical Attributes Table */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Especificações Técnicas
                </h4>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Rosca / Medida:</span>
                    <span className="font-mono text-slate-200 font-medium">{product.thread}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Material:</span>
                    <span className="text-slate-200 font-medium text-right">{product.material}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Acabamento:</span>
                    <span className="text-slate-200 font-medium text-right">{product.coating}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Norma Técnica:</span>
                    <span className="font-mono text-slate-200 font-medium">{product.norm}</span>
                  </div>
                  {product.oemReference && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Ref. Original (OEM):</span>
                      <span className="font-mono text-red-400 font-medium text-right">{product.oemReference}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Applications */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Montadoras & Aplicações
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.vehicleBrands.map((brand, i) => (
                    <span
                      key={i}
                      className="text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-slate-400">
                  {product.application.join(' · ')}
                </div>
              </div>
            </div>

            {/* Bottom Actions & Quantity */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-slate-700 bg-slate-950 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 rounded text-sm font-bold text-slate-300 hover:bg-slate-800"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-mono text-sm font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 rounded text-sm font-bold text-slate-300 hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-950/40 hover:bg-red-500 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>
                    {isInQuote ? 'Atualizar no Orçamento' : 'Adicionar ao Orçamento'}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <button
                  onClick={handleCopyCode}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <FileText className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Código copiado!' : `Copiar código (${product.code})`}</span>
                </button>
                <span>Fabricação com entrega para todo o Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
