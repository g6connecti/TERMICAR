import { useState, useMemo } from 'react';
import { Search, Filter, Plus, Check, Eye, FileSpreadsheet, ArrowUpDown, Download } from 'lucide-react';
import { Product, PRODUCTS_DATA, CATEGORIES, VEHICLE_BRANDS } from '../data/products';

interface CatalogSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToQuote: (product: Product, quantity: number) => void;
  quoteProductIds: string[];
  onOpenCatalogDownloadModal?: () => void;
}

export function CatalogSection({
  searchQuery,
  onSearchChange,
  onSelectProduct,
  onAddToQuote,
  quoteProductIds,
  onOpenCatalogDownloadModal,
}: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todos');

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // Category match
      if (selectedCategory !== 'todos' && product.category !== selectedCategory) {
        return false;
      }

      // Brand match
      if (selectedBrand !== 'Todos') {
        const matchesBrand = product.vehicleBrands.some(
          (b) => b.toLowerCase() === selectedBrand.toLowerCase()
        );
        if (!matchesBrand) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesCode = product.code.toLowerCase().includes(query);
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesNorm = product.norm.toLowerCase().includes(query);
        const matchesThread = product.thread.toLowerCase().includes(query);
        const matchesOem = product.oemReference?.toLowerCase().includes(query);
        const matchesApp = product.application.some((app) => app.toLowerCase().includes(query));
        const matchesVehicle = product.vehicleBrands.some((b) => b.toLowerCase().includes(query));

        return (
          matchesCode ||
          matchesName ||
          matchesDesc ||
          matchesNorm ||
          matchesThread ||
          matchesOem ||
          matchesApp ||
          matchesVehicle
        );
      }

      return true;
    });
  }, [selectedCategory, selectedBrand, searchQuery]);

  return (
    <section id="produtos" className="py-20 border-b border-slate-800 bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">
              <span>Catálogo Técnico de Peças</span>
              <span aria-hidden="true">·</span>
              <span>Linha Pesada & Utilitários</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Peças de Alta Performance Mecânica
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Consulte especificações dimensionais de fábrica, roscas, tratamentos e aplicações
              veiculares para reposição imediata e projetos sob medida.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <div className="text-right">
              <span className="text-xs text-slate-400">Total listado:</span>
              <div className="text-xl font-bold font-mono text-white tabular-nums">
                {filteredProducts.length}{' '}
                <span className="text-xs font-normal text-slate-400">
                  {filteredProducts.length === 1 ? 'item' : 'itens'}
                </span>
              </div>
            </div>
            {onOpenCatalogDownloadModal && (
              <button
                onClick={onOpenCatalogDownloadModal}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-900/50 hover:text-white transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Baixar Instalador .EXE</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls (Segmented Tabs & Brand Dropdown) */}
        <div className="space-y-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950/40'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Brand Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filtrar por código (T 101, T 153), rosca (M8, M10), modelo ou OEM..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-xs text-slate-400 whitespace-nowrap">Montadora:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-xs sm:text-sm text-white focus:border-red-500 focus:outline-none"
              >
                {VEHICLE_BRANDS.map((brand) => (
                  <option key={brand} value={brand} className="bg-slate-900 text-white">
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-12 text-center space-y-3">
            <p className="text-base font-semibold text-slate-300">
              Nenhuma peça encontrada com os filtros informados.
            </p>
            <p className="text-xs text-slate-500">
              A Termicar fabrica mais de 500 itens e também desenvolve peças conforme sua amostra ou desenho técnico.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setSelectedBrand('Todos');
                  onSearchChange('');
                }}
                className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                Redefinir Filtros
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inQuote = quoteProductIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/80 transition-all duration-200 hover:border-slate-700 hover:shadow-xl hover:shadow-black/50 overflow-hidden"
                >
                  {/* Card Visual Header */}
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (!target.src.includes('terminals.jpg')) {
                            target.src = '/images/terminals.jpg';
                          }
                        }}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold bg-slate-950/90 text-red-400 px-2.5 py-1 rounded border border-red-900/50 backdrop-blur-sm">
                          {product.code}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2 text-[10px] font-mono bg-slate-950/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        {product.norm}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 space-y-2.5">
                      <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                        {product.categoryLabel}
                      </div>

                      <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Technical Specs Summary */}
                      <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Rosca/Encaixe:</span>
                          <span className="font-mono text-slate-300 font-medium truncate max-w-[140px]">
                            {product.thread}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Acabamento:</span>
                          <span className="text-slate-300 truncate max-w-[140px]">
                            {product.coating}
                          </span>
                        </div>
                        {product.oemReference && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Ref. OEM:</span>
                            <span className="font-mono text-red-400 font-medium truncate max-w-[140px]">
                              {product.oemReference}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Compatible Brands badges */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {product.vehicleBrands.slice(0, 3).map((brand, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800"
                          >
                            {brand}
                          </span>
                        ))}
                        {product.vehicleBrands.length > 3 && (
                          <span className="text-[10px] text-slate-500">
                            +{product.vehicleBrands.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2 border-t border-slate-800/60 mt-3 pt-3">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Detalhes</span>
                    </button>

                    <button
                      onClick={() => onAddToQuote(product, 1)}
                      className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                        inQuote
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-600 text-white hover:bg-red-500 shadow-sm shadow-red-950'
                      }`}
                    >
                      {inQuote ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>No Pedido</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>Cotar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
