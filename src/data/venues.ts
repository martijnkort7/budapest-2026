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
      "Essentieel voer om de groep overeind te houden. Geen fine dining, maar kneitergoed.",
    venues: [
      {
        name: "Bamba Marha Burger Bar",
        blurb:
          "Topklasse burgers, extreem populair, snel klaar. Perfect als fundament.",
      },
      {
        name: "Karaván Street Food",
        blurb:
          "Direct naast Szimpla Kert. Een buitensteeg vol foodtrucks. Burgers, traditionele Lángos (gefrituurd deeg) en ijskoud bier.",
      },
      {
        name: "Tuning Burger",
        blurb:
          "Legendarisch in de stad. Mega porties goed vlees en ambachtelijke speciaalbieren.",
      },
      {
        name: "Meatology Budapest",
        blurb:
          "De place-to-be voor echte carnivoren. Grote steaks, worsten en vleesgerechten.",
      },
      {
        name: "Központ",
        blurb:
          "Geweldige bar voor 's avonds laat, met uitstekende bar-bites, pizza's en een rauwe vibe.",
      },
      {
        name: "Zing Burger",
        blurb:
          "De betere, betrouwbare lokale burgerketen door de hele stad voor de snelle trek.",
      },
    ],
  },
  {
    id: "craft",
    title: "Craft Beer Spots",
    iconName: "beer",
    blurb: "Als we een dikke NEIPA nodig hebben in plaats van lauw pils.",
    venues: [
      {
        name: "Élesztőház",
        blurb:
          "Oude glasfabriek getransformeerd tot binnentuin met meer dan 20 wisselende lokale kranen.",
      },
      {
        name: "Krak'n Town",
        blurb:
          "Bizarre bar met een steampunk/Victoriaanse vibe. Naast speciaalbier ook geniaal aangekleed.",
      },
      {
        name: "Jónás Craft Beer House",
        blurb:
          "Aan de Donau. Relaxed terras voor de betere middagsessies in de zon.",
      },
      {
        name: "First Craft Beer & BBQ",
        blurb: "Prijswinnende brouwerij met extreem goed barbecue vlees erbij.",
      },
    ],
  },
  {
    id: "ruin",
    title: "Ruin Bars & Clubs",
    iconName: "martini",
    blurb: "De iconische, chaotische hotspots in de Joodse Wijk.",
    venues: [
      {
        name: "Szimpla Kert",
        blurb:
          "De moeder aller ruin bars. Bizar doolhof vol neon en retro troep. Verplichte kost.",
      },
      {
        name: "Instant-Fogas Complex",
        blurb:
          "Meerdere barren samengesmolten tot één mega uitgaans-epicentrum. Gas erop tot 06:00.",
      },
      {
        name: "Gozsdu Udvar",
        blurb:
          "Een levendige doorgang vol met clubs, restaurants en kroegen. Altijd druk en gezellig.",
      },
      {
        name: "Doboz",
        blurb:
          "Iets strakker dan een ruin bar, meer een club. Gigantische boom op de binnenplaats met een houten gorilla.",
      },
    ],
  },
  {
    id: "culture",
    title: "Toeristische Highlights",
    iconName: "camera",
    blurb: "Tussen de biertjes door even afvinken.",
    venues: [
      {
        name: "Het Parlementsgebouw",
        blurb: "Het goud verlichte symbool aan het water.",
      },
      {
        name: "Széchenyi Badhuis",
        blurb: "Het gigantische medicinale bad buiten. Perfect katerherstel.",
      },
      {
        name: "De Centrale Markthal (Nagycsarnok)",
        blurb:
          "De gigantische historische hal vol Hongaarse worsten, paprika's en lokale sfeer.",
      },
      {
        name: "Terror Háza (House of Terror)",
        blurb:
          "Indrukwekkend museum over de nazitijd en het communisme, voor als jullie diepgang zoeken.",
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
