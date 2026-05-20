import { IconMapPin, IconChevronRight } from "./Icons";

export function MapsButton() {
  return (
    <a
      href="https://maps.app.goo.gl/wRGuk1EN8hDMAX8Q8"
      target="_blank"
      rel="noreferrer"
      aria-label="Open Google Maps voor Király utca 47"
      className="press-feedback group relative flex items-center gap-4 overflow-hidden rounded-tool border border-hu-green/30 bg-card px-4 py-4 shadow-go"
    >
      <span
        aria-hidden="true"
        className="grid size-12 shrink-0 place-items-center rounded-full bg-hu-green/15 text-hu-green"
      >
        <IconMapPin size={24} />
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-label-xs text-hu-green">Onze Airbnb</span>
        <strong className="mt-0.5 text-display-md text-ink">Király utca 47</strong>
        <span className="mt-0.5 truncate text-body-sm text-ink-muted">
          District VII · Joodse Wijk
        </span>
      </span>

      <span aria-hidden="true" className="text-ink-muted transition-transform group-hover:translate-x-1">
        <IconChevronRight size={22} />
      </span>
    </a>
  );
}
