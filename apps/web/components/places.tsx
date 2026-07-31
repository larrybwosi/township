import { Star, ArrowRight, UtensilsCrossed, ShoppingBag, TreePine, Hotel, Coffee, Music } from "lucide-react";

const categories = [
  { icon: UtensilsCrossed, label: "Dining", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Coffee, label: "Cafes", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: ShoppingBag, label: "Shopping", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: TreePine, label: "Parks", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Hotel, label: "Stay", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Music, label: "Nightlife", color: "text-pink-600", bg: "bg-pink-50" },
];

const places = [
  {
    id: 1,
    name: "The Central Market",
    category: "Dining",
    categoryIcon: UtensilsCrossed,
    rating: 4.8,
    reviews: 1240,
    desc: "A vibrant open-air market at the heart of town, offering fresh produce, street food, and artisan goods from local vendors.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    tags: ["Street Food", "Local Produce", "Artisan"],
    openNow: true,
    span: "large",
  },
  {
    id: 2,
    name: "Riverside Walk & Park",
    category: "Parks",
    categoryIcon: TreePine,
    rating: 4.9,
    reviews: 890,
    desc: "A beautiful riverside green space perfect for morning runs, picnics, and weekend relaxation.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    tags: ["Outdoor", "Family-Friendly", "Free"],
    openNow: true,
    span: "small",
  },
  {
    id: 3,
    name: "Township Mall",
    category: "Shopping",
    categoryIcon: ShoppingBag,
    rating: 4.5,
    reviews: 2100,
    desc: "The region's premier shopping destination with over 150 stores, a food court, and entertainment facilities.",
    image: "https://images.unsplash.com/photo-1567449303078-57ad995bd17a?w=600&q=80",
    tags: ["Shopping", "Food Court", "Entertainment"],
    openNow: true,
    span: "small",
  },
  {
    id: 4,
    name: "Brewed — Specialty Coffee",
    category: "Cafes",
    categoryIcon: Coffee,
    rating: 4.7,
    reviews: 620,
    desc: "A student favourite for its single-origin brews, strong Wi-Fi, and calm working atmosphere open from early morning.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
    tags: ["Coffee", "Wi-Fi", "Study Spot"],
    openNow: true,
    span: "small",
  },
  {
    id: 5,
    name: "The Grand Township Hotel",
    category: "Stay",
    categoryIcon: Hotel,
    rating: 4.6,
    reviews: 450,
    desc: "Elegant accommodation steps from the university campus and town centre, ideal for visiting families and academic guests.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    tags: ["4-Star", "Conference Rooms", "Family"],
    openNow: false,
    span: "small",
  },
  {
    id: 6,
    name: "Culture & Arts Quarter",
    category: "Nightlife",
    categoryIcon: Music,
    rating: 4.6,
    reviews: 380,
    desc: "An after-dark hub of live music venues, independent cinemas, bars, and pop-up events that keep Township buzzing.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    tags: ["Live Music", "Cinema", "Bars"],
    openNow: true,
    span: "small",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
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

export default function Places() {
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
              Discover the best dining, shopping, parks, and entertainment that our
              town has to offer — handpicked for students and locals.
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
        <div className="flex flex-wrap gap-2 mb-10" role="list" aria-label="Place categories">
          {categories.map(({ icon: Icon, label, color, bg }) => (
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
          {places[0] && (
            <article className="md:col-span-2 lg:col-span-2 group relative rounded-2xl overflow-hidden bg-background border border-border hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 min-h-[340px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={places[0].image}
                alt={places[0].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(13,34,56,0.85) 0%, rgba(13,34,56,0.2) 60%, transparent 100%)" }}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    <UtensilsCrossed className="w-3 h-3" aria-hidden="true" />
                    {places[0].category}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    Open Now
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl mb-1 leading-tight">
                  {places[0].name}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3 line-clamp-2">
                  {places[0].desc}
                </p>
                <div className="flex items-center gap-3">
                  <StarRating rating={places[0].rating} />
                  <span className="text-white font-semibold text-sm">{places[0].rating}</span>
                  <span className="text-white/50 text-xs">({places[0].reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
            </article>
          )}

          {/* Small cards */}
          {places.slice(1, 6).map((place) => (
            <article
              key={place.id}
              className="group relative rounded-2xl overflow-hidden bg-background border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 min-h-[220px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={place.image}
                alt={place.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(13,34,56,0.90) 0%, rgba(13,34,56,0.25) 55%, transparent 100%)" }}
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
                  <span className="text-white/40 text-xs">({place.reviews})</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <a
            href="#"
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
