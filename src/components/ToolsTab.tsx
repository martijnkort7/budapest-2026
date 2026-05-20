import { SpinWheel } from "./SpinWheel";
import { BeerCounter } from "./BeerCounter";
import { PromilleMeter } from "./PromilleMeter";
import { CurrencyConverter } from "./CurrencyConverter";
import { Lexicon } from "./Lexicon";
import { Limericks } from "./Limericks";

type Props = {
  rate: number;
  isFallback: boolean;
};

export function ToolsTab({ rate, isFallback }: Props) {
  return (
    <section className="flex flex-col gap-8 px-4 pt-4 pb-4">
      <div className="flex flex-col gap-4">
        <header className="flex items-baseline justify-between gap-3 px-1">
          <h2 className="text-display-md text-ink">Drink</h2>
          <span className="text-label-xs text-gold">Voor de avond</span>
        </header>
        <SpinWheel />
        <BeerCounter />
        <PromilleMeter />
      </div>

      <div className="flex flex-col gap-4">
        <header className="flex items-baseline justify-between gap-3 px-1">
          <h2 className="text-display-md text-ink">Navigatie</h2>
          <span className="text-label-xs text-hu-green">Voor de stad</span>
        </header>
        <CurrencyConverter rate={rate} isFallback={isFallback} />
        <Lexicon />
      </div>

      <div className="flex flex-col gap-4">
        <header className="flex items-baseline justify-between gap-3 px-1">
          <h2 className="text-display-md text-ink">De Boys</h2>
          <span className="text-label-xs text-hu-red">Vereeuwigd in vers</span>
        </header>
        <Limericks />
      </div>
    </section>
  );
}
