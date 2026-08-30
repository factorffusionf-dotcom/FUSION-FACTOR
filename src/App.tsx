import HeroSection from "./components/HeroSection";
import BrandsSection from "./components/BrandsSection";
import ProductsPage from "./components/ProductsPage";
import PCSection from "./components/PCSection";
import PrintersSection from "./components/PrintersSection";
import AccessoriesSection from "./components/AccessoriesSection";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
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
    </main>
  );
}



