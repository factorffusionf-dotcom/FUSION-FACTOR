import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Laptop, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { ALL_PRODUCTS, HP_PRODUCTS, DELL_PRODUCTS, LENOVO_PRODUCTS } from "../data/products";
import { LaptopProduct } from "../types";
import ProductFrameCard from "./ProductFrameCard";
import ProductDetailModal from "./ProductDetailModal";
import ProductSearchBar from "./ProductSearchBar";
import FeaturedCarousel from "./FeaturedCarousel";

export default function ProductsPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<LaptopProduct | null>(null);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Brand filter
      if (selectedBrand !== "all" && product.brandId !== selectedBrand) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = product.name?.toLowerCase().includes(query);
        const modelMatch = product.model?.toLowerCase().includes(query);
        const seriesMatch = product.series?.toLowerCase().includes(query);
        const procMatch = product.specs?.processor?.toLowerCase().includes(query);
        const ramMatch = product.specs?.ram?.toLowerCase().includes(query);
        const storageMatch = product.specs?.storage?.toLowerCase().includes(query);
        const displayMatch = product.specs?.display?.toLowerCase().includes(query);
        const slotMatch = `frame ${product.slotNumber}`.includes(query) || `#${product.slotNumber}`.includes(query);

        return Boolean(
          nameMatch ||
            modelMatch ||
            seriesMatch ||
            procMatch ||
            ramMatch ||
            storageMatch ||
            displayMatch ||
            slotMatch
        );
      }

      return true;
    });
  }, [selectedBrand, searchQuery]);

  return (
    <section id="products-catalog-section" className="relative w-full py-12 sm:py-16 md:py-24 bg-[#020617] text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==================================================
            1. FEATURED CAROUSEL
            ================================================== */}
        <FeaturedCarousel onSelectProduct={(product) => setSelectedProduct(product)} />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 mt-8 sm:mt-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Laptop Inventory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Explore All Laptop Models
          </h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg">
            Browse our organized catalog of HP, Dell, and Lenovo business-grade laptops with detailed technical specifications and real hardware details.
          </p>
        </div>

        {/* ==================================================
            2. SEARCH & BRAND FILTER BAR
            ================================================== */}
        <ProductSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          totalResults={filteredProducts.length}
        />

        {/* ==================================================
            3. PRODUCT FRAMES GRID
            ================================================== */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-24 border border-white/10 rounded-3xl bg-slate-900/40 backdrop-blur-md">
            <Laptop className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Laptops Found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              We couldn't find any laptops matching "{searchQuery}". Try searching with a different term or reset your filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedBrand("all");
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/30"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductFrameCard
                key={product.id}
                product={product}
                index={index}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}

        {/* ==================================================
            4. PRODUCT DETAIL MODAL (ANIMATED)
            ================================================== */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
