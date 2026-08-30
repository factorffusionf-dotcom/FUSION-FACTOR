import { useState, useRef, useEffect, type MouseEvent, type TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  Star,
  ShieldCheck,
  Bookmark,
  Cpu,
  Monitor,
  HardDrive,
  Laptop,
} from "lucide-react";
import { LaptopProduct } from "../types";
import { ALL_PRODUCTS } from "../data/products";
import { WhatsAppIcon } from "./SocialIcons";

interface FeaturedCarouselProps {
  products?: LaptopProduct[];
  onSelectProduct: (product: LaptopProduct) => void;
}

export default function FeaturedCarousel({
  products = ALL_PRODUCTS,
  onSelectProduct,
}: FeaturedCarouselProps) {
  // Select populated products for the featured carousel
  const featuredList = products.filter(
    (p) => p.isPopulated && (p.images?.length || p.imageUrl)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [internalImgIndexes, setInternalImgIndexes] = useState<Record<string, number>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Auto-cycle fallback safety check
  const activeProduct = featuredList[currentIndex] || featuredList[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : featuredList.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < featuredList.length - 1 ? prev + 1 : 0));
  };

  const handleCardImagePrev = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>,
    productId: string,
    imgCount: number
  ) => {
    e.stopPropagation();
    setInternalImgIndexes((prev) => {
      const cur = prev[productId] || 0;
      return { ...prev, [productId]: cur > 0 ? cur - 1 : imgCount - 1 };
    });
  };

  const handleCardImageNext = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>,
    productId: string,
    imgCount: number
  ) => {
    e.stopPropagation();
    setInternalImgIndexes((prev) => {
      const cur = prev[productId] || 0;
      return { ...prev, [productId]: cur < imgCount - 1 ? cur + 1 : 0 };
    });
  };

  const toggleBookmark = (e: MouseEvent<HTMLButtonElement>, productId: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [featuredList.length]);

  if (!featuredList.length) return null;

  return (
    <div className="relative w-full flex flex-col gap-6 sm:gap-8 select-none">
      {/* Featured Header & Carousel Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-sky-400 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Showcase
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 font-mono">
              Model {currentIndex + 1} of {featuredList.length}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            Spotlight Hardware Models
          </h3>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            id="featured-carousel-prev"
            type="button"
            onClick={handlePrev}
            aria-label="Previous featured model"
            className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/15 hover:border-sky-400/60 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-sky-400" />
          </button>
          <button
            id="featured-carousel-next"
            type="button"
            onClick={handleNext}
            aria-label="Next featured model"
            className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/15 hover:border-sky-400/60 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-sky-400" />
          </button>
        </div>
      </div>

      {/* Featured Cards Carousel Deck */}
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const diff = touchStartX - e.changedTouches[0].clientX;
          if (diff > 40) handleNext();
          else if (diff < -40) handlePrev();
          setTouchStartX(null);
        }}
      >
        {/* Desktop 3-Card Carousel / Mobile Single-Card View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {[-1, 0, 1].map((offset) => {
            const itemIdx =
              (currentIndex + offset + featuredList.length) % featuredList.length;
            const product = featuredList[itemIdx];
            const isCenter = offset === 0;
            const currentImgIdx = internalImgIndexes[product.id] || 0;
            const images =
              product.images && product.images.length > 0
                ? product.images
                : product.imageUrl
                ? [product.imageUrl]
                : [];
            const isBookmarked = !!bookmarkedIds[product.id];

            return (
              <div
                key={`${product.id}-${offset}`}
                className={`transition-all duration-300 ${
                  !isCenter ? "hidden md:flex opacity-60 hover:opacity-90 scale-95" : "flex scale-100"
                }`}
              >
                <div
                  id={`featured-card-${product.id}`}
                  onClick={() => onSelectProduct(product)}
                  className={`w-full rounded-2xl sm:rounded-3xl border ${
                    isCenter
                      ? "border-sky-500/50 bg-slate-950/85 shadow-2xl shadow-blue-950/50"
                      : "border-white/10 bg-slate-950/60 shadow-lg"
                  } p-4 sm:p-5 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:border-sky-400`}
                >
                  {/* Top Badge & Bookmark Action Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-500/40 text-sky-400">
                        {isCenter ? "FEATURED" : product.series || "TOP TIER"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(e, product.id)}
                      aria-label="Save product"
                      className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                        isBookmarked
                          ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isBookmarked ? "fill-rose-400" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Clean Product Image Container with Multi-Angle Carousel */}
                  <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden flex items-center justify-center p-2 mb-3.5 group-hover:border-sky-500/30 transition-colors">
                    {images.length > 0 ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={images[currentImgIdx]}
                            src={images[currentImgIdx]}
                            alt={product.name || "Laptop"}
                            referrerPolicy="no-referrer"
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1.08 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            whileHover={{ scale: 1.14 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="w-full h-full object-contain max-h-full max-w-full select-none"
                          />
                        </AnimatePresence>

                        {/* Image Carousel Prev / Next Controls */}
                        {images.length > 1 && (
                          <>
                            {currentImgIdx > 0 && (
                              <button
                                type="button"
                                onClick={(e) => handleCardImagePrev(e, product.id, images.length)}
                                aria-label="Previous image"
                                className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-white/20 hover:border-sky-400 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer backdrop-blur-sm"
                              >
                                <ChevronLeft className="w-4 h-4 text-sky-400" />
                              </button>
                            )}
                            {currentImgIdx < images.length - 1 && (
                              <button
                                type="button"
                                onClick={(e) => handleCardImageNext(e, product.id, images.length)}
                                aria-label="Next image"
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-white/20 hover:border-sky-400 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer backdrop-blur-sm"
                              >
                                <ChevronRight className="w-4 h-4 text-sky-400" />
                              </button>
                            )}

                            {/* Dot Indicators */}
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/80 border border-white/15 backdrop-blur-sm">
                              {images.map((_, dotIdx) => (
                                <button
                                  key={dotIdx}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setInternalImgIndexes((prev) => ({
                                      ...prev,
                                      [product.id]: dotIdx,
                                    }));
                                  }}
                                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                    dotIdx === currentImgIdx
                                      ? "w-4 bg-sky-400"
                                      : "w-1.5 bg-white/40 hover:bg-white/70"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 gap-1">
                        <Laptop className="w-8 h-8 text-slate-600" />
                        <span className="text-[10px] uppercase font-mono">Product Preview</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details Section */}
                  <div className="flex flex-col gap-2.5 flex-1 justify-between">
                    <div>
                      {/* Rating & Enterprise Status */}
                      <div className="flex items-center justify-between gap-2 text-[11px] mb-1">
                        {product.rating ? (
                          <div className="flex items-center gap-1 text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{product.rating.toFixed(1)}</span>
                            <span className="text-slate-500 font-normal font-mono">({product.reviewsCount || 1} verified)</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-slate-400 font-medium">
                            <Star className="w-3.5 h-3.5 text-slate-500" />
                            <span>No ratings yet</span>
                          </div>
                        )}
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Enterprise Grade
                        </span>
                      </div>

                      {/* Model Name */}
                      <h4 className="text-base sm:text-lg font-black uppercase text-white tracking-tight group-hover:text-sky-400 transition-colors line-clamp-1">
                        {product.name}
                      </h4>

                      {/* Key Specs One-Liner / Pills */}
                      {product.specs && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[10px] text-slate-300">
                          {product.specs.display && (
                            <span className="flex items-center gap-1 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5 font-medium">
                              <Monitor className="w-2.5 h-2.5 text-slate-400" />
                              {product.specs.display}
                            </span>
                          )}
                          {product.specs.processor && (
                            <span className="flex items-center gap-1 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5 font-medium text-slate-200">
                              <Cpu className="w-2.5 h-2.5 text-sky-400" />
                              {product.specs.processor}
                            </span>
                          )}
                          {product.specs.ram && (
                            <span className="flex items-center gap-1 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5 text-slate-300">
                              <HardDrive className="w-2.5 h-2.5 text-slate-400" />
                              {product.specs.ram}
                            </span>
                          )}
                          {product.specs.storage && (
                            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5 text-slate-300">
                              {product.specs.storage}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                          Configuration
                        </span>
                        <span className="text-xs font-bold text-white uppercase tracking-tight">
                          Refurbished A+
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          id={`btn-featured-whatsapp-${product.id}`}
                          href={`https://wa.me/923029695124?text=${encodeURIComponent(
                            `Hi, I am interested in ${product.name}. Please provide me with more details.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Contact on WhatsApp"
                          aria-label={`Contact on WhatsApp about ${product.name}`}
                          className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/30 active:scale-95 cursor-pointer border border-emerald-400/30"
                        >
                          <WhatsAppIcon className="w-4 h-4" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(product);
                          }}
                          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-sky-600/30 active:scale-95 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Specs</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {featuredList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? "w-7 bg-sky-400 shadow-sm shadow-sky-400/50"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
