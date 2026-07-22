import Image from "next/image";
import { Users, Building, MapPin, Calendar, TrendingUp, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "120,000+",
    label: "Residents",
    desc: "Growing community",
  },
  {
    icon: Building,
    value: "14",
    label: "Institutions",
    desc: "Universities & colleges",
  },
  {
    icon: MapPin,
    value: "60+",
    label: "Venues",
    desc: "Places to discover",
  },
  {
    icon: Calendar,
    value: "200+",
    label: "Events/Year",
    desc: "Year-round activities",
  },
];

const highlights = [
  {
    icon: TrendingUp,
    title: "Fastest-Growing Student Hub",
    desc: "Over 30,000 students from across the region choose Township as their academic home each year.",
  },
  {
    icon: Award,
    title: "Award-Winning Infrastructure",
    desc: "Recognised for its public transport, connectivity, and modern civic facilities supporting daily life.",
  },
  {
    icon: Building,
    title: "Economic & Cultural Centre",
    desc: "A vibrant mix of businesses, markets, arts, and traditions that make our town uniquely alive.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col items-start mb-12">
          <span className="inline-flex items-center gap-2 text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-3">
            <span className="w-6 h-0.5 bg-[var(--color-accent)]" aria-hidden="true" />
            About Our Town
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] text-balance leading-tight max-w-2xl">
            A town built for people — locals and visitors alike
          </h2>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: Text */}
          <div>
            <p className="text-[var(--color-muted)] text-base leading-relaxed mb-6">
              Township is more than a place — it&apos;s a living community shaped by
              decades of growth, culture, and collective ambition. Home to leading
              universities, bustling markets, top healthcare facilities, and a rich
              calendar of cultural events, our town has become a destination for
              students, professionals, and families.
            </p>
            <p className="text-[var(--color-muted)] text-base leading-relaxed mb-8">
              Whether you&apos;re enrolling at one of our institutions, setting up home
              for the first time, or simply exploring — this portal is your front door
              to everything Township has to offer.
            </p>

            {/* Highlights */}
            <div className="flex flex-col gap-5">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[var(--color-foreground)] font-semibold text-sm mb-1">
                      {title}
                    </h3>
                    <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#institutions"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors duration-150"
            >
              Explore Institutions
            </a>
          </div>

          {/* Right: Images */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Township town centre aerial view"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating mini card */}
            <div className="absolute -bottom-5 -left-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[var(--color-foreground)] font-bold text-lg leading-none">
                  30,000+
                </p>
                <p className="text-[var(--color-muted)] text-xs mt-0.5">
                  Students enrolled annually
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label, desc }) => (
            <div
              key={label}
              className="relative bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)] transition-colors duration-200">
                <Icon className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white transition-colors duration-200" aria-hidden="true" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[var(--color-foreground)] leading-none mb-1">
                {value}
              </p>
              <p className="text-[var(--color-foreground-secondary)] font-semibold text-sm">
                {label}
              </p>
              <p className="text-[var(--color-muted)] text-xs mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
