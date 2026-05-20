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
    alias: "De Palenrammer",
    status: "Kortje viel op Malta op z'n kaak - stond de volgende dag gewoon weer vooraan",
    accentColor: "#f5c518",
  },
  {
    name: "Niek Stijvers",
    initial: "N",
    alias: "Stijve Neansen",
    status: "Bedacht Budapest, pakte extra beenruimte, en won €375 op schaatsgoud - de man levert",
    accentColor: "#d72638",
  },
  {
    name: "Bono",
    initial: "B",
    alias: "Bono Boner",
    status: "CEO van bompa's bouwbedrijf, Revolut Metal elite - maar z'n extra koffer bleef thuis",
    accentColor: "#008751",
  },
  {
    name: "Jeroen Zaantje",
    initial: "J",
    alias: "Zaadcel",
    status: "Boekte ieders vlucht, deelt handbagage met Joep - slaapt alleen absoluut niet op die bank",
    accentColor: "#3a86ff",
  },
  {
    name: "Joep De Jong",
    initial: "J",
    alias: "De Sloopkogel",
    status: "Johannes Gradus scoorde de VIP-tickets en verast de groep elk jaar met een mystery cadeau",
    accentColor: "#ff6b35",
  },
  {
    name: "Oli4 Smits",
    initial: "O",
    alias: "Olijke Oli",
    status: "Dry Januari voor z'n lever, ketting van zijn vriendin om - maar Vollie wint het altijd",
    accentColor: "#9d4edd",
  },
  {
    name: "Peter Pan",
    initial: "P",
    alias: "Peter de Pijper",
    status: "BadPete (35) is vrijgezel en gaat de club in met een pil op zak. De OG is terug.",
    accentColor: "#06d6a0",
  },
];

export const WHEEL_NAMES = SQUAD.map((m) => m.name.split(" ")[0]);
export const WHEEL_COLORS = SQUAD.map((m) => m.accentColor);
