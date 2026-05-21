"use client";

import { useEffect, useRef, useState } from "react";
import { IconArrowSwap } from "./Icons";

type Props = {
  rate: number;
  isFallback: boolean;
};

const EUR_CHIPS = [5, 10, 20, 50];
const HUF_CHIPS = [500, 2000, 5000];
const CROSS_DEBOUNCE_MS = 120;

type Side = "eur" | "huf" | null;

export function CurrencyConverter({ rate, isFallback }: Props) {
  const [eur, setEur] = useState("");
  const [huf, setHuf] = useState("");
  const [activeSide, setActiveSide] = useState<Side>(null);
  const [flashSide, setFlashSide] = useState<Side>(null);
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
    setActiveSide("eur");
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    const update = () => {
      const parsed = parseFloat(value);
      if (Number.isFinite(parsed) && parsed >= 0) {
        setHuf(String(Math.round(parsed * rate)));
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
    setActiveSide("huf");
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    const update = () => {
      const parsed = parseFloat(value);
      if (Number.isFinite(parsed) && parsed >= 0) {
        setEur((parsed / rate).toFixed(2));
      } else {
        setEur("");
      }
      triggerCrossFlash("eur");
    };
    if (instant) update();
    else debounceTimer.current = window.setTimeout(update, CROSS_DEBOUNCE_MS);
  }

  function tapChipEur(amount: number) {
    try {
      navigator.vibrate?.(8);
    } catch {}
    setFromEur(String(amount), true);
  }

  function tapChipHuf(amount: number) {
    try {
      navigator.vibrate?.(8);
    } catch {}
    setFromHuf(String(amount), true);
  }

  return (
    <div className="rounded-tool border border-border bg-card px-5 pt-6 pb-6 shadow-card">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <span className="text-label-xs text-hu-green">HUF-Hustler Pro</span>
          <h2 className="mt-1 text-display-lg text-ink">Wisselkoers</h2>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-body-sm text-ink-soft tabular-nums">
            1 € = {rate.toFixed(2)} HUF
          </span>
          <span
            className={`mt-0.5 inline-flex items-center gap-1 text-label-xs ${
              isFallback ? "text-ink-muted" : "text-hu-green"
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-block size-2 rounded-full ${
                isFallback ? "pulse-soft" : ""
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
      </div>

      <div className="mt-5 flex items-stretch gap-2 rounded-tool border border-border-soft bg-bg p-2">
        <label
          className={`flex-1 rounded-card px-3 py-2.5 transition-colors duration-150 focus-within:bg-card ${
            flashSide === "eur" ? "cross-flash" : ""
          }`}
        >
          <span className="block text-label-xs text-ink-muted">Echte Euro&apos;s €</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            value={eur}
            onChange={(e) => setFromEur(e.target.value)}
            placeholder="0"
            aria-label="Bedrag in euro's"
            className="w-full bg-transparent text-display-md text-ink tabular-nums outline-none placeholder:text-ink-muted/50"
          />
        </label>
        <span
          aria-hidden="true"
          className="grid w-9 shrink-0 place-items-center text-ink-muted"
        >
          <span
            className="swap-glyph inline-flex"
            data-active={activeSide ?? "none"}
          >
            <IconArrowSwap size={20} />
          </span>
        </span>
        <label
          className={`flex-1 rounded-card px-3 py-2.5 text-right transition-colors duration-150 focus-within:bg-card ${
            flashSide === "huf" ? "cross-flash" : ""
          }`}
        >
          <span className="block text-label-xs text-ink-muted">Monopoly-poen HUF</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            value={huf}
            onChange={(e) => setFromHuf(e.target.value)}
            placeholder="0"
            aria-label="Bedrag in Hongaarse forint"
            className="w-full bg-transparent text-right text-display-md text-ink tabular-nums outline-none placeholder:text-ink-muted/50"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {EUR_CHIPS.map((amount) => (
            <button
              key={`eur-${amount}`}
              type="button"
              onClick={() => tapChipEur(amount)}
              className="press-feedback inline-flex min-h-9 items-center rounded-pill border border-border bg-bg px-3 text-label-xs text-ink-soft hover:text-ink"
            >
              €{amount}
            </button>
          ))}
          {HUF_CHIPS.map((amount) => (
            <button
              key={`huf-${amount}`}
              type="button"
              onClick={() => tapChipHuf(amount)}
              className="press-feedback inline-flex min-h-9 items-center rounded-pill border border-border bg-bg px-3 text-label-xs text-ink-soft hover:text-ink"
            >
              {amount.toLocaleString("nl-NL")} Ft
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
