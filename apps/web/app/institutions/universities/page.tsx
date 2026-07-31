"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import {
  GraduationCap,
  MapPin,
  Phone,
  Clock,
  Search,
  BookOpen,
  Users,
  Award,
  Globe,
  Star,
} from "lucide-react";

const universities = [
  {
    id: 1,
    name: "Township University",
    type: "Public University",
    desc: "The flagship university of the region offering undergraduate and postgraduate programmes across sciences, arts, and engineering.",
    address: "1 University Drive, North Campus",
    phone: "+1 (555) 200-0100",
    hours: "Mon–Fri: 7:30am – 5:00pm",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    tags: ["University", "Research", "Student Services", "Library", "Athletics"],
    founded: "1948",
    students: "18,500+",
    website: "https://www.township.edu",
    featured: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Township College of Technology",
    type: "Technical College",
    desc: "Specialising in applied sciences, engineering technology, and vocational programmes with strong industry partnerships.",
    address: "45 Tech Avenue, East District",
    phone: "+1 (555) 200-0200",
    hours: "Mon–Fri: 8:00am – 4:30pm",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    tags: ["College", "Engineering", "Vocational", "Coding", "IT Labs"],
    founded: "1975",
    students: "6,200+",
    website: "https://tct.township.edu",
    featured: false,
    rating: 4.6,
  },
  {
    id: 3,
    name: "St. Mary Academy",
    type: "Secondary School",
    desc: "A well-established secondary institution known for academic excellence and a broad extracurricular programme.",
    address: "12 Oak Lane, Central Township",
    phone: "+1 (555) 200-0300",
    hours: "Mon–Fri: 7:00am – 3:00pm",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    tags: ["Secondary", "Academy", "Prep School", "Arts"],
    founded: "1922",
    students: "1,200",
    website: "https://stmarys.township.org",
    featured: false,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Institute of Fine Arts",
    type: "Art School",
    desc: "A creative conservatory dedicated to fostering excellence in music, theater, visual arts, and design.",
    address: "88 Gallery Way, West Quarter",
    phone: "+1 (555) 200-0450",
    hours: "Mon–Fri: 9:00am – 6:00pm",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    tags: ["Arts", "Conservatory", "Music", "Exhibitions", "Theater"],
    founded: "1989",
    students: "850",
    website: "https://art.township.org",
    featured: true,
    rating: 4.9,
  },
];

export default function UniversitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
              <span className="text-white">Universities & Colleges</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-accent/20 rounded-lg text-accent">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Universities & Colleges
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              Explore secondary, higher, and specialized technical educational institutions in Township. View tuition pathways, student directories, and campus contact details.
            </p>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border pb-6 mb-8">
            <h2 className="text-xl font-bold text-foreground">
              Available Programs ({filtered.length})
            </h2>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search education programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Cards list */}
          {filtered.length > 0 ? (
            <div className="space-y-6">
              {filtered.map((uni) => (
                <article
                  key={uni.id}
                  className={`bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-200 p-6 flex flex-col lg:flex-row gap-6 ${
                    uni.featured ? "ring-1 ring-primary/20 bg-primary/5" : ""
                  }`}
                >
                  {/* Left Column: Image */}
                  <div className="w-full lg:w-72 h-48 lg:h-auto shrink-0 relative rounded-lg overflow-hidden bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uni.image}
                      alt={uni.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {uni.featured && (
                      <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        Top Rated
                      </span>
                    )}
                  </div>

                  {/* Middle Column: Main Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {uni.type}
                      </span>
                      <span className="text-muted">•</span>
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        <span className="font-semibold text-foreground">{uni.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{uni.name}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">{uni.desc}</p>

                    {/* Meta stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-border py-3 mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary shrink-0" />
                        <div className="text-xs">
                          <p className="text-muted leading-none">Founded</p>
                          <p className="font-semibold text-foreground mt-1">{uni.founded}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary shrink-0" />
                        <div className="text-xs">
                          <p className="text-muted leading-none">Students</p>
                          <p className="font-semibold text-foreground mt-1">{uni.students}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                        <Award className="w-4 h-4 text-primary shrink-0" />
                        <div className="text-xs">
                          <p className="text-muted leading-none">Accreditations</p>
                          <p className="font-semibold text-foreground mt-1">National</p>
                        </div>
                      </div>
                    </div>

                    {/* Location/Hours details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-muted shrink-0" />
                        <span>{uni.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-muted shrink-0" />
                        <span>{uni.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-muted shrink-0" />
                        <span>{uni.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-primary shrink-0" />
                        <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                          {uni.website.replace("https://", "")}
                        </a>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {uni.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 bg-primary-light text-primary text-[11px] font-medium rounded-full">
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
              <p className="text-muted text-base">No education programs found matching your search.</p>
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
