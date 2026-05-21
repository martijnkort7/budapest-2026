export type SquadMember = {
  name: string;
  initial: string;
  alias: string;
  status: string;
  accentColor: string;
  isBeheerder?: boolean;
};

export const SQUAD: SquadMember[] = [
  {
    name: "Martijn",
    initial: "M",
    alias: "MC Shorty",
    status: "Kortje viel op Malta op z'n kaak. Stond de volgende dag gewoon weer vooraan.",
    accentColor: "#f5c518",
  },
  {
    name: "Niek",
    initial: "N",
    alias: "The Eagle",
    status: "Bedacht Budapest, pakte extra beenruimte en heeft de hardste brul van de stad als hij moet kotsen. De man levert.",
    accentColor: "#d72638",
  },
  {
    name: "Bono",
    initial: "B",
    alias: "de Baboon",
    status: "CEO van bompa's bouwbedrijf, Revolut Metal elite. Z'n extra koffer bleef wel thuis.",
    accentColor: "#008751",
  },
  {
    name: "Jeroen",
    initial: "J",
    alias: "Ballenbek",
    status: "Boekte ieders vlucht, deelt handbagage met Joep. Slaapt alleen absoluut niet op die bank.",
    accentColor: "#3a86ff",
  },
  {
    name: "Joep",
    initial: "J",
    alias: "DJ Gradus",
    status: "Johannes Gradus scoorde de VIP-tickets en verast de groep elk jaar met een mystery cadeau.",
    accentColor: "#ff6b35",
  },
  {
    name: "Oli4",
    initial: "O",
    alias: "Volie",
    status: "Dry Januari voor z'n lever, ketting van zijn vriendin om. Maar Vollie wint het altijd.",
    accentColor: "#9d4edd",
  },
  {
    name: "Peter Pan",
    initial: "P",
    alias: "BadPeter",
    status: "BadPete (35) is vrijgezel en gaat de club in met een pil op zak. De OG is terug.",
    accentColor: "#06d6a0",
  },
];

export const WHEEL_NAMES = SQUAD.map((m) => m.name.split(" ")[0]);
export const WHEEL_COLORS = SQUAD.map((m) => m.accentColor);

export type BeerTier = {
  threshold: number;
  label: string;
  color: string;
};

export const BEER_TIERS: BeerTier[] = [
  { threshold: 0, label: "Nog Nuchter", color: "#b6b7bf" },
  { threshold: 2, label: "Warming Up", color: "#fafaf9" },
  { threshold: 5, label: "MC Shorty Niveau", color: "#f5c518" },
  { threshold: 8, label: "Ballenbek Mode", color: "#3a86ff" },
  { threshold: 12, label: "Brullen als Niek", color: "#d72638" },
  { threshold: 16, label: "Volie's Tweede Adem", color: "#9d4edd" },
  { threshold: 20, label: "Stijve Neansen", color: "#008751" },
  { threshold: 25, label: "BadPete Territory", color: "#06d6a0" },
  { threshold: 30, label: "De Lul (definitief)", color: "#ce1126" },
];

export function getTier(count: number): BeerTier {
  let current = BEER_TIERS[0];
  for (const tier of BEER_TIERS) {
    if (count >= tier.threshold) current = tier;
    else break;
  }
  return current;
}
