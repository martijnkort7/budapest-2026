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
        SOS: Red Mij!
      </h2>
      <p className="mx-auto mt-3 max-w-[36ch] text-sm leading-relaxed text-ink">
        Ben je om 04:00 's nachts de weg, de rest van de groep en al je
        waardigheid kwijt geraakt in District VII? Druk op deze knop om Peter,
        de almachtige manager van deze trip, in blinde paniek een appje te
        sturen met je locatie.
      </p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="shadow-sos-ring mt-5 inline-flex items-center gap-2.5 rounded-pill bg-hu-red px-7 py-3.5 font-display text-lg uppercase tracking-wide text-white transition active:scale-[0.96]"
      >
        <span aria-hidden="true">📱</span> Stuur Noodkreet
      </a>
    </section>
  );
}
