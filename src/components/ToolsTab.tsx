import { SosBox } from "./SosBox";
import { SpinWheel } from "./SpinWheel";
import { BeerCounter } from "./BeerCounter";
import { CurrencyConverter } from "./CurrencyConverter";
import { Lexicon } from "./Lexicon";

type Props = {
  rate: number;
  isFallback: boolean;
};

export function ToolsTab({ rate, isFallback }: Props) {
  return (
    <section className="flex flex-col gap-4 px-4 pt-2 pb-4">
      <SosBox />
      <SpinWheel />
      <BeerCounter />
      <CurrencyConverter rate={rate} isFallback={isFallback} />
      <Lexicon />
    </section>
  );
}
