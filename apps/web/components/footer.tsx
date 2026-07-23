"use client";

import { MapPin, Phone, Mail, Globe, MessageCircle, Camera, Play, ArrowRight } from "lucide-react";

const footerLinks = {
  "Explore": [
    { label: "About Township", href: "#about" },
    { label: "Places of Interest", href: "#places" },
    { label: "Events Calendar", href: "#events" },
    { label: "Dining & Restaurants", href: "#" },
    { label: "Parks & Recreation", href: "#" },
  ],
  "Institutions": [
    { label: "Universities & Colleges", href: "#institutions" },
    { label: "Hospitals & Clinics", href: "#institutions" },
    { label: "Government Offices", href: "#institutions" },
    { label: "Schools & Academies", href: "#" },
    { label: "Research Centres", href: "#" },
  ],
  "Services": [
    { label: "Public Transport", href: "#services" },
    { label: "Free Wi-Fi Zones", href: "#services" },
    { label: "Libraries", href: "#services" },
    { label: "Safety & Emergency", href: "#services" },
    { label: "Waste & Recycling", href: "#services" },
  ],
  "For Students": [
    { label: "Visitor Guide", href: "#guide" },
    { label: "Find Accommodation", href: "#" },
    { label: "Student Discounts", href: "#" },
    { label: "Transport Card", href: "#" },
    { label: "Register at a Clinic", href: "#" },
  ],
};

const socials = [
  { icon: Globe, label: "Facebook", href: "#" },
  { icon: MessageCircle, label: "Twitter / X", href: "#" },
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Play, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-dark" aria-label="Site footer">
      {/* Newsletter banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-2">
                Stay informed about Township
              </h3>
              <p className="text-white/50 text-sm max-w-md leading-relaxed">
                Subscribe to our newsletter for weekly updates on events, new services,
                and important community announcements.
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-[400px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent transition-colors duration-150"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-lg transition-colors duration-150 shrink-0"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-lg tracking-tight">Township</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest font-medium">City Portal</span>
              </div>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Your official guide to everything Township — designed for students, locals, and visitors alike.
            </p>
            {/* Contact */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+15552000001"
                className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors duration-150"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                +1 (555) 200-0001
              </a>
              <a
                href="mailto:info@township.gov"
                className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors duration-150"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                info@township.gov
              </a>
              <div className="flex items-start gap-2.5 text-white/50 text-sm">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                City Hall Square, Township Centre
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
                {section}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-150"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Township City Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:bg-accent hover:text-white transition-all duration-150"
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-150">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-150">
              Terms of Use
            </a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-150">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
