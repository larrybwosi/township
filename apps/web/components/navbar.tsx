"use client";

import { useState, useEffect } from "react";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";

const navLinks = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Institutions",
    href: "#institutions",
    children: [
      { label: "Universities & Colleges", href: "#universities" },
      { label: "Hospitals & Clinics", href: "#hospitals" },
      { label: "Government Offices", href: "#government" },
    ],
  },
  {
    label: "Explore",
    href: "#places",
    children: [
      { label: "Dining & Restaurants", href: "#dining" },
      { label: "Shopping", href: "#shopping" },
      { label: "Parks & Recreation", href: "#parks" },
      { label: "Accommodation", href: "#accommodation" },
    ],
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Events",
    href: "#events",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-dark shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-lg tracking-tight">
                Township
              </span>
              <span className="text-white/50 text-[10px] uppercase tracking-widest font-medium">
                City Portal
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => handleDropdown(link.label)}
                    onBlur={() => setTimeout(() => setOpenDropdown(null), 150)}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors duration-150"
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-surface rounded-lg shadow-xl border border-border py-1 z-10">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-foreground-secondary hover:bg-primary-light hover:text-primary transition-colors duration-150"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors duration-150"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#guide"
              className="px-5 py-2 text-sm font-semibold bg-accent text-white rounded-md hover:bg-accent-hover transition-colors duration-150"
            >
              Visitor Guide
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-150"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-dark border-t border-white/10 transition-all duration-300 ease-in-out overflow-hidden ${
          mobileOpen
            ? "max-h-[500px] opacity-100 py-4"
            : "max-h-0 opacity-0 py-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => handleDropdown(link.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors duration-150"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {openDropdown === link.label && (
                      <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-accent/40 pl-3">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-sm text-white/60 hover:text-white transition-colors duration-150"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-white/10">
              <a
                href="#guide"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-2.5 text-sm font-semibold bg-accent text-white rounded-md hover:bg-accent-hover transition-colors duration-150"
              >
                Visitor Guide
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
