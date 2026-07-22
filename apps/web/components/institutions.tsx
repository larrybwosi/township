"use client";

import { useState } from "react";
import {
  GraduationCap,
  Stethoscope,
  Landmark,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

type Category = "all" | "education" | "health" | "government";

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All Institutions", icon: Landmark },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "health", label: "Health & Medical", icon: Stethoscope },
  { id: "government", label: "Government", icon: Landmark },
];

const institutions = [
  {
    id: 1,
    category: "education" as Category,
    name: "Township University",
    type: "Public University",
    desc: "The flagship university of the region offering undergraduate and postgraduate programmes across sciences, arts, and engineering.",
    address: "1 University Drive, North Campus",
    phone: "+1 (555) 200-0100",
    hours: "Mon–Fri: 7:30am – 5:00pm",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    tags: ["University", "Research", "Student Services"],
    featured: true,
  },
  {
    id: 2,
    category: "education" as Category,
    name: "Township College of Technology",
    type: "Technical College",
    desc: "Specialising in applied sciences, engineering technology, and vocational programmes with strong industry partnerships.",
    address: "45 Tech Avenue, East District",
    phone: "+1 (555) 200-0200",
    hours: "Mon–Fri: 8:00am – 4:30pm",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    tags: ["College", "Engineering", "Vocational"],
    featured: false,
  },
  {
    id: 3,
    category: "education" as Category,
    name: "St. Mary Academy",
    type: "Secondary School",
    desc: "A well-established secondary institution known for academic excellence and a broad extracurricular programme.",
    address: "12 Oak Lane, Central Township",
    phone: "+1 (555) 200-0300",
    hours: "Mon–Fri: 7:00am – 3:00pm",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    tags: ["Secondary", "Academy"],
    featured: false,
  },
  {
    id: 4,
    category: "health" as Category,
    name: "Township General Hospital",
    type: "Public Hospital",
    desc: "The primary regional hospital providing emergency care, specialist services, and in-patient treatment for the entire district.",
    address: "Hospital Road, Medical Quarter",
    phone: "+1 (555) 200-0911",
    hours: "24 Hours / 7 Days",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80",
    tags: ["Emergency", "Specialist Care", "In-Patient"],
    featured: true,
  },
  {
    id: 5,
    category: "health" as Category,
    name: "Wellness Community Clinic",
    type: "Public Clinic",
    desc: "Free and subsidised primary healthcare, vaccinations, and health screenings for residents and students.",
    address: "22 Main Street, Town Centre",
    phone: "+1 (555) 200-0500",
    hours: "Mon–Sat: 8:00am – 6:00pm",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80",
    tags: ["Primary Care", "Free Services", "Vaccinations"],
    featured: false,
  },
  {
    id: 6,
    category: "government" as Category,
    name: "Township Municipal Hall",
    type: "Local Government",
    desc: "The central office for permits, licenses, ID documents, and local government services. Online services available.",
    address: "City Hall Square, Township Centre",
    phone: "+1 (555) 200-0001",
    hours: "Mon–Fri: 8:00am – 4:00pm",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    tags: ["Permits", "Licensing", "ID Documents"],
    featured: false,
  },
];

export default function Institutions() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? institutions
      : institutions.filter((i) => i.category === activeCategory);

  return (
    <section id="institutions" className="py-20 lg:py-28 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-3">
              <span className="w-6 h-0.5 bg-[var(--color-accent)]" aria-hidden="true" />
              Institutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] text-balance leading-tight">
              Key institutions in Township
            </h2>
            <p className="text-[var(--color-muted)] mt-3 max-w-xl text-base leading-relaxed text-pretty">
              From universities to hospitals and government offices — find contact
              details, hours, and directions for every major institution.
            </p>
          </div>
          <a
            href="#"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors duration-150"
          >
            View all institutions
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Institution categories">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeCategory === id}
              onClick={() => setActiveCategory(id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                activeCategory === id
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md"
                  : "bg-[var(--color-surface)] text-[var(--color-foreground-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]"
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
              key={inst.id}
              className={`group bg-[var(--color-surface)] rounded-xl border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${
                inst.featured
                  ? "border-[var(--color-primary)]/25 ring-1 ring-[var(--color-primary)]/10"
                  : "border-[var(--color-border)]"
              }`}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-[var(--color-background)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={inst.image}
                  alt={`${inst.name} building`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category chip */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                  {inst.category === "education" && (
                    <GraduationCap className="w-3 h-3 text-[var(--color-primary)]" aria-hidden="true" />
                  )}
                  {inst.category === "health" && (
                    <Stethoscope className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                  )}
                  {inst.category === "government" && (
                    <Landmark className="w-3 h-3 text-purple-600" aria-hidden="true" />
                  )}
                  <span className="text-[10px] font-semibold text-[var(--color-foreground)] uppercase tracking-wider">
                    {inst.type}
                  </span>
                </div>
                {inst.featured && (
                  <div className="absolute top-3 right-3 bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[var(--color-foreground)] font-bold text-base mb-2 leading-tight">
                  {inst.name}
                </h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-4 line-clamp-2">
                  {inst.desc}
                </p>

                {/* Meta */}
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-muted)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-[var(--color-muted)] text-xs leading-tight">{inst.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[var(--color-muted)] flex-shrink-0" aria-hidden="true" />
                    <span className="text-[var(--color-muted)] text-xs">{inst.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[var(--color-muted)] flex-shrink-0" aria-hidden="true" />
                    <span className="text-[var(--color-muted)] text-xs">{inst.hours}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {inst.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-[11px] font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors duration-150 group-hover:gap-2.5"
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
