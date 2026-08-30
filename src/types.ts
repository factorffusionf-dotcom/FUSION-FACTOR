export interface ProductSpecs {
  processor?: string;
  ram?: string;
  storage?: string;
  display?: string;
  graphics?: string;
  camera?: string;
  numpad?: string;
  battery?: string;
  keyboard?: string;
  weight?: string;
  os?: string;
  touchscreen?: string;
  charger?: string;
  cpuModel?: string;
  formFactor?: string;
  generation?: string;
  expansionSlots?: string;
  frontPorts?: string;
  rearPorts?: string;
  [key: string]: string | undefined;
}

export type ProductType = "laptop" | "pc" | "printer" | "accessory";

export interface LaptopProduct {
  id: string;
  brandId: "hp" | "dell" | "lenovo";
  slotNumber: number;
  name?: string;
  model?: string;
  series?: string;
  category?: string;
  isPopulated: boolean;
  imageUrl?: string;
  images?: string[];
  specs?: ProductSpecs;
  features?: string[];
  tags?: string[];
  condition?: string;
  rating?: number;
  reviewsCount?: number;
  productType?: "laptop";
}

export interface PCProduct {
  id: string;
  brandId: "dell" | "hp" | "lenovo";
  slotNumber: number; // 1 to 24
  frameNumber: number; // 1 to 8 (per brand) or 1 to 24
  name: string;
  model: string;
  series: string;
  category: string;
  isPopulated: boolean;
  imageUrl: string;
  images: string[];
  specs: ProductSpecs;
  features: string[];
  tags?: string[];
  rating?: number;
  reviewsCount?: number;
  productType: "pc";
}

export interface PrinterProduct {
  id: string;
  brandId: "hp" | "epson";
  slotNumber: number; // 1 to 6
  frameNumber: number; // 1 to 3 (per brand) or 1 to 6
  name: string;
  model: string;
  series: string;
  category: string;
  isPopulated: boolean;
  imageUrl: string;
  images: string[];
  specs: ProductSpecs;
  features: string[];
  tags?: string[];
  condition?: string;
  rating: number;
  reviewsCount?: number;
  productType: "printer";
}

export type AccessoryCategory = "storage-ram" | "mouse" | "keyboard" | "speaker";

export interface AccessoryProduct {
  id: string;
  category: AccessoryCategory;
  subCategory: string;
  slotNumber: number;
  name: string;
  model: string;
  brand: string;
  isPopulated: boolean;
  imageUrl?: string;
  images?: string[];
  shortDescription: string;
  specs: ProductSpecs;
  features: string[];
  tags?: string[];
  condition?: string;
  rating: number;
  reviewsCount?: number;
  productType: "accessory";
}

export interface ProductModel {
  id: string;
  name: string;
  series?: string;
  category?: string;
  specs?: ProductSpecs;
  imageUrl?: string;
  images?: string[];
  productType?: ProductType;
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  models: ProductModel[];
}

