import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Zap,
  Wrench,
  Cpu,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "./SocialIcons";

export type HeroServiceType = "upgrades" | "repairs" | "parts" | null;

interface HeroServiceModalProps {
  serviceType: HeroServiceType;
  onClose: () => void;
}

const SERVICE_DATA = {
  upgrades: {
    id: "upgrades",
    badge: "Performance Enhancement",
    title: "PC & Laptop Upgrades",
    icon: Zap,
    themeColor: "from-blue-500 to-cyan-400",
    borderGlow: "border-blue-500/30",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    introLead: "Looking to improve the performance of your PC or laptop?",
    introBody:
      "FUSION FACTOR provides professional upgrade solutions based on your system and requirements.",
    listHeading: "We can assist with suitable upgrades such as:",
    items: [
      "RAM upgrades",
      "SSD / NVMe upgrades",
      "Storage upgrades",
      "Performance-related hardware upgrades",
      "Other compatible hardware upgrades",
    ],
    callout:
      "Need an upgrade? Contact FUSION FACTOR and let us help you find the right solution for your system.",
    whatsappMessage:
      "Hi FUSION FACTOR, I would like to know more about your Upgrade services.",
  },
  repairs: {
    id: "repairs",
    badge: "Hardware & Diagnostic Assistance",
    title: "PC & Laptop Repair Services",
    icon: Wrench,
    themeColor: "from-amber-500 to-orange-400",
    borderGlow: "border-amber-500/30",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    introLead: "Having an issue with your PC or laptop?",
    introBody:
      "FUSION FACTOR provides professional computer repair assistance for hardware and system-related issues.",
    listHeading: "Customers can contact us regarding:",
    items: [
      "Laptop issues",
      "PC hardware problems",
      "Performance problems",
      "Storage or RAM-related issues",
      "General computer troubleshooting",
      "Other hardware-related problems",
    ],
    callout:
      "Contact FUSION FACTOR with details about your issue and our team can guide you regarding the appropriate repair solution.",
    whatsappMessage:
      "Hi FUSION FACTOR, I would like to know more about your Repair services.",
  },
  parts: {
    id: "parts",
    badge: "Components & Replacement Hardware",
    title: "PC & Laptop Parts",
    icon: Cpu,
    themeColor: "from-emerald-500 to-teal-400",
    borderGlow: "border-emerald-500/30",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    introLead: "Looking for computer hardware or replacement parts?",
    introBody:
      "FUSION FACTOR offers a range of computer components and parts for different PC and laptop requirements, including items such as:",
    listHeading: "Available parts and components include:",
    items: [
      "RAM",
      "SSD / NVMe",
      "Hard Drives",
      "Computer accessories",
      "Replacement hardware",
      "Other compatible PC and laptop components",
    ],
    callout:
      "Contact us with the part or model you are looking for, and we can help you find a suitable option.",
    whatsappMessage:
      "Hi FUSION FACTOR, I would like to know more about your Parts services.",
  },
};

export default function HeroServiceModal({
  serviceType,
  onClose,
}: HeroServiceModalProps) {
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation: Escape to close
  useEffect(() => {
    if (!serviceType) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [serviceType, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (serviceType) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [serviceType]);

  const service = serviceType ? SERVICE_DATA[serviceType] : null;

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          id={`hero-service-modal-${service.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        >
          {/* Modal Container */}
          <motion.div
            ref={modalContainerRef}
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl bg-[#090e1a] border ${service.borderGlow} rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col my-auto`}
          >
            {/* Top Atmospheric Glow */}
            <div
              className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${service.themeColor}`}
            />
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            {/* Modal Header */}
            <div className="relative z-10 px-5 sm:px-7 pt-6 pb-4 border-b border-white/10 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-inner`}
                >
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${service.badgeBg}`}
                    >
                      {service.badge}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                      <Sparkles className="w-3 h-3" /> FUSION FACTOR
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                    {service.title}
                  </h2>
                </div>
              </div>

              {/* Close Button */}
              <button
                id="close-hero-service-modal-btn"
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 active:bg-white/20 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="relative z-10 px-5 sm:px-7 py-5 sm:py-6 space-y-5 max-h-[calc(85vh-160px)] overflow-y-auto custom-scrollbar text-slate-200">
              {/* Intro Statement */}
              <div className="bg-slate-900/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2">
                <p className="text-sm sm:text-base font-semibold text-white">
                  {service.introLead}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {service.introBody}
                </p>
              </div>

              {/* Assistance / Scope Checklist */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
                  {service.listHeading}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Callout Notice */}
              <div className="p-4 sm:p-4.5 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900/60 border border-blue-500/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-blue-200 font-medium leading-relaxed">
                  {service.callout}
                </p>
              </div>
            </div>

            {/* Modal Footer / WhatsApp Contact */}
            <div className="relative z-10 px-5 sm:px-7 py-4 sm:py-5 border-t border-white/10 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left w-full sm:w-auto">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Direct Inquiries &amp; Guidance
                </p>
                <p className="text-xs text-slate-300 font-medium">
                  WhatsApp Support:{" "}
                  <span className="text-emerald-400 font-bold font-mono">
                    +92 3029695124
                  </span>
                </p>
              </div>

              <a
                id={`hero-modal-whatsapp-btn-${service.id}`}
                href={`https://wa.me/923029695124?text=${encodeURIComponent(
                  service.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 transition-all duration-200 active:scale-95 shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Contact on WhatsApp</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
