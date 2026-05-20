"use client";

import { useMemo, useState } from "react";
import { SQUAD } from "@/data/squad";
import { LIMERICKS } from "@/data/limericks";

export function Limericks() {
  const [selectedBoy, setSelectedBoy] = useState<string>(SQUAD[0].name);

  const limericksForBoy = useMemo(
    () => LIMERICKS.filter((l) => l.boy === selectedBoy),
    [selectedBoy],
  );

  const selectedMember = SQUAD.find((m) => m.name === selectedBoy) ?? SQUAD[0];

  function pickBoy(name: string) {
    if (name === selectedBoy) return;
    try {
      navigator.vibrate?.(8);
    } catch {}
    setSelectedBoy(name);
  }

  return (
    <div className="rounded-tool border border-border bg-card px-5 pt-6 pb-6 shadow-card">
      <span className="text-label-xs text-hu-red">De Boys, vereeuwigd</span>
      <h2 className="mt-1 text-display-lg text-ink">Het Limerick-Boek</h2>
      <p className="mt-2 text-body-sm text-ink-soft">
        Veertien verzen, twee per boy. Tik een initial, lees de schade.
      </p>

      <div
        role="tablist"
        aria-label="Kies een boy"
        className="mt-5 flex flex-wrap gap-2"
      >
        {SQUAD.map((m) => {
          const isActive = m.name === selectedBoy;
          return (
            <button
              key={m.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => pickBoy(m.name)}
              className="press-feedback inline-flex min-h-11 items-center gap-2 rounded-pill border bg-bg px-3 text-label-xs"
              style={{
                borderColor: isActive ? m.accentColor : "var(--color-border)",
                color: isActive ? "var(--color-ink)" : "var(--color-ink-soft)",
                boxShadow: isActive
                  ? `0 0 18px -6px ${m.accentColor}`
                  : undefined,
              }}
            >
              <span
                aria-hidden="true"
                className="grid size-6 place-items-center rounded-full text-[11px] font-semibold text-app"
                style={{ backgroundColor: m.accentColor }}
              >
                {m.initial}
              </span>
              <span>{m.name.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      <section
        key={selectedBoy}
        aria-live="polite"
        className="tab-enter mt-5 flex flex-col gap-4"
      >
        <div className="flex items-baseline justify-between gap-3">
          <span
            className="text-label-xs"
            style={{ color: selectedMember.accentColor }}
          >
            {selectedMember.alias}
          </span>
          <span className="text-label-xs text-ink-muted">2 verzen</span>
        </div>

        {limericksForBoy.map((lim, idx) => (
          <article
            key={`${selectedBoy}-${idx}`}
            className={`stagger-item flex flex-col gap-1 ${
              idx === limericksForBoy.length - 1
                ? ""
                : "border-b border-hairline-soft pb-4"
            }`}
            style={{ "--i": idx } as React.CSSProperties}
          >
            {lim.lines.map((line, lineIdx) => {
              const isShortLine = lineIdx === 2 || lineIdx === 3;
              return (
                <p
                  key={lineIdx}
                  className={
                    isShortLine
                      ? "pl-5 text-body-sm italic text-ink-soft"
                      : "text-body-md text-ink"
                  }
                >
                  {line}
                </p>
              );
            })}
          </article>
        ))}
      </section>
    </div>
  );
}
