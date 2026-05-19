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
    status: "Trekt de groep én de vrouwen",
  },
  {
    name: "Niek Stijvers",
    initial: "N",
    alias: "Stijve Neansen",
    status: "Houdt de boel hard — in alle opzichten",
    isBeheerder: true,
  },
  {
    name: "Bono",
    initial: "B",
    alias: "Bono Boner",
    status: "Belooft alles, levert half",
  },
  {
    name: "Jeroen Zaantje",
    initial: "J",
    alias: "Zaadcel",
    status: "Doet veldonderzoek bij de lokale dames",
  },
  {
    name: "Joep De Jong",
    initial: "J",
    alias: "De Sloopkogel",
    status: "Slaat alles plat — inclusief zichzelf",
  },
  {
    name: "Oli4 Smits",
    initial: "O",
    alias: "Olijke Oli",
    status: "Specialist achterkant van de menukaart",
  },
  {
    name: "Peter Pan",
    initial: "P",
    alias: "Peter de Pijper",
    status: "Tripmanager & oppas van 6 volwassen peuters",
  },
];

export const WHEEL_NAMES = SQUAD.map((m) => m.name.split(" ")[0]);
