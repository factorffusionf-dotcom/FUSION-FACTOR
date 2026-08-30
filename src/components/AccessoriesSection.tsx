import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HardDrive,
  Cpu,
  Mouse,
  Keyboard,
  Volume2,
  Sparkles,
  Search,
  X,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  STORAGE_RAM_PRODUCTS,
  MOUSE_PRODUCTS,
  KEYBOARD_PRODUCTS,
  SPEAKER_PRODUCTS,
  ALL_ACCESSORY_PRODUCTS,
} from "../data/accessoryProducts";
import { AccessoryProduct, AccessoryCategory } from "../types";
import AccessoryFrameCard from "./AccessoryFrameCard";
import ProductDetailModal from "./ProductDetailModal";

type FilterTab = "all" | AccessoryCategory;

export default function AccessoriesSection() {
  const [selectedTab, setSelectedTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<AccessoryProduct | null>(
    null
  );

  // Search filter across accessories
  const filteredProducts = useMemo(() => {
    let list = ALL_ACCESSORY_PRODUCTS;

    if (selectedTab !== "all") {
      list = list.filter((p) => p.category === selectedTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          Object.values(p.specs).some((val) =>
            val?.toLowerCase().includes(q)
          ) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedTab, searchQuery]);

  const tabs: { id: FilterTab; label: string; icon: any; count: number }[] = [
    {
      id: "all",
      label: "All Accessories",
      icon: Layers,
      count: ALL_ACCESSORY_PRODUCTS.length,
    },
    {
      id: "storage-ram",
      label: "Storage & RAM",
      icon: HardDrive,
      count: STORAGE_RAM_PRODUCTS.length,
    },
    {
      id: "mouse",
      label: "Mice",
      icon: Mouse,
      count: MOUSE_PRODUCTS.length,
    },
    {
      id: "keyboard",
      label: "Keyboards",
      icon: Keyboard,
      count: KEYBOARD_PRODUCTS.length,
    },
    {
      id: "speaker",
      label: "Speakers & Audio",
      icon: Volume2,
      count: SPEAKER_PRODUCTS.length,
    },
  ];

  return (
    <section
      id="accessories-section"
      className="relative w-full py-16 sm:py-20 bg-[#020617] text-white border-t border-slate-900 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==================================================
            1. SECTION HEADER
            ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs sm:text-sm font-semibold mb-3.5 shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Essential Components, Peripherals &amp; Upgrades</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            Computer Accessories
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            High-speed NVMe/M.2 SSD storage, DDR3/DDR4 RAM memory, precision office &amp; RGB gaming mice, tactile keyboards, and genuine laptop &amp; PC speaker systems.
          </p>
        </div>

        {/* ==================================================
            2. FILTER TABS & SEARCH BAR
            ================================================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400 scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isSelected
                        ? "bg-black/25 text-white"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real-Time Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specs, brand or model..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ==================================================
            3. PRODUCT SECTIONS & FRAMES GRID
            ================================================== */}
        {selectedTab === "all" && !searchQuery ? (
          /* ==================================================
             FULL VIEW: STRUCTURED SUBSECTIONS IN SPECIFIED ORDER
             ================================================== */
          <div className="space-y-14 sm:space-y-16">
            {/* SUBSECTION 1: STORAGE & RAM (5 FRAMES WITH REAL IMAGES) */}
            <div id="storage-ram-subsection" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                      <span>1. Storage &amp; RAM Modules</span>
                      <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        6 Products
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Genuine 2.5" SATA SSDs, NVMe SSDs, SATA M.2 SSDs, HDDs, and DDR3/DDR4 memory sticks with real hardware photos.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6 Frames Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
                {STORAGE_RAM_PRODUCTS.map((prod, idx) => (
                  <AccessoryFrameCard
                    key={prod.id}
                    product={prod}
                    index={idx}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            </div>

            {/* SUBSECTION 2: MOUSE SUBSECTION (4 FRAMES: 2 STANDARD + 2 RGB GAMING) */}
            <div id="mouse-subsection" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Mouse className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                      <span>2. Mouse Selection</span>
                      <span className="text-[10px] font-mono font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                        4 Models
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      2× Standard Dell &amp; HP optical office mice + 2× Fantech &amp; Redragon RGB gaming mice.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Frames Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {MOUSE_PRODUCTS.map((prod, idx) => (
                  <AccessoryFrameCard
                    key={prod.id}
                    product={prod}
                    index={idx}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            </div>

            {/* SUBSECTION 3: KEYBOARD SUBSECTION (4 FRAMES: 2 STANDARD + 2 RGB GAMING) */}
            <div id="keyboard-subsection" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Keyboard className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                      <span>3. Keyboard Selection</span>
                      <span className="text-[10px] font-mono font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        4 Models
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      2× Standard Dell &amp; HP desktop keyboards + 2× Fantech K613 &amp; Redragon K552 RGB gaming keyboards.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Frames Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {KEYBOARD_PRODUCTS.map((prod, idx) => (
                  <AccessoryFrameCard
                    key={prod.id}
                    product={prod}
                    index={idx}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            </div>

            {/* SUBSECTION 4: SPEAKERS SUBSECTION (5 FRAMES: 2 LAPTOP + 3 PC/DESKTOP) */}
            <div id="speaker-subsection" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                      <span>4. Audio &amp; Speakers Selection</span>
                      <span className="text-[10px] font-mono font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        5 Models
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      2× Genuine OEM Dell &amp; HP laptop internal replacement speakers + 3× Dedicated &amp; RGB desktop PC speakers.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5 Frames Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                {SPEAKER_PRODUCTS.map((prod, idx) => (
                  <AccessoryFrameCard
                    key={prod.id}
                    product={prod}
                    index={idx}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ==================================================
             FILTERED / SEARCH VIEW
             ================================================== */
          <div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((prod, idx) => (
                  <AccessoryFrameCard
                    key={prod.id}
                    product={prod}
                    index={idx}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center rounded-2xl bg-white/[0.02] border border-white/10">
                <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white">No accessories found</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting your search keywords or select a different category filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTab("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================
            4. FOOTER QUALITY GUARANTEE
            ================================================== */}
        <div className="mt-12 py-4 px-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Genuine &amp; Hardware Health Certified Components</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
            <span>• Same-Day Dispatch</span>
            <span>• Nationwide Delivery</span>
            <span>• Replacement Warranty</span>
          </div>
        </div>
      </div>

      {/* ==================================================
          5. PRODUCT DETAIL MODAL
          ================================================== */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
