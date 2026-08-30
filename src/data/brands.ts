import { Brand } from "../types";
import { HP_PRODUCTS, DELL_PRODUCTS, LENOVO_PRODUCTS } from "./products";

export const BRANDS_DATA: Brand[] = [
  {
    id: "dell",
    name: "Dell",
    tagline: "High-performance systems & precision engineering",
    models: DELL_PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name || `Dell Frame #${p.slotNumber}`,
      series: p.series,
      category: p.category,
      specs: p.specs,
      imageUrl: p.imageUrl,
      images: p.images,
    })),
  },
  {
    id: "hp",
    name: "HP",
    tagline: "Innovative computing & business solutions",
    models: HP_PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name || `HP Frame #${p.slotNumber}`,
      series: p.series,
      category: p.category,
      specs: p.specs,
      imageUrl: p.imageUrl,
      images: p.images,
    })),
  },
  {
    id: "lenovo",
    name: "Lenovo",
    tagline: "Intelligent technology & cutting-edge design",
    models: LENOVO_PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name || `Lenovo Frame #${p.slotNumber}`,
      series: p.series,
      category: p.category,
      specs: p.specs,
      imageUrl: p.imageUrl,
      images: p.images,
    })),
  },
];

