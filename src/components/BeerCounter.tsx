"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "solo-beers";
const LONG_PRESS_MS = 550;

export function BeerCounter() {
  const [count, setCount] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const [flashUndo, setFlashUndo] = useState(false);
  const longPressTimer = useRef<number | null>(null);
  const didLongPress = useRef(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? parseInt(raw, 10) : 0;
    if (Number.isFinite(parsed)) setCount(parsed);
  }, []);

  function persist(next: number) {
    localStorage.setItem(STORAGE_KEY, String(Math.max(0, next)));
  }

  function addBeer() {
    if (didLongPress.current) return;
    setCount((c) => {
      const next = c + 1;
      persist(next);
      try {
        navigator.vibrate?.(15);
      } catch {}
      return next;
    });
  }

  function undoBeer() {
    setCount((c) => {
      const next = Math.max(0, c - 1);
      persist(next);
      try {
        navigator.vibrate?.([8, 30, 8]);
      } catch {}
      return next;
    });
    setFlashUndo(true);
    window.setTimeout(() => setFlashUndo(false), 600);
  }

  function pressStart() {
    didLongPress.current = false;
    longPressTimer.current = window.setTimeout(() => {
      didLongPress.current = true;
      undoBeer();
    }, LONG_PRESS_MS);
  }

  function pressEnd() {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }

  function resetCounter() {
    setCount(0);
    persist(0);
    setConfirmReset(false);
  }

  return (
    <div className="rounded-tool border border-border bg-card px-5 pt-6 pb-7 text-center shadow-card">
      <span className="text-label-xs text-gold">Houd het bij</span>
      <h2 className="mt-1 text-display-lg text-ink">Bier Administratie</h2>
      <p className="mx-auto mt-2 max-w-[32ch] text-body-sm text-ink-soft">
        Voor als je de tel kwijt bent. Lieg niet tegen jezelf.
      </p>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="mt-5 mb-4 text-[64px] leading-none text-gold tabular-nums font-display"
      >
        {count}
      </div>

      <button
        type="button"
        onClick={addBeer}
        onPointerDown={pressStart}
        onPointerUp={pressEnd}
        onPointerLeave={pressEnd}
        onPointerCancel={pressEnd}
        className={`mx-auto flex size-[200px] items-center justify-center rounded-full border-4 bg-gradient-to-br from-card to-bg text-display-xl text-ink transition-all active:scale-[0.95] active:bg-gold active:text-app ${
          flashUndo ? "border-hu-red" : "border-gold"
        }`}
        style={{
          boxShadow: flashUndo
            ? "0 0 40px rgb(206 17 38 / 0.35), inset 0 0 24px rgb(0 0 0 / 0.8)"
            : "0 0 36px rgb(245 197 24 / 0.22), inset 0 0 24px rgb(0 0 0 / 0.8)",
          transition: "border-color 220ms var(--ease-out-strong), box-shadow 220ms var(--ease-out-strong), transform 120ms var(--ease-out-strong)",
        }}
        aria-label="Tel een biertje — houd vast om er één af te halen"
      >
        +1
      </button>

      <p className="mx-auto mt-3 max-w-[28ch] text-label-xs text-ink-muted">
        Tik = +1 · Houd vast = −1
      </p>

      {!confirmReset ? (
        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          className="mt-5 inline-flex min-h-11 items-center rounded-pill border border-border px-4 text-label-xs text-ink-muted hover:text-ink"
        >
          Reset Teller
        </button>
      ) : (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-label-xs">
          <span className="text-ink-soft">Zeker? Geen weg terug.</span>
          <button
            type="button"
            onClick={resetCounter}
            className="inline-flex min-h-11 items-center rounded-pill bg-hu-red px-4 text-white"
          >
            Ja, reset
          </button>
          <button
            type="button"
            onClick={() => setConfirmReset(false)}
            className="inline-flex min-h-11 items-center rounded-pill border border-border px-4 text-ink-muted"
          >
            Annuleer
          </button>
        </div>
      )}
    </div>
  );
}
