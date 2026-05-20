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
