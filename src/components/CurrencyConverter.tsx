"use client";

import { useState } from "react";

type Props = {
  rate: number;
  isFallback: boolean;
};

export function CurrencyConverter({ rate, isFallback }: Props) {
  const [eur, setEur] = useState("");
  const [huf, setHuf] = useState("");

  function onEurChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setEur(v);
    const parsed = parseFloat(v);
    if (Number.isFinite(parsed)) setHuf(String(Math.round(parsed * rate)));
    else setHuf("");
  }

  function onHufChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setHuf(v);
    const parsed = parseFloat(v);
    if (Number.isFinite(parsed)) setEur((parsed / rate).toFixed(2));
    else setEur("");
  }

  return (
    <div className="rounded-tool border border-border bg-card px-5 py-5 shadow-ambient">
      <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
        HUF-Hustler Pro
      </h2>
      <p className="mt-1.5 text-sm text-ink-muted">
        Koers:{" "}
        <span className="tabular-nums text-ink-soft">
          1 EUR = {rate.toFixed(2)} HUF
        </span>{" "}
        <span className="text-xs">{isFallback ? "· fallback" : "· live"}</span>
      </p>

      <div className="mt-4 flex items-center gap-3 rounded-card border border-border-soft bg-bg p-2.5">
        <label className="flex-1">
          <span className="block px-2 pt-0.5 text-[10px] font-extrabold uppercase tracking-wide text-ink-muted">
            Echte Euro's (€)
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={eur}
            onChange={onEurChange}
            placeholder="0"
            className="w-full bg-transparent px-2 pb-1 text-2xl font-bold text-ink tabular-nums outline-none placeholder:text-ink-muted/60"
          />
        </label>
        <span className="text-sunset" aria-hidden="true">
          ⇌
        </span>
        <label className="flex-1">
          <span className="block px-2 pt-0.5 text-right text-[10px] font-extrabold uppercase tracking-wide text-ink-muted">
            Monopoly-poen (HUF)
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={huf}
            onChange={onHufChange}
            placeholder="0"
            className="w-full bg-transparent px-2 pb-1 text-right text-2xl font-bold text-ink tabular-nums outline-none placeholder:text-ink-muted/60"
          />
        </label>
      </div>
    </div>
  );
}
