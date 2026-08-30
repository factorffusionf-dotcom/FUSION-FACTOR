import { useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { motion } from "motion/react";
import {
  Server,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Cpu,
  HardDrive,
  Eye,
  Star,
  Bookmark,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { PCProduct } from "../types";
import { WhatsAppIcon } from "./SocialIcons";

interface PCFrameCardProps {
  key?: string;
  product: PCProduct;
  index: number;
  onSelectProduct?: (product: PCProduct) => void;
}

export default function PCFrameCard({
  product,
  index,
  onSelectProduct,
}: PCFrameCardProps) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const imagesList =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
      ? [product.imageUrl]
      : [];

  const handlePrevImage = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (imagesList.length <= 1) return;
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };

  const handleNextImage = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (imagesList.length <= 1) return;
    setActiveImgIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  const toggleBookmark = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const brandName = product.brandId.toUpperCase();

  const brandBadge =
    product.brandId === "hp"
      ? "text-sky-400 border-sky-500/30 bg-sky-500/10"
      : product.brandId === "dell"
      ? "text-blue-400 border-blue-500/30 bg-blue-500/10"
      : "text-red-400 border-red-500/30 bg-red-500/10";

  const brandAccentHover =
    product.brandId === "hp"
      ? "hover:border-sky-500/50 hover:shadow-sky-500/10"
      : product.brandId === "dell"
      ? "hover:border-blue-500/50 hover:shadow-blue-500/10"
      : "hover:border-red-500/50 hover:shadow-red-500/10";

  return (
    <motion.div
      id={`pc-frame-${product.id}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, delay: Math.min((index % 8) * 0.03, 0.3) }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelectProduct?.(product)}
      className={`group relative rounded-xl sm:rounded-2xl border border-white/10 bg-slate-950/80 p-3 sm:p-4 text-left overflow-hidden transition-all duration-300 ${brandAccentHover} shadow-md hover:shadow-2xl flex flex-col justify-between cursor-pointer h-full`}
    >
      {/* Interactive Radial Glow Effect - Hardware accelerated */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_70%)]" />

      {/* Luminous Sweep Accent on Hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>

      {/* 1. TOP BAR: Brand Badge + Bookmark Action */}
      <div className="relative z-10 flex items-center justify-between gap-1.5 mb-2.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${brandBadge} truncate`}
          >
            {brandName} PC
          </span>
        </div>

        <button
          type="button"
          onClick={toggleBookmark}
          aria-label="Bookmark PC Model"
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
            isBookmarked
              ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
              : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Bookmark
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isBookmarked ? "fill-rose-400" : ""}`}
          />
        </button>
      </div>

      {/* 2. PRODUCT IMAGE CONTAINER (Aspect 4:3) with Clean White Background */}
      <div
        id={`pc-image-area-${product.id}`}
        className="relative z-10 w-full aspect-[4/3] rounded-lg sm:rounded-xl border border-white/15 bg-white overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:border-sky-400/50 shadow-sm"
      >
        {imagesList.length > 0 ? (
          <div className="relative w-full h-full flex items-center justify-center p-2.5 sm:p-3 overflow-hidden bg-white">
            <motion.img
              key={imagesList[activeImgIndex]}
              src={imagesList[activeImgIndex]}
              alt={product.name}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1.04 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full h-full object-contain max-h-full max-w-full select-none"
            />

            {/* Multi-image controls if multiple views exist */}
            {imagesList.length > 1 && (
              <>
                {activeImgIndex > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    onTouchEnd={handlePrevImage}
                    aria-label="Previous view"
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-white/25 hover:border-sky-400 text-white flex items-center justify-center shadow-lg active:scale-90 transition-all cursor-pointer backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
                  </button>
                )}

                {activeImgIndex < imagesList.length - 1 && (
                  <button
                    type="button"
                    onClick={handleNextImage}
                    onTouchEnd={handleNextImage}
                    aria-label="Next view"
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-white/25 hover:border-sky-400 text-white flex items-center justify-center shadow-lg active:scale-90 transition-all cursor-pointer backdrop-blur-sm"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
                  </button>
                )}

                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-slate-950/80 border border-white/15 backdrop-blur-sm">
                  {imagesList.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex(i);
                      }}
                      className={`h-1 sm:h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                        i === activeImgIndex ? "w-3 bg-sky-400" : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-2 text-center bg-white">
            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-blue-600 group-hover:border-blue-300 transition-all duration-300">
              <Server className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-slate-500 group-hover:text-slate-700 transition-colors">
              Desktop PC
            </span>
          </div>
        )}
      </div>

      {/* 3. STRICT PC PRODUCT INFO FORMAT (Brand + Model / Type / Processor + Gen / RAM / Storage) */}
      <div className="relative z-10 mt-3 flex flex-col gap-2 flex-1 justify-between">
        <div>
          {/* Header Rating & Tested Badge */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
            {product.rating ? (
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-slate-400 font-medium">
                <Star className="w-3 h-3 text-slate-500" />
                <span>No ratings yet</span>
              </div>
            )}
            <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" /> Bench Tested
            </span>
          </div>

          {/* 1. Brand + Exact Model */}
          <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug group-hover:text-sky-400 transition-colors">
            {product.name}
          </h4>

          {/* Specifications: Type & Processor */}
          <div className="mt-2 space-y-1 text-[11px] sm:text-xs font-semibold">
            {/* Correct Type: Desktop / Tower */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <Server className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>
                Type: <strong className="text-white font-bold">{product.specs.formFactor || "Desktop"}</strong>
              </span>
            </div>

            {/* Processor + Generation */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">{product.specs.processor}</span>
            </div>
          </div>

          {/* 3. RAM + 4. Storage */}
          <div className="grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5 bg-white/[0.03] px-2 py-1 rounded-md border border-white/5">
              <HardDrive className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold text-white truncate">
                {product.specs.ram || "8GB RAM"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.03] px-2 py-1 rounded-md border border-white/5">
              <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-300 truncate">
                {product.specs.storage}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Explore Specs & Direct WhatsApp */}
        <div className="flex items-center gap-1.5 mt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct?.(product);
            }}
            className="flex-1 py-2 px-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer truncate"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Explore PC Specs</span>
          </button>
          <a
            id={`btn-pc-whatsapp-${product.id}`}
            href={`https://wa.me/923029695124?text=${encodeURIComponent(
              `Hi, I am interested in ${product.name}. Please provide me with more details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Contact on WhatsApp"
            aria-label={`Contact on WhatsApp about ${product.name}`}
            className="py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-sm transition-all active:scale-95 cursor-pointer shrink-0 border border-emerald-400/30"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
