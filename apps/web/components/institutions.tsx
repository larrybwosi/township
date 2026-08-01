"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Stethoscope,
  Landmark,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import { sanityClient, SanityInstitution } from "../lib/sanity";

type Category = "all" | "education" | "health" | "government";

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All Institutions", icon: Landmark },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "health", label: "Health & Medical", icon: Stethoscope },
  { id: "government", label: "Government", icon: Landmark },
];

export default function Institutions() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [institutions, setInstitutions] = useState<SanityInstitution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInstitutions() {
      setIsLoading(true);
      try {
        const result = await sanityClient.fetch<SanityInstitution[]>(
          '*[_type == "institution"]',
        );
        setInstitutions(result);
      } catch (err) {
        console.warn("Failed to fetch institutions from Sanity:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInstitutions();
  }, []);

  if (isLoading) {
    return <div className="py-20 bg-background animate-pulse" />;
  }

  const filtered =
    activeCategory === "all"
      ? institutions
      : institutions.filter((i) => i.category === activeCategory);

  return (
    <section id="institutions" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              <span className="w-6 h-0.5 bg-accent" aria-hidden="true" />
              Institutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight">
              Key institutions in Township
            </h2>
            <p className="text-muted mt-3 max-w-xl text-base leading-relaxed text-pretty">
              From universities to hospitals and government offices — find
              contact details, hours, and directions for every major
              institution.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors duration-150"
          >
            View all institutions
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Category filter tabs */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Institution categories"
        >
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeCategory === id}
              onClick={() => setActiveCategory(id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                activeCategory === id
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-surface text-foreground-secondary border-border hover:border-primary/40 hover:text-primary"
              }`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Institutions grid */}
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
              <div className="relative h-44 overflow-hidden bg-background">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={inst.image}
                  alt={`${inst.name} building`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category chip */}
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
                <h3 className="text-foreground font-bold text-base mb-2 leading-tight">
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

                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors duration-150 group-hover:gap-2.5"
                >
                  View details
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
