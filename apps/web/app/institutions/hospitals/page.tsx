"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import {
  Stethoscope,
  MapPin,
  Phone,
  Clock,
  Search,
  Heart,
  ShieldAlert,
  Calendar,
  Globe,
  Star,
} from "lucide-react";

const hospitals = [
  {
    id: 1,
    name: "Township General Hospital",
    type: "Public General Hospital",
    desc: "The primary regional hospital providing emergency care, specialist services, and in-patient treatment for the entire district.",
    address: "Hospital Road, Medical Quarter",
    phone: "+1 (555) 200-0911",
    hours: "24 Hours / 7 Days",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
    tags: ["Emergency", "Specialist Care", "In-Patient", "Surgery", "ICU"],
    founded: "1962",
    beds: "450+",
    website: "https://hospital.township.org",
    featured: true,
    rating: 4.6,
  },
  {
    id: 2,
    name: "Wellness Community Clinic",
    type: "Public Clinic",
    desc: "Free and subsidised primary healthcare, vaccinations, and health screenings for residents and students.",
    address: "22 Main Street, Town Centre",
    phone: "+1 (555) 200-0500",
    hours: "Mon–Sat: 8:00am – 6:00pm",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
    tags: ["Primary Care", "Free Services", "Vaccinations", "Dental", "Mental Health"],
    founded: "1994",
    beds: "Outpatient Only",
    website: "https://wellness.township.org",
    featured: false,
    rating: 4.5,
  },
  {
    id: 3,
    name: "St. Jude Children's Clinic",
    type: "Pediatric Clinic",
    desc: "A warm and friendly specialist medical clinic catering specifically to children, from infant care up to youth programs.",
    address: "109 Maple Boulevard, West Quarter",
    phone: "+1 (555) 200-0850",
    hours: "Mon-Fri: 8:30am - 5:30pm",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    tags: ["Pediatric", "Child Care", "Immunisation", "Family Support"],
    founded: "2008",
    beds: "Outpatient Only",
    website: "https://stjude.township.org",
    featured: false,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Apex Diagnostics & Lab",
    type: "Diagnostic Center",
    desc: "State-of-the-art imaging, blood screening, pathology, and diagnostic services with quick digital reporting.",
    address: "33 Bio Drive, Science Park",
    phone: "+1 (555) 200-1100",
    hours: "Mon-Sat: 6:00am - 8:00pm",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351167?w=800&q=80",
    tags: ["X-Ray", "MRI", "Blood Labs", "Pathology", "COVID Testing"],
    founded: "2015",
    beds: "Diagnostics Center",
    website: "https://apexlabs.township.org",
    featured: true,
    rating: 4.7,
  },
];

export default function HospitalsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = hospitals.filter(
    (hosp) =>
      hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hosp.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hosp.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
              <a href="/institutions" className="hover:text-white transition-colors">Institutions</a>
              <span className="mx-2">/</span>
              <span className="text-white">Hospitals & Clinics</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-accent/20 rounded-lg text-emerald-400">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Hospitals & Clinics
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              Find emergency care, walk-in community clinics, diagnostic laboratories, and pediatric specialists in Township.
            </p>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border pb-6 mb-8">
            <h2 className="text-xl font-bold text-foreground">
              Medical Centers Available ({filtered.length})
            </h2>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search medical centers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Cards list */}
          {filtered.length > 0 ? (
            <div className="space-y-6">
              {filtered.map((hosp) => (
                <article
                  key={hosp.id}
                  className={`bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-200 p-6 flex flex-col lg:flex-row gap-6 ${
                    hosp.featured ? "ring-1 ring-emerald-500/20 bg-emerald-500/[0.02]" : ""
                  }`}
                >
                  {/* Left Column: Image */}
                  <div className="w-full lg:w-72 h-48 lg:h-auto shrink-0 relative rounded-lg overflow-hidden bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hosp.image}
                      alt={hosp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {hosp.hours.includes("24 Hours") && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 animate-pulse" />
                        24hr Emergency
                      </span>
                    )}
                  </div>

                  {/* Middle Column: Main Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                        {hosp.type}
                      </span>
                      <span className="text-muted">•</span>
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        <span className="font-semibold text-foreground">{hosp.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{hosp.name}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">{hosp.desc}</p>

                    {/* Meta stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-border py-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div className="text-xs">
                          <p className="text-muted leading-none">Founded</p>
                          <p className="font-semibold text-foreground mt-1">{hosp.founded}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div className="text-xs">
                          <p className="text-muted leading-none">Capacity / Beds</p>
                          <p className="font-semibold text-foreground mt-1">{hosp.beds}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                        <ShieldAlert className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div className="text-xs">
                          <p className="text-muted leading-none">Class</p>
                          <p className="font-semibold text-foreground mt-1">Accredited</p>
                        </div>
                      </div>
                    </div>

                    {/* Location/Hours details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-muted shrink-0" />
                        <span>{hosp.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-muted shrink-0" />
                        <span>{hosp.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-muted shrink-0" />
                        <span className="font-semibold text-red-600">{hosp.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-primary shrink-0" />
                        <a href={hosp.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                          {hosp.website.replace("https://", "")}
                        </a>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {hosp.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface rounded-xl border border-border">
              <p className="text-muted text-base">No medical centers found matching your search.</p>
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
