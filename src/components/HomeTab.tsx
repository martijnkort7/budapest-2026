import { SquadList } from "./SquadList";
import { FactsCarousel } from "./FactsCarousel";
import { MapsButton } from "./MapsButton";

export function HomeTab() {
  return (
    <section className="flex flex-col gap-7 px-4 pt-4 pb-4">
      <MapsButton />

      <div className="flex flex-col gap-3">
        <header className="flex items-baseline justify-between gap-3 px-1">
          <h2 className="text-display-md text-ink">De Boys</h2>
          <span className="text-label-xs text-hu-green">7 dudes · 1 missie</span>
        </header>
        <SquadList />
      </div>

      <div className="flex flex-col gap-3">
        <header className="flex items-baseline justify-between gap-3 px-1">
          <h2 className="text-display-md text-ink">Nutteloze Feiten</h2>
          <span className="text-label-xs text-gold">Swipe →</span>
        </header>
        <FactsCarousel />
      </div>
    </section>
  );
}
