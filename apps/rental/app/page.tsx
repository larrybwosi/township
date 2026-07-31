"use client";

import React, { useState } from "react";
import { useMockData } from "../context/MockDataContext";
import Navbar from "../components/Navbar";
import AddPropertyModal from "../components/AddPropertyModal";
import MyBookingsModal from "../components/MyBookingsModal";
import { Search, MapPin, Star, SlidersHorizontal, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

export default function BrowsePage() {
  const { properties, towns, reviews, activeUser } = useMockData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [maxPrice, setMaxPrice] = useState("500");
  const [showFilters, setShowFilters] = useState(false);

  // Modal Control States
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Helper to calculate rating
  const getPropertyStats = (propertyId: string) => {
    const propReviews = reviews.filter((r) => r.propertyId === propertyId);
    if (propReviews.length === 0) return { avg: 0, count: 0 };
    const sum = propReviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      avg: parseFloat((sum / propReviews.length).toFixed(1)),
      count: propReviews.length,
    };
  };

  // Filter Properties
  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTown = selectedTown === "" || prop.townId === selectedTown;

    const matchesPrice = prop.price <= parseFloat(maxPrice || "500");

    return matchesSearch && matchesTown && matchesPrice;
  });

  return (
    <>
      <Navbar
        onOpenAddProperty={() => setIsAddPropertyOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      {/* Hero Section */}
      <section className="bg-dark py-12 md:py-20 relative overflow-hidden text-white border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dark-surface via-dark to-black opacity-85" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-accent/20 text-accent inline-block border border-accent/20">
            Township Portal Staycations
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Find the Perfect Rental Property in Our Gorgeous Towns
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto">
            From modern lofts overlooking the Riverdale boardwalk to cozy woodland cabins in Oakwood. Discover homes vetted for quality and comfort.
          </p>

          {/* Core Search and Filter bar */}
          <div className="max-w-4xl mx-auto pt-6">
            <div className="bg-surface text-foreground rounded-xl shadow-xl border border-border p-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search text input */}
              <div className="md:col-span-5 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted" />
                <input
                  type="text"
                  placeholder="Search by keyword, address, or style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Town selector */}
              <div className="md:col-span-3 relative">
                <select
                  value={selectedTown}
                  onChange={(e) => setSelectedTown(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">All Towns</option>
                  {towns.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-muted">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
              </div>

              {/* Max Price filter */}
              <div className="md:col-span-3 flex flex-col justify-center px-2">
                <div className="flex justify-between items-center text-xs text-muted mb-1 font-bold">
                  <span>MAX PRICE</span>
                  <span className="text-primary font-bold">${maxPrice}/night</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full accent-accent h-1.5 bg-muted/20 rounded-lg cursor-pointer"
                />
              </div>

              {/* Show Filters Toggle / Action */}
              <div className="md:col-span-1">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`w-full h-10 flex items-center justify-center rounded-lg border transition ${
                    showFilters ? "bg-accent/10 border-accent text-accent" : "bg-background border-border text-foreground-secondary hover:bg-muted/10"
                  }`}
                  title="More Filters"
                >
                  <SlidersHorizontal className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-3 bg-dark-surface border border-white/10 rounded-lg p-4 text-left grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
                <div>
                  <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Simulated Host Portal Controls</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    You can list your own rental property directly in this portal! Switch your simulated role to <span className="text-white font-semibold">Homeowner</span> in the top right, then click the <span className="text-white font-semibold">List Property</span> button.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Persistent Interactive State</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Reservations made on individual property details persist dynamically in the session. You can manage and cancel bookings by clicking <span className="text-white font-semibold">My Bookings</span>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Properties Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-foreground">Available Properties</h2>
            <p className="text-sm text-muted">
              Showing {filteredProperties.length} of {properties.length} vacation rentals
            </p>
          </div>

          {/* Quick Active Identity Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-primary-light text-primary text-xs font-bold rounded-full">
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span>Simulating: {activeUser.role}</span>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-border rounded-xl shadow-xs">
            <Search className="w-12 h-12 text-muted/40 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-1">No matching properties found</h3>
            <p className="text-sm text-muted max-w-sm mx-auto">
              We could not find any rentals matching your criteria. Try loosening your price threshold or widening the search terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTown("");
                setMaxPrice("500");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-primary text-white rounded-md hover:bg-primary-hover transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => {
              const town = towns.find((t) => t.id === prop.townId);
              const { avg, count } = getPropertyStats(prop.id);

              return (
                <div
                  key={prop.id}
                  className="bg-surface rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-0.5"
                >
                  {/* Image banner */}
                  <div className="relative h-56 w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prop.imageUrl}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-dark/85 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-wider text-white">
                      {town ? town.name : "Municipal"}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Rating details */}
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span className="flex items-center gap-1 font-semibold text-foreground-secondary">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          {prop.address}
                        </span>
                        {count > 0 ? (
                          <span className="flex items-center gap-1 font-bold text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            {avg} <span className="font-normal text-muted">({count})</span>
                          </span>
                        ) : (
                          <span className="text-muted/60 italic text-[11px]">New listing</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-foreground text-lg leading-snug group-hover:text-primary transition-colors line-clamp-1">
                        {prop.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-muted leading-relaxed line-clamp-2">
                        {prop.description}
                      </p>

                      {/* Amenities snippet */}
                      <div className="flex flex-wrap gap-1 pt-1.5">
                        {prop.amenities.slice(0, 3).map((a) => (
                          <span
                            key={a}
                            className="px-2 py-0.5 bg-background border border-border text-[10px] font-semibold text-foreground-secondary rounded-md"
                          >
                            {a}
                          </span>
                        ))}
                        {prop.amenities.length > 3 && (
                          <span className="px-2 py-0.5 bg-background border border-border text-[10px] font-bold text-accent rounded-md">
                            +{prop.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA / Price */}
                    <div className="border-t border-border pt-4 flex items-center justify-between">
                      <div className="leading-none">
                        <span className="text-lg font-black text-primary">${prop.price}</span>
                        <span className="text-[10px] text-muted font-bold block mt-0.5">PER NIGHT</span>
                      </div>

                      <Link
                        href={`/property/${prop.id}`}
                        className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition shadow-xs group/btn"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white border-t border-white/5 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2 text-white/50 text-xs">
          <p className="font-semibold text-white/80">Township Rental Hub Portal</p>
          <p>© {new Date().getFullYear()} Township Portal. Designed for seamless civic stays and vacation rentals.</p>
        </div>
      </footer>

      {/* Modals */}
      <AddPropertyModal isOpen={isAddPropertyOpen} onClose={() => setIsAddPropertyOpen(false)} />
      <MyBookingsModal isOpen={isMyBookingsOpen} onClose={() => setIsMyBookingsOpen(false)} />
    </>
  );
}
