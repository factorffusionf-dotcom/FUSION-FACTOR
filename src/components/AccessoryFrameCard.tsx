import { useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  Star,
  Bookmark,
  HardDrive,
  Cpu,
  Mouse,
  Keyboard,
  Volume2,
  Zap,
  Sliders,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { AccessoryProduct } from "../types";
import { WhatsAppIcon } from "./SocialIcons";

interface AccessoryFrameCardProps {
  key?: string;
  product: AccessoryProduct;
  index: number;
  onSelectProduct?: (product: AccessoryProduct) => void;
}

export default function AccessoryFrameCard({
  product,
  index,
  onSelectProduct,
}: AccessoryFrameCardProps) {
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

  // Dynamic icon based on category
  const getCategoryIcon = () => {
    switch (product.category) {
      case "storage-ram":
        return product.id.includes("ram") ? Cpu : HardDrive;
      case "mouse":
        return Mouse;
      case "keyboard":
        return Keyboard;
      case "speaker":
        return Volume2;
      default:
        return Sparkles;
    }
  };
  const CategoryIcon = getCategoryIcon();

  // Category Accent colors
  const getCategoryTheme = () => {
    switch (product.category) {
      case "storage-ram":
        return {
          badge: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
          hover: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
          glow: "rgba(6, 182, 212, 0.18)",
        };
      case "mouse":
        return {
          badge: "text-sky-400 border-sky-500/30 bg-sky-500/10",
          hover: "hover:border-sky-500/50 hover:shadow-sky-500/10",
          glow: "rgba(56, 189, 248, 0.18)",
        };
      case "keyboard":
        return {
          badge: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
          hover: "hover:border-indigo-500/50 hover:shadow-indigo-500/10",
          glow: "rgba(99, 102, 241, 0.18)",
        };
      case "speaker":
        return {
          badge: "text-purple-400 border-purple-500/30 bg-purple-500/10",
          hover: "hover:border-purple-500/50 hover:shadow-purple-500/10",
          glow: "rgba(168, 85, 247, 0.18)",
        };
      default:
        return {
          badge: "text-sky-400 border-sky-500/30 bg-sky-500/10",
          hover: "hover:border-sky-500/50 hover:shadow-sky-500/10",
          glow: "rgba(56, 189, 248, 0.18)",
        };
    }
  };

  const theme = getCategoryTheme();

  return (
    <motion.div
      id={`accessory-frame-${product.id}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, delay: Math.min((index % 5) * 0.05, 0.25) }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelectProduct?.(product)}
      className={`group relative rounded-xl sm:rounded-2xl border border-white/10 bg-slate-950/80 p-3 sm:p-4 text-left overflow-hidden transition-all duration-300 ${theme.hover} shadow-md hover:shadow-2xl flex flex-col justify-between cursor-pointer h-full`}
    >
      {/* Interactive Radial Glow Effect - Hardware accelerated */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_70%)]" />

      {/* Luminous Sweep Accent on Hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>

      {/* 1. TOP BAR: Category Badge + Bookmark Action */}
      <div className="relative z-10 flex items-center justify-between gap-1.5 mb-2.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${theme.badge} truncate flex items-center gap-1`}
          >
            <CategoryIcon className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{product.brand}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={toggleBookmark}
          aria-label="Bookmark Accessory Item"
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

      {/* 2. PRODUCT IMAGE CONTAINER (Aspect 4:3) with Genuine Hardware Presentation */}
      <div className="relative z-10 w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-3 border border-white/10 bg-white flex items-center justify-center group/img">
        {imagesList.length > 0 && imagesList[activeImgIndex] ? (
          <img
            src={imagesList[activeImgIndex]}
            alt={`${product.name} - ${product.model}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          /* Placeholder Architecture Structure for Mouse / Keyboard / Speakers (without images yet) */
          <div className="w-full h-full bg-slate-900/90 flex flex-col items-center justify-center p-4 text-center select-none">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mb-2 group-hover:text-sky-400 group-hover:border-sky-500/40 transition-colors">
              <CategoryIcon className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-slate-300">
              {product.model}
            </span>
            <span className="text-[9px] text-slate-500 mt-0.5">
              Verified Specifications Profile
            </span>
          </div>
        )}

        {/* Condition Tag */}
        {product.condition && (
          <div className="absolute top-2 left-2 z-20">
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm bg-slate-950/90 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 backdrop-blur-xs">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              <span>{product.condition}</span>
            </span>
          </div>
        )}

        {/* Sub-category Pill */}
        <div className="absolute top-2 right-2 z-20">
          <span className="text-[9px] font-semibold text-slate-300 bg-slate-950/80 px-1.5 py-0.5 rounded border border-white/15 backdrop-blur-xs">
            {product.subCategory}
          </span>
        </div>

        {/* Multi-image Controls if multiple images present */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover/img:opacity-100 z-20 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover/img:opacity-100 z-20 cursor-pointer shadow-md"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {/* 3. PRODUCT INFO & DETAILS */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating & Review Count */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-400">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs font-bold text-white">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-400">
                ({product.reviewsCount ?? 60}+ reviews)
              </span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              In Stock
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-black text-white group-hover:text-sky-400 transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Model Name */}
          <div className="text-[11px] font-semibold text-slate-300 mt-0.5 flex items-center gap-1 truncate">
            <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider">
              MODEL:
            </span>
            <span className="truncate">{product.model}</span>
          </div>

          {/* Short Description */}
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Specifications Grid */}
          <div className="mt-2.5 pt-2 border-t border-white/5 grid grid-cols-2 gap-1.5 text-[10px] font-medium text-slate-300">
            {product.specs.formFactor && (
              <div className="flex items-center gap-1 truncate bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5">
                <span className="text-slate-500 text-[9px] uppercase">Form:</span>
                <span className="truncate text-slate-200">{product.specs.formFactor}</span>
              </div>
            )}
            {product.specs.interface && (
              <div className="flex items-center gap-1 truncate bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5">
                <span className="text-slate-500 text-[9px] uppercase">Bus:</span>
                <span className="truncate text-slate-200">{product.specs.interface}</span>
              </div>
            )}
            {product.specs.readSpeed && (
              <div className="flex items-center gap-1 truncate bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5">
                <span className="text-slate-500 text-[9px] uppercase">Read:</span>
                <span className="truncate text-sky-300 font-semibold">{product.specs.readSpeed}</span>
              </div>
            )}
            {product.specs.capacityOptions && (
              <div className="flex items-center gap-1 truncate bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5">
                <span className="text-slate-500 text-[9px] uppercase">Size:</span>
                <span className="truncate text-slate-200">{product.specs.capacityOptions}</span>
              </div>
            )}
            {product.specs.frequency && (
              <div className="flex items-center gap-1 truncate bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5">
                <span className="text-slate-500 text-[9px] uppercase">Speed:</span>
                <span className="truncate text-sky-300 font-semibold">{product.specs.frequency}</span>
              </div>
            )}
            {product.specs.memoryType && (
              <div className="flex items-center gap-1 truncate bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5">
                <span className="text-slate-500 text-[9px] uppercase">Type:</span>
                <span className="truncate text-slate-200">{product.specs.memoryType}</span>
              </div>
            )}
            {product.specs.resolution && (
              <div className="flex items-center gap-1 truncate bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5">
                <span className="text-slate-500 text-[9px] uppercase">DPI:</span>
                <span className="truncate text-sky-300 font-semibold">{product.specs.resolution}</span>
              </div>
            )}
            {product.specs.keySwitchType && (
              <div className="flex items-center gap-1 truncate bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5 col-span-2">
                <span className="text-slate-500 text-[9px] uppercase">Switch:</span>
                <span className="truncate text-slate-200">{product.specs.keySwitchType}</span>
              </div>
            )}
            {product.specs.speakerType && (
              <div className="flex items-center gap-1 truncate bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5 col-span-2">
                <span className="text-slate-500 text-[9px] uppercase">Audio:</span>
                <span className="truncate text-slate-200">{product.specs.speakerType}</span>
              </div>
            )}
            {product.specs.powerOutput && (
              <div className="flex items-center gap-1 truncate bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5">
                <span className="text-slate-500 text-[9px] uppercase">Power:</span>
                <span className="truncate text-purple-300 font-semibold">{product.specs.powerOutput}</span>
              </div>
            )}
          </div>
        </div>

        {/* 4. FOOTER: Action Buttons (Explore Specs & Direct WhatsApp) */}
        <div className="flex items-center gap-1.5 mt-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct?.(product);
            }}
            className="flex-1 py-2 px-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer truncate"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Explore Specs</span>
          </button>
          <a
            id={`btn-acc-whatsapp-${product.id}`}
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
