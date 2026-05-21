"use client";

import { useEffect, useRef, useState } from "react";
import { IconArrowSwap } from "./Icons";

type Props = {
  rate: number;
  isFallback: boolean;
};

type Chip = { side: "eur" | "huf"; amount: number; label: string };

const CHIPS: Chip[] = [
  { side: "eur", amount: 10, label: "€10" },
  { side: "eur", amount: 20, label: "€20" },
  { side: "huf", amount: 1000, label: "1.000 Ft" },
  { side: "huf", amount: 5000, label: "5.000 Ft" },
];

const CROSS_DEBOUNCE_MS = 120;

type Side = "eur" | "huf";

const eurFmt = new Intl.NumberFormat("nl-NL", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const hufFmt = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 });

function parseNL(raw: string): number {
  const cleaned = raw.replace(/\s|\./g, "").replace(",", ".");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : NaN;
}

export function CurrencyConverter({ rate, isFallback }: Props) {
  const [eur, setEur] = useState("");
  const [huf, setHuf] = useState("");
  const [activeSide, setActiveSide] = useState<Side>("eur");
  const [flashSide, setFlashSide] = useState<Side | null>(null);
  const [swapSpin, setSwapSpin] = useState(0);
  const debounceTimer = useRef<number | null>(null);
  const flashTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    };
  }, []);

  function triggerCrossFlash(side: Side) {
    setFlashSide(side);
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlashSide(null), 160);
  }

  function setFromEur(value: string, instant = false) {
    setEur(value);
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    const update = () => {
      const parsed = parseNL(value);
      if (Number.isFinite(parsed)) {
        setHuf(hufFmt.format(Math.round(parsed * rate)));
      } else {
        setHuf("");
      }
      triggerCrossFlash("huf");
    };
    if (instant) update();
    else debounceTimer.current = window.setTimeout(update, CROSS_DEBOUNCE_MS);
  }

  function setFromHuf(value: string, instant = false) {
    setHuf(value);
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    const update = () => {
      const parsed = parseNL(value);
      if (Number.isFinite(parsed)) {
        setEur(eurFmt.format(parsed / rate));
      } else {
        setEur("");
      }
      triggerCrossFlash("eur");
    };
    if (instant) update();
    else debounceTimer.current = window.setTimeout(update, CROSS_DEBOUNCE_MS);
  }

  function tapChip(chip: Chip) {
    try {
      navigator.vibrate?.(8);
    } catch {}
    setActiveSide(chip.side);
    if (chip.side === "eur") {
      setFromEur(String(chip.amount), true);
    } else {
      setFromHuf(hufFmt.format(chip.amount), true);
    }
  }

  function tapSwap() {
    try {
      navigator.vibrate?.(10);
    } catch {}
    setSwapSpin((n) => n + 180);
    setActiveSide((s) => (s === "eur" ? "huf" : "eur"));
  }

  function reformatOnBlur(side: Side) {
    if (side === "eur") {
      const parsed = parseNL(eur);
      if (Number.isFinite(parsed)) setEur(eurFmt.format(parsed));
    } else {
      const parsed = parseNL(huf);
      if (Number.isFinite(parsed)) setHuf(hufFmt.format(parsed));
    }
  }

  const eurActive = activeSide === "eur";
  const hufActive = activeSide === "huf";

  return (
    <div className="rounded-tool border border-border bg-card px-5 pt-6 pb-6 shadow-card">
      <span className="text-label-xs text-hu-green">HUF-Hustler Pro</span>
      <h2 className="mt-1 text-display-lg text-ink">Wisselkoers</h2>

      <div
        key={rate}
        className="mt-2 flex items-center justify-between gap-3 rate-pulse"
      >
        <span className="text-body-md text-ink-soft tabular-nums">
          1 € = {rate.toFixed(2)} Ft
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-pill border border-border-soft px-2 py-0.5 text-label-xs ${
            isFallback ? "text-ink-muted" : "text-hu-green"
          }`}
        >
          <span
            aria-hidden="true"
            className={`inline-block size-1.5 rounded-full ${
              isFallback ? "" : "pulse-soft"
            }`}
            style={{
              backgroundColor: isFallback
                ? "var(--color-ink-muted)"
                : "var(--color-hu-green)",
            }}
          />
          {isFallback ? "Cached" : "Live"}
        </span>
      </div>

      <div className="mt-5 flex items-stretch gap-2 rounded-tool border border-border-soft bg-bg p-2">
        <label
          onClick={() => setActiveSide("eur")}
          className={`flex-1 rounded-card border px-3 py-2.5 transition-all duration-150 ${
            eurActive
              ? "border-gold/40 bg-card"
              : "border-transparent opacity-60"
          } ${flashSide === "eur" ? "cross-flash" : ""}`}
        >
          <span className="block text-label-xs text-ink-muted">
            Echte Euro&apos;s €
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={eur}
            onFocus={() => setActiveSide("eur")}
            onChange={(e) => setFromEur(e.target.value)}
            onBlur={() => reformatOnBlur("eur")}
            placeholder="0"
            aria-label="Bedrag in euro's"
            className="w-full bg-transparent text-display-md text-ink tabular-nums outline-none placeholder:text-ink-muted/50"
          />
        </label>

        <button
          type="button"
          onClick={tapSwap}
          aria-label="Wissel actieve valuta"
          className="press-feedback grid size-10 shrink-0 self-center place-items-center rounded-pill border border-border bg-card text-ink-soft"
        >
          <span
            className="inline-flex transition-transform duration-300"
            style={{
              transform: `rotate(${swapSpin}deg)`,
              transitionTimingFunction: "var(--ease-out-strong)",
            }}
          >
            <IconArrowSwap size={18} />
          </span>
        </button>

        <label
          onClick={() => setActiveSide("huf")}
          className={`flex-1 rounded-card border px-3 py-2.5 text-right transition-all duration-150 ${
            hufActive
              ? "border-gold/40 bg-card"
              : "border-transparent opacity-60"
          } ${flashSide === "huf" ? "cross-flash" : ""}`}
        >
          <span className="block text-label-xs text-ink-muted">
            Monopoly-poen Ft
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={huf}
            onFocus={() => setActiveSide("huf")}
            onChange={(e) => setFromHuf(e.target.value)}
            onBlur={() => reformatOnBlur("huf")}
            placeholder="0"
            aria-label="Bedrag in Hongaarse forint"
            className="w-full bg-transparent text-right text-display-md text-ink tabular-nums outline-none placeholder:text-ink-muted/50"
          />
        </label>
      </div>

      <div className="mt-4 flex gap-2">
        {CHIPS.map((chip) => (
          <button
            key={`${chip.side}-${chip.amount}`}
            type="button"
            onClick={() => tapChip(chip)}
            className="press-feedback inline-flex min-h-10 flex-1 items-center justify-center rounded-pill border border-border bg-card px-2 text-label-xs text-ink-soft hover:text-ink"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
