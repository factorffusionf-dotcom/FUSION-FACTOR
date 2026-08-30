import { Search, X, SlidersHorizontal } from "lucide-react";

interface ProductSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
  totalResults: number;
}

export default function ProductSearchBar({
  searchQuery,
  onSearchChange,
  selectedBrand,
  onBrandChange,
  totalResults,
}: ProductSearchBarProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-8 sm:mb-12">
      <div className="flex flex-col md:flex-row items-center gap-3.5 sm:gap-4 p-2 sm:p-3 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/60">
        {/* Search Input Box */}
        <div className="relative flex-1 w-full flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            id="product-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by model name, generation, processor (e.g. T420, G8, i5)..."
            className="w-full pl-11 pr-10 py-3 sm:py-3.5 bg-slate-950/70 rounded-xl border border-white/10 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Brand Selector Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All Brands" },
            { id: "hp", label: "HP" },
            { id: "dell", label: "Dell" },
            { id: "lenovo", label: "Lenovo" },
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => onBrandChange(b.id)}
              className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedBrand === b.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/30"
                  : "bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-white/5"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count indicator */}
      <div className="flex items-center justify-between px-2 pt-3 text-xs sm:text-sm text-slate-400">
        <span>
          Showing <strong className="text-white">{totalResults}</strong> laptop models
        </span>
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="text-blue-400 hover:underline hover:text-blue-300 transition-colors"
          >
            Reset filter
          </button>
        )}
      </div>
    </div>
  );
}
