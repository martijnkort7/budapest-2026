"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { FILTER_PILLS, VENUE_GROUPS, type VenueCategory } from "@/data/venues";
import { IconBurger, IconBeer, IconMartini, IconCamera } from "./Icons";

const CATEGORY_THEME: Record<VenueCategory, { color: string; bg: string; Icon: typeof IconBurger; label: string }> = {
  food: {
    color: "var(--color-ink)",
    bg: "rgb(255 255 255 / 0.08)",
    Icon: IconBurger,
    label: "Food",
  },
  craft: {
    color: "var(--color-gold)",
    bg: "rgb(245 197 24 / 0.12)",
    Icon: IconBeer,
    label: "Craft",
  },
  ruin: {
    color: "var(--color-hu-red)",
    bg: "rgb(206 17 38 / 0.14)",
    Icon: IconMartini,
    label: "Ruin",
  },
  culture: {
    color: "var(--color-hu-green)",
    bg: "rgb(0 135 81 / 0.14)",
    Icon: IconCamera,
    label: "Cultuur",
  },
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
  const totalVenues = visible.reduce((sum, g) => sum + g.venues.length, 0);

  return (
    <section className="px-4 pt-3 pb-4">
      <div
        ref={railRef}
        className="no-scrollbar relative -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-11 rounded-pill bg-ink will-change-transform"
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
              className={`relative z-10 inline-flex min-h-11 items-center whitespace-nowrap rounded-pill border px-5 text-label-xs ${
                isActive
                  ? "border-transparent text-app"
                  : "border-border bg-card text-ink-soft"
              }`}
              style={{
                transition: "color 220ms var(--ease-out-strong)",
              }}
              aria-pressed={isActive}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      <p className="mb-5 px-1 text-label-xs text-ink-muted">
        {totalVenues} {totalVenues === 1 ? "spot" : "spots"} ·{" "}
        {visible.length === 1 ? visible[0].title : "Alles op een rij"}
      </p>

      <div className="flex flex-col gap-8">
        {visible.map((group) => {
          const theme = CATEGORY_THEME[group.id];
          const Icon = theme.Icon;
          return (
            <article key={group.id} className="flex flex-col gap-3">
              <header className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-card"
                  style={{ backgroundColor: theme.bg, color: theme.color }}
                >
                  <Icon size={22} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span
                    className="text-label-xs"
                    style={{ color: theme.color }}
                  >
                    {theme.label}
                  </span>
                  <h3
                    className="mt-0.5 text-display-md text-ink"
                    style={{ textWrap: "balance" } as React.CSSProperties}
                  >
                    {group.title}
                  </h3>
                  <p className="mt-1 text-body-sm text-ink-soft">{group.blurb}</p>
                </div>
              </header>

              <ul className="flex flex-col">
                {group.venues.map((venue, idx) => (
                  <li
                    key={venue.name}
                    className={`flex flex-col gap-1.5 py-3.5 ${
                      idx === group.venues.length - 1
                        ? ""
                        : "border-b border-hairline-soft"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4
                        className="text-display-sm text-ink"
                        style={{ textWrap: "balance" } as React.CSSProperties}
                      >
                        {venue.name}
                      </h4>
                      <span
                        aria-hidden="true"
                        className="text-label-xs"
                        style={{ color: theme.color }}
                      >
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="text-body-md text-ink-soft">{venue.blurb}</p>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
