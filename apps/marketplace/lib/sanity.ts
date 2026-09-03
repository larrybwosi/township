/* eslint-disable turbo/no-undeclared-env-vars */
import { createClient } from "@sanity/client";

// ==========================================
// 1. Sanity Schemas (for deployment reference)
// ==========================================

export const sanityProductSchema = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "price", title: "Price", type: "number" },
    { name: "deposit", title: "Required Deposit", type: "number" },
    { name: "category", title: "Category", type: "string" },
    { name: "imageUrl", title: "Product Image", type: "image" },
    { name: "stock", title: "Available Stock", type: "number" },
    {
      name: "images",
      title: "Multiple Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          name: "spec",
          fields: [
            { name: "name", title: "Spec Name", type: "string" },
            { name: "value", title: "Spec Value", type: "string" },
          ],
        },
      ],
    },
  ],
};

// ==========================================
// 2. Sanity Live Client Configuration
// ==========================================

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-02-25",
  useCdn: true,
};

// Live client instance (configured but falling back gracefully)
export const liveSanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN || "",
  // Ignore missing ID warning in dev/test
  ignoreBrowserTokenWarning: true,
});

// ==========================================
// 3. Mock Data Seeding (Sanity Payload Structure)
// ==========================================

export interface SanityProductSpec {
  name: string;
  value: string;
}

export interface SanityProduct {
  _id: string;
  _type: "product";
  title: string;
  description: string;
  price: number;
  deposit?: number; // Optional deposit requirement
  category: "furniture" | "local-goods" | "home-appliances" | "services";
  imageUrl: string;
  stock: number; // Stock count or slot count for services
  images?: string[]; // Optional additional images
  specs: SanityProductSpec[];
  createdAt: string;
}

const mockProducts: SanityProduct[] = [
  // Furniture
  {
    _id: "prod-1",
    _type: "product",
    title: "Handcrafted Oak Dining Table",
    description:
      "A gorgeous, solid oak dining table, lovingly handmade by local artisans in Greenwood. Comfortably seats six to eight people. Featuring a robust oil-wax finish to preserve natural wood grains and protect against spills.",
    price: 650,
    deposit: 150,
    category: "furniture",
    stock: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1530018607912-eff2df114fbe?auto=format&fit=crop&q=80&w=1000"
    ],
    specs: [
      { name: "Material", value: "Solid White Oak" },
      { name: "Dimensions", value: "200cm x 90cm x 75cm" },
      { name: "Weight", value: "48 kg" },
      { name: "Seating Capacity", value: "6 - 8 people" },
      { name: "Origin", value: "Greenwood Artisan Guild" },
    ],
    createdAt: "2025-01-10T10:00:00.000Z",
  },
  {
    _id: "prod-2",
    _type: "product",
    title: "Premium Velvet Tufted Armchair",
    description:
      "Sink into luxury with this mid-century modern velvet armchair. Equipped with high-density foam padding and sturdy tapered walnut-stained legs, it serves as the ultimate accent piece for any classy living room or home office study.",
    price: 299,
    category: "furniture",
    stock: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1000"
    ],
    specs: [
      { name: "Material", value: "Velvet Upholstery, Solid Birch Wood" },
      { name: "Color", value: "Royal Emerald Green" },
      { name: "Dimensions", value: "85cm x 82cm x 90cm" },
      { name: "Weight Limit", value: "135 kg" },
    ],
    createdAt: "2025-01-12T14:30:00.000Z",
  },

  // Home Appliances
  {
    _id: "prod-3",
    _type: "product",
    title: "Smart Double-Door Refrigerator",
    description:
      "High efficiency, multi-flow cooling refrigerator with built-in Wi-Fi and interactive LED panel. Includes special localized vegetable crispers and high-speed ice/water dispensers. Certified Energy Star rating.",
    price: 1200,
    deposit: 300,
    category: "home-appliances",
    stock: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1571175432244-5f29906666cf?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1571175432244-5f29906666cf?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000"
    ],
    specs: [
      { name: "Capacity", value: "24 cubic feet" },
      { name: "Energy Star Rating", value: "5 Stars (Ultra-Efficient)" },
      { name: "Smart Features", value: "Wi-Fi, Internal Camera, Temperature Alarm" },
      { name: "Dimensions", value: "178cm x 91cm x 85cm" },
      { name: "Voltage", value: "220-240V" },
    ],
    createdAt: "2025-01-15T09:15:00.000Z",
  },
  {
    _id: "prod-4",
    _type: "product",
    title: "Multi-Function Air Fryer Oven",
    description:
      "Crisp, bake, dehydrate, and roast your favorite delicacies with up to 85% less oil than traditional deep frying. Features 12 easy touch-screen presets and a dual-heating element for perfectly even, fast cooking.",
    price: 149,
    category: "home-appliances",
    stock: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=1000"
    ],
    specs: [
      { name: "Capacity", value: "8.5 Liters" },
      { name: "Power Output", value: "1800 Watts" },
      { name: "Temperature Range", value: "40°C - 230°C" },
      { name: "Dishwasher Safe", value: "Yes (Basket and Tray)" },
    ],
    createdAt: "2025-01-18T16:00:00.000Z",
  },

  // Local Goods
  {
    _id: "prod-5",
    _type: "product",
    title: "Premium Forest Honey Trio",
    description:
      "A collection of three pure, raw, unpasteurized wild honeys sourced from the deep woods of Lakeside and Riverdale. Flavors include Wildflower, Linden Blossom, and Forest Fir Honey. Highly rich in healthy antioxidants.",
    price: 35,
    category: "local-goods",
    stock: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=1000"
    ],
    specs: [
      { name: "Flavors Included", value: "Wildflower, Linden Blossom, Forest Fir" },
      { name: "Net Weight", value: "3 x 250g Jars" },
      { name: "Process", value: "Raw, Unfiltered, Cold-Extracted" },
      { name: "Allergen Info", value: "Gluten-Free, Contains Natural Pollens" },
    ],
    createdAt: "2025-01-20T11:00:00.000Z",
  },
  {
    _id: "prod-6",
    _type: "product",
    title: "Artisanal Alpaca Wool Throw Blanket",
    description:
      "Woven with incredibly soft, premium-grade alpaca fibers from the township farm. Extremely lightweight, yet provides superb thermal insulation. Perfect for draping over sofas or keeping cozy on cool Lakeside evenings.",
    price: 85,
    category: "local-goods",
    stock: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1000"
    ],
    specs: [
      { name: "Material", value: "80% Alpaca Wool, 20% Organic Cotton Warp" },
      { name: "Dimensions", value: "130cm x 170cm" },
      { name: "Care Instructions", value: "Dry Clean Only" },
      { name: "Weave Style", value: "Classic Herringbone" },
    ],
    createdAt: "2025-01-22T08:00:00.000Z",
  },

  // Services (Repairs, etc)
  {
    _id: "prod-7",
    _type: "product",
    title: "Professional Plumbing Inspection & Repair",
    description:
      "Need a fix? Book a certified professional plumber for inspections, leakage rectifications, pipe replacements, or clogged drain servicing. Service covers up to 2 hours of labor. Material parts invoiced separately.",
    price: 120,
    deposit: 40,
    category: "services",
    stock: 4, // Represents available expert service slots today
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000"
    ],
    specs: [
      { name: "Service Provider", value: "Township Maintenance Core" },
      { name: "Duration Included", value: "Up to 2 Hours (Labor)" },
      { name: "Availability", value: "Mon - Sat, 8:00 AM - 6:00 PM" },
      { name: "Certification", value: "Licensed & Insured Plumbing Technicians" },
    ],
    createdAt: "2025-01-25T13:00:00.000Z",
  },
  {
    _id: "prod-8",
    _type: "product",
    title: "Full-Home HVAC Tuning & Maintenance",
    description:
      "Prepare your air heating and cooling systems for the seasons. Covers filter swap-out, coil vacuum cleaning, coolant level measurement, system safety diagnostics, and optimal efficiency configuration.",
    price: 160,
    deposit: 50,
    category: "services",
    stock: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=1000"
    ],
    specs: [
      { name: "Applicable Units", value: "Central AC, Heat Pumps, Furnaces" },
      { name: "Includes", value: "Safety Inspection, Air Flow Adjustments, Coil Cleaning" },
      { name: "Est. Duration", value: "1.5 - 2 Hours" },
      { name: "Recommended Frequency", value: "Bi-annually (Spring / Autumn)" },
    ],
    createdAt: "2025-01-28T09:00:00.000Z",
  },
];

// ==========================================
// 4. Sanity Client Client-Side Wrapper
// ==========================================

export const getLiveSanityClient = () => {
  const pId = typeof window !== "undefined" ? ((window as typeof window & { __ENV?: Record<string, string> }).__ENV?.NEXT_PUBLIC_SANITY_PROJECT_ID) : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dSet = typeof window !== "undefined" ? ((window as typeof window & { __ENV?: Record<string, string> }).__ENV?.NEXT_PUBLIC_SANITY_DATASET) : process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_TOKEN || "";
  return createClient({
    projectId: pId || "mock-project-id",
    dataset: dSet || "production",
    apiVersion: "2025-02-25",
    useCdn: true,
    token,
    ignoreBrowserTokenWarning: true,
  });
};

export interface SanitySiteMetadata {
  _id: string;
  _type: "siteMetadata";
  appIdentifier: string;
  siteName?: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string | Record<string, unknown>;
  themeColor?: string;
}

export const mockSiteMetadataMarketplace: SanitySiteMetadata = {
  _id: "site-meta-marketplace",
  _type: "siteMetadata",
  appIdentifier: "marketplace",
  siteName: "Township Marketplace",
  title: "Township Marketplace — Local Goods, Furniture & Services",
  description: "Browse local goods, furniture, home appliances, and services in your township community.",
  keywords: ["township", "marketplace", "local goods", "furniture", "appliances", "services"],
  themeColor: "#1a3a5c",
};

export class SanityClientWrapper {
  getHasLiveKeys(): boolean {
    const pId = typeof window !== "undefined" ? ((window as typeof window & { __ENV?: Record<string, string> }).__ENV?.NEXT_PUBLIC_SANITY_PROJECT_ID) : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    return pId !== undefined && pId !== "mock-project-id" && pId !== "";
  }

  async fetch<T>(
    query: string,
    params: Record<string, unknown> = {},
  ): Promise<T> {
    if (this.getHasLiveKeys()) {
      try {
        const clientInstance = getLiveSanityClient();
        return await clientInstance.fetch<T>(query, params);
      } catch (error) {
        console.warn("Sanity fetch error, falling back to mock product data:", error);
      }
    }

    if (query.includes('*[_type == "siteMetadata"')) {
      return (query.includes("[0]") ? mockSiteMetadataMarketplace : [mockSiteMetadataMarketplace]) as unknown as T;
    }
    if (query.includes('*[_type == "product"')) {
      return mockProducts as unknown as T;
    }

    return [] as unknown as T;
  }
}

export const sanityClient = new SanityClientWrapper();

export async function getSiteMetadata(appIdentifier = "marketplace"): Promise<SanitySiteMetadata> {
  const query = `*[_type == "siteMetadata" && appIdentifier == "${appIdentifier}"][0]`;
  const data = await sanityClient.fetch<SanitySiteMetadata>(query);
  return data || mockSiteMetadataMarketplace;
}
