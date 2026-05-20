"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IconRefresh } from "./Icons";

const KEY_WEIGHT = "solo-weight-kg";
const KEY_SHOTS = "solo-shots";
const KEY_START = "solo-start-ts";
const KEY_BEERS = "solo-beers";

const BEER_ML = 250;
const BEER_ABV = 0.05;
const SHOT_ML = 40;
const SHOT_ABV = 0.4;
const ETHANOL_DENSITY = 0.789;
const WIDMARK_R = 0.68;
const ELIMINATION_PER_HOUR = 0.15;

function computeBac(args: {
  beers: number;
  shots: number;
  weightKg: number;
  hoursSinceStart: number;
}): number {
  const mlAlcohol =
    args.beers * BEER_ML * BEER_ABV + args.shots * SHOT_ML * SHOT_ABV;
  const grams = mlAlcohol * ETHANOL_DENSITY;
  const peak = grams / (args.weightKg * WIDMARK_R);
  const eliminated = ELIMINATION_PER_HOUR * Math.max(0, args.hoursSinceStart);
  return Math.max(0, peak - eliminated);
}

function bacLabel(bac: number): { text: string; tone: string } {
  if (bac < 0.2) return { text: "Nuchter — zonde van de dag", tone: "text-ink-soft" };
  if (bac < 0.5) return { text: "Lekker bezig", tone: "text-hu-green" };
  if (bac < 1.0) return { text: "Aan de Donau-zijde", tone: "text-gold" };
  if (bac < 1.5) return { text: "Pálinka Casualty", tone: "text-gold" };
  if (bac < 2.0) return { text: "Niek-modus (brullen mag)", tone: "text-hu-red" };
  return { text: "EHBO bellen of nog een Pálinka?", tone: "text-hu-red" };
}

function formatTimeHHMM(ts: number): string {
  const d = new Date(ts);
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function timeToTodayTs(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  if (d.getTime() > Date.now()) d.setDate(d.getDate() - 1);
  return d.getTime();
}

export function PromilleMeter() {
  const [weightKg, setWeightKg] = useState(80);
  const [beers, setBeers] = useState(0);
  const [shots, setShots] = useState(0);
  const [startTs, setStartTs] = useState<number>(() => Date.now());
  const [now, setNow] = useState<number>(() => Date.now());
  const [flashKey, setFlashKey] = useState(0);
  const lastLabelRef = useRef<string>("Nuchter — zonde van de dag");

  useEffect(() => {
    const rawWeight = localStorage.getItem(KEY_WEIGHT);
    const w = rawWeight ? parseInt(rawWeight, 10) : NaN;
    if (Number.isFinite(w) && w >= 40 && w <= 200) setWeightKg(w);

    const rawShots = localStorage.getItem(KEY_SHOTS);
    const s = rawShots ? parseInt(rawShots, 10) : NaN;
    if (Number.isFinite(s) && s >= 0) setShots(s);

    const rawStart = localStorage.getItem(KEY_START);
    const ts = rawStart ? parseInt(rawStart, 10) : NaN;
    if (Number.isFinite(ts) && ts > 0) {
      setStartTs(ts);
    } else {
      const initial = Date.now();
      setStartTs(initial);
      localStorage.setItem(KEY_START, String(initial));
    }

    syncBeersFromStorage();

    const onVisible = () => {
      if (document.visibilityState === "visible") syncBeersFromStorage();
    };
    document.addEventListener("visibilitychange", onVisible);
    const id = window.setInterval(() => setNow(Date.now()), 60_000);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(id);
    };
  }, []);

  const syncBeersFromStorage = useCallback(() => {
    const raw = localStorage.getItem(KEY_BEERS);
    const b = raw ? parseInt(raw, 10) : 0;
    if (Number.isFinite(b)) setBeers(Math.max(0, b));
  }, []);

  function updateWeight(next: number) {
    const clamped = Math.max(50, Math.min(140, next));
    setWeightKg(clamped);
    localStorage.setItem(KEY_WEIGHT, String(clamped));
  }

  function updateShots(next: number) {
    const clamped = Math.max(0, next);
    setShots(clamped);
    localStorage.setItem(KEY_SHOTS, String(clamped));
    try {
      navigator.vibrate?.(8);
    } catch {}
  }

  function updateBeers(next: number) {
    setBeers(Math.max(0, next));
  }

  function updateStartTime(hhmm: string) {
    const ts = timeToTodayTs(hhmm);
    setStartTs(ts);
    localStorage.setItem(KEY_START, String(ts));
  }

  function resetStart() {
    const ts = Date.now();
    setStartTs(ts);
    localStorage.setItem(KEY_START, String(ts));
    try {
      navigator.vibrate?.([8, 30, 8]);
    } catch {}
  }

  const hoursSinceStart = Math.max(0, (now - startTs) / 3_600_000);
  const bac = useMemo(
    () => computeBac({ beers, shots, weightKg, hoursSinceStart }),
    [beers, shots, weightKg, hoursSinceStart],
  );
  const label = bacLabel(bac);

  useEffect(() => {
    if (label.text !== lastLabelRef.current) {
      lastLabelRef.current = label.text;
      setFlashKey((k) => k + 1);
    }
  }, [label.text]);

  return (
    <div className="rounded-tool border border-border bg-card px-5 pt-6 pb-7 text-center shadow-card">
      <span className="text-label-xs text-gold">Niet medisch. Wel grappig.</span>
      <h2 className="mt-1 text-display-lg text-ink">Promille Meter</h2>
      <p className="mx-auto mt-2 max-w-[34ch] text-body-sm text-ink-soft">
        Hoe kut ben je? Widmark-schatting. Rij geen Bolt.
      </p>

      <div
        key={flashKey}
        aria-live="polite"
        aria-atomic="true"
        className="mt-5 text-display-xl text-gold tabular-nums"
      >
        {bac.toFixed(2)}
        <span className="ml-1 text-display-md text-ink-soft">‰</span>
      </div>
      <div className={`mt-1 text-display-sm ${label.tone}`}>{label.text}</div>

      <div className="mt-6 flex flex-col gap-4 text-left">
        <Stepper
          label="Bier (Bier Administratie)"
          hint="Pinte ≈ 250 ml @ 5%"
          value={beers}
          onChange={updateBeers}
          rightSlot={
            <button
              type="button"
              onClick={syncBeersFromStorage}
              aria-label="Lees opnieuw uit Bier Administratie"
              className="press-feedback grid size-9 place-items-center rounded-pill text-ink-muted hover:text-ink"
            >
              <IconRefresh size={16} aria-hidden="true" />
            </button>
          }
        />

        <Stepper
          label="Pálinka / shots"
          hint="Shot ≈ 40 ml @ 40%"
          value={shots}
          onChange={updateShots}
        />

        <div className="rounded-card border border-border-soft bg-bg px-4 py-3">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-label-xs text-ink-muted">Gewicht</span>
            <span className="text-body-sm text-ink tabular-nums">
              {weightKg} kg
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={140}
            step={1}
            value={weightKg}
            onChange={(e) => updateWeight(parseInt(e.target.value, 10))}
            aria-label="Gewicht in kilo"
            className="mt-2 w-full accent-gold"
          />
        </div>

        <div className="rounded-card border border-border-soft bg-bg px-4 py-3">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-label-xs text-ink-muted">Eerste glas om</span>
            <span className="text-body-sm text-ink-soft tabular-nums">
              {hoursSinceStart.toFixed(1)} u geleden
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="time"
              value={formatTimeHHMM(startTs)}
              onChange={(e) => updateStartTime(e.target.value)}
              aria-label="Tijd eerste glas"
              className="flex-1 rounded-data bg-card px-3 py-2 text-body-md text-ink tabular-nums outline-none"
            />
            <button
              type="button"
              onClick={resetStart}
              className="press-feedback inline-flex min-h-11 items-center rounded-pill border border-border px-3 text-label-xs text-ink-muted hover:text-ink"
            >
              Nu opnieuw
            </button>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-5 max-w-[36ch] text-label-xs text-ink-muted">
        Schatting via Widmark-formule. Niet juridisch, niet medisch. Geen Bolt
        zelf rijden — gebruik de app.
      </p>
    </div>
  );
}

function Stepper({
  label,
  hint,
  value,
  onChange,
  rightSlot,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (n: number) => void;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-border-soft bg-bg px-4 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-label-xs text-ink-muted">{label}</span>
        <span className="text-label-xs text-ink-muted">{hint}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          aria-label={`${label} minder`}
          className="press-feedback grid size-11 place-items-center rounded-pill border border-border bg-card text-display-sm text-ink"
        >
          −
        </button>
        <span className="flex-1 text-center text-display-md text-ink tabular-nums">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          aria-label={`${label} meer`}
          className="press-feedback grid size-11 place-items-center rounded-pill border border-border bg-card text-display-sm text-ink"
        >
          +
        </button>
        {rightSlot}
      </div>
    </div>
  );
}
