import {
  Search,
  ArrowRight,
  GraduationCap,
  Building2,
  MapPin,
} from "lucide-react";

const quickLinks = [
  {
    icon: GraduationCap,
    label: "Student Guide",
    desc: "First time here? Start here.",
    href: "#institutions",
    accent: true,
  },
  {
    icon: Building2,
    label: "Institutions",
    desc: "Universities, hospitals & offices",
    href: "#institutions",
    accent: false,
  },
  {
    icon: MapPin,
    label: "Explore Places",
    desc: "Dining, parks & activities",
    href: "#places",
    accent: false,
  },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Welcome to Township"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80"
        alt="Aerial view of Township"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,34,56,0.92) 0%, rgba(26,58,92,0.80) 50%, rgba(13,34,56,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5"
        style={{ background: "var(--color-accent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-32 sm:pb-24 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
            <span
              className="w-2 h-2 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            <span className="text-white/80 text-xs font-medium uppercase tracking-widest">
              Official City Portal
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6">
            Welcome to <span className="text-accent">Township</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-2xl text-pretty">
            Whether you&apos;re a student arriving for the first time or a local
            looking to explore more — your complete guide to institutions,
            dining, services, and community life is right here.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search places, institutions, services..."
                className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-accent focus:bg-white/15 transition-colors duration-150 backdrop-blur-sm"
                aria-label="Search"
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold text-sm rounded-lg transition-colors duration-150 shrink-0"
              aria-label="Search"
            >
              Search
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Quick action cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quickLinks.map(({ icon: Icon, label, desc, href, accent }) => (
              <a
                key={label}
                href={href}
                className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                  accent
                    ? "bg-accent border-accent hover:bg-accent-hover"
                    : "bg-white/10 border-white/15 hover:bg-white/15 hover:border-white/30"
                } backdrop-blur-sm`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    accent ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    {label}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5 leading-tight">
                    {desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
            <div
              className="w-1 h-2 bg-accent rounded-full animate-bounce"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
