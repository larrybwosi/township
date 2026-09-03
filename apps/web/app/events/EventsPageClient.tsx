"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { resolveImageUrl } from "../../sanity/lib/image";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Search,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { SanityEvent } from "../../lib/sanity";

const categoryColors: Record<string, string> = {
  Culture: "bg-pink-100 text-pink-700 border-pink-200",
  Education: "bg-blue-100 text-blue-700 border-blue-200",
  Community: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Sport: "bg-orange-100 text-orange-700 border-orange-200",
};

type EventCategory = "All" | "Culture" | "Education" | "Community" | "Sport";

const categories: EventCategory[] = [
  "All",
  "Culture",
  "Education",
  "Community",
  "Sport",
];

export default function EventsPageClient({
  initialEvents,
}: {
  initialEvents: SanityEvent[];
}) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const events = initialEvents || [];

  const filtered = events.filter((event) => {
    const matchesCategory =
      activeCategory === "All" || event.category === activeCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredEvent = events.find((e) => e.featured) || events[0];

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
              <span className="text-white">Events Calendar</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-accent/20 rounded-lg text-accent">
                <PartyPopper className="w-8 h-8" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Township Events Calendar
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              Stay connected with cultural festivals, campus open days, sports marathons, and community markets happening across Township.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Featured Event Banner if available */}
          {featuredEvent && (
            <div className="mb-12">
              <h2 className="text-xs font-black uppercase tracking-widest text-accent mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 fill-accent" />
                Featured Highlight
              </h2>
              <article className="group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative h-64 lg:h-auto min-h-[300px]">
                  <Image
                    src={resolveImageUrl(featuredEvent.image)}
                    alt={featuredEvent.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent text-white shadow">
                      Featured Event
                    </span>
                    {featuredEvent.category && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          categoryColors[featuredEvent.category] || "bg-white text-dark"
                        }`}
                      >
                        {featuredEvent.category}
                      </span>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-foreground font-bold text-2xl sm:text-3xl leading-tight mb-4">
                      {featuredEvent.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-6">
                      {featuredEvent.desc}
                    </p>
                  </div>

                  <div className="border-t border-border pt-6 space-y-3">
                    <div className="flex items-center gap-2.5 text-foreground-secondary text-sm">
                      <Calendar className="w-4 h-4 text-accent shrink-0" />
                      <span className="font-semibold">{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-muted text-sm">
                      <Clock className="w-4 h-4 text-accent shrink-0" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-muted text-sm">
                      <MapPin className="w-4 h-4 text-accent shrink-0" />
                      <span>{featuredEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-muted text-sm">
                      <Users className="w-4 h-4 text-accent shrink-0" />
                      <span>{featuredEvent.attendees} expected attendees</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border pb-6 mb-8">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-md"
                      : "bg-surface text-foreground-secondary border border-border hover:border-primary/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search events or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Events Grid */}
          <h2 className="text-xl font-bold text-foreground mb-6">
            Upcoming Events ({filtered.length})
          </h2>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <article
                  key={event._id}
                  className="group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-background">
                    <Image
                      src={resolveImageUrl(event.image)}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-sm ${
                          categoryColors[event.category] || "bg-white text-dark"
                        }`}
                      >
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-foreground font-bold text-lg leading-tight mb-2">
                        {event.title}
                      </h3>
                      <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                        {event.desc}
                      </p>
                    </div>

                    <div className="border-t border-border pt-4 space-y-2 text-xs text-muted mt-auto">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-muted shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-muted shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface rounded-xl border border-border">
              <p className="text-muted text-base">
                No events found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-3 text-sm font-semibold text-primary hover:text-accent transition-colors duration-150"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
