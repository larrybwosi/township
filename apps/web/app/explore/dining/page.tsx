"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Clock,
  Search,
  Star,
  DollarSign,
  Coffee,
  Sparkles,
} from "lucide-react";

const diningSpots = [
  {
    id: 1,
    name: "The Central Market",
    type: "Food Court & Market",
    desc: "A vibrant open-air market at the heart of town, offering fresh produce, street food, and artisan goods from local vendors.",
    address: "Market Square, Central District",
    phone: "+1 (555) 300-4400",
    hours: "Daily: 8:00am - 10:00pm",
    price: "$",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    tags: ["Street Food", "Local Produce", "Artisan", "Seating Area"],
    rating: 4.8,
    reviews: 1240,
    featured: true,
  },
  {
    id: 2,
    name: "Brewed — Specialty Coffee",
    type: "Artisan Cafe",
    desc: "A student favourite for its single-origin brews, strong Wi-Fi, and calm working atmosphere open from early morning.",
    address: "28 College Avenue, University Quarter",
    phone: "+1 (555) 300-4120",
    hours: "Mon-Sat: 7:00am - 6:00pm",
    price: "$$",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    tags: ["Coffee", "Wi-Fi", "Study Spot", "Pastries"],
    rating: 4.7,
    reviews: 620,
    featured: true,
  },
  {
    id: 3,
    name: "Riverside Bistro",
    type: "Fine Dining Restaurant",
    desc: "Elegant dining overlooking the canal. Specializes in locally sourced organic seafood and hand-crafted pastas.",
    address: "12 Riverside Walk, East District",
    phone: "+1 (555) 300-8800",
    hours: "Tue-Sun: 12:00pm - 11:00pm",
    price: "$$$",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    tags: ["Fine Dining", "Seafood", "Romantic", "Wine Bar"],
    rating: 4.9,
    reviews: 410,
    featured: false,
  },
  {
    id: 4,
    name: "Student Pizza Hub",
    type: "Pizzeria & Diner",
    desc: "Late-night student discounts on hand-tossed sourdough pizzas, garlic knots, and craft draft sodas.",
    address: "15 University Way, University Quarter",
    phone: "+1 (555) 300-9911",
    hours: "Daily: 11:00am - 2:00am",
    price: "$",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    tags: ["Pizza", "Late Night", "Discounts", "Delivery"],
    rating: 4.4,
    reviews: 850,
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

export default function DiningPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = diningSpots.filter(
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
              <span className="text-white">Dining & Cafes</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-accent/20 rounded-lg text-orange-400">
                <UtensilsCrossed className="w-8 h-8" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Dining & Cafes
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              Discover the absolute best culinary experiences, third-wave specialty espresso bars, street food stalls, and student dining spots in Township.
            </p>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border pb-6 mb-8">
            <h2 className="text-xl font-bold text-foreground">
              Food Spots ({filtered.length})
            </h2>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search food & coffee spots..."
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
                    spot.featured ? "ring-1 ring-orange-500/10 border-orange-500/10" : ""
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
                      <span className="absolute top-3 left-3 bg-orange-500 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-white" />
                        Staff Pick
                      </span>
                    )}
                  </div>

                  {/* Right: Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
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
                          <span key={tag} className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-medium rounded">
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
              <p className="text-muted text-base">No food spots found matching your search.</p>
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
