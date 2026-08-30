import {
  Mail,
  Phone,
  MapPin,
  Clock,
  User,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  Sparkles,
  Layers,
  Laptop,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppIcon, InstagramIcon, TikTokIcon } from "./SocialIcons";
import fusionFactorLogo from "../assets/images/fusion_factor_logo_1788023609716.jpg";

export default function Footer() {
  const whatsappNumber = "923029695124";
  const whatsappDisplay = "+92 3029695124";
  const phoneNumber = "0302-9695124";
  const phoneTel = "03029695124";
  const emailAddress = "officialfusionfactor1@gmail.com";
  const shopAddress = "Shop G-98 Gate # 08, Naz Plaza, Saddar, Karachi";
  const shopTiming = "11:00 AM – 9:00 PM";
  const ownerName = "Saad Arshad";
  const instagramUrl = "https://www.instagram.com/official_fusionfactor/";
  const tiktokUrl = "https://www.tiktok.com/@official_fusionfactor";

  return (
    <footer
      id="main-footer"
      className="relative w-full bg-[#020617] border-t border-white/10 text-white overflow-hidden z-20"
    >
      {/* Background Cyber Ambient Light & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-14 pb-10">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pb-10 mb-10 border-b border-white/10">
          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-sky-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider text-white">Grade A+ Stock</div>
              <div className="text-[11px] text-slate-400 truncate">100% Bench Tested Hardware</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider text-white">Fast WhatsApp Support</div>
              <div className="text-[11px] text-slate-400 truncate">Instant Model Inquiries</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider text-white">Laptops, PCs &amp; Parts</div>
              <div className="text-[11px] text-slate-400 truncate">Complete Enterprise Range</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider text-white">Naz Plaza, Saddar</div>
              <div className="text-[11px] text-slate-400 truncate">11:00 AM – 9:00 PM Daily</div>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-12">
          {/* Column 1: Brand Info & Owner (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="relative shrink-0 group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-sky-500/30 to-blue-600/30 blur-sm group-hover:blur-md transition-all pointer-events-none" />
                <img
                  id="footer-brand-logo"
                  src={fusionFactorLogo}
                  alt="FUSION FACTOR Official Logo"
                  loading="lazy"
                  decoding="async"
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-sky-400/30 shadow-2xl shadow-sky-950/60 aspect-square"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                  <span className="text-sky-400 font-extrabold tracking-wider">FUSION</span>
                  <span className="factor-split font-black tracking-wider">FACTOR</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-sky-400 tracking-wide">
                  Evaluate Your Gigital Experience
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Your premier technology destination in Karachi for enterprise laptops, high-performance desktop PCs, laser multi-function printers, storage upgrades, and certified IT accessories.
            </p>

            {/* Business & Owner Card */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center gap-3 mt-1">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Business Owner
                </div>
                <div className="text-sm font-black text-white truncate">
                  {ownerName}
                </div>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Direct Contact Information (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2 border-l-2 border-sky-500 pl-2.5">
              <span>Contact Information</span>
            </h4>

            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-300">
              {/* WhatsApp (Clickable) */}
              <li>
                <a
                  id="footer-link-whatsapp"
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    "Hi FUSION FACTOR, I am interested in inquiring about your product catalog."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400">WhatsApp Chat</span>
                    <span className="font-semibold text-emerald-300 group-hover:text-emerald-200 truncate">
                      {whatsappDisplay}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 ml-auto shrink-0 transition-colors" />
                </a>
              </li>

              {/* Direct Phone Call (Clickable) */}
              <li>
                <a
                  id="footer-link-phone"
                  href={`tel:${phoneTel}`}
                  className="group p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Contact Number</span>
                    <span className="font-semibold text-white group-hover:text-sky-300 truncate">
                      {phoneNumber}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 ml-auto shrink-0 transition-colors" />
                </a>
              </li>

              {/* Email Address (Clickable mailto:) */}
              <li>
                <a
                  id="footer-link-email"
                  href={`mailto:${emailAddress}`}
                  className="group p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Email Inquiry</span>
                    <span className="font-medium text-slate-200 group-hover:text-white truncate break-all">
                      {emailAddress}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 ml-auto shrink-0 transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Shop Address & Timing (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2 border-l-2 border-purple-500 pl-2.5">
              <span>Location &amp; Timings</span>
            </h4>

            <div className="flex flex-col gap-3">
              {/* Address Box */}
              <a
                id="footer-link-map"
                href="https://www.google.com/maps/search/?api=1&query=Shop+G-98+Gate+08+Naz+Plaza+Saddar+Karachi"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all flex items-start gap-3 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Shop Address</span>
                  <p className="text-xs font-semibold text-white group-hover:text-purple-300 leading-snug mt-0.5">
                    {shopAddress}
                  </p>
                  <span className="text-[10px] text-purple-400 font-medium flex items-center gap-1 mt-1">
                    Open in Maps <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </a>

              {/* Timing Box */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Shop Timings</span>
                  <span className="text-xs font-bold text-amber-300 mt-0.5">
                    {shopTiming}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                    Open Monday through Sunday
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Official Social Media & Connect (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2 border-l-2 border-emerald-500 pl-2.5">
              <span>Follow Us</span>
            </h4>

            <p className="text-xs text-slate-400">
              Stay updated with new inventory arrivals and tech unboxings.
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Instagram Button */}
              <a
                id="footer-link-instagram"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-500/20 hover:border-pink-500/50 text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-pink-500/10"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-md">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-slate-400">Instagram</span>
                  <span className="text-xs font-bold text-pink-300 group-hover:text-pink-200 truncate">
                    @official_fusionfactor
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-pink-400 ml-auto shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* TikTok Button */}
              <a
                id="footer-link-tiktok"
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5 text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-cyan-500/10"
              >
                <div className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-md">
                  <TikTokIcon className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-slate-400">TikTok</span>
                  <span className="text-xs font-bold text-cyan-300 group-hover:text-cyan-200 truncate">
                    @official_fusionfactor
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 ml-auto shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <span className="text-slate-300 font-semibold">
              © {new Date().getFullYear()} <strong className="text-white font-bold">FUSION FACTOR</strong>. All Rights Reserved.
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400">Owner: <strong className="text-slate-200">{ownerName}</strong></span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <span className="text-sky-400 font-bold">Evaluate Your Gigital Experience</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
