import Image from "next/image";
import {
  Star,
  ArrowRight,
  UtensilsCrossed,
  ShoppingBag,
  TreePine,
  Hotel,
  Coffee,
  Music,
} from "lucide-react";
import { SanityPlace } from "../lib/sanity";
import { resolveImageUrl } from "../sanity/lib/image";

const categoryMapping = [
  {
    icon: UtensilsCrossed,
    label: "Dining",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  { icon: Coffee, label: "Cafes", color: "text-amber-600", bg: "bg-amber-50" },
  {
    icon: ShoppingBag,
    label: "Shopping",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: TreePine,
    label: "Parks",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  { icon: Hotel, label: "Stay", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Music, label: "Nightlife", color: "text-pink-600", bg: "bg-pink-50" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "fill-accent text-accent" : "text-gray-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Places({ initialData }: { initialData: SanityPlace[] }) {
  const places = initialData || [];

  if (!places || places.length === 0) {
    return <div className="py-20 bg-surface animate-pulse" />;
  }

  const featuredLarge = places.find((p) => p.span === "large") || places[0];
  const otherPlaces = places.filter((p) => p._id !== featuredLarge?._id);

  return (
    <section id="places" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              <span className="w-6 h-0.5 bg-accent" aria-hidden="true" />
              Explore Township
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight">
              Places worth visiting
            </h2>
            <p className="text-muted mt-3 max-w-xl text-base leading-relaxed text-pretty">
              Discover the best dining, shopping, parks, and entertainment that
              our town has to offer — handpicked for students and locals.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors duration-150"
          >
            See all places
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Category pills */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="list"
          aria-label="Place categories"
        >
          {categoryMapping.map(({ icon: Icon, label, color, bg }) => (
            <button
              key={label}
              role="listitem"
              className={`inline-flex items-center gap-2 px-4 py-2 ${bg} rounded-full text-sm font-medium ${color} border border-transparent hover:border-current/20 transition-all duration-150`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured large card */}
          {featuredLarge && (
            <article className="md:col-span-2 lg:col-span-2 group relative rounded-2xl overflow-hidden bg-background border border-border hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 min-h-[340px]">
              <Image
                src={resolveImageUrl(featuredLarge.image)}
                alt={featuredLarge.name}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,34,56,0.85) 0%, rgba(13,34,56,0.2) 60%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    <UtensilsCrossed className="w-3 h-3" aria-hidden="true" />
                    {featuredLarge.category}
                  </span>
                  {featuredLarge.openNow && (
                    <span className="inline-flex items-center gap-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-xs font-medium px-2.5 py-1 rounded-full">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        aria-hidden="true"
                      />
                      Open Now
                    </span>
                  )}
                </div>
                <h3 className="text-white font-bold text-xl mb-1 leading-tight">
                  {featuredLarge.name}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3 line-clamp-2">
                  {featuredLarge.desc}
                </p>
                <div className="flex items-center gap-3">
                  <StarRating rating={featuredLarge.rating} />
                  <span className="text-white font-semibold text-sm">
                    {featuredLarge.rating}
                  </span>
                  <span className="text-white/50 text-xs">
                    ({featuredLarge.reviews?.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Small cards */}
          {otherPlaces.slice(0, 5).map((place) => (
            <article
              key={place._id}
              className="group relative rounded-2xl overflow-hidden bg-background border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 min-h-[220px]"
            >
              <Image
                src={resolveImageUrl(place.image)}
                alt={place.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,34,56,0.90) 0%, rgba(13,34,56,0.25) 55%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {place.category}
                  </span>
                  {place.openNow && (
                    <span className="inline-flex items-center gap-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Open
                    </span>
                  )}
                </div>
                <h3 className="text-white font-bold text-sm leading-tight mb-1.5">
                  {place.name}
                </h3>
                <div className="flex items-center gap-2">
                  <StarRating rating={place.rating} />
                  <span className="text-white/70 text-xs">{place.rating}</span>
                  <span className="text-white/40 text-xs">
                    ({place.reviews})
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <a
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors duration-150 shadow-md shadow-(--color-primary)/20"
          >
            Explore All Places
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
