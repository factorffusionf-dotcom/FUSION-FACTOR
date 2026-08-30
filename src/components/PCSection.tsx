import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Server,
  Sparkles,
  Search,
  CheckCircle2,
  Cpu,
  HardDrive,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  ALL_PC_PRODUCTS,
  DELL_PC_PRODUCTS,
  HP_PC_PRODUCTS,
  LENOVO_PC_PRODUCTS,
} from "../data/pcProducts";
import { PCProduct } from "../types";
import PCFrameCard from "./PCFrameCard";
import ProductDetailModal from "./ProductDetailModal";

export default function PCSection() {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPC, setSelectedPC] = useState<PCProduct | null>(null);

  const filteredPCs = useMemo(() => {
    return ALL_PC_PRODUCTS.filter((pc) => {
      // Brand filter
      if (selectedBrand !== "all" && pc.brandId !== selectedBrand) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = pc.name?.toLowerCase().includes(q);
        const modelMatch = pc.model?.toLowerCase().includes(q);
        const procMatch = pc.specs?.processor?.toLowerCase().includes(q);
        const ramMatch = pc.specs?.ram?.toLowerCase().includes(q);
        const storageMatch = pc.specs?.storage?.toLowerCase().includes(q);
        const genMatch = pc.specs?.generation?.toLowerCase().includes(q);
        const frameMatch =
          `frame ${pc.slotNumber}`.includes(q) ||
          `#${pc.slotNumber}`.includes(q) ||
          `frame ${pc.frameNumber}`.includes(q);

        return Boolean(
          nameMatch ||
            modelMatch ||
            procMatch ||
            ramMatch ||
            storageMatch ||
            genMatch ||
            frameMatch
        );
      }

      return true;
    });
  }, [selectedBrand, searchQuery]);

  const brandCounts = useMemo(() => {
    return {
      all: ALL_PC_PRODUCTS.length,
      dell: DELL_PC_PRODUCTS.length,
      hp: HP_PC_PRODUCTS.length,
      lenovo: LENOVO_PC_PRODUCTS.length,
    };
  }, []);

  return (
    <section
      id="pc-section"
      className="relative w-full py-16 sm:py-20 md:py-24 bg-[#01040f] text-white border-t border-slate-900/80 overflow-hidden"
    >
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==================================================
            1. SECTION HEADER (DESKTOP PCS ONLY)
            ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold mb-4">
            <Server className="w-4 h-4 text-blue-400" />
            <span>Desktop CPU &amp; Workstations</span>
          </div>

          <h2
            id="pc-catalog-title"
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase"
          >
            Desktop PC Catalog
          </h2>

          <p className="text-slate-400 text-sm sm:text-base md:text-lg mt-3">
            Commercial-grade Small Form Factor (SFF) desktop systems from Dell, HP, and Lenovo. Fully bench-tested, cleaned, thermal-pasted, and paired with high-speed SSDs.
          </p>

          {/* Quick Hardware Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6 text-xs text-slate-300 font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>24 Exact PC Models</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>2nd to 8th Gen Intel Core</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Fast SSD &amp; NVMe Storage</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>AC Power Cable Included</span>
            </span>
          </div>
        </div>

        {/* ==================================================
            2. BRAND FILTER TABS & SEARCH BAR
            ================================================== */}
        <div className="mb-8 sm:mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Brand Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10">
              <button
                type="button"
                onClick={() => setSelectedBrand("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  selectedBrand === "all"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>All Brands</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedBrand === "all" ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  {brandCounts.all}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBrand("dell")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  selectedBrand === "dell"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>Dell PC</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedBrand === "dell" ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  {brandCounts.dell}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBrand("hp")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  selectedBrand === "hp"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>HP PC</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedBrand === "hp" ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  {brandCounts.hp}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBrand("lenovo")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  selectedBrand === "lenovo"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>Lenovo PC</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedBrand === "lenovo" ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  {brandCounts.lenovo}
                </span>
              </button>
            </div>

            {/* Quick Live Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search PC model, gen, ram..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================
            3. PRODUCT CARDS GRID (24 EXACT PC FRAMES)
            ================================================== */}
        {filteredPCs.length === 0 ? (
          <div className="text-center py-16 border border-white/10 rounded-3xl bg-slate-900/40 backdrop-blur-md">
            <Server className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No PC Systems Found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              We couldn't find any PC systems matching "{searchQuery}". Try searching with a different model or reset your filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedBrand("all");
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredPCs.map((pc, index) => (
              <PCFrameCard
                key={pc.id}
                product={pc}
                index={index}
                onSelectProduct={(p) => setSelectedPC(p)}
              />
            ))}
          </div>
        )}

        {/* ==================================================
            4. PRODUCT DETAIL MODAL FOR PC
            ================================================== */}
        <AnimatePresence>
          {selectedPC && (
            <ProductDetailModal
              product={selectedPC}
              onClose={() => setSelectedPC(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
