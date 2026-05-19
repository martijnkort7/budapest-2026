import { SquadList } from "./SquadList";
import { FactsCarousel } from "./FactsCarousel";

export function HomeTab() {
  return (
    <section className="px-4 pt-2 pb-4">
      <h2 className="mt-4 mb-2.5 flex items-center gap-1.5 text-base font-semibold text-ink-muted">
        <span aria-hidden="true">🔥</span> De Squad & Bijnamen
      </h2>
      <SquadList />

      <h2 className="mt-6 mb-2.5 flex items-center gap-1.5 text-base font-semibold text-ink-muted">
        <span aria-hidden="true">💡</span> Wist-je-datjes
      </h2>
      <FactsCarousel />
    </section>
  );
}
