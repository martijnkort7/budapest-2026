import { FACTS } from "@/data/facts";

const ICON: Record<string, string> = {
  ban: "🚫",
  whiskey: "🥃",
  house: "🏚️",
  city: "🌆",
  droplet: "💧",
};

export function FactsCarousel() {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-2">
      {FACTS.map((fact) => (
        <article
          key={fact.title}
          className="min-w-[270px] snap-center rounded-card border border-border bg-gradient-to-br from-card to-bg p-4 shadow-ambient"
        >
          <div className="text-xl text-gold" aria-hidden="true">
            {ICON[fact.iconName] ?? "💡"}
          </div>
          <h3 className="mt-2 font-display text-lg uppercase tracking-wide text-ink">
            {fact.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            {fact.body}
          </p>
        </article>
      ))}
    </div>
  );
}
