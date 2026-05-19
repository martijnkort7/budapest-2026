"use client";

import { useEffect, useRef, useState } from "react";
import { WHEEL_NAMES } from "@/data/squad";

const TAU = Math.PI * 2;
const CANVAS_SIZE = 520;

const SEGMENT_PALETTE = [
  { bg: "#141417", text: "#fafaf9" },
  { bg: "#1f1f23", text: "#fafaf9" },
  { bg: "#141417", text: "#fafaf9" },
  { bg: "#1f1f23", text: "#fafaf9" },
  { bg: "#141417", text: "#fafaf9" },
  { bg: "#1f1f23", text: "#fafaf9" },
  { bg: "#f5c518", text: "#0a0a0c" },
];

export function SpinWheel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef(0);
  const winnerIdxRef = useRef<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    drawWheel();
  }, []);

  function drawWheel() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const numSegments = WHEEL_NAMES.length;
    const arc = TAU / numSegments;
    const cx = CANVAS_SIZE / 2;
    const cy = CANVAS_SIZE / 2;
    const radius = CANVAS_SIZE / 2 - 10;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    for (let i = 0; i < numSegments; i++) {
      const segStart = angleRef.current + i * arc;
      const palette = SEGMENT_PALETTE[i % SEGMENT_PALETTE.length];
      const isWinner = winnerIdxRef.current === i;

      ctx.beginPath();
      ctx.fillStyle = isWinner ? "#f5c518" : palette.bg;
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, segStart, segStart + arc);
      ctx.lineTo(cx, cy);
      ctx.fill();
      ctx.strokeStyle = "#27272a";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(segStart + arc / 2);
      ctx.fillStyle = isWinner ? "#0a0a0c" : palette.text;
      ctx.font = "bold 26px Outfit, system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(WHEEL_NAMES[i], radius - 24, 0);
      ctx.restore();
    }

    // Center hub
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, TAU);
    ctx.fillStyle = "#ff453a";
    ctx.fill();
    ctx.strokeStyle = "#fafaf9";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  function pickWinnerIndex(): number {
    const numSegments = WHEEL_NAMES.length;
    const arc = TAU / numSegments;
    // Pointer is at top (-PI/2). We want the segment whose midpoint is closest
    // to the pointer after rotation. Normalize current angle into [0, TAU).
    const normalized = ((angleRef.current % TAU) + TAU) % TAU;
    // Pointer is at angle 1.5 * PI (top of circle in canvas coords means -PI/2,
    // but our segments start at 0 = right of circle and rotate CW with angleRef).
    // The segment under the pointer satisfies: pointerAngle - normalized maps
    // into segment i's [i*arc, (i+1)*arc) range.
    const pointerAngle = ((1.5 * Math.PI - normalized) % TAU + TAU) % TAU;
    return Math.floor(pointerAngle / arc) % numSegments;
  }

  function spin() {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinner(null);
    winnerIdxRef.current = null;

    const totalDuration = 4200 + Math.random() * 1500;
    const totalRotation = TAU * (6 + Math.random() * 4);
    const startAngle = angleRef.current;
    const startTime = performance.now();

    let lastTickSegment = -1;

    function frame(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / totalDuration, 1);
      // ease-out quint with slight overshoot dampening
      const eased = 1 - Math.pow(1 - t, 4);
      angleRef.current = startAngle + totalRotation * eased;
      drawWheel();

      // Haptic-feel tick on segment passes during final 40%
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

  return (
    <div className="rounded-tool border border-border bg-card px-4 pt-6 pb-7 text-center shadow-ambient">
      <h2 className="font-display text-2xl tracking-wide uppercase text-ink">
        Het Rad des Doods
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Geen democratie. Slinger het rad en het lot bepaalt wie de lul is.
      </p>

      <div className="relative mx-auto mt-5 h-[260px] w-[260px]">
        <div
          aria-hidden="true"
          className="absolute left-1/2 -top-3 z-30 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "24px solid #ff453a",
            filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.5))",
          }}
        />
        <div className="size-full overflow-hidden rounded-full bg-bg ring-1 ring-border shadow-[0_0_0_6px_var(--color-bg),0_0_24px_rgba(245,197,24,0.15)]">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="block size-full rounded-full"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={isSpinning}
        className="mt-6 inline-flex items-center justify-center rounded-hero bg-gradient-to-br from-gold to-sunset px-7 py-3.5 font-display text-base uppercase tracking-wide text-app shadow-hero transition-transform active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSpinning ? "Het Lot Kiest..." : "Draai Voor Je Leven"}
      </button>

      <div className="mt-4 min-h-[1.75rem] font-display text-lg uppercase tracking-wide text-gold">
        {winner && (
          <span key={winner} className="result-reveal inline-block">
            De lul is: {winner}!
          </span>
        )}
      </div>
    </div>
  );
}
