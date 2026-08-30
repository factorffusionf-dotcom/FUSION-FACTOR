import { useState, useEffect, useRef, type MouseEvent, type TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Cpu,
  HardDrive,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  Zap,
  Laptop,
  Layers,
  ArrowLeft,
  Server,
  Printer,
  Wifi,
  Sliders,
  FileText,
} from "lucide-react";
import { LaptopProduct, PCProduct, PrinterProduct, AccessoryProduct } from "../types";
import { WhatsAppIcon } from "./SocialIcons";

interface ProductDetailModalProps {
  product: LaptopProduct | PCProduct | PrinterProduct | AccessoryProduct | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const isAccessory = product?.productType === "accessory";
  const isPrinter = product?.productType === "printer";
  const isPC = product?.productType === "pc" || (!isPrinter && !isAccessory && product && !product.specs?.display);

  // Reset active image index whenever the product changes or opens
  useEffect(() => {
    setActiveImgIndex(0);
  }, [product?.id]);

  // Extract all valid images for the product
  const imagesList =
    product?.images && product.images.length > 0
      ? product.images
      : product?.imageUrl
      ? [product.imageUrl]
      : [];

  const totalImages = imagesList.length;

  // Keyboard navigation: Escape to close, ArrowLeft / ArrowRight to change images
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && totalImages > 1) {
        setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
      } else if (e.key === "ArrowRight" && totalImages > 1) {
        setActiveImgIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, totalImages, onClose]);

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  const handlePrevImage = (e?: MouseEvent | TouchEvent) => {
    e?.stopPropagation();
    if (totalImages <= 1) return;
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  };

  const handleNextImage = (e?: MouseEvent | TouchEvent) => {
    e?.stopPropagation();
    if (totalImages <= 1) return;
    setActiveImgIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  };

  // Mobile Touch Swipe Handling on the Product Image Area
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || touchStartY === null || !e.changedTouches[0]) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    // Only trigger if horizontal swipe is prominent and greater than vertical scroll
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swiped Left -> Next Image
        handleNextImage();
      } else {
        // Swiped Right -> Previous Image
        handlePrevImage();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  const brandName =
    "brand" in product && product.brand
      ? product.brand.toUpperCase()
      : "brandId" in product && product.brandId
      ? product.brandId.toUpperCase()
      : "ACCESSORY";

  const brandTheme =
    "brandId" in product && product.brandId === "hp"
      ? {
          badge: "text-sky-400 border-sky-500/30 bg-sky-500/10",
          glow: "from-sky-600/15 via-blue-600/5 to-transparent",
          accent: "text-sky-400",
          buttonBg: "bg-sky-600 hover:bg-sky-500",
          border: "border-sky-500/30",
        }
      : "brandId" in product && product.brandId === "dell"
      ? {
          badge: "text-blue-400 border-blue-500/30 bg-blue-500/10",
          glow: "from-blue-600/15 via-indigo-600/5 to-transparent",
          accent: "text-blue-400",
          buttonBg: "bg-blue-600 hover:bg-blue-500",
          border: "border-blue-500/30",
        }
      : isAccessory
      ? {
          badge: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
          glow: "from-cyan-600/15 via-sky-600/5 to-transparent",
          accent: "text-cyan-400",
          buttonBg: "bg-cyan-600 hover:bg-cyan-500",
          border: "border-cyan-500/30",
        }
      : {
          badge: "text-red-400 border-red-500/30 bg-red-500/10",
          glow: "from-red-600/15 via-rose-600/5 to-transparent",
          accent: "text-red-400",
          buttonBg: "bg-red-600 hover:bg-red-500",
          border: "border-red-500/30",
        };

  // Descriptive label for image view angles
  const getImageAngleLabel = (index: number) => {
    if (index === 0) return "Image 1 • Front / Open View";
    if (index === 1) return "Image 2 • Secondary / Angle View";
    return `Image ${index + 1} • Detail View`;
  };

  return (
    <motion.div
      id="product-detail-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={modalContainerRef}
        id="product-detail-modal-container"
        initial={{ opacity: 0, scale: 0.94, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.96, y: 10, filter: "blur(2px)" }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity, filter" }}
        className="relative w-full max-w-5xl max-h-[94vh] sm:max-h-[90vh] rounded-2xl sm:rounded-3xl border border-white/20 bg-slate-950 text-left shadow-2xl shadow-black/95 overflow-hidden flex flex-col my-auto"
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${brandTheme.glow} blur-3xl pointer-events-none rounded-full`}
        />

        {/* ==================================================
            1. MODAL TOP BAR / HEADER
            ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.04, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 border-b border-white/10 bg-slate-950/80 backdrop-blur-md shrink-0"
        >
          {/* Brand & Series Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-w-0">
            <span
              className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${brandTheme.badge}`}
            >
              {brandName}
            </span>

            {"series" in product && product.series && (
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                {product.series}
              </span>
            )}

            <span className="hidden xs:inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Grade A+ Refurbished
            </span>
          </div>

          {/* Top Actions: WhatsApp & Close */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              id="btn-modal-top-whatsapp"
              href={`https://wa.me/923029695124?text=${encodeURIComponent(
                `Hi, I am interested in ${product.name || ("model" in product && product.model) || "this product"}. Please provide me with more details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-600/25 border border-emerald-400/30 cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden xs:inline text-[11px] sm:text-xs">WhatsApp</span>
            </a>

            {/* Primary Top Close / Go Back Button */}
            <button
              id="btn-modal-top-close"
              type="button"
              onClick={onClose}
              aria-label="Close Product Details"
              title="Close / Return to catalog"
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/10 hover:bg-red-500/20 active:scale-95 border border-white/20 hover:border-red-500/40 text-slate-200 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-all shadow-md group cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:rotate-90 transition-transform duration-200" />
              <span className="text-[11px] sm:text-xs font-bold">Close</span>
            </button>
          </div>
        </motion.div>

        {/* ==================================================
            2. MAIN CONTENT AREA (2 COLUMNS DESKTOP, VERTICAL MOBILE)
            ================================================== */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            {/* --------------------------------------------------
                LEFT SIDE: PRODUCT IMAGES & NAVIGATION
                -------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.26, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 xl:col-span-6 flex flex-col gap-3 sm:gap-4 w-full"
            >
              {/* Main Image Stage */}
              <div
                id="product-detail-image-stage"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className={`relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl border ${
                  isPC || isPrinter
                    ? "border-white/20 bg-white"
                    : "border-white/15 bg-gradient-to-b from-slate-900/95 to-slate-950/95"
                } overflow-hidden flex items-center justify-center p-3 sm:p-4 shadow-xl shadow-black/60 group select-none`}
              >
                {/* Tech Corner Accent Lines */}
                <div className={`absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 ${isPC || isPrinter ? "border-slate-300" : "border-sky-400/40"} pointer-events-none`} />
                <div className={`absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 ${isPC || isPrinter ? "border-slate-300" : "border-sky-400/40"} pointer-events-none`} />
                <div className={`absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 ${isPC || isPrinter ? "border-slate-300" : "border-sky-400/40"} pointer-events-none`} />
                <div className={`absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 ${isPC || isPrinter ? "border-slate-300" : "border-sky-400/40"} pointer-events-none`} />

                {totalImages > 0 ? (
                  <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${isPC || isPrinter ? "bg-white" : ""}`}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${product.id}-${activeImgIndex}-${imagesList[activeImgIndex]}`}
                        src={imagesList[activeImgIndex]}
                        alt={`${product.name || brandName} - View ${activeImgIndex + 1}`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1.05 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="w-full h-full object-contain max-h-full max-w-full select-none"
                      />
                    </AnimatePresence>

                    {/* Navigation Arrows for Multi-Image Gallery */}
                    {totalImages > 1 && (
                      <>
                        {/* LEFT ARROW (←) */}
                        <button
                          id="btn-product-detail-prev-img"
                          type="button"
                          onClick={(e) => handlePrevImage(e)}
                          aria-label="Previous product image"
                          title="Previous image (Left Arrow)"
                          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-950/90 hover:bg-sky-600 border border-white/25 hover:border-sky-400 text-white flex items-center justify-center shadow-2xl active:scale-90 transition-all cursor-pointer backdrop-blur-md group/btn"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 group-hover/btn:text-white transition-colors" />
                        </button>

                        {/* RIGHT ARROW (→) */}
                        <button
                          id="btn-product-detail-next-img"
                          type="button"
                          onClick={(e) => handleNextImage(e)}
                          aria-label="Next product image"
                          title="Next image (Right Arrow)"
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-950/90 hover:bg-sky-600 border border-white/25 hover:border-sky-400 text-white flex items-center justify-center shadow-2xl active:scale-90 transition-all cursor-pointer backdrop-blur-md group/btn"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 group-hover/btn:text-white transition-colors" />
                        </button>
                      </>
                    )}

                    {/* Image Counter Badge on Main Image */}
                    {totalImages > 1 && (
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/85 border border-white/15 text-[10px] sm:text-xs font-mono text-slate-300 backdrop-blur-sm">
                        <Layers className="w-3 h-3 text-sky-400" />
                        <span className="font-bold text-white">{activeImgIndex + 1}</span>
                        <span className="text-slate-500">/</span>
                        <span>{totalImages}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Placeholder when no image */
                  <div className="flex flex-col items-center justify-center text-center gap-2 text-slate-500">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-sky-400">
                      <Laptop className="w-7 h-7" />
                    </div>
                    <span className="text-xs uppercase font-mono text-slate-400">
                      Product Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Multi-Image Thumbnails & Angle Selector */}
              {totalImages > 1 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                    <span className="font-semibold text-slate-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-sky-400" />
                      {getImageAngleLabel(activeImgIndex)}
                    </span>
                    <span className="text-[10px] text-slate-500 hidden sm:inline">
                      Click thumbnails or use arrows
                    </span>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {imagesList.map((imgUrl, idx) => {
                      const isActive = idx === activeImgIndex;
                      return (
                        <button
                          key={`${imgUrl}-${idx}`}
                          id={`btn-thumbnail-${product.id}-${idx}`}
                          type="button"
                          onClick={() => setActiveImgIndex(idx)}
                          className={`relative aspect-[16/10] rounded-xl border p-1 ${
                            isPC || isPrinter ? "bg-white" : "bg-slate-900/80"
                          } overflow-hidden transition-all duration-200 cursor-pointer flex items-center justify-center ${
                            isActive
                              ? "border-sky-400 bg-sky-950/40 ring-2 ring-sky-500/30 scale-[1.02]"
                              : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Thumbnail ${idx + 1}`}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain select-none"
                          />
                          <span
                            className={`absolute bottom-1 right-1 text-[9px] font-mono px-1 py-0.2 rounded ${
                              isActive
                                ? "bg-sky-500 text-white font-bold"
                                : "bg-black/70 text-slate-300"
                            }`}
                          >
                            #{idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* --------------------------------------------------
                RIGHT SIDE: PRODUCT DETAILS & SPECIFICATIONS
                -------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 xl:col-span-6 flex flex-col gap-4 sm:gap-5 w-full"
            >
              {/* Product Header & Rating */}
              <div className="flex flex-col gap-1.5 border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  {product.rating ? (
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating.toFixed(1)}</span>
                      <span className="text-slate-500 font-normal font-mono">(Enterprise Verified)</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-slate-400 font-medium">
                      <Star className="w-3.5 h-3.5 text-slate-500" />
                      <span>No ratings yet</span>
                    </div>
                  )}
                  <span className="text-slate-600 font-mono">•</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Tested &amp; Certified
                  </span>
                </div>

                {/* Product Name Title */}
                <h3
                  id="product-detail-name"
                  className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white tracking-tight leading-tight"
                >
                  {product.name || `${brandName} Hardware`}
                </h3>

                {/* Model Number / Category Note */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-0.5">
                  <span className="font-mono text-slate-300">
                    Model: <strong className="text-white">{product.model || product.name || "Enterprise Series"}</strong>
                  </span>
                </div>
              </div>

              {/* Complete Technical Specifications Grid */}
              <div className="flex flex-col gap-2.5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  {isPrinter
                    ? "Printer Specifications"
                    : isAccessory
                    ? "Accessory & Component Specifications"
                    : "Hardware Specifications"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {/* ACCESSORY SPECS */}
                  {isAccessory ? (
                    <>
                      {product.specs &&
                        Object.entries(product.specs).map(([key, val]) => {
                          if (!val) return null;
                          const formattedKey = key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase());
                          return (
                            <div
                              key={key}
                              className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                                <Zap className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                  {formattedKey}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-white break-words">
                                  {val}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  ) : isPrinter ? (
                    <>
                      {/* 1. Functions */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Functions
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {product.specs?.functions || "Print / Scan / Copy"}
                          </span>
                        </div>
                      </div>

                      {/* 2. Print Speed */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Print Speed
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {product.specs?.printSpeed || "Up to 20 ppm"}
                          </span>
                        </div>
                      </div>

                      {/* 3. Resolution */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                          <Sliders className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Max Resolution
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {product.specs?.resolution || "1200 × 1200 dpi"}
                          </span>
                        </div>
                      </div>

                      {/* 4. Connectivity */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                          <Wifi className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Connectivity
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white truncate">
                            {product.specs?.connectivity || "Hi-Speed USB 2.0"}
                          </span>
                        </div>
                      </div>

                      {/* 5. Paper Handling */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Paper Capacity
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {product.specs?.paperHandling || "150-Sheet Input Tray"}
                          </span>
                        </div>
                      </div>

                      {/* 6. Ink / Toner Cartridge */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                          <Printer className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Ink / Toner Model
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white truncate">
                            {product.specs?.inkOrToner || "Genuine Cartridge"}
                          </span>
                        </div>
                      </div>

                      {/* 7. Duty Cycle / Yield */}
                      {product.specs?.dutyCycle && (
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 sm:col-span-2">
                          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                              Monthly Duty Cycle / Yield
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-sky-300">
                              {product.specs.dutyCycle}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 8. Power & In-the-Box Inclusions */}
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 sm:col-span-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                            Included In Box
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-emerald-300">
                            Printer Unit, AC Power Cord, USB Cable, Starter Toner/Inks &amp; Manual
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* LAPTOP & PC SPECS */
                    <>
                      {/* 1. Display (Laptop Only) OR Form Factor / Type (PC) */}
                      {isPC ? (
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                            <Server className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                              Type
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-white">
                              {product.specs?.formFactor || "Desktop"}
                            </span>
                          </div>
                        </div>
                      ) : (
                        product.specs?.display && (
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                              <Monitor className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                Display Size
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-white">
                                {product.specs.display}
                              </span>
                            </div>
                          </div>
                        )
                      )}

                      {/* 2. Processor */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Processor &amp; Gen
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white truncate">
                            {product.specs?.processor || "High Performance CPU"}
                          </span>
                        </div>
                      </div>

                      {/* 3. Memory / RAM */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                          <HardDrive className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Installed RAM
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {product.specs?.ram || "8GB RAM"}
                          </span>
                        </div>
                      </div>

                      {/* 4. Storage */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-white/20 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                          <HardDrive className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Storage / SSD
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {product.specs?.storage || "High-Speed Storage"}
                          </span>
                        </div>
                      </div>

                      {/* 5. Graphics (If present or default) */}
                      {product.specs?.graphics && (
                        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                            <Zap className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">
                              Graphics Adapter
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-blue-200">
                              {product.specs.graphics}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 6. Touchscreen (If present - Laptop only) */}
                      {!isPC && product.specs?.touchscreen && (
                        <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-300 shrink-0 mt-0.5">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-sky-400 font-semibold">
                              Touch Display
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-sky-200">
                              {product.specs.touchscreen}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 7. OS / Power Supply */}
                      {product.specs?.os && (
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                              Operating System
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-white">
                              {product.specs.os}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 8. Power Cable / Adapter Included */}
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 sm:col-span-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                            Power &amp; Accessories Included
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-emerald-300">
                            {isPC
                              ? "Heavy-Duty Desktop AC Power Cable Included"
                              : product.specs?.charger
                              ? `${product.specs.charger} Original OEM Charger Included`
                              : "Original OEM Charger & Power Cable Included"}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Hardware Certification Checklist */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 flex flex-col gap-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  Quality & Performance Assurance
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    Clean Optical & Body Grade A+
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    {isPC ? "Thermal Paste Cleaned & Tested" : "Verified Battery Health"}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    All Ports & Connectivity Tested
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    Enterprise Sanitized & Certified
                  </span>
                </div>
              </div>

              {/* Bottom Action: WhatsApp CTA & Return Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-white/10 mt-auto">
                <a
                  id={`btn-modal-bottom-whatsapp-${product.id}`}
                  href={`https://wa.me/923029695124?text=${encodeURIComponent(
                    `Hi, I am interested in ${product.name || ("model" in product && product.model) || "this product"}. Please provide me with more details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 active:scale-[0.99] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 border border-emerald-400/40 group"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Contact on WhatsApp</span>
                </a>

                <button
                  id="btn-modal-bottom-close"
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.99] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Catalog</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
