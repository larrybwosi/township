"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import {
  TreePine,
  MapPin,
  Clock,
  Search,
  Star,
  Compass,
  Smile,
} from "lucide-react";

const parksSpots = [
  {
    id: 1,
    name: "Riverside Walk & Park",
    type: "Municipal Park",
    desc: "A beautiful riverside green space perfect for morning runs, family picnics, biking pathways, and relaxing weekend sunbathing.",
    address: "Riverside Boulevard, East District",
    hours: "Open 24 Hours / Daily",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    tags: ["Outdoor", "Family-Friendly", "Free", "Biking", "Pet-Friendly"],
    rating: 4.9,
    reviews: 890,
    featured: true,
  },
  {
    id: 2,
    name: "Greenwood Botanical Gardens",
    type: "Botanical Conservatory",
    desc: "Vast historic greenhouses displaying over 15,000 exotic floral species, orchid nurseries, and guided Japanese Zen stone gardens.",
    address: "15 Conservatory Road, West Quarter",
    hours: "Daily: 9:00am - 6:00pm",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
    tags: ["Flowers", "Guided Tours", "Café", "Photography Spot"],
    rating: 4.8,
    reviews: 540,
    featured: true,
  },
  {
    id: 3,
    name: "Summit Hill Hiking Trail",
    type: "Nature Reserve & Trail",
    desc: "A moderate 4.5-mile dirt trail loop ascending to Township's highest overlook, presenting spectacular panoramic city horizon views.",
    address: "Summit Trailhead, North District",
    hours: "Sunrise to Sunset / Daily",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80",
    tags: ["Hiking", "Scenic View", "Nature Reserve", "Benches"],
    rating: 4.7,
    reviews: 730,
    featured: false,
  },
  {
    id: 4,
    name: "Central Sports Field & Court",
    type: "Recreation Complex",
    desc: "Equipped with pristine public tennis courts, basketball zones, soccer turf pitches, and a modern children's playground.",
    address: "110 Court Way, Central Township",
    hours: "Daily: 6:00am - 10:00pm",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=800&q=80",
    tags: ["Tennis", "Basketball", "Soccer", "Playground", "Restrooms"],
    rating: 4.6,
    reviews: 420,
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

export default function ParksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = parksSpots.filter(
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
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Parks & Recreation</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-accent/20 rounded-lg text-emerald-400">
                <TreePine className="w-8 h-8" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Parks & Recreation
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              Find serene botanical gardens, moderate dirt hiking loops, local tennis court complexes, and beautiful green picnic grounds.
            </p>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border pb-6 mb-8">
            <h2 className="text-xl font-bold text-foreground">
              Nature & Outdoors ({filtered.length})
            </h2>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search nature spots..."
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
                    spot.featured ? "ring-1 ring-emerald-500/10 border-emerald-500/10" : ""
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
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow flex items-center gap-1">
                        <Compass className="w-3 h-3 animate-spin" />
                        Must Visit
                      </span>
                    )}
                  </div>

                  {/* Right: Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                          {spot.type}
                        </span>
                        <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                          <Smile className="w-3.5 h-3.5" />
                          <span>Free Admission</span>
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
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {spot.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-medium rounded">
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
              <p className="text-muted text-base">No nature spots found matching your search.</p>
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
