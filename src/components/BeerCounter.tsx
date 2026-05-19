"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "solo-beers";

export function BeerCounter() {
  const [count, setCount] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? parseInt(raw, 10) : 0;
    if (Number.isFinite(parsed)) setCount(parsed);
  }, []);

  function addBeer() {
    setCount((c) => {
      const next = c + 1;
      localStorage.setItem(STORAGE_KEY, String(next));
      try {
        navigator.vibrate?.(15);
      } catch {}
      return next;
    });
  }

  function resetCounter() {
    setCount(0);
    localStorage.setItem(STORAGE_KEY, "0");
    setConfirmReset(false);
  }

  return (
    <div className="rounded-tool border border-border bg-card px-4 pt-6 pb-7 text-center shadow-ambient">
      <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
        Biertjes Counter
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Je eigen administratie. Wordt lokaal bewaard.
      </p>

      <div className="my-4 font-display text-6xl leading-none text-gold tabular-nums">
        {count}
      </div>

      <button
        type="button"
        onClick={addBeer}
        className="mx-auto flex size-[200px] items-center justify-center rounded-full border-4 border-gold bg-gradient-to-br from-card to-bg font-display text-5xl text-ink shadow-[0_0_30px_rgb(245_197_24_/_0.18),inset_0_0_20px_rgb(0_0_0_/_0.8)] transition active:scale-[0.95] active:bg-gold active:text-app"
        aria-label="Tel een biertje"
      >
        +1
      </button>

      {!confirmReset ? (
        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          className="mt-5 rounded-data border border-ink-muted px-4 py-1.5 text-xs font-bold text-ink-muted transition hover:text-ink"
        >
          Reset Teller
        </button>
      ) : (
        <div className="mt-5 flex items-center justify-center gap-2 text-xs">
          <span className="text-ink-soft">Zeker weten?</span>
          <button
            type="button"
            onClick={resetCounter}
            className="rounded-data bg-sunset px-3 py-1.5 font-bold text-app"
          >
            Ja, reset
          </button>
          <button
            type="button"
            onClick={() => setConfirmReset(false)}
            className="rounded-data border border-border px-3 py-1.5 text-ink-muted"
          >
            Annuleer
          </button>
        </div>
      )}
    </div>
  );
}
