"use client";

import { useRef, useState } from "react";
import { FACTS } from "@/data/facts";
import {
  IconClose,
  IconBeer,
  IconSatchel,
  IconCompass,
  IconMapPin,
  IconSpark,
  IconCheck,
} from "./Icons";

const ICON_MAP: Record<string, typeof IconBeer> = {
  ban: IconClose,
  whiskey: IconBeer,
  house: IconSatchel,
  city: IconCompass,
  droplet: IconMapPin,
  trophy: IconSpark,
};

const ACCENT: Record<string, string> = {
  ban: "var(--color-hu-red)",
  whiskey: "var(--color-gold)",
  house: "var(--color-ink)",
  city: "var(--color-hu-green)",
  droplet: "var(--color-hu-green)",
  trophy: "var(--color-gold)",
};

export function FactsCarousel() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(1);

  function onScroll() {
    const rail = railRef.current;
    if (!rail) return;
    const cardWidth = rail.scrollWidth / FACTS.length;
    const idx = Math.round(rail.scrollLeft / cardWidth) + 1;
    if (idx !== position && idx >= 1 && idx <= FACTS.length) {
      setPosition(idx);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={railRef}
        onScroll={onScroll}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1"
      >
        {FACTS.map((fact) => {
          const Icon = ICON_MAP[fact.iconName] ?? IconCheck;
          const accent = ACCENT[fact.iconName] ?? "var(--color-gold)";
          return (
            <article
              key={fact.title}
              className="flex min-w-[270px] snap-center flex-col gap-2 rounded-tool border border-border bg-card p-4 shadow-surface"
            >
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-card"
                style={{
                  backgroundColor: `color-mix(in oklch, ${accent} 14%, transparent)`,
                  color: accent,
                }}
              >
                <Icon size={20} />
              </span>
              <h3 className="text-display-md text-ink">{fact.title}</h3>
              <p className="text-body-sm text-ink-soft">{fact.body}</p>
            </article>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 px-1">
        <span className="text-label-xs text-ink-muted tabular-nums">
          {String(position).padStart(2, "0")} / {String(FACTS.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1">
          {FACTS.map((_, idx) => (
            <span
              key={idx}
              aria-hidden="true"
              className="h-1 rounded-pill bg-border transition-all"
              style={{
                width: position === idx + 1 ? 18 : 6,
                backgroundColor:
                  position === idx + 1
                    ? "var(--color-gold)"
                    : "var(--color-border)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
