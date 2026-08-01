"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import {
  Star,
  ArrowRight,
  UtensilsCrossed,
  ShoppingBag,
  TreePine,
  Hotel,
  Search,
} from "lucide-react";
import { sanityClient, SanityPlace } from "../../lib/sanity";

type Category = "all" | "Dining" | "Shopping" | "Parks" | "Stay";

const categories: {
  id: Category;
  label: string;
  icon: React.ElementType;
  link: string;
  color: string;
  bg: string;
}[] = [
  {
    id: "all",
    label: "All Places",
    icon: Star,
    link: "/explore",
    color: "text-primary",
    bg: "bg-primary-light",
  },
  {
    id: "Dining",
    label: "Dining & Cafes",
    icon: UtensilsCrossed,
    link: "/explore/dining",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    id: "Shopping",
    label: "Shopping",
    icon: ShoppingBag,
    link: "/explore/shopping",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: "Parks",
    label: "Parks & Recreation",
    icon: TreePine,
    link: "/explore/parks",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "Stay",
    label: "Accommodation",
    icon: Hotel,
    link: "/explore/accommodation",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "fill-accent text-accent" : "text-gray-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function ExploreLanding() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState<SanityPlace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const result = await sanityClient.fetch<SanityPlace[]>(
          '*[_type == "place"]',
        );
        setPlaces(result);
      } catch (err) {
        console.warn("Failed to fetch places on explore page from Sanity:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlaces();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const filtered = places.filter((place) => {
    const matchesCategory =
      activeCategory === "all" || place.category === activeCategory;
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      place.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Hero Header */}
        <div className="bg-[#0d2238] text-white pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-white/60 text-sm mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">Explore</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Explore Township
            </h1>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              Discover local favorites, hidden treasures, parks, dining options,
              and accommodation options in our beautiful city.
            </p>
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border pb-6 mb-8">
            {/* Category pills */}
            <div
              className="flex flex-wrap gap-2 w-full md:w-auto"
              role="tablist"
              aria-label="Explore categories"
            >
              {categories.map(({ id, label, icon: Icon, color, bg }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={activeCategory === id}
                  onClick={() => setActiveCategory(id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                    activeCategory === id
                      ? "bg-primary text-white border-primary shadow-md"
                      : `${bg} ${color} border-transparent hover:border-current/25`
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {label}
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
                placeholder="Search spots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Quick links to leaf pages */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories
                .slice(1)
                .map(({ label, icon: Icon, link, color, bg }) => (
                  <Link
                    key={label}
                    href={link}
                    className={`flex items-center justify-between p-4 rounded-xl border border-border bg-surface hover:shadow-md hover:border-primary/20 transition-all group`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${bg} ${color}`}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="font-bold text-foreground text-sm">
                        {label}
                      </span>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
            </div>
          </div>

          {/* Places Grid */}
          <h2 className="text-xl font-bold text-foreground mb-4">
            All Curated Places
          </h2>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((place) => (
                <article
                  key={place._id}
                  className="group relative rounded-2xl overflow-hidden bg-background border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 min-h-[260px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={place.image}
                    alt={place.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,34,56,0.95) 0%, rgba(13,34,56,0.3) 60%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {place.category}
                      </span>
                      {place.openNow ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          Open Now
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-red-500/20 backdrop-blur-sm text-red-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          Closed
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight mb-1">
                      {place.name}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed mb-3 line-clamp-2">
                      {place.desc}
                    </p>
                    <div className="flex items-center gap-3">
                      <StarRating rating={place.rating} />
                      <span className="text-white/80 font-semibold text-xs">
                        {place.rating}
                      </span>
                      <span className="text-white/40 text-xs">
                        ({place.reviews} reviews)
                      </span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                      <div className="flex gap-1">
                        {place.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-white/50 text-[10px] bg-white/10 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={place.link || "#"}
                        className="text-white text-xs font-bold flex items-center gap-1 hover:text-accent transition-colors"
                      >
                        Explore
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface rounded-xl border border-border">
              <p className="text-muted text-base">
                No places found matching your search.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-3 text-sm font-semibold text-primary hover:text-accent transition-colors duration-150"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
