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
          "De burger-God van Boedapest. Altijd vol, altijd goed door lokale ingrediënten. Zorg dat je hier tenminste één keer een bodem legt.",
      },
      {
        name: "Gettó Gulyás",
        blurb:
          "Essentiële Hongaarse stop voor een échte solide bodem. Bekend om de beste pörkölt (stoof) en gulyás in de Zsidó Negyed (Joodse wijk). Reserveren is een must.",
      },
      {
        name: "Karaván Street Food",
        blurb:
          "Een steegje vol foodtrucks direct naast Szimpla Kert. Ideaal voor groepen: de één pakt Lángos, de ander een vette burger en koud bier. Perfect als tussensnack.",
      },
      {
        name: "Meatology Budapest",
        blurb:
          "Voor de carnivoor die sit-down wil dineren met goede steaks, worstjes en burgers. Handig gelegen vlak bij de Basiliek.",
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
          "Oude glasfabriek omgebouwd tot hét biertempel met binnenplaats. 20+ wisselende kranen verdeeld over de ruimtes. Hier kun je makkelijk een middag verliezen.",
      },
      {
        name: "Gravity Brewing",
        blurb:
          "Eén van de best beoordeelde micro-breweries in de stad. Gelegen in een toffe kelder waar je direct op de brouwketels kijkt. 12 taps en topkwaliteit.",
      },
      {
        name: "First Craft Beer & BBQ",
        blurb:
          "Toplocatie in de Dob utca. Combineert een enorme taplijst (20 taps) van eigen en internationale bieren met hele goede BBQ-gerechten en een showkeuken.",
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
          "De moeder aller ruin bars. Een bizar doolhof van neon, badkuipen en retro troep. Ga hier 's middags of vroeg in de avond heen, later staat er een enorme rij.",
      },
      {
        name: "Központ",
        blurb:
          "Overdag meer café/culturele spot, 's avonds dé plek waar de lokale jeugd zich verzamelt met dj's. Een perfecte schakel tussen je eerste biertje en de nachtclubs.",
      },
      {
        name: "Doboz",
        blurb:
          "Strakker dan je gemiddelde ruin bar, met een mega boom op de binnenplaats inclusief houten gorilla. Uitstekende spot als je clubbing zoekt met ruin-bar vibes.",
      },
      {
        name: "Instant-Fogas Complex",
        blurb:
          "Meerdere bars samengesmolten tot één mega uitgaans-monster. Gratis entree en gas erop tot 06:00. Dé eindbestemming van de nacht.",
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
        name: "Széchenyi Badhuis",
        blurb:
          "Het gigantische gele paleis met warme buitenbaden. Perfect voor pre-game opwarming of om de kater weg te weken na een lange nacht.",
      },
      {
        name: "De Centrale Markthal (Nagycsarnok)",
        blurb:
          "Gigantische historische hal. Boven haal je streetfood, beneden paprika en lokale worst. Let op: gesloten op zondag.",
      },
      {
        name: "Terror Háza (House of Terror)",
        blurb:
          "Indrukwekkend museum in het voormalige hoofdkwartier van de nazi- en communistische geheime diensten. Confronterend, maar essentieel voor wat cultuur.",
      },
      {
        name: "Het Parlementsgebouw",
        blurb:
          "Het waanzinnig verlichte monument aan het water. Een snelle foto vanaf de overkant van de Donau is al indrukwekkend genoeg.",
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
