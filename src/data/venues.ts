export type VenueCategory = "food" | "craft" | "ruin" | "culture";

export type Venue = {
  name: string;
  blurb: string;
};

export type VenueGroup = {
  id: VenueCategory;
  title: string;
  iconName: string;
  blurb: string;
  venues: Venue[];
};

export const VENUE_GROUPS: VenueGroup[] = [
  {
    id: "food",
    title: "Burgers & Solide Bodem",
    iconName: "burger",
    blurb:
      "Zonder fundament geen nachtleven. Dit is het voer dat jullie overeind houdt als de Pálinka begint te werken.",
    venues: [
      {
        name: "Bamba Marha Burger Bar",
        blurb:
          "De burgergod van Budapest. Altijd vol, altijd goed. Begin hier voordat je begint met drinken.",
      },
      {
        name: "Karaván Street Food",
        blurb:
          "Een steegje vol foodtrucks direct naast Szimpla Kert. Lángos (gefrituurd deeg), vette burgers en ijskoud bier. Perfecte tussensnack.",
      },
      {
        name: "Tuning Burger",
        blurb:
          "Legendarische porties, ambachtelijke speciaalbieren erbij. Hier eet je jezelf in een coma waar je blij van wordt.",
      },
      {
        name: "Meatology Budapest",
        blurb:
          "Voor de carnivoor die serieus genomen wil worden. Dikke steaks, worsten, en nul groente in zicht.",
      },
      {
        name: "Központ",
        blurb:
          "Rauwe late-night bar met pizza's en bites die beter zijn dan ze moeten zijn. Ideaal om 02:00 als de honger toeslaat.",
      },
      {
        name: "Zing Burger",
        blurb:
          "Betrouwbare lokale keten voor als je geen plan hebt maar wel trek. Overal in de stad.",
      },
    ],
  },
  {
    id: "craft",
    title: "Craft Beer Spots",
    iconName: "beer",
    blurb: "Voor als we een dikke NEIPA willen in plaats van lauw pils van de tap.",
    venues: [
      {
        name: "Élesztőház",
        blurb:
          "Oude glasfabriek omgebouwd tot biertempel met binnentuin. 20+ wisselende kranen. Hier kun je een middag verliezen.",
      },
      {
        name: "Krak'n Town",
        blurb:
          "Steampunk-bar die eruitziet als een filmset. Het bier is net zo goed als de aankleding bizar is.",
      },
      {
        name: "Jónás Craft Beer House",
        blurb:
          "Terras aan de Donau. Relaxed zondagmiddaggevoel, maar dan met serieus bier. Katerherstel in stijl.",
      },
      {
        name: "First Craft Beer & BBQ",
        blurb: "Prijswinnend bier + BBQ erbij. Twee vliegen, één klap, nul spijt.",
      },
    ],
  },
  {
    id: "ruin",
    title: "Ruin Bars & Clubs",
    iconName: "martini",
    blurb: "De iconische, chaotische hotspots van de Joodse Wijk. Hier wordt het smerig.",
    venues: [
      {
        name: "Szimpla Kert",
        blurb:
          "De moeder aller ruin bars. Een bizar doolhof van neon, badkuipen en retro troep. Hier moet je geweest zijn.",
      },
      {
        name: "Instant-Fogas Complex",
        blurb:
          "Meerdere bars samengesmolten tot één mega uitgaans-monster. Gas erop tot 06:00. Eenmaal binnen kom je er niet meer uit.",
      },
      {
        name: "Gozsdu Udvar",
        blurb:
          "Overdekte passage vol clubs, restaurants en kroegen. Altijd druk, altijd luid, altijd goed.",
      },
      {
        name: "Doboz",
        blurb:
          "Strakker dan je gemiddelde ruin bar. Mega boom op de binnenplaats, houten gorilla erbij. Vraag niet waarom.",
      },
    ],
  },
  {
    id: "culture",
    title: "Toeristische Highlights",
    iconName: "camera",
    blurb: "Even afvinken tussen de biertjes door. Zo kun je thuis zeggen dat je cultuur hebt gehad.",
    venues: [
      {
        name: "Het Parlementsgebouw",
        blurb: "Het goudverlichte monument aan het water. Eén foto en je moeder is tevreden.",
      },
      {
        name: "Széchenyi Badhuis",
        blurb: "Het gele paleis met warme buitenbaden. Perfecte katerherstel — of pre-game opwarming.",
      },
      {
        name: "De Centrale Markthal (Nagycsarnok)",
        blurb:
          "Gigantische historische hal vol Hongaarse worsten, paprikapoeder en lokale chaos. Koop wat voor thuis.",
      },
      {
        name: "Terror Háza (House of Terror)",
        blurb:
          "Museum over de nazitijd en het communisme. Indrukwekkend, confronterend, en precies wat je nodig hebt na drie dagen zuipen.",
      },
    ],
  },
];

export const FILTER_PILLS: { id: VenueCategory | "all"; label: string }[] = [
  { id: "all", label: "Alles" },
  { id: "craft", label: "Beer & Craft" },
  { id: "ruin", label: "Ruin Bars" },
  { id: "food", label: "Food" },
  { id: "culture", label: "Cultuur" },
];
