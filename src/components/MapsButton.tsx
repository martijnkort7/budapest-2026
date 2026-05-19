export function MapsButton() {
  return (
    <div className="px-4 pt-4 pb-2">
      <a
        href="https://maps.app.goo.gl/wRGuk1EN8hDMAX8Q8"
        target="_blank"
        rel="noreferrer"
        className="shadow-hero flex items-center justify-center gap-3 rounded-hero bg-gradient-to-br from-sunset to-gold px-4 py-4 text-app transition active:scale-[0.97]"
      >
        <span aria-hidden="true" className="text-2xl">
          📍
        </span>
        <span className="flex flex-1 flex-col items-start">
          <strong className="font-display text-base leading-tight tracking-wide">
            Navigeer naar Huis
          </strong>
          <span className="text-[13px] font-semibold opacity-80">
            Király utca 47, Budapest
          </span>
        </span>
        <span aria-hidden="true" className="text-base opacity-60">
          ›
        </span>
      </a>
    </div>
  );
}
