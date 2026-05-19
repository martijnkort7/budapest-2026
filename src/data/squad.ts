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
    status: "Vinger op de clit en gaan",
  },
  {
    name: "Niek Stijvers",
    initial: "N",
    alias: "Niek Stijfsel",
    status: "Toezichthouder erecties",
    isBeheerder: true,
  },
  {
    name: "Bono",
    initial: "B",
    alias: "Seks-Slappeling",
    status: "Verkoper van natte luchtkastelen",
  },
  {
    name: "Jeroen Zaantje",
    initial: "J",
    alias: "Jeroen de Zaadcel",
    status: "Marktonderzoek in de lokale pussy",
  },
  {
    name: "Joep De Jong",
    initial: "J",
    alias: "Joep de Jekker",
    status: "Slaat alles plat wat losloopt",
  },
  {
    name: "Oli4 Smits",
    initial: "O",
    alias: "Duim-in-de-Bips",
    status: "Gecertificeerd Budasekst-expert",
  },
  {
    name: "Peter Pan",
    initial: "P",
    alias: "Peter de Pijper",
    status: "Manager van de hardcore VIP-ruimte",
  },
];

export const WHEEL_NAMES = SQUAD.map((m) => m.name.split(" ")[0]);
