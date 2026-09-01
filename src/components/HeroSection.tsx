import { motion, useScroll, useTransform, useSpring, type Variants } from "motion/react";
import { useRef, useState } from "react";
import HeroServiceModal, { type HeroServiceType } from "./HeroServiceModal";
import GlobalSearchBar from "./GlobalSearchBar";

const CATEGORIES = [
  {
    name: "Laptops",
    fontClass:
      "text-xs xs:text-sm sm:text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base tracking-wider",
    spanClass: "",
  },
  {
    name: "PC",
    fontClass:
      "text-sm xs:text-base sm:text-lg md:text-base lg:text-sm xl:text-base 2xl:text-lg tracking-widest",
    spanClass: "",
  },
  {
    name: "Printers",
    fontClass:
      "text-xs xs:text-sm sm:text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base tracking-wider",
    spanClass: "",
  },
  {
    name: "Parts",
    fontClass:
      "text-xs xs:text-sm sm:text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base tracking-wider",
    spanClass: "",
  },
  {
    name: "Upgrades",
    fontClass:
      "text-xs xs:text-sm sm:text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base tracking-wider",
    spanClass: "",
  },
  {
    name: "Repairs",
    fontClass:
      "text-xs xs:text-sm sm:text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base tracking-wider",
    spanClass: "",
  },
  {
    name: "Accessories",
    fontClass:
      "text-[10px] xs:text-xs sm:text-sm md:text-xs lg:text-[10.5px] xl:text-xs 2xl:text-sm tracking-wide",
    spanClass:
      "col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1",
  },
];

interface CategoryCardProps {
  key?: string;
  cat: (typeof CATEGORIES)[number];
  index: number;
  variants: Variants;
  onSelectService: (service: HeroServiceType) => void;
}

function CategoryCard({
  cat,
  index,
  variants,
  onSelectService,
}: CategoryCardProps) {
  const handleClick = () => {
    if (cat.name === "Upgrades") {
      onSelectService("upgrades");
    } else if (cat.name === "Repairs") {
      onSelectService("repairs");
    } else if (cat.name === "Parts") {
      onSelectService("parts");
    } else if (cat.name === "PC") {
      const pcSection =
        document.getElementById("pc-section") ||
        document.getElementById("pc-catalog-section");

      if (pcSection) {
        pcSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (cat.name === "Printers") {
      const printerSection =
        document.getElementById("printers-section") ||
        document.getElementById("printers-catalog-title");

      if (printerSection) {
        printerSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (cat.name === "Accessories") {
      const accessoriesSection =
        document.getElementById("accessories-section");

      if (accessoriesSection) {
        accessoriesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (cat.name === "Laptops") {
      const laptopSection =
        document.getElementById("products-catalog-section") ||
        document.getElementById("brands-section");

      if (laptopSection) {
        laptopSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <motion.div
      id={`category-box-${cat.name.toLowerCase()}`}
      variants={variants}
      onClick={handleClick}
      whileHover={{
        scale: 1.04,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      whileTap={{
        scale: 0.96,
      }}
      className={`cat-box px-2.5 sm:px-3 md:px-4 py-3 sm:py-3.5 md:py-4 cursor-pointer relative overflow-hidden group rounded-lg sm:rounded-xl flex items-center justify-center text-center ${cat.spanClass}`}
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.32),transparent_70%)]" />

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

        <div className="absolute inset-0 border border-blue-400/30 rounded-lg sm:rounded-xl pointer-events-none" />
      </div>

      <motion.h2
        id={`category-text-${cat.name.toLowerCase()}`}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.3 + index * 0.05,
        }}
        className={`text-white font-black uppercase whitespace-nowrap block relative z-20 ${cat.fontClass}`}
      >
        {cat.name}
      </motion.h2>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [videoError, setVideoError] = useState(false);

  const [activeServiceModal, setActiveServiceModal] =
    useState<HeroServiceType>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  const headingY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0, -35, -80]
  );

  const headingScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1, 0.97, 0.92]
  );

  const headingOpacity = useTransform(
    smoothProgress,
    [0, 0.7, 1],
    [1, 0.88, 0.7]
  );

  const categoriesY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0, 18, 45]
  );

  const categoriesOpacity = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    [1, 0.92, 0.8]
  );

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.96,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleGlobalProductSelect = (product: any) => {
    if (!product) return;

    const productId = product.id
      ? String(product.id)
      : "";

    const productType = product.productType;

    const possibleProductIds = [
      `product-${productId}`,
      `product-card-${productId}`,
      `laptop-product-${productId}`,
      `pc-product-${productId}`,
      `printer-product-${productId}`,
      `accessory-product-${productId}`,
      productId,
    ].filter(Boolean);

    let exactProductElement: HTMLElement | null = null;

    for (const id of possibleProductIds) {
      const element = document.getElementById(id);

      if (element) {
        exactProductElement = element;
        break;
      }
    }

    if (exactProductElement) {
      exactProductElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    let targetSection: HTMLElement | null = null;

    if (productType === "laptop") {
      targetSection =
        document.getElementById("products-catalog-section") ||
        document.getElementById("brands-section");
    } else if (productType === "pc") {
      targetSection =
        document.getElementById("pc-section") ||
        document.getElementById("pc-catalog-section");
    } else if (productType === "printer") {
      targetSection =
        document.getElementById("printers-section") ||
        document.getElementById("printers-catalog-title");
    } else if (productType === "accessory") {
      targetSection =
        document.getElementById("accessories-section");
    }

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full min-h-[160vh] bg-transparent tech-heading"
    >
      <section
        id="hero-section"
        className="sticky top-0 w-full min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-8 sm:py-10 md:py-14"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {!videoError ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover object-center"
            >
              <source
                src="https://res.cloudinary.com/r29xgigl/video/upload/v1787613449/Laptop_disassembly_and_reconstru__202608241617.mp4"
                type="video/mp4"
              />
            </video>
          ) : (
            <div className="w-full h-full bg-[#020617] relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.18),transparent_60%)]" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.12),transparent_50%)]" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10 h-full">

          {/* GLOBAL SEARCH BAR
              Same horizontal width as the main heading area.
              Positioned at the absolute top of the Hero section. */}
          <div className="absolute top-0 left-1 right-1 sm:left-0 sm:right-0 flex justify-start">
            <div className="w-full max-w-[820px]">
              <GlobalSearchBar
                onSelect={handleGlobalProductSelect}
              />
            </div>
          </div>

          {/* MAIN BRAND HEADING */}
          <motion.div
            id="brand-heading-container"
            style={{
              y: headingY,
              scale: headingScale,
              opacity: headingOpacity,
            }}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full flex flex-col items-start select-none px-1 pt-24 sm:pt-28 md:pt-32"
          >
            <div className="overflow-hidden">
              <motion.h1
                id="word-fusion"
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1,
                }}
                whileHover={{
                  scale: 1.01,
                }}
                className="text-[90px] xs:text-[90px] sm:text-[90px] md:text-[92px] lg:text-[123px] xl:text-[134.4px] font-black uppercase text-blue-500 leading-[0.82] tracking-tighter mb-2 fusion-outline"
              >
                FUSION
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                id="word-factor"
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.22,
                }}
                whileHover={{
                  scale: 1.01,
                }}
                className="text-[90px] xs:text-[90px] sm:text-[90px] md:text-[92px] lg:text-[123px] xl:text-[134.4px] font-black uppercase factor-split factor-outline leading-[0.82] tracking-tighter"
              >
                FACTOR
              </motion.h1>
            </div>
          </motion.div>

          {/* LOWER CATEGORIES BAR / GRID */}
          <motion.div
            id="categories-container"
            style={{
              y: categoriesY,
              opacity: categoriesOpacity,
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/15 bg-slate-950/30 backdrop-blur-[2px] p-2.5 sm:p-3 md:p-4 shadow-xl absolute bottom-8 left-0"
          >
            <div
              id="categories-grid"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5 md:gap-3 w-full items-stretch"
            >
              {CATEGORIES.map((cat, index) => (
                <CategoryCard
                  key={cat.name}
                  cat={cat}
                  index={index}
                  variants={itemVariants}
                  onSelectService={setActiveServiceModal}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <HeroServiceModal
        serviceType={activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
      />
    </div>
  );
}