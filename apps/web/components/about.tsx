import { Users, HelpCircle } from "lucide-react";
import * as Icons from "lucide-react";
import { SanityHomeAbout } from "../lib/sanity";
import { resolveImageUrl } from "../sanity/lib/image";

function getIcon(iconName: string): React.ElementType {
  const Icon = (Icons as unknown as Record<string, React.ElementType>)[iconName];
  return Icon || HelpCircle;
}

export default function About({ initialData }: { initialData: SanityHomeAbout }) {
  const data = initialData;

  if (!data) {
    return <div className="py-20 bg-surface animate-pulse" />;
  }

  return (
    <section id="about" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-start mb-12">
          {data.badge && (
            <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              <span className="w-6 h-0.5 bg-accent" aria-hidden="true" />
              {data.badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight max-w-2xl">
            {data.title}
          </h2>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: Text */}
          <div>
            {data.paragraphs?.map((p, i) => (
              <p key={i} className="text-muted text-base leading-relaxed mb-6">
                {p}
              </p>
            ))}

            {/* Highlights */}
            <div className="flex flex-col gap-5">
              {data.highlights?.map(({ iconName, title, desc }) => {
                const Icon = getIcon(iconName);
                return (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold text-sm mb-1">
                        {title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {data.buttonText && (
              <a
                href={data.buttonHref}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors duration-150"
              >
                {data.buttonText}
              </a>
            )}
          </div>

          {/* Right: Images */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden aspect-4/3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImageUrl(data.imageUrl)}
                alt="Township town centre"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating mini card */}
            {data.floatingCardValue && (
              <div className="absolute -bottom-5 -left-5 bg-surface border border-border rounded-xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-foreground font-bold text-lg leading-none">
                    {data.floatingCardValue}
                  </p>
                  <p className="text-muted text-xs mt-0.5">
                    {data.floatingCardLabel}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data.stats?.map(({ iconName, value, label, desc }) => {
            const Icon = getIcon(iconName);
            return (
              <div
                key={label}
                className="relative bg-background border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-200">
                  <Icon
                    className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-200"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground leading-none mb-1">
                  {value}
                </p>
                <p className="text-foreground-secondary font-semibold text-sm">
                  {label}
                </p>
                <p className="text-muted text-xs mt-0.5">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
