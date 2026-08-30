import { useState, useRef, type MouseEvent, type TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Layers,
  Sparkles,
  Laptop,
  Cpu,
  HardDrive,
  Monitor,
  Zap,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { BRANDS_DATA } from "../data/brands";
import { Brand, ProductModel } from "../types";

interface BrandCardProps {
  key?: string;
  brand: Brand;
  index: number;
  onSelect: (brand: Brand) => void;
}

function BrandCard({ brand, index, onSelect }: BrandCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = (e: TouchEvent<HTMLButtonElement>) => {
    setIsTouched(true);
    if (!cardRef.current || !e.touches[0]) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    });
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsTouched(false);
    }, 600);
  };

  const isActive = isHovered || isTouched;

  return (
    <motion.button
      ref={cardRef}
      id={`brand-card-${brand.id}`}
      type="button"
      onClick={() => onSelect(brand)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="group relative w-full rounded-2xl md:rounded-3xl border border-white/15 bg-slate-950/60 p-5 sm:p-6 md:p-7 lg:p-8 text-left overflow-hidden transition-all duration-300 hover:border-blue-500/50 shadow-xl flex flex-col justify-between min-h-[200px] sm:min-h-[230px]"
    >
      {/* Interactive Cursor-Following Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          opacity: isActive ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.35), rgba(96, 165, 250, 0.12) 45%, transparent 75%)`,
        }}
      />

      {/* Subtle Luminous Sweep */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        <div className="absolute inset-0 border border-blue-400/30 rounded-2xl md:rounded-3xl pointer-events-none" />
      </div>

      {/* Brand Header & Badge */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-blue-400 uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Official Brand
        </span>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-colors">
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Brand Name */}
      <div className="relative z-10 my-4">
        <h3
          id={`brand-title-${brand.id}`}
          className="text-2xl xs:text-3xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-black uppercase text-white tracking-tight whitespace-nowrap group-hover:text-blue-400 transition-colors duration-300"
        >
          {brand.name}
        </h3>
        {brand.tagline && (
          <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-1 font-medium">
            {brand.tagline}
          </p>
        )}
      </div>

      {/* Action Indicator */}
      <div className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 group-hover:text-white uppercase tracking-wider">
        <span>Explore Models</span>
        <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>
  );
}

const HP_CATEGORIES = [
  {
    id: "EliteBook",
    name: "HP EliteBook",
    shortName: "EliteBook",
    description: "Premium enterprise laptops designed for executive durability and performance.",
    accentColor: "sky",
    badgeClass: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    hoverBorder: "hover:border-sky-500/50",
  },
  {
    id: "ProBook",
    name: "HP ProBook",
    shortName: "ProBook",
    description: "Versatile, robust business laptops engineered for security and daily productivity.",
    accentColor: "blue",
    badgeClass: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    hoverBorder: "hover:border-blue-500/50",
  },
  {
    id: "ZBook",
    name: "HP ZBook",
    shortName: "ZBook",
    description: "High-performance mobile workstations built for heavy computing and graphics.",
    accentColor: "indigo",
    badgeClass: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
    hoverBorder: "hover:border-indigo-500/50",
  },
];

export default function BrandsSection() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [modelImgIdx, setModelImgIdx] = useState(0);

  const handleBrandClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setSelectedCategory(null);
    setSelectedModel(null);
    setModelImgIdx(0);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedModel(null);
    setModelImgIdx(0);
  };

  const handleModelClick = (model: ProductModel) => {
    setSelectedModel(model);
    setModelImgIdx(0);
  };

  const handleBackToBrands = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedModel(null);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedModel(null);
  };

  const handleBackToModels = () => {
    setSelectedModel(null);
  };

  // Filter models for current selected brand & category
  const currentCategoryModels = selectedBrand && selectedCategory
    ? selectedBrand.models.filter(
        (m) => m.category?.toLowerCase() === selectedCategory.toLowerCase() || m.series?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : [];

  return (
    <section
      id="brands-section"
      className="relative w-full min-h-screen bg-[#020617] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-16 sm:py-20 md:py-24 border-t border-slate-900/80 overflow-hidden"
    >
      {/* Background Accent Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col gap-8 sm:gap-12">
        {/* Hierarchical Breadcrumbs Navigation Bar */}
        <div
          id="brands-breadcrumbs"
          className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-400"
        >
          <button
            id="breadcrumb-brands"
            type="button"
            onClick={handleBackToBrands}
            className={`transition-colors flex items-center gap-1.5 ${
              !selectedBrand
                ? "text-blue-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Brands
          </button>

          {selectedBrand && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <button
                id={`breadcrumb-brand-${selectedBrand.id}`}
                type="button"
                onClick={handleBackToCategories}
                className={`transition-colors ${
                  !selectedCategory && !selectedModel
                    ? "text-blue-400 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {selectedBrand.name}
              </button>
            </>
          )}

          {selectedCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <button
                id={`breadcrumb-category-${selectedCategory.toLowerCase()}`}
                type="button"
                onClick={handleBackToModels}
                className={`transition-colors ${
                  !selectedModel
                    ? "text-blue-400 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {selectedCategory}
              </button>
            </>
          )}

          {selectedModel && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span id="breadcrumb-model" className="text-blue-400 font-bold">
                {selectedModel.name}
              </span>
            </>
          )}
        </div>

        {/* View States: Brands List -> Categories -> Models List -> Model Details Page */}
        <AnimatePresence mode="wait">
          {!selectedBrand ? (
            /* ============================================================ */
            /* 1. BRANDS LIST (Dell, HP, Lenovo)                           */
            /* ============================================================ */
            <motion.div
              key="brands-list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8 sm:gap-12"
            >
              <div className="flex flex-col items-start gap-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-500">
                  Featured Hardware Partners
                </span>
                <h2
                  id="brands-heading"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white"
                >
                  Explore Top Brands
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
                  Select a manufacturer below to browse compatible systems, authorized parts, and dedicated model catalogs.
                </p>
              </div>

              {/* 3 Brand Cards Grid: Dell | HP | Lenovo */}
              <div
                id="brands-grid"
                className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full"
              >
                {BRANDS_DATA.map((brand, index) => (
                  <BrandCard
                    key={brand.id}
                    brand={brand}
                    index={index}
                    onSelect={handleBrandClick}
                  />
                ))}
              </div>
            </motion.div>
          ) : selectedBrand.id === "hp" && !selectedCategory ? (
            /* ============================================================ */
            /* 2A. HP BRAND CATEGORIES VIEW (EliteBook, ProBook, ZBook)    */
            /* ============================================================ */
            <motion.div
              key="hp-categories-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8 sm:gap-10"
            >
              {/* HP Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <button
                    id="btn-back-to-brands-from-hp"
                    type="button"
                    onClick={handleBackToBrands}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors mb-3"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to all brands
                  </button>
                  <h2
                    id="hp-categories-title"
                    className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight"
                  >
                    HP Product Families
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 mt-1">
                    Select a family category below to explore verified HP laptop models and technical specifications.
                  </p>
                </div>

                <a
                  href="#hp-brand-section"
                  className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
                >
                  <span>View All HP Laptops</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* 3 Clickable HP Product Family Categories */}
              <div
                id="hp-categories-grid"
                className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full"
              >
                {HP_CATEGORIES.map((cat, idx) => {
                  const count = selectedBrand.models.filter(
                    (m) => m.category?.toLowerCase() === cat.id.toLowerCase() || m.series?.toLowerCase() === cat.id.toLowerCase()
                  ).length;

                  return (
                    <motion.button
                      key={cat.id}
                      id={`hp-category-card-${cat.id.toLowerCase()}`}
                      type="button"
                      onClick={() => handleCategoryClick(cat.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative rounded-2xl md:rounded-3xl border border-white/15 bg-slate-950/60 p-6 sm:p-7 text-left overflow-hidden transition-all duration-300 ${cat.hoverBorder} shadow-xl flex flex-col justify-between min-h-[240px]`}
                    >
                      <div className="relative z-10 flex items-center justify-between w-full">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${cat.badgeClass}`}
                        >
                          {cat.shortName}
                        </span>
                        <span className="text-xs font-mono text-slate-400 font-semibold bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                          {count} Models
                        </span>
                      </div>

                      <div className="relative z-10 my-4">
                        <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight group-hover:text-blue-400 transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2">
                          {cat.description}
                        </p>
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-300 group-hover:text-white uppercase tracking-wider pt-3 border-t border-white/10">
                        <span>Explore {cat.shortName} Models</span>
                        <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : selectedBrand.id === "hp" && selectedCategory && !selectedModel ? (
            /* ============================================================ */
            /* 2B. HP CATEGORY MODELS LIST (EliteBook / ProBook / ZBook)    */
            /* ============================================================ */
            <motion.div
              key={`hp-category-models-${selectedCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8 sm:gap-10"
            >
              {/* Category Models Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <button
                    id="btn-back-to-hp-categories"
                    type="button"
                    onClick={handleBackToCategories}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors mb-3"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to HP Families
                  </button>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-400 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30">
                      HP {selectedCategory}
                    </span>
                    <h2
                      id="hp-category-models-title"
                      className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight"
                    >
                      {selectedCategory} Models
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-slate-400 mt-1">
                    Select a model below to view full specifications and product details.
                  </p>
                </div>

                <span className="text-xs sm:text-sm font-mono text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
                  {currentCategoryModels.length} Models Available
                </span>
              </div>

              {/* Category Models Grid */}
              <div
                id="category-models-grid"
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
              >
                {currentCategoryModels.map((model, idx) => (
                  <motion.button
                    key={model.id}
                    id={`model-card-${model.id}`}
                    type="button"
                    onClick={() => handleModelClick(model)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group rounded-2xl border border-white/15 bg-slate-950/60 p-4 sm:p-5 text-left hover:border-blue-500/50 transition-all shadow-lg flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400">
                          {model.series}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          {model.id.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {model.name}
                      </h4>
                    </div>

                    {/* Quick Specs Snippet */}
                    {model.specs && (
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-300 pt-2 border-t border-white/5">
                        {model.specs.display && (
                          <span className="truncate">{model.specs.display}</span>
                        )}
                        {model.specs.processor && (
                          <span className="truncate font-medium">{model.specs.processor}</span>
                        )}
                        {model.specs.ram && (
                          <span className="truncate text-slate-400">{model.specs.ram}</span>
                        )}
                        {model.specs.storage && (
                          <span className="truncate text-slate-400">{model.specs.storage}</span>
                        )}
                      </div>
                    )}

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white uppercase">
                      <span>View Model Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : !selectedModel ? (
            /* ============================================================ */
            /* 2C. OTHER BRAND MODELS VIEW (Dell / Lenovo Blank State)     */
            /* ============================================================ */
            <motion.div
              key={`brand-models-${selectedBrand.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8 sm:gap-10"
            >
              {/* Brand Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <button
                    id="btn-back-to-brands"
                    type="button"
                    onClick={handleBackToBrands}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors mb-3"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to all brands
                  </button>
                  <h2
                    id="selected-brand-name"
                    className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight"
                  >
                    {selectedBrand.name} Models
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 mt-1">
                    {selectedBrand.tagline}
                  </p>
                </div>
              </div>

              {/* Ready-State Placeholder when no models are populated yet (Dell & Lenovo) */}
              <div
                id="empty-models-notice"
                className="w-full rounded-2xl sm:rounded-3xl border border-dashed border-white/20 bg-slate-950/30 p-10 sm:p-14 text-center flex flex-col items-center justify-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                  {selectedBrand.name} Model Catalog
                </h3>
                <p className="text-sm text-slate-400 max-w-md">
                  The {selectedBrand.name} model lineup structure with {selectedBrand.models.length} laptop models is ready in the catalog matrix.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                  <a
                    href={`#${selectedBrand.id}-brand-section`}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
                  >
                    <span>View {selectedBrand.models.length} {selectedBrand.name} Laptops</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <button
                    id="btn-return-brands"
                    type="button"
                    onClick={handleBackToBrands}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border border-white/10"
                  >
                    Back to Brands
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ============================================================ */
            /* 3. DEDICATED MODEL DETAILS PAGE                             */
            /* ============================================================ */
            <motion.div
              key={`model-page-${selectedModel.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8 sm:gap-10"
            >
              <div>
                <button
                  id="btn-back-to-models"
                  type="button"
                  onClick={selectedCategory ? handleBackToModels : handleBackToCategories}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors mb-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to {selectedCategory ? `${selectedCategory} Models` : `${selectedBrand.name} Models`}
                </button>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-500 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                    {selectedBrand.name}
                  </span>
                  {selectedModel.series && (
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                      {selectedModel.series}
                    </span>
                  )}
                  <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {selectedModel.id.toUpperCase()}
                  </span>
                </div>
                <h2
                  id="dedicated-model-title"
                  className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight mt-3"
                >
                  {selectedModel.name}
                </h2>
              </div>

              {/* Dedicated Model Details & Product Frame Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* 16:10 Laptop Frame Preview Area */}
                <div className="lg:col-span-1 rounded-2xl sm:rounded-3xl border border-white/15 bg-slate-950/60 p-5 sm:p-6 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-full aspect-[16/10] rounded-xl border border-white/15 bg-slate-900/90 relative flex flex-col items-center justify-center overflow-hidden p-1 sm:p-1.5">
                    {selectedModel.images && selectedModel.images.length > 0 ? (
                      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={selectedModel.images[modelImgIdx]}
                            src={selectedModel.images[modelImgIdx]}
                            alt={`${selectedModel.name} View ${modelImgIdx + 1}`}
                            referrerPolicy="no-referrer"
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1.08 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="w-full h-full object-contain max-h-full max-w-full select-none"
                          />
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {selectedModel.images.length > 1 && (
                          <>
                            {modelImgIdx > 0 && (
                              <button
                                type="button"
                                onClick={() => setModelImgIdx((prev) => Math.max(0, prev - 1))}
                                aria-label="Previous image"
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-white/20 hover:border-sky-400 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer backdrop-blur-sm"
                              >
                                <ChevronLeft className="w-4 h-4 text-sky-400" />
                              </button>
                            )}
                            {modelImgIdx < selectedModel.images.length - 1 && (
                              <button
                                type="button"
                                onClick={() => setModelImgIdx((prev) => Math.min(selectedModel.images!.length - 1, prev + 1))}
                                aria-label="Next image"
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-white/20 hover:border-sky-400 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer backdrop-blur-sm"
                              >
                                <ChevronRight className="w-4 h-4 text-sky-400" />
                              </button>
                            )}

                            {/* Dot Indicators */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/80 border border-white/15 backdrop-blur-sm">
                              {selectedModel.images.map((_, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setModelImgIdx(idx)}
                                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                                    idx === modelImgIdx ? "w-4 bg-sky-400" : "w-1.5 bg-white/40 hover:bg-white/70"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ) : selectedModel.imageUrl ? (
                      <img
                        src={selectedModel.imageUrl}
                        alt={selectedModel.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <>
                        {/* Reticles */}
                        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-white/30" />
                        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-white/30" />
                        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-white/30" />
                        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-white/30" />

                        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-blue-400">
                          <Laptop className="w-6 h-6" />
                        </div>
                        <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Product Image Preview
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                          Ready for Image
                        </span>
                      </>
                    )}
                  </div>

                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified {selectedModel.name}
                  </span>
                </div>

                {/* Model Specifications Grid */}
                <div className="lg:col-span-2 rounded-2xl sm:rounded-3xl border border-white/15 bg-slate-950/60 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      Technical Specifications
                    </h3>

                    {selectedModel.specs ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {selectedModel.specs.display && (
                          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                            <Monitor className="w-4 h-4 text-blue-400 mt-0.5" />
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                                Display
                              </span>
                              <span className="text-sm font-bold text-white mt-0.5 block">
                                {selectedModel.specs.display}
                              </span>
                            </div>
                          </div>
                        )}

                        {selectedModel.specs.processor && (
                          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                            <Cpu className="w-4 h-4 text-blue-400 mt-0.5" />
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                                Processor
                              </span>
                              <span className="text-sm font-bold text-white mt-0.5 block">
                                {selectedModel.specs.processor}
                              </span>
                            </div>
                          </div>
                        )}

                        {selectedModel.specs.ram && (
                          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                            <HardDrive className="w-4 h-4 text-blue-400 mt-0.5" />
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                                System Memory
                              </span>
                              <span className="text-sm font-bold text-white mt-0.5 block">
                                {selectedModel.specs.ram}
                              </span>
                            </div>
                          </div>
                        )}

                        {selectedModel.specs.storage && (
                          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                            <Layers className="w-4 h-4 text-blue-400 mt-0.5" />
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                                Storage
                              </span>
                              <span className="text-sm font-bold text-white mt-0.5 block">
                                {selectedModel.specs.storage}
                              </span>
                            </div>
                          </div>
                        )}

                        {selectedModel.specs.touchscreen && (
                          <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-start gap-3">
                            <Sparkles className="w-4 h-4 text-sky-400 mt-0.5" />
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-sky-400 block font-semibold">
                                Touchscreen Feature
                              </span>
                              <span className="text-sm font-bold text-sky-200 mt-0.5 block">
                                {selectedModel.specs.touchscreen}
                              </span>
                            </div>
                          </div>
                        )}

                        {selectedModel.specs.graphics && (
                          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                            <Zap className="w-4 h-4 text-sky-400 mt-0.5" />
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                                Graphics Card
                              </span>
                              <span className="text-sm font-bold text-white mt-0.5 block">
                                {selectedModel.specs.graphics}
                              </span>
                            </div>
                          </div>
                        )}

                        {selectedModel.specs.charger && (
                          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                            <Zap className="w-4 h-4 text-emerald-400 mt-0.5" />
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                                Power Supply
                              </span>
                              <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
                                {selectedModel.specs.charger} Included
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">
                        Detailed specifications configured for this model.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/10">
                    <a
                      href="#hp-brand-section"
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View in Catalog Matrix</span>
                    </a>
                    <button
                      type="button"
                      onClick={selectedCategory ? handleBackToModels : handleBackToCategories}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border border-white/10"
                    >
                      Back to {selectedCategory || "Models"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

