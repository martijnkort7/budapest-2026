"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { FILTER_PILLS, VENUE_GROUPS, type VenueCategory } from "@/data/venues";

const ICON: Record<string, string> = {
  burger: "🍔",
  beer: "🍺",
  martini: "🍸",
  camera: "📸",
};

export function ExploreTab() {
  const [active, setActive] = useState<VenueCategory | "all">("all");
  const railRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ x: 0, w: 0, ready: false });

  useLayoutEffect(() => {
    const btn = pillRefs.current.get(active);
    const rail = railRef.current;
    if (!btn || !rail) return;
    const btnRect = btn.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();
    setIndicator({
      x: btnRect.left - railRect.left + rail.scrollLeft,
      w: btnRect.width,
      ready: true,
    });
  }, [active]);

  const visible = VENUE_GROUPS.filter(
    (g) => active === "all" || g.id === active,
  );

  return (
    <section className="px-4 pt-2 pb-4">
      <div
        ref={railRef}
        className="no-scrollbar relative -mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-2"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-8 rounded-pill bg-ink will-change-transform"
          style={{
            transform: `translateX(${indicator.x}px)`,
            width: `${indicator.w}px`,
            opacity: indicator.ready ? 1 : 0,
            transition:
              "transform 380ms var(--ease-drawer), width 380ms var(--ease-drawer), opacity 180ms ease",
          }}
        />
        {FILTER_PILLS.map((pill) => {
          const isActive = pill.id === active;
          return (
            <button
              key={pill.id}
              ref={(el) => {
                if (el) pillRefs.current.set(pill.id, el);
                else pillRefs.current.delete(pill.id);
              }}
              type="button"
              onClick={() => setActive(pill.id)}
              className={`relative z-10 whitespace-nowrap rounded-pill border px-4 py-1.5 text-sm font-semibold ${
                isActive
                  ? "border-transparent text-app"
                  : "border-border bg-card text-ink"
              }`}
              style={{
                transition: "color 220ms var(--ease-out-strong)",
              }}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {visible.map((group) => (
          <article
            key={group.id}
            className="rounded-card border border-border bg-card p-4 shadow-ambient"
          >
            <h3 className="flex items-center gap-2 font-display text-xl uppercase tracking-wide text-ink">
              <span aria-hidden="true" className="text-gold">
                {ICON[group.iconName] ?? "📍"}
              </span>
              {group.title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">
              {group.blurb}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {group.venues.map((venue, idx) => (
                <li
                  key={venue.name}
                  className="rounded-card border-l-2 border-gold bg-bg px-3 py-2.5"
                >
                  <div className="text-sm font-semibold text-ink">
                    {idx + 1}. {venue.name}
                  </div>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                    {venue.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
