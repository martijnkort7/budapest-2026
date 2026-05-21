"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { FILTER_PILLS, VENUE_GROUPS, type VenueCategory } from "@/data/venues";
import { IconBurger, IconBeer, IconMartini, IconCamera, IconMapPin } from "./Icons";

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

  function setActiveWithHaptic(id: VenueCategory | "all") {
    if (id === active) return;
    try {
      navigator.vibrate?.(8);
    } catch {}
    setActive(id);
  }

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
              onClick={() => setActiveWithHaptic(pill.id)}
              className={`pill-press relative z-10 inline-flex min-h-11 items-center whitespace-nowrap rounded-pill border px-5 text-label-xs ${
                isActive
                  ? "border-transparent text-app"
                  : "border-border bg-card text-ink-soft"
              }`}
              style={{
                transition:
                  "color 220ms var(--ease-out-strong), transform 160ms var(--ease-out-strong)",
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

      <div key={active} className="flex flex-col gap-8">
        {visible.length === 0 ? (
          <div className="result-reveal flex flex-col items-center gap-2 rounded-tool border border-border bg-card px-6 py-10 text-center shadow-surface">
            <span className="text-display-md text-ink">Nog niets hier</span>
            <p className="max-w-[24ch] text-body-sm text-ink-soft">
              Tap een andere categorie hierboven.
            </p>
          </div>
        ) : (
          visible.map((group, groupIdx) => {
            const theme = CATEGORY_THEME[group.id];
            const Icon = theme.Icon;
            const venueBase = visible
              .slice(0, groupIdx)
              .reduce((acc, g) => acc + g.venues.length + 1, 0);
            return (
              <article key={group.id} className="flex flex-col gap-3">
                <header
                  className="stagger-item flex items-start gap-3"
                  style={{ "--i": venueBase } as React.CSSProperties}
                >
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
                  {group.venues.map((venue, idx) => {
                    const parenMatch = venue.name.match(/^(.*?)\s+\(([^)]+)\)\s*$/);
                    const mainName = parenMatch ? parenMatch[1].trim() : venue.name;
                    const subName = parenMatch ? parenMatch[2].trim() : null;
                    return (
                      <li
                        key={venue.name}
                        className={`stagger-item venue-press press-feedback relative flex flex-col gap-1.5 py-3.5 ${
                          idx === group.venues.length - 1
                            ? ""
                            : "border-b border-hairline-soft"
                        }`}
                        style={{
                          "--i": venueBase + idx + 1,
                          "--cat-color": theme.color,
                        } as React.CSSProperties}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <h4
                              className="text-display-sm text-ink"
                              style={{ textWrap: "balance" } as React.CSSProperties}
                            >
                              {mainName}
                              {subName && (
                                <span className="ml-1.5 text-body-sm font-sans normal-case tracking-normal text-ink-muted">
                                  ({subName})
                                </span>
                              )}
                            </h4>
                            {venue.mapsUrl && (
                              <a
                                href={venue.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="press-feedback shrink-0 text-ink-soft hover:text-ink transition-colors"
                                aria-label={`Open ${mainName} in Google Maps`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <IconMapPin size={18} />
                              </a>
                            )}
                          </div>
                          <span
                            aria-hidden="true"
                            className="text-label-xs shrink-0"
                            style={{ color: theme.color }}
                          >
                            0{idx + 1}
                          </span>
                        </div>
                        <p className="text-body-md text-ink-soft">{venue.blurb}</p>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
