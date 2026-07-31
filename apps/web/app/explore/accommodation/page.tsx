"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import {
  Hotel,
  MapPin,
  Phone,
  Clock,
  Search,
  Star,
  DollarSign,
  Coffee,
  Wifi,
} from "lucide-react";

const accommodationSpots = [
  {
    id: 1,
    name: "The Grand Township Hotel",
    type: "4-Star Luxury Hotel",
    desc: "Elegant luxury accommodation steps from the university campus and town centre. Features executive conference rooms, a heated pool, and in-house fine dining.",
    address: "24 College Avenue, Central Township",
    phone: "+1 (555) 300-0200",
    hours: "Check-in: 3:00pm, Check-out: 11:00am",
    price: "$$$",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    tags: ["Heated Pool", "Conference Rooms", "Gym", "Valet Parking", "Restaurant"],
    rating: 4.6,
    reviews: 450,
    featured: true,
  },
  {
    id: 2,
    name: "University Lodge & Dorms",
    type: "Student Housing & Lodge",
    desc: "Affordable shared apartments and private rooms specifically tailored for short-stay visiting students, researchers, and campus guests.",
    address: "10 Campus Circle, University Quarter",
    phone: "+1 (555) 300-0350",
    hours: "Check-in: 2:00pm, Check-out: 10:00am",
    price: "$",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    tags: ["Shared Kitchen", "Free Wi-Fi", "Laundry Room", "Study Lounges", "Keyless Entry"],
    rating: 4.2,
    reviews: 210,
    featured: false,
  },
  {
    id: 3,
    name: "Canalside Bed & Breakfast",
    type: "Boutique Guest House",
    desc: "A charming historical house alongside the canal route. Offers individually decorated antique bedrooms and fresh daily organic breakfasts.",
    address: "8 Riverside Walk, East District",
    phone: "+1 (555) 300-0700",
    hours: "Check-in: 2:00pm, Check-out: 11:00am",
    price: "$$",
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80",
    tags: ["Free Breakfast", "Canal View", "Bicycle Rental", "Gardens"],
    rating: 4.8,
    reviews: 180,
    featured: true,
  },
  {
    id: 4,
    name: "Pinewood Youth Hostel",
    type: "Budget Hostel",
    desc: "A warm and buzzing hostel presenting clean bunk dorm rooms, communal game spaces, and weekly student social events.",
    address: "116 Pine Street, West Quarter",
    phone: "+1 (555) 300-0990",
    hours: "24 Hour Reception",
    price: "$",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&q=80",
    tags: ["Dorm Rooms", "Game Area", "Barbecue Grill", "Storage Lockers"],
    rating: 4.5,
    reviews: 310,
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

export default function AccommodationPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = accommodationSpots.filter(
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
              <span className="text-white">Accommodation</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-accent/20 rounded-lg text-purple-400">
                <Hotel className="w-8 h-8" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Where to Stay
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              Find boutique bed and breakfasts, full-service hotels, clean budget hosteling bunks, and long-term student housing facilities in Township.
            </p>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border pb-6 mb-8">
            <h2 className="text-xl font-bold text-foreground">
              Lodging Available ({filtered.length})
            </h2>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search hotels & lodging..."
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
                    spot.featured ? "ring-1 ring-purple-500/10 border-purple-500/10" : ""
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
                      <span className="absolute top-3 left-3 bg-purple-600 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                        Highly Rated
                      </span>
                    )}
                  </div>

                  {/* Right: Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
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
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{spot.address}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{spot.hours}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-muted shrink-0" aria-hidden="true" />
                          <span>{spot.phone}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {spot.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-medium rounded flex items-center gap-0.5">
                            {tag.toLowerCase().includes("wi-fi") && <Wifi className="w-3 h-3" />}
                            {tag.toLowerCase().includes("breakfast") && <Coffee className="w-3 h-3" />}
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
              <p className="text-muted text-base">No lodging found matching your search.</p>
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
