"use client";

import { useEffect, useRef, useState } from "react";
import { BEER_TIERS, getTier } from "@/data/squad";

const SESSION_KEY = "solo-beers";
const TRIP_KEY = "beer-trip-total";
const LONG_PRESS_MS = 550;

export function BeerCounter() {
  const [session, setSession] = useState(0);
  const [trip, setTrip] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const [flashUndo, setFlashUndo] = useState(false);
  const [milestoneKey, setMilestoneKey] = useState(0);
  const [floaterKey, setFloaterKey] = useState(0);
  const [floaterDelta, setFloaterDelta] = useState<"+1" | "−1">("+1");
  const lastTierIdx = useRef(0);
  const [tierRevealKey, setTierRevealKey] = useState(0);
  const longPressTimer = useRef<number | null>(null);
  const didLongPress = useRef(false);

  useEffect(() => {
    const rawSession = localStorage.getItem(SESSION_KEY);
    const rawTrip = localStorage.getItem(TRIP_KEY);
    const s = rawSession ? parseInt(rawSession, 10) : 0;
    const t = rawTrip ? parseInt(rawTrip, 10) : 0;
    if (Number.isFinite(s)) setSession(s);
    if (Number.isFinite(t)) setTrip(t);
    lastTierIdx.current = BEER_TIERS.findIndex(
      (tier) => tier === getTier(Number.isFinite(s) ? s : 0),
    );
  }, []);

  function persist(key: string, next: number) {
    localStorage.setItem(key, String(Math.max(0, next)));
  }

  function checkTierChange(next: number) {
    const tier = getTier(next);
    const idx = BEER_TIERS.findIndex((t) => t === tier);
    if (idx !== lastTierIdx.current) {
      lastTierIdx.current = idx;
      setTierRevealKey((k) => k + 1);
    }
  }

  function addBeer() {
    if (didLongPress.current) return;
    setSession((c) => {
      const next = c + 1;
      persist(SESSION_KEY, next);
      const isMilestone = next > 0 && next % 10 === 0;
      try {
        navigator.vibrate?.(isMilestone ? [25, 40, 25, 40, 25] : 15);
      } catch {}
      if (isMilestone) setMilestoneKey((k) => k + 1);
      checkTierChange(next);
      return next;
    });
    setTrip((t) => {
      const next = t + 1;
      persist(TRIP_KEY, next);
      return next;
    });
    setFloaterDelta("+1");
    setFloaterKey((k) => k + 1);
  }

  function undoBeer() {
    setSession((c) => {
      const next = Math.max(0, c - 1);
      persist(SESSION_KEY, next);
      try {
        navigator.vibrate?.([8, 30, 8]);
      } catch {}
      checkTierChange(next);
      return next;
    });
    setTrip((t) => {
      const next = Math.max(0, t - 1);
      persist(TRIP_KEY, next);
      return next;
    });
    setFloaterDelta("−1");
    setFloaterKey((k) => k + 1);
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

  function resetSession() {
    setSession(0);
    persist(SESSION_KEY, 0);
    lastTierIdx.current = 0;
    setConfirmReset(false);
  }

  const tier = getTier(session);

  return (
    <div
      className="rounded-tool border border-border bg-card px-5 pt-6 pb-7 text-center shadow-card"
      style={{ "--tier-color": tier.color } as React.CSSProperties}
    >
      <span className="text-label-xs text-gold">Houd het bij</span>
      <h2 className="mt-1 text-display-lg text-ink">Bier Administratie</h2>
      <p className="mx-auto mt-2 max-w-[32ch] text-body-sm text-ink-soft">
        Voor als je de tel kwijt bent. Lieg niet tegen jezelf.
      </p>

      <div className="relative mt-5 mb-2">
        <div
          aria-hidden="true"
          className="tier-glow pointer-events-none absolute inset-0 -z-0"
        />
        <div
          aria-live="polite"
          aria-atomic="true"
          className="relative z-10 text-[64px] leading-none text-gold tabular-nums font-display"
        >
          <span key={session} className="count-pop inline-block">
            {session}
          </span>
        </div>
      </div>

      <div
        key={`tier-${tierRevealKey}`}
        className="result-reveal mb-3 text-display-sm tabular-nums"
        style={{ color: "var(--tier-color)" }}
      >
        {tier.label}
      </div>

      <div className="relative mx-auto inline-block">
        {floaterKey > 0 && (
          <span
            key={`float-${floaterKey}`}
            aria-hidden="true"
            className="float-up pointer-events-none absolute left-1/2 -top-2 z-20 -translate-x-1/2 text-display-sm font-display"
            style={{
              color:
                floaterDelta === "−1" ? "var(--color-hu-red)" : "var(--color-gold)",
            }}
          >
            {floaterDelta}
          </span>
        )}

        <button
          key={milestoneKey}
          type="button"
          onClick={addBeer}
          onPointerDown={pressStart}
          onPointerUp={pressEnd}
          onPointerLeave={pressEnd}
          onPointerCancel={pressEnd}
          className={`flex size-[200px] items-center justify-center rounded-full border-4 bg-gradient-to-br from-card to-bg text-display-xl text-ink transition-all active:scale-[0.95] active:bg-gold active:text-app ${
            flashUndo ? "border-hu-red" : "border-gold"
          } ${milestoneKey > 0 ? "milestone-flash" : ""}`}
          style={{
            boxShadow: flashUndo
              ? "0 0 40px rgb(206 17 38 / 0.35), inset 0 0 24px rgb(0 0 0 / 0.8)"
              : "0 0 36px rgb(245 197 24 / 0.22), inset 0 0 24px rgb(0 0 0 / 0.8)",
            transition:
              "border-color 220ms var(--ease-out-strong), transform 120ms var(--ease-out-strong)",
          }}
          aria-label="Tel een biertje — houd vast om er één af te halen"
        >
          +1
        </button>
      </div>

      <p className="mx-auto mt-3 max-w-[28ch] text-label-xs text-ink-muted">
        Tik = +1 · Houd vast = −1
      </p>

      <p className="mt-3 text-label-xs text-ink-muted tabular-nums">
        Trip-totaal: <span className="text-ink-soft">{trip}</span>
      </p>

      {!confirmReset ? (
        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          className="press-feedback mt-4 inline-flex min-h-11 items-center rounded-pill border border-border px-4 text-label-xs text-ink-muted hover:text-ink"
        >
          Reset Sessie
        </button>
      ) : (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-label-xs">
          <span className="w-full text-ink-soft">
            Reset alleen sessie. Trip-totaal blijft.
          </span>
          <button
            type="button"
            onClick={resetSession}
            className="press-feedback inline-flex min-h-11 items-center rounded-pill bg-hu-red px-4 text-white"
          >
            Ja, reset
          </button>
          <button
            type="button"
            onClick={() => setConfirmReset(false)}
            className="press-feedback inline-flex min-h-11 items-center rounded-pill border border-border px-4 text-ink-muted"
          >
            Annuleer
          </button>
        </div>
      )}
    </div>
  );
}
