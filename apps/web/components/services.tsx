"use client";

import { useState, useEffect } from "react";
import { HelpCircle, ArrowRight, BookOpen, Phone } from "lucide-react";
import * as Icons from "lucide-react";
import {
  sanityClient,
  SanityService,
  SanityStudentGuide,
} from "../lib/sanity";

function getIcon(iconName: string): React.ElementType {
  const Icon = (Icons as unknown as Record<string, React.ElementType>)[iconName];
  return Icon || HelpCircle;
}

export default function Services() {
  const [services, setServices] = useState<SanityService[]>([]);
  const [studentGuide, setStudentGuide] = useState<SanityStudentGuide | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const fetchedServices = await sanityClient.fetch<SanityService[]>(
          '*[_type == "service"]',
        );
        const fetchedGuide = await sanityClient.fetch<SanityStudentGuide>(
          '*[_type == "studentGuide"][0]',
        );
        setServices(fetchedServices);
        setStudentGuide(fetchedGuide);
      } catch (err) {
        console.warn("Failed to fetch services content:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading || !studentGuide) {
    return <div className="py-20 bg-background animate-pulse" />;
  }

  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            <span className="w-6 h-0.5 bg-accent" aria-hidden="true" />
            City Services
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight max-w-lg">
              Services available to every resident
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-sm text-pretty">
              From transport to utilities — find everything you need to navigate
              life in Township.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map(({ title, desc, link, color, iconName }) => {
            const Icon = getIcon(iconName);
            return (
              <a
                key={title}
                href={link}
                className="group bg-surface border border-border rounded-xl p-6 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-200"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-foreground font-bold text-base mb-2">
                  {title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-150">
                  Learn more
                  <ArrowRight
                    className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150"
                    aria-hidden="true"
                  />
                </span>
              </a>
            );
          })}
        </div>

        {/* Student starter guide banner */}
        <div className="bg-primary rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left content */}
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                {studentGuide.badge}
              </div>
              <h3 className="text-white font-bold text-2xl sm:text-3xl text-balance leading-tight mb-4">
                {studentGuide.headline}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {studentGuide.description}
              </p>
              <a
                href={studentGuide.buttonHref}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-lg transition-colors duration-150"
              >
                {studentGuide.buttonText}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Right checklist */}
            <div className="bg-[#111e2e] p-8 lg:p-12">
              <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">
                Quick-start checklist
              </h4>
              <ul className="flex flex-col gap-3">
                {studentGuide.checklist?.map((item, i) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={studentGuide.contactHref}
                className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-accent hover:text-white transition-colors duration-150"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                {studentGuide.contactLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
