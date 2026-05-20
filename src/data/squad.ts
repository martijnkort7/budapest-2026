export type SquadMember = {
  name: string;
  initial: string;
  alias: string;
  status: string;
  isBeheerder?: boolean;
};

export const SQUAD: SquadMember[] = [
  {
    name: "Martijn",
    initial: "M",
    alias: "De Palenrammer",
    status: "Kortje viel op Malta op z'n kaak - stond de volgende dag gewoon weer vooraan",
  },
  {
    name: "Niek Stijvers",
    initial: "N",
    alias: "Stijve Neansen",
    status: "Bedacht Budapest, pakte extra beenruimte, en won €375 op schaatsgoud - de man levert",
    isBeheerder: true,
  },
  {
    name: "Bono",
    initial: "B",
    alias: "Bono Boner",
    status: "CEO van bompa's bouwbedrijf, Revolut Metal elite - maar z'n extra koffer bleef thuis",
  },
  {
    name: "Jeroen Zaantje",
    initial: "J",
    alias: "Zaadcel",
    status: "Boekte ieders vlucht, deelt handbagage met Joep - slaapt alleen absoluut niet op die bank",
  },
  {
    name: "Joep De Jong",
    initial: "J",
    alias: "De Sloopkogel",
    status: "Johannes Gradus scoorde de VIP-tickets en verast de groep elk jaar met een mystery cadeau",
  },
  {
    name: "Oli4 Smits",
    initial: "O",
    alias: "Olijke Oli",
    status: "Dry Januari voor z'n lever, ketting van zijn vriendin om - maar Vollie wint het altijd",
  },
  {
    name: "Peter Pan",
    initial: "P",
    alias: "Peter de Pijper",
    status: "BadPete (35) is vrijgezel en gaat de club in met een pil op zak. De OG is terug.",
  },
];

export const WHEEL_NAMES = SQUAD.map((m) => m.name.split(" ")[0]);
