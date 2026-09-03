"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useMarketplace } from "../context/MarketplaceContext";
import { resolveImageUrl } from "../lib/image";
import {
  Search,
  Compass,
  Sofa,
  Sparkles,
  Tv,
  Wrench,
  Package,
  ArrowRight,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function BrowsePage() {
  const { products, isLoading } = useMarketplace();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 flex-1">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-foreground-secondary font-bold tracking-widest uppercase animate-pulse">
          Loading Marketplace Products...
        </p>
      </div>
    );
  }

  // Filter Products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || prod.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "stock-desc") {
      return b.stock - a.stock;
    }
    // Default (date/id)
    return a._id.localeCompare(b._id);
  });

  const categories = [
    { id: "all", name: "All Products", icon: Compass },
    { id: "furniture", name: "Furniture", icon: Sofa },
    { id: "home-appliances", name: "Appliances", icon: Tv },
    { id: "local-goods", name: "Local Goods", icon: Sparkles },
    { id: "services", name: "Services", icon: Wrench },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-dark py-12 md:py-20 relative overflow-hidden text-white border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dark-surface via-dark to-black opacity-85" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 inline-block border border-emerald-500/20 animate-pulse">
            Direct Doorstep Delivery
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            The Township Local Marketplace
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto">
            Order furniture, home appliances, regional organic goods, or book professional local services right here.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto pt-6">
            <div className="bg-surface text-foreground rounded-xl shadow-xl border border-border p-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search text input */}
              <div className="md:col-span-8 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted" />
                <input
                  type="text"
                  placeholder="What are you looking for today?..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-normal"
                />
              </div>

              {/* Sort selector */}
              <div className="md:col-span-4 relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="stock-desc">Availability: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-muted">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Bar */}
      <div className="bg-surface border-b border-border py-4 sticky top-16 lg:top-20 z-35 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? "bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-102"
                      : "bg-background text-foreground-secondary border-border hover:border-muted hover:bg-muted/5"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isSelected ? "text-black animate-pulse" : "text-emerald-500"}`}
                  />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              Marketplace Catalogs
            </h2>
            <p className="text-sm text-muted">
              Showing {sortedProducts.length} items to order
            </p>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-border rounded-xl shadow-xs">
            <Package className="w-12 h-12 text-muted/40 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-1">
              No matching products found
            </h3>
            <p className="text-sm text-muted max-w-sm mx-auto">
              We couldn&apos;t find any items matching your criteria. Try looking under another category or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortBy("default");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black rounded-md transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((prod) => {
              return (
                <div
                  key={prod._id}
                  className="bg-surface rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-0.5"
                >
                  {/* Image banner */}
                  <div className="relative h-56 w-full overflow-hidden bg-muted">
                    <Image
                      src={resolveImageUrl(prod.imageUrl)}
                      alt={prod.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-dark/85 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-wider text-white">
                      {prod.category.replace("-", " ")}
                    </div>
                    {prod.stock <= 2 && prod.stock > 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 px-2.5 py-1 rounded-full text-[10px] uppercase font-black tracking-wider text-white shadow-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>LOW STOCK</span>
                      </div>
                    )}
                    {prod.stock === 0 && (
                      <div className="absolute top-3 right-3 bg-muted text-muted-foreground px-2.5 py-1 rounded-full text-[10px] uppercase font-black tracking-wider shadow-sm">
                        OUT OF STOCK
                      </div>
                    )}
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Title */}
                      <h3 className="font-bold text-foreground text-lg leading-snug group-hover:text-emerald-500 transition-colors line-clamp-1">
                        {prod.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-muted leading-relaxed line-clamp-3">
                        {prod.description}
                      </p>

                      {/* Info badges */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="px-2 py-0.5 bg-background border border-border text-[10px] font-semibold text-foreground-secondary rounded-md">
                          Stock: {prod.stock > 0 ? `${prod.stock} units` : "Unavailable"}
                        </span>
                        {prod.deposit ? (
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-bold rounded-md border border-emerald-500/10">
                            Requires Deposit: ${prod.deposit}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-background border border-border text-[10px] font-semibold text-muted rounded-md">
                            No Deposit
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Price / CTA */}
                    <div className="border-t border-border pt-4 flex items-center justify-between">
                      <div className="leading-none">
                        <span className="text-lg font-black text-emerald-500">
                          ${prod.price}
                        </span>
                        <span className="text-[10px] text-muted font-bold block mt-0.5">
                          {prod.category === "services" ? "ESTIMATED BASE" : "TOTAL PRICE"}
                        </span>
                      </div>

                      <Link
                        href={`/item/${prod._id}`}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-lg transition shadow-xs group/btn"
                      >
                        <span>View Specs & Order</span>
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
    </>
  );
}
