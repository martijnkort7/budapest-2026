import { DICTIONARY } from "@/data/dictionary";

export function Lexicon() {
  return (
    <div className="rounded-tool border border-border bg-card px-5 py-5 shadow-ambient">
      <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
        Hongaarse Survival Kit
      </h2>

      <section className="mt-4">
        <h3 className="font-display text-base uppercase tracking-wide text-sunset">
          Taxi's & Oplichting
        </h3>
        <p className="mt-2 rounded-card border border-border-soft bg-bg px-3.5 py-3 text-sm leading-relaxed text-ink-muted">
          <strong className="text-ink">Cruciaal:</strong> Uber bestaat hier
          niet. Gebruik uitsluitend de app <strong className="text-ink">Bolt</strong>. 
          Stap nooit in een willekeurige straattaxi tenzij je beroofd wilt worden.
        </p>
      </section>

      <section className="mt-6">
        <h3 className="font-display text-base uppercase tracking-wide text-sunset">
          Officiële Woordenboek
        </h3>
        <ul className="mt-2 flex flex-col gap-1.5">
          {DICTIONARY.map(({ nl, hu }) => (
            <li
              key={nl}
              className="flex items-center justify-between gap-3 rounded-data border border-border-soft bg-bg px-3 py-2.5 text-sm"
            >
              <span className="text-ink-muted">{nl}</span>
              <span className="text-right font-bold text-gold">{hu}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
