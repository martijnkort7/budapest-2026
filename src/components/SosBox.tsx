const WHATSAPP_URL =
  "https://wa.me/31612250217?text=Peter%2C%20ik%20ben%20verdwaald%20en%20ik%20ben%20bang.%20Red%20me%20uit%20deze%20ellende!";

export function SosBox() {
  return (
    <section
      aria-labelledby="sos-title"
      className="rounded-card border border-hu-red/60 bg-[radial-gradient(circle_at_center,_rgba(206,17,38,0.18),_rgba(206,17,38,0.04)_70%)] px-5 py-7 text-center"
    >
      <h2
        id="sos-title"
        className="font-display text-3xl uppercase tracking-wide text-hu-red"
      >
        SOS - Man Overboord
      </h2>
      <p className="mx-auto mt-3 max-w-[36ch] text-sm leading-relaxed text-ink">
        Het is 04:00. Je staat in een steegje in District VII. Je telefoon op
        3%. Geen idee waar je bent en nog minder waar de rest is. Druk op deze
        knop om BadPete - 35, vrijgezel, en ooit de wildste van allemaal - in
        blinde paniek wakker te appen.
      </p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="shadow-sos-ring mt-5 inline-flex items-center gap-2.5 rounded-pill bg-hu-red px-7 py-3.5 font-display text-lg uppercase tracking-wide text-white transition active:scale-[0.96]"
      >
        <span aria-hidden="true">🆘</span> Paniekknop
      </a>
    </section>
  );
}
