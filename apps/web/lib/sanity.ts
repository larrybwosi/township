import { client as liveSanityClient } from "../sanity/lib/client";

// ==========================================
// 1. Sanity Type Interfaces
// ==========================================

export interface SanityQuickLink {
  label: string;
  desc: string;
  href: string;
  accent: boolean;
  iconName: string;
}

export interface SanityHomeHero {
  _id: string;
  _type: "homeHero";
  badge: string;
  headline: string;
  accentText: string;
  description: string;
  searchPlaceholder: string;
  backgroundImageUrl: string;
  quickLinks: SanityQuickLink[];
}

export interface SanityHighlight {
  iconName: string;
  title: string;
  desc: string;
}

export interface SanityStat {
  iconName: string;
  value: string;
  label: string;
  desc: string;
}

export interface SanityHomeAbout {
  _id: string;
  _type: "homeAbout";
  badge: string;
  title: string;
  paragraphs: string[];
  buttonText: string;
  buttonHref: string;
  imageUrl: string;
  floatingCardValue: string;
  floatingCardLabel: string;
  highlights: SanityHighlight[];
  stats: SanityStat[];
}

export interface SanityInstitution {
  _id: string;
  _type: "institution";
  name: string;
  category: "education" | "health" | "government";
  type: string;
  desc: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  tags: string[];
  featured: boolean;
}

export interface SanityPlace {
  _id: string;
  _type: "place";
  name: string;
  category: "Dining" | "Cafes" | "Shopping" | "Parks" | "Stay" | "Nightlife";
  rating: number;
  reviews: number;
  desc: string;
  image: string;
  tags: string[];
  openNow: boolean;
  span?: "small" | "large";
  link: string;
}

export interface SanityService {
  _id: string;
  _type: "service";
  title: string;
  desc: string;
  link: string;
  color: string;
  iconName: string;
}

export interface SanityStudentGuide {
  _id: string;
  _type: "studentGuide";
  badge: string;
  headline: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  checklist: string[];
  contactLabel: string;
  contactHref: string;
}

export interface SanityEvent {
  _id: string;
  _type: "event";
  title: string;
  category: "Culture" | "Education" | "Community" | "Sport";
  date: string;
  time: string;
  location: string;
  attendees: string;
  image: string;
  desc: string;
  featured: boolean;
}

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

// ==========================================
// 2. Local Fallback Mock Data Store
// ==========================================

const mockHomeHero: SanityHomeHero = {
  _id: "h-hero",
  _type: "homeHero",
  badge: "Official City Portal",
  headline: "Welcome to",
  accentText: "Township",
  description: "Whether you're a student arriving for the first time or a local looking to explore more — your complete guide to institutions, dining, services, and community life is right here.",
  searchPlaceholder: "Search places, institutions, services...",
  backgroundImageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80",
  quickLinks: [
    {
      label: "Student Guide",
      desc: "First time here? Start here.",
      href: "#institutions",
      accent: true,
      iconName: "GraduationCap",
    },
    {
      label: "Institutions",
      desc: "Universities, hospitals & offices",
      href: "#institutions",
      accent: false,
      iconName: "Building2",
    },
    {
      label: "Explore Places",
      desc: "Dining, parks & activities",
      href: "#places",
      accent: false,
      iconName: "MapPin",
    },
  ],
};

const mockHomeAbout: SanityHomeAbout = {
  _id: "h-about",
  _type: "homeAbout",
  badge: "About Our Town",
  title: "A town built for people — locals and visitors alike",
  paragraphs: [
    "Township is more than a place — it's a living community shaped by decades of growth, culture, and collective ambition. Home to leading universities, bustling markets, top healthcare facilities, and a rich calendar of cultural events, our town has become a destination for students, professionals, and families.",
    "Whether you're enrolling at one of our institutions, setting up home for the first time, or simply exploring — this portal is your front door to everything Township has to offer.",
  ],
  buttonText: "Explore Institutions",
  buttonHref: "#institutions",
  imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  floatingCardValue: "30,000+",
  floatingCardLabel: "Students enrolled annually",
  highlights: [
    {
      iconName: "TrendingUp",
      title: "Fastest-Growing Student Hub",
      desc: "Over 30,000 students from across the region choose Township as their academic home each year.",
    },
    {
      iconName: "Award",
      title: "Award-Winning Infrastructure",
      desc: "Recognised for its public transport, connectivity, and modern civic facilities supporting daily life.",
    },
    {
      iconName: "Building",
      title: "Economic & Cultural Centre",
      desc: "A vibrant mix of businesses, markets, arts, and traditions that make our town uniquely alive.",
    },
  ],
  stats: [
    {
      iconName: "Users",
      value: "120,000+",
      label: "Residents",
      desc: "Growing community",
    },
    {
      iconName: "Building",
      value: "14",
      label: "Institutions",
      desc: "Universities & colleges",
    },
    {
      iconName: "MapPin",
      value: "60+",
      label: "Venues",
      desc: "Places to discover",
    },
    {
      iconName: "Calendar",
      value: "200+",
      label: "Events/Year",
      desc: "Year-round activities",
    },
  ],
};

const mockInstitutions: SanityInstitution[] = [
  {
    _id: "inst-1",
    _type: "institution",
    name: "Township University",
    category: "education",
    type: "Public University",
    desc: "The flagship university of the region offering undergraduate and postgraduate programmes across sciences, arts, and engineering.",
    address: "1 University Drive, North Campus",
    phone: "+1 (555) 200-0100",
    hours: "Mon–Fri: 7:30am – 5:00pm",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    tags: ["University", "Research", "Student Services"],
    featured: true,
  },
  {
    _id: "inst-2",
    _type: "institution",
    name: "Township College of Technology",
    category: "education",
    type: "Technical College",
    desc: "Specialising in applied sciences, engineering technology, and vocational programmes with strong industry partnerships.",
    address: "45 Tech Avenue, East District",
    phone: "+1 (555) 200-0200",
    hours: "Mon–Fri: 8:00am – 4:30pm",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    tags: ["College", "Engineering", "Vocational"],
    featured: false,
  },
  {
    _id: "inst-3",
    _type: "institution",
    name: "St. Mary Academy",
    category: "education",
    type: "Secondary School",
    desc: "A well-established secondary institution known for academic excellence and a broad extracurricular programme.",
    address: "12 Oak Lane, Central Township",
    phone: "+1 (555) 200-0300",
    hours: "Mon–Fri: 7:00am – 3:00pm",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    tags: ["Secondary", "Academy"],
    featured: false,
  },
  {
    _id: "inst-4",
    _type: "institution",
    name: "Township General Hospital",
    category: "health",
    type: "Public Hospital",
    desc: "The primary regional hospital providing emergency care, specialist services, and in-patient treatment for the entire district.",
    address: "Hospital Road, Medical Quarter",
    phone: "+1 (555) 200-0911",
    hours: "24 Hours / 7 Days",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80",
    tags: ["Emergency", "Specialist Care", "In-Patient"],
    featured: true,
  },
  {
    _id: "inst-5",
    _type: "institution",
    name: "Wellness Community Clinic",
    category: "health",
    type: "Public Clinic",
    desc: "Free and subsidised primary healthcare, vaccinations, and health screenings for residents and students.",
    address: "22 Main Street, Town Centre",
    phone: "+1 (555) 200-0500",
    hours: "Mon–Sat: 8:00am – 6:00pm",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80",
    tags: ["Primary Care", "Free Services", "Vaccinations"],
    featured: false,
  },
  {
    _id: "inst-6",
    _type: "institution",
    name: "Township Municipal Hall",
    category: "government",
    type: "Local Government",
    desc: "The central office for permits, licenses, ID documents, and local government services. Online services available.",
    address: "City Hall Square, Township Centre",
    phone: "+1 (555) 200-0001",
    hours: "Mon–Fri: 8:00am – 4:00pm",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    tags: ["Permits", "Licensing", "ID Documents"],
    featured: false,
  },
];

export const mockSiteMetadataWeb: SanitySiteMetadata = {
  _id: "site-meta-web",
  _type: "siteMetadata",
  appIdentifier: "web",
  siteName: "Township",
  title: "Township — Your City Guide",
  description: "Discover everything about our town — institutions, places of interest, local services and events. Your complete guide for students and locals alike.",
  keywords: ["township", "city guide", "students", "local services", "institutions"],
  themeColor: "#1a3a5c",
};

export const mockSiteMetadataRental: SanitySiteMetadata = {
  _id: "site-meta-rental",
  _type: "siteMetadata",
  appIdentifier: "rental",
  siteName: "Township Rental Hub",
  title: "Township Rental Hub — Find Your Next Home",
  description: "Browse, discover, and book perfect rental properties in our gorgeous towns. The ultimate rental finder and host portal.",
  keywords: ["township", "rental properties", "apartments", "cabins", "booking"],
  themeColor: "#1a3a5c",
};

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

const mockPlaces: SanityPlace[] = [
  {
    _id: "place-1",
    _type: "place",
    name: "The Central Market",
    category: "Dining",
    rating: 4.8,
    reviews: 1240,
    desc: "A vibrant open-air market at the heart of town, offering fresh produce, street food, and artisan goods from local vendors.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    tags: ["Street Food", "Local Produce", "Artisan"],
    openNow: true,
    span: "large",
    link: "/explore/dining",
  },
  {
    _id: "place-2",
    _type: "place",
    name: "Riverside Walk & Park",
    category: "Parks",
    rating: 4.9,
    reviews: 890,
    desc: "A beautiful riverside green space perfect for morning runs, picnics, and weekend relaxation.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    tags: ["Outdoor", "Family-Friendly", "Free"],
    openNow: true,
    span: "small",
    link: "/explore/parks",
  },
  {
    _id: "place-3",
    _type: "place",
    name: "Township Mall",
    category: "Shopping",
    rating: 4.5,
    reviews: 2100,
    desc: "The region's premier shopping destination with over 150 stores, a food court, and entertainment facilities.",
    image: "https://images.unsplash.com/photo-1567449303078-57ad995bd17a?w=600&q=80",
    tags: ["Shopping", "Food Court", "Entertainment"],
    openNow: true,
    span: "small",
    link: "/explore/shopping",
  },
  {
    _id: "place-4",
    _type: "place",
    name: "Brewed — Specialty Coffee",
    category: "Cafes",
    rating: 4.7,
    reviews: 620,
    desc: "A student favourite for its single-origin brews, strong Wi-Fi, and calm working atmosphere open from early morning.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
    tags: ["Coffee", "Wi-Fi", "Study Spot"],
    openNow: true,
    span: "small",
    link: "/explore/dining",
  },
  {
    _id: "place-5",
    _type: "place",
    name: "The Grand Township Hotel",
    category: "Stay",
    rating: 4.6,
    reviews: 450,
    desc: "Elegant accommodation steps from the university campus and town centre, ideal for visiting families and academic guests.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    tags: ["4-Star", "Conference Rooms", "Family"],
    openNow: false,
    span: "small",
    link: "/explore/accommodation",
  },
  {
    _id: "place-6",
    _type: "place",
    name: "Culture & Arts Quarter",
    category: "Nightlife",
    rating: 4.6,
    reviews: 380,
    desc: "An after-dark hub of live music venues, independent cinemas, bars, and pop-up events that keep Township buzzing.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    tags: ["Live Music", "Cinema", "Bars"],
    openNow: true,
    span: "small",
    link: "/explore/nightlife",
  },
];

const mockServices: SanityService[] = [
  {
    _id: "srv-1",
    _type: "service",
    title: "Public Transport",
    desc: "Bus routes, timetables, student travel cards, and real-time updates across the township network.",
    link: "#",
    color: "bg-blue-50 text-blue-600",
    iconName: "Bus",
  },
  {
    _id: "srv-2",
    _type: "service",
    title: "Free Wi-Fi Zones",
    desc: "Over 40 free public Wi-Fi hotspots across parks, libraries, and public squares in Township.",
    link: "#",
    color: "bg-indigo-50 text-indigo-600",
    iconName: "Wifi",
  },
  {
    _id: "srv-3",
    _type: "service",
    title: "Safety & Emergency",
    desc: "Local police contacts, emergency protocols, safe walk initiatives, and safety resources for students.",
    link: "#",
    color: "bg-red-50 text-red-600",
    iconName: "ShieldCheck",
  },
  {
    _id: "srv-4",
    _type: "service",
    title: "Libraries & Learning",
    desc: "Access to public libraries, online learning portals, and academic resources available to all residents.",
    link: "#",
    color: "bg-emerald-50 text-emerald-600",
    iconName: "BookOpen",
  },
  {
    _id: "srv-5",
    _type: "service",
    title: "Waste & Recycling",
    desc: "Collection schedules, recycling drop points, and green initiative programmes for a cleaner town.",
    link: "#",
    color: "bg-lime-50 text-lime-700",
    iconName: "Trash2",
  },
  {
    _id: "srv-6",
    _type: "service",
    title: "Water & Utilities",
    desc: "Water service contacts, billing support, and infrastructure maintenance reporting for residents.",
    link: "#",
    color: "bg-cyan-50 text-cyan-600",
    iconName: "Droplets",
  },
];

const mockStudentGuide: SanityStudentGuide = {
  _id: "st-guide",
  _type: "studentGuide",
  badge: "New Student Guide",
  headline: "Just arrived in Township? Here's your starter checklist.",
  description: "We know settling into a new place can be overwhelming. This guide walks you through the essential steps to get set up, stay safe, and make the most of your time here.",
  buttonText: "View Starter Guide",
  buttonHref: "#",
  checklist: [
    "Find student accommodation near campus",
    "Open bank accounts as a new resident",
    "Register at a local health clinic",
    "Get your transport card",
    "Access internet & connectivity services",
    "Report noise or neighbourhood issues",
  ],
  contactLabel: "Contact the Welcome Desk",
  contactHref: "#",
};

const mockEvents: SanityEvent[] = [
  {
    _id: "evt-1",
    _type: "event",
    title: "Township Cultural Festival 2025",
    category: "Culture",
    date: "Aug 14–16, 2025",
    time: "10:00 AM – 10:00 PM",
    location: "Civic Park, Town Centre",
    attendees: "5,000+",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=80",
    desc: "Three days of music, food, traditional crafts, and performances celebrating the heritage and diversity of our community.",
    featured: true,
  },
  {
    _id: "evt-2",
    _type: "event",
    title: "University Open Day",
    category: "Education",
    date: "Jul 28, 2025",
    time: "9:00 AM – 3:00 PM",
    location: "Township University, Main Campus",
    attendees: "1,200+",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=80",
    desc: "Prospective students and families are invited to tour the campus, meet faculty, and learn about programmes.",
    featured: false,
  },
  {
    _id: "evt-3",
    _type: "event",
    title: "Farmers & Artisans Market",
    category: "Community",
    date: "Every Saturday",
    time: "7:00 AM – 1:00 PM",
    location: "Market Square, Central Township",
    attendees: "800+",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80",
    desc: "Weekly market showcasing fresh seasonal produce, homemade goods, and handcrafted items from local producers.",
    featured: false,
  },
  {
    _id: "evt-4",
    _type: "event",
    title: "Township Half Marathon",
    category: "Sport",
    date: "Sep 5, 2025",
    time: "6:30 AM",
    location: "Starting at Riverside Park",
    attendees: "2,500+",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80",
    desc: "Annual running event winding through the town's scenic routes. Open to all skill levels with a fun run option.",
    featured: false,
  },
];

// ==========================================
// 3. Query Mock Matcher & Sanity Client Client-Side Wrapper
// ==========================================

export function getMockDataForQuery(query: string): unknown {
  if (query.includes('*[_type == "siteMetadata"')) {
    if (query.includes('rental') || query.includes('appIdentifier == "rental"')) {
      return query.includes('[0]') ? mockSiteMetadataRental : [mockSiteMetadataRental];
    }
    if (query.includes('marketplace') || query.includes('appIdentifier == "marketplace"')) {
      return query.includes('[0]') ? mockSiteMetadataMarketplace : [mockSiteMetadataMarketplace];
    }
    if (query.endsWith("[0]") || query.includes("[0]")) {
      return mockSiteMetadataWeb;
    }
    return [mockSiteMetadataWeb, mockSiteMetadataRental, mockSiteMetadataMarketplace];
  }
  if (query.includes('*[_type == "homeHero"')) {
    if (query.endsWith("[0]") || query.includes("[0]")) {
      return mockHomeHero;
    }
    return [mockHomeHero];
  }

  if (query.includes('*[_type == "homeAbout"')) {
    if (query.endsWith("[0]") || query.includes("[0]")) {
      return mockHomeAbout;
    }
    return [mockHomeAbout];
  }

  if (query.includes('*[_type == "studentGuide"')) {
    if (query.endsWith("[0]") || query.includes("[0]")) {
      return mockStudentGuide;
    }
    return [mockStudentGuide];
  }

  if (query.includes('*[_type == "institution"')) {
    return mockInstitutions;
  }

  if (query.includes('*[_type == "place"')) {
    return mockPlaces;
  }

  if (query.includes('*[_type == "service"')) {
    return mockServices;
  }

  if (query.includes('*[_type == "event"')) {
    return mockEvents;
  }

  return [];
}

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
    return getMockDataForQuery(query) as T;
  }
}

export const sanityClient = new SanityClientWrapper();

export async function safeSanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<{ data: T }> {
  const hasLiveKeys =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== undefined &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "mock-project-id";

  if (hasLiveKeys) {
    try {
      const { sanityFetch: liveSanityFetch } = await import("../sanity/lib/live");
      const response = await liveSanityFetch({ query, params });
      if (response.data) {
        return { data: response.data as T };
      }
    } catch (error) {
      console.warn("Sanity liveFetch error, falling back to mock data:", error);
    }
  }

  return { data: getMockDataForQuery(query) as T };
}

export async function getSiteMetadata(appIdentifier = "web"): Promise<SanitySiteMetadata> {
  const query = `*[_type == "siteMetadata" && appIdentifier == "${appIdentifier}"][0]`;
  const res = await safeSanityFetch<SanitySiteMetadata>(query, { appId: appIdentifier });
  return res.data || (appIdentifier === "rental" ? mockSiteMetadataRental : appIdentifier === "marketplace" ? mockSiteMetadataMarketplace : mockSiteMetadataWeb);
}
