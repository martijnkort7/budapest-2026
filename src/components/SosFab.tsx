"use client";

import { useEffect, useState } from "react";
import { IconAlarm, IconClose } from "./Icons";

const PETE_NUMBER = "31612250217";
const BASE_TEXT =
  "PETER, CODE ROOD.\n\nIk ben gestrand in Boedapest en kan mezelf niet meer redden. Kom nu, ik heb je nodig.\n\nMijn locatie:";

type Status = "idle" | "locating" | "ready" | "no-location";

function buildWhatsappUrl(coords: GeolocationCoordinates | null) {
  const mapsPart = coords
    ? ` Mijn locatie: https://maps.google.com/?q=${coords.latitude.toFixed(5)},${coords.longitude.toFixed(5)}`
    : "";
  const text = encodeURIComponent(BASE_TEXT + mapsPart);
  return `https://wa.me/${PETE_NUMBER}?text=${text}`;
}

export function SosFab() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleOpen() {
    setOpen(true);
    setStatus("locating");
    setCoords(null);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("no-location");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords(pos.coords);
        setStatus("ready");
      },
      () => setStatus("no-location"),
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 30_000 },
    );

    try {
      navigator.vibrate?.([15, 40, 15]);
    } catch {}
  }

  function handleSend() {
    const url = buildWhatsappUrl(coords);
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        aria-label="SOS — paniekknop"
        onClick={handleOpen}
        className="fab-slot fixed right-4 z-[120] grid size-14 place-items-center rounded-full bg-hu-red text-white shadow-sos-ring transition-transform active:scale-[0.92]"
        style={{ animationPlayState: open ? "paused" : "running" }}
      >
        <IconAlarm size={26} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sos-sheet-title"
          className="fixed inset-0 z-[200] flex items-end justify-center"
        >
          <button
            type="button"
            aria-label="Sluit paniekknop"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            style={{
              animation: "sheet-fade 220ms var(--ease-out-strong)",
            }}
          />

          <div
            className="safe-bottom relative w-full max-w-[480px] rounded-t-[28px] border-t border-x border-hu-red/40 bg-bg px-5 pt-5 pb-7 shadow-card"
            style={{
              animation: "sheet-up 340ms var(--ease-drawer)",
            }}
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-pill bg-border" />

            <button
              type="button"
              aria-label="Sluiten"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-5 grid size-9 place-items-center rounded-full text-ink-muted hover:text-ink"
            >
              <IconClose size={20} />
            </button>

            <h2
              id="sos-sheet-title"
              className="text-display-lg text-hu-red"
            >
              SOS · Man Overboord
            </h2>

            <p className="mt-2 text-body-md text-ink">
              Het zijn roerige tijden voor tijdreizigers!
            </p>

            <div className="mt-4 rounded-card border border-border-soft bg-card px-4 py-3">
              {status === "locating" && (
                <p className="text-body-sm text-ink-muted">
                  <span className="inline-block size-2 animate-pulse rounded-full bg-hu-green align-middle" />{" "}
                  Bezig met locatie ophalen…
                </p>
              )}
              {status === "ready" && coords && (
                <p className="text-body-sm text-ink-soft">
                  <span className="inline-block size-2 rounded-full bg-hu-green align-middle" />{" "}
                  Locatie vastgelegd ·{" "}
                  <span className="tabular-nums text-ink">
                    {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
                  </span>
                </p>
              )}
              {status === "no-location" && (
                <p className="text-body-sm text-ink-muted">
                  Locatie niet beschikbaar. Verstuur zonder GPS-pin.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={status === "locating"}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-pill bg-hu-red px-6 py-4 text-display-md text-white transition-transform active:scale-[0.97] disabled:opacity-60"
            >
              <IconAlarm size={20} />
              Verstuur paniek-app
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 w-full rounded-pill px-6 py-3 text-label-xs text-ink-muted"
            >
              Nee, het komt goed
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes sheet-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes sheet-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}
