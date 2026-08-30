import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Printer,
  Sparkles,
  Search,
  CheckCircle2,
  Zap,
  Wifi,
  Layers,
  FileText,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import {
  ALL_PRINTER_PRODUCTS,
  HP_PRINTER_PRODUCTS,
  EPSON_PRINTER_PRODUCTS,
} from "../data/printerProducts";
import { PrinterProduct } from "../types";
import PrinterFrameCard from "./PrinterFrameCard";
import ProductDetailModal from "./ProductDetailModal";

export default function PrintersSection() {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPrinter, setSelectedPrinter] = useState<PrinterProduct | null>(null);

  const filteredPrinters = useMemo(() => {
    return ALL_PRINTER_PRODUCTS.filter((printer) => {
      // Brand filter
      if (selectedBrand !== "all" && printer.brandId !== selectedBrand) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = printer.name?.toLowerCase().includes(q);
        const modelMatch = printer.model?.toLowerCase().includes(q);
        const categoryMatch = printer.category?.toLowerCase().includes(q);
        const functionsMatch = printer.specs?.functions?.toLowerCase().includes(q);
        const speedMatch = printer.specs?.printSpeed?.toLowerCase().includes(q);
        const connectivityMatch = printer.specs?.connectivity?.toLowerCase().includes(q);
        const frameMatch =
          `frame ${printer.slotNumber}`.includes(q) ||
          `#${printer.slotNumber}`.includes(q) ||
          `frame ${printer.frameNumber}`.includes(q);

        return Boolean(
          nameMatch ||
            modelMatch ||
            categoryMatch ||
            functionsMatch ||
            speedMatch ||
            connectivityMatch ||
            frameMatch
        );
      }

      return true;
    });
  }, [selectedBrand, searchQuery]);

  const brandCounts = useMemo(() => {
    return {
      all: ALL_PRINTER_PRODUCTS.length,
      hp: HP_PRINTER_PRODUCTS.length,
      epson: EPSON_PRINTER_PRODUCTS.length,
    };
  }, []);

  return (
    <section
      id="printers-section"
      className="relative w-full py-16 sm:py-20 md:py-24 bg-[#02071a] text-white border-t border-slate-900/80 overflow-hidden"
    >
      {/* Background Decorative Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-sky-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==================================================
            1. SECTION HEADER (PRINTERS ONLY - 6 FRAMES)
            ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs sm:text-sm font-semibold mb-4">
            <Printer className="w-4 h-4 text-sky-400" />
            <span>Office &amp; Business Printing Systems</span>
          </div>

          <h2
            id="printers-catalog-title"
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase"
          >
            Office Printer Catalog
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover precision monochrome laser printers from <strong className="text-sky-400">HP</strong> and ultra-high yield EcoTank color multi-function printers from <strong className="text-indigo-400">Epson</strong>. Built for high reliability and business productivity.
          </p>

          {/* Quick Value Pillars */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-semibold text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              100% Genuine Certified
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              High Speed Output (Up to 33 ppm)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <Wifi className="w-3.5 h-3.5 text-sky-400" />
              Wi-Fi &amp; Ethernet Wireless Ready
            </span>
          </div>
        </div>

        {/* ==================================================
            2. FILTER TABS & SEARCH BAR
            ================================================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* Brand Filter Buttons */}
          <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setSelectedBrand("all")}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedBrand === "all"
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25 border border-sky-400"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              <span>All Printers</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  selectedBrand === "all"
                    ? "bg-white/20 text-white font-bold"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {brandCounts.all}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedBrand("hp")}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedBrand === "hp"
                  ? "bg-sky-600 text-white shadow-lg shadow-sky-600/25 border border-sky-500"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              <span>HP Laser</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  selectedBrand === "hp"
                    ? "bg-white/20 text-white font-bold"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {brandCounts.hp}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedBrand("epson")}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedBrand === "epson"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-500"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              <span>Epson EcoTank</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  selectedBrand === "epson"
                    ? "bg-white/20 text-white font-bold"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {brandCounts.epson}
              </span>
            </button>
          </div>

          {/* Real-time Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 107a, 135a, L3210, Wi-Fi..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:bg-white/[0.08] focus:outline-none text-xs sm:text-sm text-white placeholder:text-slate-500 transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer px-1.5 py-0.5 rounded bg-white/10"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ==================================================
            3. PRINTER FRAMES GRID (EXACTLY 6 FRAMES)
            ================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPrinters.map((printer, index) => (
              <PrinterFrameCard
                key={printer.id}
                product={printer}
                index={index}
                onSelectProduct={(p) => setSelectedPrinter(p)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPrinters.length === 0 && (
          <div className="text-center py-16 px-4 rounded-2xl bg-white/[0.02] border border-white/10 mt-6">
            <Printer className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              No matching printers found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Try searching for model numbers such as 107a, 135a, 137fnw, L3210, L3250, or L5290.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedBrand("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedPrinter && (
        <ProductDetailModal
          product={selectedPrinter}
          onClose={() => setSelectedPrinter(null)}
        />
      )}
    </section>
  );
}
