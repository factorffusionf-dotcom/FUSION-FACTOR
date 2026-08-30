import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { WhatsAppIcon } from "./SocialIcons";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Monitor scroll to reveal floating button after a slight scroll (e.g., >80px),
  // and keep it accessible whether scrolling up or down!
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsVisible(true);
      } else {
        // If at the very top of hero, we can still show it or smoothly fade in
        setIsVisible(true);
      }
    };

    // Initialize visibility on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dismiss tooltip timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "923029695124";
  const defaultMessage = encodeURIComponent(
    "Hi FUSION FACTOR, I would like to inquire about your available laptops, PCs, printers and accessories."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div
      id="floating-whatsapp-container"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-end flex-col gap-2 select-none pointer-events-auto"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 group"
          >
            {/* Tooltip bubble (dismissible or auto-collapses) */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.95 }}
                  className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-xl bg-slate-900/95 border border-emerald-500/30 text-white shadow-2xl backdrop-blur-md"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-200">
                    Chat with <strong className="text-white font-bold">FUSION FACTOR</strong>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTooltip(false);
                    }}
                    className="text-slate-400 hover:text-white ml-1 p-0.5 rounded cursor-pointer"
                    aria-label="Close tooltip"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Floating Button */}
            <a
              id="btn-floating-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.45)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group border border-white/20"
              aria-label="Contact FUSION FACTOR on WhatsApp"
            >
              {/* Subtle Pulsing Aura */}
              <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none opacity-60 duration-1000" />
              <span className="absolute -inset-0.5 rounded-full bg-emerald-400/20 blur-sm pointer-events-none" />

              {/* Vector WhatsApp Icon */}
              <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 transition-transform group-hover:rotate-6" />

              {/* Online Indicator Dot */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#020617] rounded-full z-20" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
