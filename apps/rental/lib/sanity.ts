/* eslint-disable turbo/no-undeclared-env-vars */
import { createClient } from "@sanity/client";

// ==========================================
// 1. Sanity Schemas (for deployment reference)
// ==========================================

export const sanityPropertySchema = {
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "price", title: "Price per night (default)", type: "number" },
    { name: "address", title: "Address", type: "string" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "House", value: "house" },
          { title: "Single Apartment House", value: "apartment_single" },
          { title: "Apartment Building", value: "apartment_building" },
          { title: "Guest House", value: "guesthouse" },
          { title: "Motel", value: "motel" },
          { title: "Hotel", value: "hotel" },
        ],
      },
    },
    { name: "townId", title: "Town ID", type: "string" },
    { name: "ownerId", title: "Owner ID", type: "string" },
    { name: "imageUrl", title: "Property Image", type: "image" },
    {
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "units",
      title: "Units (for multi-unit properties)",
      type: "array",
      of: [
        {
          type: "object",
          name: "unit",
          fields: [
            { name: "id", title: "Unit ID", type: "string" },
            { name: "name", title: "Unit Name", type: "string" },
            { name: "price", title: "Price per night", type: "number" },
            { name: "rooms", title: "Rooms count", type: "number" },
            { name: "description", title: "Description", type: "string" },
          ],
        },
      ],
    },
  ],
};

export const sanityTownSchema = {
  name: "town",
  title: "Town",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "string" },
    { name: "name", title: "Name", type: "string" },
    { name: "description", title: "Description", type: "text" },
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

export interface SanityUnit {
  id: string;
  name: string;
  price: number;
  rooms: number;
  description: string;
}

export interface SanityProperty {
  _id: string;
  _type: "property";
  title: string;
  description: string;
  price: number; // default price or base price
  address: string;
  category:
    | "house"
    | "apartment_single"
    | "apartment_building"
    | "guesthouse"
    | "motel"
    | "hotel";
  townId: string;
  ownerId: string;
  amenities: string[];
  imageUrl: string;
  createdAt: string;
  units?: SanityUnit[];
}

export interface SanityTown {
  _id: string;
  _type: "town";
  id: string;
  name: string;
  description: string;
}

const mockTowns: SanityTown[] = [
  {
    _id: "t-1",
    _type: "town",
    id: "t-1",
    name: "Greenwood",
    description:
      "A lush, peaceful suburb with beautiful parks and historic homes.",
  },
  {
    _id: "t-2",
    _type: "town",
    id: "t-2",
    name: "Riverdale",
    description:
      "Vibrant riverside district featuring rich local culture and dining.",
  },
  {
    _id: "t-3",
    _type: "town",
    id: "t-3",
    name: "Oakwood",
    description:
      "Upscale wooded neighborhood known for absolute tranquility and scenery.",
  },
  {
    _id: "t-4",
    _type: "town",
    id: "t-4",
    name: "Lakeside",
    description:
      "Breathtaking views and cozy lakefront cabins perfect for weekend escapes.",
  },
];

const mockProperties: SanityProperty[] = [
  {
    _id: "p-1",
    _type: "property",
    title: "Charming Lakeside Cottage with Private Dock",
    description:
      "Enjoy a relaxing getaway in this beautifully appointed cottage right on the shores of Lake Serene. Features an expansive deck, fully equipped gourmet kitchen, and private boat dock. Perfect for swimming, kayaking, and sunset viewing.",
    price: 240,
    address: "412 Lakeview Dr, Lakeside",
    category: "house",
    townId: "t-4",
    ownerId: "u-2",
    amenities: [
      "Lake View",
      "Private Dock",
      "Wifi",
      "Kitchen",
      "Fireplace",
      "Kayaks Included",
      "Air Conditioning",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-10T12:00:00.000Z",
  },
  {
    _id: "p-2",
    _type: "property",
    title: "Modern Greenwood Townhouse with Rooftop Deck",
    description:
      "Sleek and contemporary 3-story townhouse in the heart of Greenwood. Features brand-new high-end appliances, floor-to-ceiling windows, and a massive private rooftop terrace with views of the sunset.",
    price: 185,
    address: "88 Maple Ave, Greenwood",
    category: "apartment_single",
    townId: "t-1",
    ownerId: "u-2",
    amenities: [
      "Rooftop Terrace",
      "Wifi",
      "Modern Kitchen",
      "Dedicated Workspace",
      "Smart TV",
      "Washer & Dryer",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-15T09:30:00.000Z",
  },
  {
    _id: "p-3",
    _type: "property",
    title: "Grand Riverside Apartment Complex",
    description:
      "An elegant, multi-unit apartment building located in the heart of Riverdale. Featuring individual luxury units to suit any size. Rent individual apartments with access to shared premium amenities like a rooftop fitness center, secure garages, and a concierge.",
    price: 150,
    address: "102 Boardwalk Way, Riverdale",
    category: "apartment_building",
    townId: "t-2",
    ownerId: "u-2",
    amenities: [
      "Gym Access",
      "Wifi",
      "Elevator",
      "Secure Parking",
      "Concierge",
      "Pet Friendly",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-18T15:45:00.000Z",
    units: [
      {
        id: "u-3-studio",
        name: "Studio Suite (102A)",
        price: 120,
        rooms: 1,
        description:
          "Compact studio suite overlooking the garden with a fully fitted kitchenette.",
      },
      {
        id: "u-3-deluxe",
        name: "Deluxe 1-Bedroom (102B)",
        price: 180,
        rooms: 2,
        description:
          "Spacious 1-bedroom suite with a separate dining hall and private balcony.",
      },
      {
        id: "u-3-penthouse",
        name: "Rooftop Penthouse (102C)",
        price: 350,
        rooms: 4,
        description:
          "Magnificent luxury penthouse with panoramic city & river views.",
      },
    ],
  },
  {
    _id: "p-4",
    _type: "property",
    title: "Cozy Redwood Cabin in Oakwood Hills",
    description:
      "Nestled among towering redwood trees, this romantic cabin offers the ultimate peaceful forest escape. Melt away stress in the outdoor cedar hot tub, cozy up by the stone fireplace, or explore miles of hiking trails.",
    price: 195,
    address: "740 Forest Glen Rd, Oakwood",
    category: "guesthouse",
    townId: "t-3",
    ownerId: "u-3",
    amenities: [
      "Outdoor Hot Tub",
      "Wood Fireplace",
      "Mountain Views",
      "Hiking Trails",
      "Wifi",
      "BBQ Grill",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-20T08:00:00.000Z",
  },
  {
    _id: "p-5",
    _type: "property",
    title: "Starlight Resort & Motel",
    description:
      "A beautifully renovated roadside motel on the outskirts of Lakeside, offering convenient stay options and individual units. Perfect for overnight travelers and weekend roadtrippers alike.",
    price: 85,
    address: "109 State Hwy 4, Lakeside",
    category: "motel",
    townId: "t-4",
    ownerId: "u-2",
    amenities: [
      "Pool",
      "Free Parking",
      "Wifi",
      "Cable TV",
      "Air Conditioning",
      "24/7 Desk",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-22T10:15:00.000Z",
    units: [
      {
        id: "u-5-standard",
        name: "Standard Queen Room",
        price: 85,
        rooms: 1,
        description:
          "Comfortable room featuring one queen bed, refrigerator, and desk space.",
      },
      {
        id: "u-5-double",
        name: "Double Double Room",
        price: 110,
        rooms: 2,
        description:
          "Spacious layout with two double beds, ideal for families or group travelers.",
      },
    ],
  },
  {
    _id: "p-6",
    _type: "property",
    title: "The Greenwood Grand Plaza Hotel",
    description:
      "A premier five-star hotel offering unmatched luxurious service, executive conference rooms, exquisite dining halls, and multi-room luxury suites. Perfect for corporate stays or high-end travelers visiting the beautiful Greenwood.",
    price: 250,
    address: "1 Plaza Blvd, Greenwood",
    category: "hotel",
    townId: "t-1",
    ownerId: "u-3",
    amenities: [
      "Spa",
      "Room Service",
      "Bar & Restaurant",
      "Wifi",
      "Air Conditioning",
      "Valet Parking",
      "Fitness Center",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-25T11:00:00.000Z",
    units: [
      {
        id: "u-6-exec",
        name: "Executive King Suite",
        price: 250,
        rooms: 1,
        description:
          "Premium suite with king bed, marble bath, and dedicated work study.",
      },
      {
        id: "u-6-presidential",
        name: "Presidential Suite",
        price: 600,
        rooms: 3,
        description:
          "Our grandest suite featuring personal butler service, dynamic acoustics, and unmatched views.",
      },
    ],
  },
];

// ==========================================
// 4. Sanity Client Client-Side Wrapper
// ==========================================

export class SanityClientWrapper {
  private hasLiveKeys: boolean;

  constructor() {
    this.hasLiveKeys =
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== undefined &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "mock-project-id";
  }

  async fetch<T>(
    query: string,
    params: Record<string, unknown> = {},
  ): Promise<T> {
    if (this.hasLiveKeys) {
      try {
        return await liveSanityClient.fetch<T>(query, params);
      } catch (error) {
        console.warn("Sanity fetch error, falling back to mock data:", error);
      }
    }

    // Mock implementation of basic GROQ query filters
    if (query.includes('*[_type == "property"')) {
      return mockProperties as unknown as T;
    }
    if (query.includes('*[_type == "town"')) {
      return mockTowns as unknown as T;
    }

    // Default mock responses
    return [] as unknown as T;
  }
}

export const sanityClient = new SanityClientWrapper();
