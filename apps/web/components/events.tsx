import { Calendar, MapPin, ArrowRight, Clock, Users } from "lucide-react";
import { SanityEvent } from "../lib/sanity";
import { resolveImageUrl } from "../sanity/lib/image";

const categoryColors: Record<string, string> = {
  Culture: "bg-pink-100 text-pink-700",
  Education: "bg-blue-100 text-blue-700",
  Community: "bg-emerald-100 text-emerald-700",
  Sport: "bg-orange-100 text-orange-700",
};

export default function Events({ initialData }: { initialData: SanityEvent[] }) {
  const events = initialData || [];

  if (!events || events.length === 0) {
    return <div className="py-20 bg-surface animate-pulse" />;
  }

  const featuredEvent = events.find((e) => e.featured) || events[0];
  const sideEvents = events.filter((e) => e._id !== featuredEvent?._id);

  return (
    <section id="events" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              <span className="w-6 h-0.5 bg-accent" aria-hidden="true" />
              Events & Activities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight">
              What&apos;s happening in Township
            </h2>
            <p className="text-muted mt-3 max-w-xl text-base leading-relaxed text-pretty">
              From cultural festivals to sports days — stay connected to the
              pulse of our community with the latest events calendar.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors duration-150"
          >
            View full calendar
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Events layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured event — large */}
          {featuredEvent && (
            <article className="lg:col-span-2 group bg-background border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="relative h-56 sm:h-72 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveImageUrl(featuredEvent.image)}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {featuredEvent.category && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[featuredEvent.category] || ""}`}
                    >
                      {featuredEvent.category}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-white">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-foreground font-bold text-xl leading-tight mb-2">
                  {featuredEvent.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-5">
                  {featuredEvent.desc}
                </p>
                <div className="flex flex-wrap gap-4 mb-5">
                  <div className="flex items-center gap-2 text-muted text-sm">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    {featuredEvent.date}
                  </div>
                  <div className="flex items-center gap-2 text-muted text-sm">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {featuredEvent.time}
                  </div>
                  <div className="flex items-center gap-2 text-muted text-sm">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    {featuredEvent.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted text-sm">
                    <Users className="w-4 h-4" aria-hidden="true" />
                    {featuredEvent.attendees} expected
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors duration-150"
                >
                  View Event
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          )}

          {/* Side events list */}
          <div className="flex flex-col gap-4">
            {sideEvents.slice(0, 3).map((event) => (
              <article
                key={event._id}
                className="group flex gap-4 bg-background border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveImageUrl(event.image)}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1.5 ${categoryColors[event.category] || ""}`}
                  >
                    {event.category}
                  </span>
                  <h3 className="text-foreground font-semibold text-sm leading-tight mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-muted text-xs">
                      <Calendar
                        className="w-3 h-3 shrink-0"
                        aria-hidden="true"
                      />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted text-xs">
                      <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <a
              href="#"
              className="flex items-center justify-center gap-2 py-3 border border-dashed border-border rounded-xl text-sm font-semibold text-muted hover:border-primary hover:text-primary transition-colors duration-150"
            >
              View all events
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
