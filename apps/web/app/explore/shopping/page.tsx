"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import {
  ShoppingBag,
  MapPin,
  Phone,
  Clock,
  Search,
  Star,
  DollarSign,
  Tag,
  CheckCircle,
} from "lucide-react";

const shoppingSpots = [
  {
    id: 1,
    name: "Township Mall",
    type: "Premium Shopping Mall",
    desc: "The region's premier shopping destination with over 150 stores, a food court, a cinema complex, and underground parking facilities.",
    address: "88 Retail Avenue, Central District",
    phone: "+1 (555) 300-1100",
    hours: "Mon–Sat: 9:00am – 9:00pm, Sun: 10:00am – 6:00pm",
    price: "$$$",
    image: "https://images.unsplash.com/photo-1567449303078-57ad995bd17a?w=800&q=80",
    tags: ["Fashion", "Food Court", "Entertainment", "Free Parking", "Cinema"],
    rating: 4.5,
    reviews: 2100,
    featured: true,
  },
  {
    id: 2,
    name: "The Bookstore Collective",
    type: "Independent Bookstore",
    desc: "A cozy community-run shop selling new, used, and vintage books, alongside local crafts, stationary, and freshly-brewed tea.",
    address: "14 University Way, University Quarter",
    phone: "+1 (555) 300-1122",
    hours: "Mon-Sat: 10:00am - 8:00pm",
    price: "$",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
    tags: ["Books", "Vintage", "Local Art", "Reading Room", "Student Discount"],
    rating: 4.9,
    reviews: 320,
    featured: true,
  },
  {
    id: 3,
    name: "Greenwood Organic Market",
    type: "Grocery & Health Food",
    desc: "A spacious green grocery providing organic vegetables, bulk dry grains, natural supplements, and vegan bakery selections.",
    address: "57 Spruce Boulevard, West Quarter",
    phone: "+1 (555) 300-1550",
    hours: "Daily: 8:00am - 8:00pm",
    price: "$$",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    tags: ["Organic", "Groceries", "Vegan", "Zero-Waste", "Bulk Foods"],
    rating: 4.6,
    reviews: 480,
    featured: false,
  },
  {
    id: 4,
    name: "West End Antique Bazaar",
    type: "Thrift & Antiques",
    desc: "A massive warehouse showcasing curated mid-century modern furniture, retro clothing, vinyl records, and quirky collectibles.",
    address: "101 Industrial Lane, West Quarter",
    phone: "+1 (555) 300-1990",
    hours: "Fri-Sun: 9:00am - 5:00pm",
    price: "$$",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d296e?w=800&q=80",
    tags: ["Antiques", "Thrift", "Vintage Clothing", "Vinyl Records"],
    rating: 4.7,
    reviews: 290,
    featured: false,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? "fill-accent text-accent" : "text-gray-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function ShoppingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = shoppingSpots.filter(
    (spot) =>
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Header Section */}
        <div className="bg-[#0d2238] text-white pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-white/60 text-sm mb-4" aria-label="Breadcrumb">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span className="mx-2">/</span>
              <a href="/explore" className="hover:text-white transition-colors">Explore</a>
              <span className="mx-2">/</span>
              <span className="text-white">Shopping</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-accent/20 rounded-lg text-blue-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Shopping & Markets
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              From full-scale regional shopping complexes to independent vintage record stores and student book co-ops.
            </p>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border pb-6 mb-8">
            <h2 className="text-xl font-bold text-foreground">
              Retail Stores ({filtered.length})
            </h2>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search retail & markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Cards grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((spot) => (
                <article
                  key={spot.id}
                  className={`bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row ${
                    spot.featured ? "ring-1 ring-blue-500/10 border-blue-500/10" : ""
                  }`}
                >
                  {/* Left: Image */}
                  <div className="w-full sm:w-48 h-48 sm:h-auto shrink-0 relative bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {spot.featured && (
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow flex items-center gap-1">
                        <Tag className="w-3 h-3 fill-white" />
                        Popular Choice
                      </span>
                    )}
                  </div>

                  {/* Right: Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                          {spot.type}
                        </span>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-foreground-secondary shrink-0" />
                          <span className="text-xs font-bold text-foreground-secondary">{spot.price}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{spot.name}</h3>

                      {/* Rating details */}
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={spot.rating} />
                        <span className="text-foreground text-xs font-semibold">{spot.rating}</span>
                        <span className="text-muted text-xs">({spot.reviews} reviews)</span>
                      </div>

                      <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">{spot.desc}</p>
                    </div>

                    {/* Contacts and details */}
                    <div className="border-t border-border pt-4 mt-auto">
                      <div className="space-y-1.5 text-[11px] text-muted mb-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-muted shrink-0" />
                          <span>{spot.address}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-muted shrink-0" />
                          <span>{spot.hours}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-muted shrink-0" />
                          <span>{spot.phone}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {spot.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-medium rounded flex items-center gap-0.5">
                            <CheckCircle className="w-2.5 h-2.5 text-blue-500" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface rounded-xl border border-border">
              <p className="text-muted text-base">No retail stores found matching your search.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-sm font-semibold text-primary hover:text-accent transition-colors duration-150"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
