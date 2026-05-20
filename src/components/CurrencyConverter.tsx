"use client";

import { useState } from "react";
import { IconArrowSwap } from "./Icons";

type Props = {
  rate: number;
  isFallback: boolean;
};

const EUR_CHIPS = [5, 10, 20, 50];
const HUF_CHIPS = [500, 2000, 5000];

export function CurrencyConverter({ rate, isFallback }: Props) {
  const [eur, setEur] = useState("");
  const [huf, setHuf] = useState("");

  function setFromEur(value: string) {
    setEur(value);
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed) && parsed >= 0) {
      setHuf(String(Math.round(parsed * rate)));
    } else {
      setHuf("");
    }
  }

  function setFromHuf(value: string) {
    setHuf(value);
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed) && parsed >= 0) {
      setEur((parsed / rate).toFixed(2));
    } else {
      setEur("");
    }
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
              className="inline-block size-2 rounded-full"
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
        <label className="flex-1 rounded-card px-3 py-2.5 focus-within:bg-card">
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
          <IconArrowSwap size={20} />
        </span>
        <label className="flex-1 rounded-card px-3 py-2.5 text-right focus-within:bg-card">
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
              onClick={() => setFromEur(String(amount))}
              className="inline-flex min-h-9 items-center rounded-pill border border-border bg-bg px-3 text-label-xs text-ink-soft hover:text-ink"
            >
              €{amount}
            </button>
          ))}
          {HUF_CHIPS.map((amount) => (
            <button
              key={`huf-${amount}`}
              type="button"
              onClick={() => setFromHuf(String(amount))}
              className="inline-flex min-h-9 items-center rounded-pill border border-border bg-bg px-3 text-label-xs text-ink-soft hover:text-ink"
            >
              {amount.toLocaleString("nl-NL")} Ft
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
