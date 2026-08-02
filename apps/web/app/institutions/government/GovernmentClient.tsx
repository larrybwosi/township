"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { resolveImageUrl } from "../../../sanity/lib/image";
import {
  Landmark,
  MapPin,
  Phone,
  Clock,
  Search,
  Scale,
  FileText,
  FileCheck,
  Globe,
  Star,
} from "lucide-react";
import { SanityInstitution } from "../../../lib/sanity";

export default function GovernmentClient({
  initialOffices,
}: {
  initialOffices: SanityInstitution[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = (initialOffices || []).filter(
    (office) =>
      office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

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
              <Link
                href="/institutions"
                className="hover:text-white transition-colors"
              >
                Institutions
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">Government Offices</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-accent/20 rounded-lg text-purple-400">
                <Landmark className="w-8 h-8" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Government Offices
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              Find municipal halls, district police branches, central postal
              facilities, and local libraries. Obtain permits, licenses, and
              official registrations.
            </p>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border pb-6 mb-8">
            <h2 className="text-xl font-bold text-foreground">
              Municipal Services ({filtered.length})
            </h2>
            <div className="relative w-full sm:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search municipal offices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Cards list */}
          {filtered.length > 0 ? (
            <div className="space-y-6">
              {filtered.map((office) => (
                <article
                  key={office._id}
                  className={`bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-200 p-6 flex flex-col lg:flex-row gap-6 ${
                    office.featured
                      ? "ring-1 ring-purple-500/20 bg-purple-500/[0.01]"
                      : ""
                  }`}
                >
                  {/* Left Column: Image */}
                  <div className="w-full lg:w-72 h-48 lg:h-auto shrink-0 relative rounded-lg overflow-hidden bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageUrl(office.image)}
                      alt={office.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {office.featured && (
                      <span className="absolute top-3 left-3 bg-purple-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        Official Facility
                      </span>
                    )}
                  </div>

                  {/* Middle Column: Main Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                        {office.type}
                      </span>
                      <span className="text-muted">•</span>
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        <span className="font-semibold text-foreground">
                          4.3
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {office.name}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {office.desc}
                    </p>

                    {/* Meta stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-border py-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-purple-600 shrink-0" />
                        <div className="text-xs">
                          <p className="text-muted leading-none">Founded</p>
                          <p className="font-semibold text-foreground mt-1">
                            1930s
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                        <div className="text-xs">
                          <p className="text-muted leading-none">
                            Main Division
                          </p>
                          <p className="font-semibold text-foreground mt-1">
                            Public Services
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                        <FileCheck className="w-4 h-4 text-purple-600 shrink-0" />
                        <div className="text-xs">
                          <p className="text-muted leading-none">Authority</p>
                          <p className="font-semibold text-foreground mt-1">
                            District
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Location/Hours details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-muted shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-muted shrink-0" />
                        <span>{office.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-muted shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-primary shrink-0" />
                        <a
                          href="https://gov.township.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          gov.township.org
                        </a>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {office.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-100 text-[11px] font-medium rounded-full"
                        >
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
              <p className="text-muted text-base">
                No government offices found matching your search.
              </p>
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
