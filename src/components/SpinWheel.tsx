"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WHEEL_NAMES, WHEEL_COLORS } from "@/data/squad";
import { IconRefresh } from "./Icons";

const TAU = Math.PI * 2;
const CSS_SIZE = 260;

function contrastInkOn(color: string): string {
  // crude luminance check — yellow/mint pick dark ink, dark colors pick white
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#050507" : "#fafaf9";
}

export function SpinWheel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef(0);
  const winnerIdxRef = useRef<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const targetW = CSS_SIZE * dpr;
    if (canvas.width !== targetW) {
      canvas.width = targetW;
      canvas.height = targetW;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const numSegments = WHEEL_NAMES.length;
    const arc = TAU / numSegments;
    const cx = CSS_SIZE / 2;
    const cy = CSS_SIZE / 2;
    const radius = CSS_SIZE / 2 - 6;

    ctx.clearRect(0, 0, CSS_SIZE, CSS_SIZE);

    const weights = WHEEL_NAMES.map((name) => (name === "Jeroen" ? 4 : 1));
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    for (let i = 0; i < numSegments; i++) {
      const segStart = angleRef.current + i * arc;
      const segColor = WHEEL_COLORS[i % WHEEL_COLORS.length];
      const isWinner = winnerIdxRef.current === i;

      ctx.beginPath();
      ctx.fillStyle = segColor;
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, segStart, segStart + arc);
      ctx.lineTo(cx, cy);
      ctx.fill();

      // Winner highlight overlay
      if (isWinner) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(5, 5, 7, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(segStart + arc / 2);
      ctx.fillStyle = contrastInkOn(segColor);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";

      const pct = Math.round((weights[i] / totalWeight) * 100);

      ctx.font = "600 13px Outfit, system-ui, sans-serif";
      ctx.fillText(WHEEL_NAMES[i], radius - 14, -7);

      ctx.font = "500 10px Outfit, system-ui, sans-serif";
      ctx.globalAlpha = 0.82;
      ctx.fillText(`${pct}%`, radius - 14, 7);
      ctx.globalAlpha = 1;

      ctx.restore();
    }

    // Center hub
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, TAU);
    ctx.fillStyle = "#050507";
    ctx.fill();
    ctx.strokeStyle = "#fafaf9";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }, []);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  function pickWinnerIndex(): number {
    const numSegments = WHEEL_NAMES.length;
    const arc = TAU / numSegments;
    const normalized = ((angleRef.current % TAU) + TAU) % TAU;
    const pointerAngle = ((1.5 * Math.PI - normalized) % TAU + TAU) % TAU;
    return Math.floor(pointerAngle / arc) % numSegments;
  }

  function pickBiasedWinner(): number {
    // Jeroen krijgt 4× het gewicht — hij is de lul
    const weights = WHEEL_NAMES.map((name) => (name === "Jeroen" ? 4 : 1));
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
      r -= weights[i];
      if (r <= 0) return i;
    }
    return WHEEL_NAMES.length - 1;
  }

  function spin() {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinner(null);
    winnerIdxRef.current = null;

    const totalDuration = 4200 + Math.random() * 1500;
    const startAngle = angleRef.current;
    const numSegments = WHEEL_NAMES.length;
    const arc = TAU / numSegments;

    // Pre-pick winner met bias; bereken de eindhoek zodat het wiel daar landt
    const targetIdx = pickBiasedWinner();
    const segOffset = (0.3 + Math.random() * 0.4) * arc;
    const targetPointerAngle = targetIdx * arc + segOffset;
    const targetNormalized = ((1.5 * Math.PI - targetPointerAngle) % TAU + TAU) % TAU;
    const currentNormalized = ((startAngle % TAU) + TAU) % TAU;
    const delta = ((targetNormalized - currentNormalized) % TAU + TAU) % TAU;
    const fullRotations = 6 + Math.floor(Math.random() * 4);
    const totalRotation = fullRotations * TAU + delta;
    const startTime = performance.now();

    let lastTickSegment = -1;

    function frame(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / totalDuration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      angleRef.current = startAngle + totalRotation * eased;
      drawWheel();

      if (t > 0.6 && typeof navigator !== "undefined" && "vibrate" in navigator) {
        const idx = pickWinnerIndex();
        if (idx !== lastTickSegment) {
          lastTickSegment = idx;
          try {
            navigator.vibrate?.(8);
          } catch {}
        }
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        const idx = pickWinnerIndex();
        winnerIdxRef.current = idx;
        drawWheel();
        setWinner(WHEEL_NAMES[idx]);
        setIsSpinning(false);
        try {
          navigator.vibrate?.(40);
        } catch {}
      }
    }
    requestAnimationFrame(frame);
  }

  const winnerColor =
    winnerIdxRef.current !== null
      ? WHEEL_COLORS[winnerIdxRef.current % WHEEL_COLORS.length]
      : "var(--color-gold)";

  const isIdle = !isSpinning && !winner;

  return (
    <div
      className="rounded-tool border border-border bg-card px-5 pt-6 pb-7 text-center shadow-card"
      style={{ "--winner-color": winnerColor } as React.CSSProperties}
    >
      <span className="text-label-xs text-hu-red">Geen democratie</span>
      <h2 className="mt-1 text-display-lg text-ink">Het Rad des Doods</h2>
      <p className="mx-auto mt-2 max-w-[34ch] text-body-sm text-ink-soft">
        Slinger het rad en het lot bepaalt wie de lul is.
      </p>

      <div className="relative mx-auto mt-5 size-[260px]">
        {winner && (
          <span
            key={`glow-${winner}`}
            aria-hidden="true"
            className="winner-glow pointer-events-none absolute inset-0 -z-0 rounded-full"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -top-3 z-30 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "22px solid var(--color-hu-red)",
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))",
          }}
        />
        <div className="relative size-full overflow-hidden rounded-full bg-bg shadow-[0_0_0_6px_var(--color-bg),0_0_32px_-4px_rgba(245,197,24,0.15)]">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Rad met namen: ${WHEEL_NAMES.join(", ")}`}
            style={{ width: CSS_SIZE, height: CSS_SIZE }}
            className="block size-full"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={isSpinning}
        className={`press-feedback mt-6 inline-flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 text-display-md text-white shadow-go disabled:cursor-not-allowed disabled:opacity-60 ${
          winner ? "bg-card text-ink border border-border" : "bg-hu-green"
        } ${isIdle ? "breathe" : ""}`}
        style={{
          transition:
            "background-color 280ms var(--ease-out-strong), color 280ms var(--ease-out-strong), transform 160ms var(--ease-out-strong)",
        }}
      >
        {winner ? (
          <>
            <IconRefresh size={18} /> Draai Opnieuw
          </>
        ) : isSpinning ? (
          "Het Lot Kiest…"
        ) : (
          "Draai Voor Je Leven"
        )}
      </button>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="mt-4 min-h-[1.75rem] text-display-md text-gold"
      >
        {winner && (
          <span key={winner} className="result-reveal inline-block">
            De lul is: {winner}!
          </span>
        )}
      </div>
    </div>
  );
}
