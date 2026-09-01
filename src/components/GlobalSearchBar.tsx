import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { ALL_PRODUCTS } from "../data/products";
import { ALL_PC_PRODUCTS } from "../data/pcProducts";
import { ALL_PRINTER_PRODUCTS } from "../data/printerProducts";
import { ALL_ACCESSORY_PRODUCTS } from "../data/accessoryProducts";

interface GlobalSearchBarProps {
  onSelect?: (product: any) => void;
}

export default function GlobalSearchBar({
  onSelect,
}: GlobalSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    const allProducts = [
      ...ALL_PRODUCTS,
      ...ALL_PC_PRODUCTS,
      ...ALL_PRINTER_PRODUCTS,
      ...ALL_ACCESSORY_PRODUCTS,
    ];

    return allProducts
      .filter((product: any) => {
        const searchableText = [
          product.name,
          product.model,
          product.series,
          product.category,
          product.brandId,
          product.brand,
          product.subCategory,
          product.specs?.processor,
          product.specs?.cpuModel,
          product.specs?.generation,
          product.specs?.ram,
          product.specs?.storage,
          product.specs?.display,
          ...(product.features || []),
          ...(product.tags || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(q);
      })
      .slice(0, 8);
  }, [query]);

  const getProductTypeLabel = (product: any) => {
    switch (product.productType) {
      case "laptop":
        return "Laptop";
      case "pc":
        return "PC";
      case "printer":
        return "Printer";
      case "accessory":
        return "Accessory";
      default:
        return "Product";
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative z-[100]">
      {/* SMALL SEARCH ICON */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open search"
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-slate-950/80 border border-white/15 text-slate-300 hover:text-white hover:border-blue-500/60 hover:bg-slate-900/90 transition-all shadow-lg backdrop-blur-xl"
        >
          <Search className="w-5 h-5 sm:w-[21px] sm:h-[21px]" />
        </button>
      )}

      {/* SEARCH BOX — OPENS ONLY AFTER CLICKING ICON */}
      {isOpen && (
        <div className="relative w-[280px] sm:w-[340px] md:w-[400px]">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />

            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-950/95 border border-white/15 text-white placeholder-slate-400 backdrop-blur-xl shadow-2xl focus:outline-none focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close search"
              className="absolute right-3.5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {query.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 overflow-hidden rounded-xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl">
              {results.length > 0 ? (
                <div className="max-h-[360px] overflow-y-auto p-2">
                  {results.map((product: any) => (
                    <button
                      key={`${product.productType}-${product.id}`}
                      type="button"
                      onClick={() => {
                        onSelect?.(product);
                        handleClose();
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-white/10 transition-colors"
                    >
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name || "Product"}
                          className="w-12 h-12 rounded-lg object-contain bg-slate-900 border border-white/10"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-xs text-slate-500">
                          No Image
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-white truncate">
                          {product.name || product.model}
                        </div>

                        <div className="text-xs text-slate-400 mt-1">
                          {getProductTypeLabel(product)}
                          {product.model && ` • ${product.model}`}
                        </div>

                        {product.specs?.processor && (
                          <div className="text-xs text-slate-500 mt-1 truncate">
                            {product.specs.processor}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-5 text-center text-sm text-slate-400">
                  No products found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}