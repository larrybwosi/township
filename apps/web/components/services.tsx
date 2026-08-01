import {
  Bus,
  Wifi,
  ShieldCheck,
  BookOpen,
  Trash2,
  Droplets,
  Phone,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Bus,
    title: "Public Transport",
    desc: "Bus routes, timetables, student travel cards, and real-time updates across the township network.",
    link: "#",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi Zones",
    desc: "Over 40 free public Wi-Fi hotspots across parks, libraries, and public squares in Township.",
    link: "#",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Emergency",
    desc: "Local police contacts, emergency protocols, safe walk initiatives, and safety resources for students.",
    link: "#",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: BookOpen,
    title: "Libraries & Learning",
    desc: "Access to public libraries, online learning portals, and academic resources available to all residents.",
    link: "#",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Trash2,
    title: "Waste & Recycling",
    desc: "Collection schedules, recycling drop points, and green initiative programmes for a cleaner town.",
    link: "#",
    color: "bg-lime-50 text-lime-700",
  },
  {
    icon: Droplets,
    title: "Water & Utilities",
    desc: "Water service contacts, billing support, and infrastructure maintenance reporting for residents.",
    link: "#",
    color: "bg-cyan-50 text-cyan-600",
  },
];

const studentResources = [
  "Find student accommodation near campus",
  "Open bank accounts as a new resident",
  "Register at a local health clinic",
  "Get your transport card",
  "Access internet & connectivity services",
  "Report noise or neighbourhood issues",
];

export default function Services() {
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
          {services.map(({ icon: Icon, title, desc, link, color }) => (
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
          ))}
        </div>

        {/* Student starter guide banner */}
        <div className="bg-primary rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left content */}
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                New Student Guide
              </div>
              <h3 className="text-white font-bold text-2xl sm:text-3xl text-balance leading-tight mb-4">
                Just arrived in Township? Here&apos;s your starter checklist.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                We know settling into a new place can be overwhelming. This
                guide walks you through the essential steps to get set up, stay
                safe, and make the most of your time here.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-lg transition-colors duration-150"
              >
                View Starter Guide
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Right checklist */}
            <div className="bg-dark-surface p-8 lg:p-12">
              <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">
                Quick-start checklist
              </h4>
              <ul className="flex flex-col gap-3">
                {studentResources.map((item, i) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-accent hover:text-white transition-colors duration-150"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                Contact the Welcome Desk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
