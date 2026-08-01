"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { resolveImageUrl } from "../../sanity/lib/image";
import {
  GraduationCap,
  Stethoscope,
  Landmark,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
  Search,
} from "lucide-react";
import { SanityInstitution } from "../../lib/sanity";

type Category = "all" | "education" | "health" | "government";

const categories: {
  id: Category;
  label: string;
  icon: React.ElementType;
  link: string;
}[] = [
  {
    id: "all",
    label: "All Institutions",
    icon: Landmark,
    link: "/institutions",
  },
  {
    id: "education",
    label: "Education & Colleges",
    icon: GraduationCap,
    link: "/institutions/universities",
  },
  {
    id: "health",
    label: "Health & Medical",
    icon: Stethoscope,
    link: "/institutions/hospitals",
  },
  {
    id: "government",
    label: "Government Offices",
    icon: Landmark,
    link: "/institutions/government",
  },
];

export default function InstitutionsLandingClient({
  initialInstitutions,
}: {
  initialInstitutions: SanityInstitution[];
}) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = (initialInstitutions || []).filter((inst) => {
    const matchesCategory =
      activeCategory === "all" || inst.category === activeCategory;
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      inst.type.toLowerCase().includes(searchQuery.toLowerCase());
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
              <span className="text-white">Institutions</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Key Institutions in Township
            </h1>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              Find contact details, operational hours, services, and directions
              for every major education, healthcare, and public service facility
              in the district.
            </p>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border pb-6 mb-8">
            {/* Category tabs */}
            <div
              className="flex flex-wrap gap-2 w-full md:w-auto"
              role="tablist"
              aria-label="Institution categories"
            >
              {categories.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={activeCategory === id}
                  onClick={() => setActiveCategory(id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                    activeCategory === id
                      ? "bg-[#0d2238] text-white border-[#0d2238] shadow-md"
                      : "bg-surface text-foreground-secondary border-border hover:border-[#0d2238]/40 hover:text-primary"
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
                placeholder="Search institutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Grid display */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((inst) => (
                <article
                  key={inst._id}
                  className={`group bg-surface rounded-xl border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${
                    inst.featured
                      ? "border-primary/25 ring-1 ring-primary/10"
                      : "border-border"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageUrl(inst.image)}
                      alt={`${inst.name} building`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                      {inst.category === "education" && (
                        <GraduationCap
                          className="w-3 h-3 text-primary"
                          aria-hidden="true"
                        />
                      )}
                      {inst.category === "health" && (
                        <Stethoscope
                          className="w-3 h-3 text-emerald-600"
                          aria-hidden="true"
                        />
                      )}
                      {inst.category === "government" && (
                        <Landmark
                          className="w-3 h-3 text-purple-600"
                          aria-hidden="true"
                        />
                      )}
                      <span className="text-[10px] font-semibold text-foreground uppercase tracking-wider">
                        {inst.type}
                      </span>
                    </div>
                    {inst.featured && (
                      <div className="absolute top-3 right-3 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-foreground font-bold text-lg mb-2 leading-tight">
                      {inst.name}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                      {inst.desc}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin
                          className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-muted text-xs leading-tight">
                          {inst.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone
                          className="w-3.5 h-3.5 text-muted shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-muted text-xs">{inst.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock
                          className="w-3.5 h-3.5 text-muted shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-muted text-xs">{inst.hours}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {inst.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 bg-primary-light text-primary text-[11px] font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={
                        inst.category === "education"
                          ? "/institutions/universities"
                          : inst.category === "health"
                            ? "/institutions/hospitals"
                            : "/institutions/government"
                      }
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors duration-150 group-hover:gap-2.5"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface rounded-xl border border-border">
              <p className="text-muted text-base">
                No institutions found matching your search.
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
