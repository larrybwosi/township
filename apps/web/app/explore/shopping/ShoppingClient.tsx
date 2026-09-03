"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { resolveImageUrl } from "../../../sanity/lib/image";
import {
  ShoppingBag,
  MapPin,
  Clock,
  Search,
  Star,
  DollarSign,
  Tag,
  CheckCircle,
} from "lucide-react";
import { SanityPlace } from "../../../lib/sanity";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating} out of 5`}
    >
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

export default function ShoppingClient({
  initialSpots,
}: {
  initialSpots: SanityPlace[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = (initialSpots || []).filter(
    (spot) =>
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Header Section */}
        <div className="bg-[#0d2238] text-white pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-white/60 text-sm mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/explore"
                className="hover:text-white transition-colors"
              >
                Explore
              </Link>
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
              From full-scale regional shopping complexes to independent vintage
              record stores and student book co-ops.
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
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
                aria-hidden="true"
              />
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
                  key={spot._id}
                  className="bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row"
                >
                  {/* Left: Image */}
                  <div className="w-full sm:w-48 h-48 sm:h-auto shrink-0 relative bg-background">
                    <Image
                      src={resolveImageUrl(spot.image)}
                      alt={spot.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 192px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {spot.rating >= 4.7 && (
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
                          {spot.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-foreground-secondary shrink-0" />
                          <span className="text-xs font-bold text-foreground-secondary">
                            $$
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {spot.name}
                      </h3>

                      {/* Rating details */}
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={spot.rating} />
                        <span className="text-foreground text-xs font-semibold">
                          {spot.rating}
                        </span>
                        <span className="text-muted text-xs">
                          ({spot.reviews} reviews)
                        </span>
                      </div>

                      <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                        {spot.desc}
                      </p>
                    </div>

                    {/* Contacts and details */}
                    <div className="border-t border-border pt-4 mt-auto">
                      <div className="space-y-1.5 text-[11px] text-muted mb-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-muted shrink-0" />
                          <span>Township Centre</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-muted shrink-0" />
                          <span>Mon-Sat: 9:00am - 9:00pm</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {spot.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-medium rounded flex items-center gap-0.5"
                          >
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
              <p className="text-muted text-base">
                No retail stores found matching your search.
              </p>
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
