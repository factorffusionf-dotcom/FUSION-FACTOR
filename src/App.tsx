import HeroSection from "./components/HeroSection";
import BrandsSection from "./components/BrandsSection";
import ProductsPage from "./components/ProductsPage";
import PCSection from "./components/PCSection";
import PrintersSection from "./components/PrintersSection";
import AccessoriesSection from "./components/AccessoriesSection";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { ArrowUp } from "lucide-react";

export default function App() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="w-full min-h-screen bg-[#020617] text-white selection:bg-blue-600 selection:text-white scroll-smooth relative">
      <HeroSection />
      <BrandsSection />
      <ProductsPage />
      <PCSection />
      <PrintersSection />
      <AccessoriesSection />
      <Footer />
      <FloatingWhatsApp />

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={handleBackToTop}
        aria-label="Back to top"
        className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 border border-blue-400/30 text-white flex items-center justify-center shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </main>
  );
}