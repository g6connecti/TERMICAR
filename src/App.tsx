import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { VehicleBrandGrid } from './components/VehicleBrandGrid';
import { AboutSection } from './components/AboutSection';
import { CustomEngineeringSection } from './components/CustomEngineeringSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { QuoteBuilderModal, QuoteItem } from './components/QuoteBuilderModal';
import { CatalogDownloadModal } from './components/CatalogDownloadModal';
import { Product, COMPANY_INFO } from './data/products';
import { ShoppingCart, MessageCircle } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  // Add to quote
  const handleAddToQuote = useCallback((product: Product, quantity: number) => {
    setQuoteItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  // Update item quantity in quote
  const handleUpdateQuoteQuantity = useCallback((productId: string, quantity: number) => {
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  // Remove item from quote
  const handleRemoveQuoteItem = useCallback((productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  // Clear quote
  const handleClearQuote = useCallback(() => {
    setQuoteItems([]);
  }, []);

  // Filter catalog by brand from VehicleBrandGrid
  const handleSelectBrand = useCallback((brand: string) => {
    setSearchQuery(brand === 'Todos' ? '' : brand);
  }, []);

  const totalQuoteCount = quoteItems.reduce((acc, it) => acc + it.quantity, 0);
  const quoteProductIds = quoteItems.map((it) => it.product.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-600 selection:text-white">
      {/* Top Header */}
      <Header
        quoteCount={totalQuoteCount}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenPdfModal={() => setIsCatalogModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onSearch={(query) => setSearchQuery(query)}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        />

        {/* Interactive Products Catalog */}
        <CatalogSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToQuote={handleAddToQuote}
          quoteProductIds={quoteProductIds}
          onOpenCatalogDownloadModal={() => setIsCatalogModalOpen(true)}
        />

        {/* Vehicle Applications & Fleets */}
        <VehicleBrandGrid onSelectBrand={handleSelectBrand} />

        {/* Custom Engineering & Turned Parts */}
        <CustomEngineeringSection />

        {/* About Termicar (Since 1969 & Quality Metrology) */}
        <AboutSection />

        {/* Authentic Contact & Factory Info */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp Float */}
        <a
          href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=${encodeURIComponent('Olá, gostaria de um atendimento com a Termicar Auto Peças.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-950/60 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all"
          title="Falar no WhatsApp"
          aria-label="Atendimento via WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </a>

        {/* Floating Cart Button (if items present) */}
        {totalQuoteCount > 0 && (
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-xl shadow-red-950/60 hover:bg-red-500 hover:scale-105 active:scale-95 transition-all"
            title="Ver orçamento"
            aria-label="Ver itens do orçamento"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-red-600 font-mono">
              {totalQuoteCount}
            </span>
          </button>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={(prod, qty) => {
          handleAddToQuote(prod, qty);
          setSelectedProduct(null);
        }}
        isInQuote={selectedProduct ? quoteProductIds.includes(selectedProduct.id) : false}
      />

      {/* Quote Builder Modal */}
      <QuoteBuilderModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuoteQuantity}
        onRemoveItem={handleRemoveQuoteItem}
        onClearQuote={handleClearQuote}
        onBrowseCatalog={() => {
          const el = document.getElementById('produtos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Catalog Download Modal (Google Drive Installer & Online Access) */}
      <CatalogDownloadModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        onNavigateToCatalog={() => {
          const el = document.getElementById('produtos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
