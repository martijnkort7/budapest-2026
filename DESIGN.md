# Budapest Boys Trip — Design Audit & Redesign Brief

**Status:** Stap 1 van design-overhaul chain (audit → redesign → polish).
**Doel:** dit document voedt `/redesign-existing-projects` (stap 2) met concrete recepten en `/emil-design-eng` (stap 3) met de polish-laag findings.

---

## Constraints (vast, niet aanraken)

- **Mobile-only**, max-w 480px. Geen desktop-uitbouw.
- **Nederlandse copy**, informele "boys trip" toon. Geen Engelse strings, geen formele toon.
- Alle bestaande **functionaliteit** blijft werken: tab-routing, localStorage beer-counter, spin wheel canvas, fx-rate fetch, SOS WhatsApp-link, venue filter.

Alles anders (kleuren, fonts, emoji-iconen, Hongaarse vlag-accenten, complete component-rewrites, tab-architectuur) **mag op tafel** als het naar 10/10 brengt.

---

## Executive Summary

| Score | Detail |
|---|---|
| **Nielsen heuristics** | **24 / 40** — Acceptable, no fatal sins, clustered op "no system, just patterns" |
| **Technical audit** | **15 / 20** — Solid foundation, fix a11y + viewport-lock voor production-ready |
| **AI Slop verdict** | **6/10 slop** — "competent dark mobile dashboard" silhouette |

**Top 5 blocking + major problemen:**
1. SOS-knop deelt geen locatie en zit 3 taps diep — pretendeert een safety feature te zijn.
2. Geen `focus-visible` state op één enkel interactief element.
3. Viewport zoom is hardcoded uitgeschakeld (`maximumScale: 1`, `userScalable: false`) — WCAG-overtreding.
4. Emoji-iconen (TabNav 🛠️ leest als "settings", FactsCarousel, ExploreTab) — single grootste AI-tell.
5. Geen type-scale: 6 Anton sizes ad-hoc, geen ratio. Microcopy (de soul van het product) wordt dimmed weergegeven.

**Biggest opportunity:** de NL boys-trip voice is sterk maar visueel gedimd. De redesign moet de copy luider maken, niet quieter — het is het product.

---

## AI Slop Verdict

De UI ontwijkt de meeste klassieke AI-tells (geen gradient-text, geen glassmorphism overal, geen Tailwind default blue/slate, geen identieke card grids, geen modal-first denken). Twee blijvende tells + structurele uniformiteit zakken de score:

**Specifieke tells:**
- **Card-uniformiteit.** `rounded-tool border border-border bg-card px-4 pt-6 pb-7 text-center shadow-ambient` herhaalt door SpinWheel, BeerCounter, CurrencyConverter, Lexicon. Vijf tools, één silhouet.
- **`shadow-ambient` everywhere** (6+ keer per scherm) — niet ambient, wallpaper.
- **Sunset→gold gradient op elke primary CTA** (MapsButton, SpinWheel knop). Klassieke "warme gradient = primary" reflex.
- **Emoji als icoonsysteem.** TabNav 🏠🗺️🛠️, FactsCarousel 🥃🏚️💧🏆, ExploreTab 🍔🍺🍸📸. Wisselend per OS, ondergraaft Hongaarse identiteit.
- **Side-stripe border** op venues: `border-l-2 border-gold` (`ExploreTab.tsx:98`). Exact het patroon dat de design-laws verbieden. 15× herhaald.
- **Pure `#000`** als `--color-app` zonder tint (`globals.css:5`). Inconsistent met de rest van de palette die wel getint is.
- **4px tricolor Hongaarse vlag-stripe** bovenaan — decoratief tax, geen systeem.

**Wat NIET slop is:** NL informele copy in de data files (`Het Rad des Doods`, `Stijve Neansen`, `Monopoly-poen`), het `result-reveal` `@starting-style` trick, de `sos-pulse` keyframe. Echte craft pockets — begraven onder uniform card grids.

---

## Heuristic Scores

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Mist: aantal venues na filter, beer-counter session vs trip-totaal, FX "fallback" is microscopisch |
| 2 | Match real world | **4** | NL boys-trip tone is de soul, dit is de win |
| 3 | User control & freedom | 2 | Geen beer-counter undo, geen multi-filter, geen swipe-between-tabs |
| 4 | Consistency & standards | 2 | Heading sizes driften: text-2xl, text-3xl, text-xl, text-lg — geen ladder |
| 5 | Error prevention | 3 | Beer-reset confirm OK; mist: negative-guard currency, FX-offline state, overflow huge HUF |
| 6 | Recognition vs recall | 2 | Emoji-iconen niet als systeem herkenbaar, filter-pills missen icoon-affordance |
| 7 | Flexibility / efficiency | 2 | Geen quick-add (+5 beers), geen copy-tap op lexicon, geen swipe-tab, haptic alleen op 2 plekken |
| 8 | Aesthetic & minimalist | 2 | Minimalist ja, aesthetic generic. Hongaarse identiteit alleen in 4px stripe + SOS rood |
| 9 | Error recovery | 2 | FX-fallback bestaat maar onleesbaar. Geen "spin opnieuw". WhatsApp-fallback ontbreekt |
| 10 | Help & documentation | 2 | Lexicon = doc-laag maar verstopt onderaan Tools. Geen first-run hint |
| **Totaal** | | **24 / 40** | **Acceptable** — fundament staat, structureel werk nodig |

## Technical Audit Scores

| # | Dimension | Score | Key Finding |
|---|---|---|---|
| 1 | Accessibility | **2/4** | Geen `focus-visible` anywhere. Canvas wheel mist tekst-alt. `ink-muted` op `bg-card` ≈ 3.9:1 (faalt WCAG AA). |
| 2 | Performance | 3/4 | next/font swap OK, transform/opacity-only animaties. Maar SpinWheel canvas niet DPR-scaled, missing useEffect dep. |
| 3 | Theming | **4/4** | Sterk token-systeem in `@theme`. Hex buiten globals.css is canvas-paint of platform-meta — gerechtvaardigd. |
| 4 | Responsive | 3/4 | Safe-area helpers OK, max-w 480 OK, touch targets vaak ruim. Reset-rij breekt op 320px, viewport-lock blokkeert zoom. |
| 5 | Anti-Patterns | 3/4 | Geen em-dashes, geen glassmorphism, geen generic blues. Wel side-stripe op venues + pure #000. |
| **Totaal** | | **15 / 20** | **Good** — fix a11y + viewport voor production |

---

## Priority Issues

### P0 — Blocking (fix immediately)

1. **SOS-knop deelt geen locatie + zit 3 taps diep.**
   - Location: `src/components/SosBox.tsx` + `src/components/AppShell.tsx`
   - Impact: het is een safety feature die pretendeert te functioneren. Dronken Alex om 4:30 moet eerst Home → Explore → Tools om hem te vinden. Pete krijgt een NL-tekstje zonder locatie.
   - Fix: capture `navigator.geolocation` bij klik, append `https://maps.google.com/?q=lat,lng` aan het WhatsApp bericht. Promote SOS naar persistent floating action button (rechterhoek, alle tabs), of header-icon. Verkort body copy tot ≤12 woorden.

2. **Geen `focus-visible` op ANY interactive element.**
   - Location: alle componenten. `grep focus-visible|focus:` in `src/` = 0 hits.
   - Impact: combineer met globale `-webkit-tap-highlight-color: transparent` (`globals.css:104,109`) en je hebt een UI die niet keyboard-navigable is.
   - Fix: één globale rule in `globals.css`:
     ```css
     *:focus-visible {
       outline: 2px solid var(--color-gold);
       outline-offset: 2px;
       border-radius: var(--radius-pill);
     }
     ```
     Plus per-component `focus-visible:ring-2 focus-visible:ring-gold` op interactive elements.

3. **Viewport zoom geblokkeerd.**
   - Location: `src/app/layout.tsx:46-47` (`maximumScale: 1`, `userScalable: false`)
   - Impact: slechtziende gebruikers kunnen niet inzoomen. WCAG 1.4.4 + 1.4.10 overtreding.
   - Fix: verwijder beide. iOS double-tap-zoom op inputs is opgelost zolang inputs `font-size ≥ 16px` zijn (CurrencyConverter inputs zijn al `text-2xl`).

### P1 — Major (fix before ship)

4. **Emoji-iconen vervangen door SVG-set.**
   - Location: `TabNav.tsx`, `FactsCarousel.tsx`, `ExploreTab.tsx` (venue group icons), `SosBox.tsx`, mogelijk `Lexicon.tsx`.
   - Impact: TabNav 🛠️ leest als "settings" → dronken Alex tapt verkeerd. Emoji rendert wisselend per OS, ondergraaft Hongaarse identiteit.
   - Fix: design een custom 8-icon set (home, map, tools, beer, ruin-bar, food, culture, alarm) in Lucide-stijl 1.5px stroke, of leentje uit Lucide met overrides. Hou de Hongaarse vlag-kleuren in de filled-versies.

5. **Type-scale ontbreekt — definieer en enforce.**
   - Locations: alle component-files. 6 Anton-sizes ad-hoc gebruikt (text-lg, text-xl, text-2xl, text-3xl, text-6xl).
   - Impact: visual hierarchy is plat; aliases/copy worden gedimd terwijl ze het luidste deel van het product zijn.
   - Fix: definieer named utilities in `globals.css`:
     ```
     display-xl   Anton  44 / 44   tracking -0.02em  uppercase   — tab hero only
     display-lg   Anton  32 / 36   tracking  0.00em  uppercase   — section headers
     display-md   Anton  22 / 26   tracking  0.04em  uppercase   — sub-section
     label-xs     Outfit 600 11/14 tracking  0.12em  uppercase   — tab labels, kicker
     body-md      Outfit 400 15/22 tracking  0.00em              — paragraph body
     body-sm      Outfit 400 13/19                               — captions, blurbs
     mono-data    Outfit 600 28/28 tabular-nums                  — beer count, currency value
     ```
     Strip `text-xl/2xl/3xl/6xl` ad-hoc gebruik. Tools tab titles → `display-lg`. Venue card titles → `display-md`. Aliases → `body-md` (niet meer `text-sm italic ink-muted`).

6. **Tools tab cognitive overload — 5 cards stacked.**
   - Location: `TabContent` Tools rendering.
   - Impact: dronken Alex landt op heaviest tab. SOS, wheel, counter, currency, lexicon allemaal claimen aandacht.
   - Fix opties (kies bij stap 2):
     - A) Groepeer in 3 sectie-headers: "Survival" (SOS prominent), "Drink" (wheel + counter), "Wallet" (currency + lexicon).
     - B) Promote SOS naar persistent FAB (zie P0 #1) + maak Tools een 2×2 grid van resterende tools.
     - C) Splits in 4 tabs: Home / Explore / Drink / Survival.

7. **`MapsButton` is globaal persistent — architecturaal mis.**
   - Location: `src/components/AppShell.tsx` — gerenderd boven elke tab.
   - Impact: gradient CTA "Király utca 47" verschijnt op elk scherm zonder context. Dominantste UI-element wordt structureel genegeerd.
   - Fix: verplaats naar Home-tab, label als "Onze Airbnb". Vervang de persistent slot door SOS-FAB.

8. **Lexicon zit begraven onderaan Tools.**
   - Location: `src/components/Lexicon.tsx`
   - Impact: het is de Hongaars-NL phrasebook, hoort niet onder "tools".
   - Fix: maak het een bottom-sheet trigger 🇭🇺 in de header (in dynamische tab-titel), tikbaar van elk scherm. Of voeg "Lekker wijf" → "Szép nő" prominently in de header zelf.

9. **CurrencyConverter mist quick-chip amounts.**
   - Location: `CurrencyConverter.tsx:44-72`
   - Impact: drunk users converteren altijd dezelfde amounts ("hoeveel is een biertje, hoeveel is dat menu").
   - Fix: voeg een rij chips toe: €5 / €10 / €20 / €50 / 500 HUF / 2000 HUF. Tap = vul input.

10. **Hongaarse groen (`#008751`) is gedefinieerd maar nergens gebruikt.**
    - Location: `globals.css` — `--color-hu-green`.
    - Impact: Hongaarse identiteit valt terug naar "rood + goud". Groen is the freshest token in de palette.
    - Fix: gebruik groen semantisch — "live/open/safe" indicators: FX live-badge, venue "open now" (toekomst), spin wheel result chip, currency input "submitted" feedback. Definieer een role.

11. **Tab nav indicator-stijl + tab labels te klein (10px).**
    - Location: `TabNav.tsx`
    - Impact: 10px is onder iOS HIG (11pt minimum voor tab labels). Plus emoji-icon probleem (zie #4).
    - Fix: labels naar `label-xs` (11px met 0.12em tracking — readbaar door tracking). SVG-icons via #4.

12. **Header repeats "Budapest Boys Trip" op elke tab.**
    - Location: `src/components/AppShell.tsx:20-26`
    - Impact: 56px vertical wasted × 100% sessions. User weet de app-naam.
    - Fix: dynamic per tab: "De Line-up · 7 dudes" / "Spots · 15 in totaal" / "Survival Kit". Of helemaal weg op Home en alleen tab-naam tonen.

13. **`text-ink-muted` (#71717a) onder WCAG AA op card-background.**
    - Location: token in `globals.css:10`, gebruikt in 8+ plekken.
    - Impact: 3.9:1 contrast — faalt WCAG AA voor normale text. Affects: venue blurbs, facts body, SpinWheel blurb, Lexicon entries, SosBox subtext.
    - Fix: shift token naar `#8a8a93` of `#9090a0` (≈ 5.5:1). Behoud `--color-ink-soft` voor extra-subtle.

14. **SpinWheel canvas niet DPR-scaled.**
    - Location: `SpinWheel.tsx:8, 167-169`
    - Impact: op DPR-3 phones (iPhone 14 Pro) wordt het wiel blurry. Plus huidige 6-grays palette ziet eruit als een gebroken wiel.
    - Fix: `canvas.width = 260 * window.devicePixelRatio; ctx.scale(dpr, dpr)`, CSS-size 260. Plus segment-palette rotatie door `hu-red`, `hu-green`, `gold`, getinte neutrals — niet 6 grays.

### P2 — Minor

15. ExploreTab venue numbering "1. Bamba Marha" suggereert ranking — kill nummers OF maak van #1 een echte hero (groter, hu-red badge).
16. SpinWheel post-result: geen "Draai Opnieuw" button — dezelfde disabled CTA blijft staan.
17. FactsCarousel: geen scroll affordance (geen dots, geen peek, geen "1/6" counter).
18. BeerCounter: geen `-1` of undo. Long-press = -1 zou logisch zijn.
19. FX fallback indicator (`· fallback` in 12px ink-soft) onleesbaar.
20. SquadList avatars zijn lazy initials in cirkels — 7 known guys, deserve meer.
21. ExploreTab filter pills `py-1.5` ≈ 32px hoog — onder WCAG 2.5.5 44px target.
22. BeerCounter reset-bevestiging breekt op 320px (iPhone SE) — geen flex-wrap.
23. CurrencyConverter ⇌ glyph in sunset color → leest als destructive, moet neutral of hu-green.
24. SOS body copy: 60+ woorden. Kort naar ≤12 voor crisis-readability.
25. SpinWheel canvas mist tekst-alternatief en aria-live op winner reveal.

### P3 — Polish (emil-domein)

26. `flag-wipe` keyframe gedefinieerd in `globals.css` en **nooit aangeroepen**. Chekhov's gun — invoke op tab switch als 1-frame red→green sweep.
27. Subtle haptic op tab change (haptic is al gewired in BeerCounter + SpinWheel).
28. SOS pulse pausen wanneer off-screen (IntersectionObserver) voor battery.
29. Long venue name `(Nagycsarnok)` wrap looks broken — wrap als `<small>` of break-after.
30. Reuse `result-reveal` motion idiom op beer-milestones (elke 10 beers = flash) en filter-changes.
31. `useEffect` missing dep in `SpinWheel.tsx:26-28`.
32. CurrencyConverter rounding-jitter bij snel typen (debounce of formatteer-pas-op-blur).
33. `pb-28` op main → krap met safe-area + nav-height op tekstvergroting. Naar `pb-32` of `pb-[calc(112px+env(safe-area-inset-bottom))]`.
34. Pure `#000` voor `--color-app` → tint naar `#050507` voor consistentie met rest palette.
35. CurrencyConverter inputs missen `aria-label`.
36. Heading hierarchy: section-headings (`De Line-up`, `Nutteloze Feiten`) zijn h2 maar visueel lichter dan h3 venue titles — promote of switch.

---

## Per-Section Findings

### Globals (`src/app/globals.css`)
- Werkt: Tokens well-named, 5-radius systeem intentioneel, custom easing curves deliberate, `prefers-reduced-motion` correct geïmplementeerd.
- Werkt niet: 3 hu-* kleuren maar groen nergens gebruikt. `flag-wipe` keyframe never invoked. Twee shadow tiers gedefinieerd maar één (`ambient`) uniform gebruikt. Pure `#000` zonder tint.

### Layout (`src/app/layout.tsx`)
- Viewport-lock (P0). 4px tricolor stripe is decoratief tax — commit als systeem (border-top op section headers, of focus-ring patterns) of kill.

### AppShell (`src/components/AppShell.tsx`)
- Statische header "Budapest Boys Trip" (P1 #12). MapsButton structureel mis-geplaatst (P1 #7).

### TabNav (`src/components/TabNav.tsx`)
- Werkt: Indicator-bar (2px gold top) subtiel en goed. Animatie 380ms ease-drawer correct.
- Werkt niet: Emoji-icons (P1 #4). Labels 10px (P1 #11). Geen focus-visible (P0 #2).

### ExploreTab (`src/components/ExploreTab.tsx`) — PRIORITY TARGET
- Card-ception (venue sub-card inside group card). Side-stripe gold border (P2). Numbering implies ranking. Filter pills te klein touch target. Default state `Alles` = worst cognition. Geen venue metadata (afstand van Airbnb, open hours, prijs-tier). Voelt als blog-post, niet als gids.
- **Redesign-direction:** Verwijder de geneste cards. Venue-list = horizontal cards met:
  - **Display-md** venue name in Anton, hu-red number-badge als ranking bedoeld is, anders weglaten.
  - **Body-md** blurb (niet meer dimmed muted).
  - Optional metadata row: "8 min van Airbnb · €€ · open til 04:00" (echte icons, niet emoji).
  - Geen left-border accent — laat ze chrome-loos, scheid met `border-b border-hairline-soft`.
  - Group titles als `display-lg` met hu-flag color per categorie (rood=ruin, groen=cultuur, goud=craft, wit=food).

### SpinWheel (`src/components/SpinWheel.tsx`)
- Werkt: Best-engineered component. Canvas easing + haptic tick on point.
- Werkt niet: 6 grays + 1 gold = looks broken. Geen "draai opnieuw". Canvas niet DPR. Geen aria. Spinning state = zelfde knop-positie.

### BeerCounter (`src/components/BeerCounter.tsx`)
- Werkt: 200×200 circular +1 button is **het beste UI-moment in de app**. Drunk-proof, tactiel, satisfying. **Replicate dit pattern in andere tabs.**
- Werkt niet: Count nummer boven competeert met button. Geen undo. Geen session vs trip-totaal. Reset-rij breekt op 320px.

### SosBox (`src/components/SosBox.tsx`)
- Werkt: Pulse-animatie goed. Voice on point.
- Werkt niet: Geen locatie in WhatsApp bericht (P0). Body copy te lang voor crisis. Eén fallback contact (wat als Pete's phone dood is?).

### CurrencyConverter (`src/components/CurrencyConverter.tsx`)
- Werkt: Bi-directional input goed. "HUF-Hustler Pro" copy lands.
- Werkt niet: Geen quick chips. ⇌ in sunset (looks destructive). Fallback-indicator onleesbaar.

### FactsCarousel (`src/components/FactsCarousel.tsx`)
- Werkt: Horizontal scroll = goeie progressive disclosure.
- Werkt niet: Geen scroll affordance. 6 cards × 270px = 1620px scroll zonder counter/dots. Identiek-uitziende cards.

### SquadList (`src/components/SquadList.tsx`)
- Initials-in-cirkel = lazy. Aliases zijn de funniest copy en staan in `text-sm italic ink-muted` (dimmed!). Statussen ook gedimd. Make the funny loud.

### Lexicon (`src/components/Lexicon.tsx`)
- Verstopt onderaan Tools. Geen tap-to-copy. "Lekker wijf → Szép nő" is most-used entry, ziet er identiek uit als "Hallo → Szia". Pronunciation in `()` moet eigen styling.

### MapsButton (`src/components/MapsButton.tsx`)
- Persistent across tabs = mistake. Label "Király utca 47" pre-arrival = opaque (label als "Onze Airbnb").

---

## Concrete Design Recipes (voor stap 2)

### Type scale (definieer in globals.css)
```css
.text-display-xl  { font-family: var(--font-anton); font-size: 44px; line-height: 44px; letter-spacing: -0.02em; text-transform: uppercase; }
.text-display-lg  { font-family: var(--font-anton); font-size: 32px; line-height: 36px; text-transform: uppercase; }
.text-display-md  { font-family: var(--font-anton); font-size: 22px; line-height: 26px; letter-spacing: 0.04em; text-transform: uppercase; }
.text-label-xs    { font-family: var(--font-outfit); font-weight: 600; font-size: 11px; line-height: 14px; letter-spacing: 0.12em; text-transform: uppercase; }
.text-body-md     { font-family: var(--font-outfit); font-weight: 400; font-size: 15px; line-height: 22px; }
.text-body-sm     { font-family: var(--font-outfit); font-weight: 400; font-size: 13px; line-height: 19px; }
.text-mono-data   { font-family: var(--font-outfit); font-weight: 600; font-size: 28px; line-height: 28px; font-variant-numeric: tabular-nums; }
```
Strip `text-xl/2xl/3xl/6xl` ad-hoc gebruik. Replace door named utilities.

### Color semantics
```
hu-red       → SOS, errors, "destructive only"  (NIET op CTAs)
hu-green     → "live/open/safe/go" — FX live-badge, venue open-now, spin wheel result chip, currency submit feedback
gold         → beer-context only — counter, wheel winner, pálinka fact, "this is the answer"
sunset       → micro highlight accent — NIET als primary CTA
ink/card/bg  → surfaces
```
**Kill** de `from-sunset to-gold` gradient op MapsButton en SpinWheel CTA. Pick één:
- Solid `hu-green` voor "go" actions (Maps, "Draai")
- Solid `gold` voor beer-actions (counter +1)
- Solid `hu-red` voor SOS (al goed)

### Shadow tiers (gebruik by role, niet by gut)
```css
.shadow-surface { box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 8px -2px rgba(0,0,0,0.4); }
.shadow-card    { box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 12px 24px -8px rgba(0,0,0,0.5); }
.shadow-hero    { box-shadow: above + 0 0 40px rgba(245,197,24,0.25); }  /* MAX 1 per screen */
.shadow-sos     { box-shadow: 0 0 0 4px rgba(220,20,60,0.5); animation: sos-pulse 2.4s; }
```
Currently `shadow-ambient` is 6+ keer per screen — vervang door role-aware tier.

### Spacing rhythm
```
--space-section: 40px;   /* tussen top-level blocks */
--space-card:    16px;   /* tussen stacked cards */
--space-row:     8px;    /* lijst-items binnen card */
--space-pill:    6px;    /* inline chips */
```

### Microcopy hierarchy
**Promote** de aliases en tool titles. Stop dimmen van de funny. Aliases in `body-md` (niet `text-sm italic`). Statussen in `label-xs hu-green` als "live status indicator". Venue blurbs in `body-md`, geen `text-sm muted`.

### Focus state (één globale rule)
```css
*:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
  border-radius: var(--radius-pill);
}
```

---

## Strategic Decisions (vastgelegd door user — gebruik deze als gegeven in stap 2)

1. **Tab-architectuur: SOS als persistent FAB, Tools blijft 1 tab als 2×2 grid.**
   - SOS-knop wordt floating action button rechtsonder, zichtbaar op ALLE tabs. 1 tap altijd.
   - SOS verdwijnt uit Tools-tab content (geen dubbel) — alleen de FAB.
   - Tools-tab houdt: SpinWheel, BeerCounter, CurrencyConverter, Lexicon → 2×2 grid layout op desktop-ish wide, of 1-col stack op smaller — maar visueel paired (Drink-pair: wheel+counter, Wallet-pair: currency+lexicon).
   - FAB design: 56×56 cirkel, hu-red fill, witte alarm-icon, `shadow-sos` met pulse op idle, scale-down op press. Positioneer respecting `safe-area-inset-bottom` zodat het boven de TabNav zit. Tap opent een bottom-sheet met de huidige SOS body + verzendknop, NIET direct WhatsApp (geeft drunk-user 1 secondary check).

2. **Hongaarse vlag: semantisch (kleur-roles), niet decoratief.**
   - `hu-red` → destructive/error/SOS only.
   - `hu-green` → live/open/safe/go state — FX live-badge, venue open-now hints, currency submit feedback, "Draai" CTA in spin wheel, spin result chip.
   - `hu-white` → neutral text accent, tab-indicator highlight.
   - `gold` → beer-context only (counter, wheel winner, pálinka fact).
   - `sunset` → micro accent, NIET als primary.
   - 4px tricolor stripe in `layout.tsx`: behoud als systeem-anchor — gebruik als focus-ring color rotation (red→white→green op repeat focus cycles), OF als section-divider border-top op section headers.

3. **Squad: per-person color-coding.**
   - 7 unieke accent kleuren, één per squad-member, gedefinieerd in `src/data/squad.ts` als nieuw veld `accentColor` (hex string).
   - Pas toe op: SpinWheel segments (vervangt de 6 grays met de 7 squad-kleuren — echt persoonlijk), SquadList avatar-cirkels (kleur per persoon ipv generic), eventueel BeerCounter cycling (kleur wijzigt per beer-milestone als easter egg).
   - Palette: kies kleuren die tegen donkere bg pop'en, ≥4.5:1 contrast voor witte text overlay. Suggested seed (mag bijgesteld):
     - Martijn: `#f5c518` (gold) — Beheerder krijgt brand-gold
     - Niek: `#d72638` (hu-red shade)
     - Bono: `#008751` (hu-green)
     - Jeroen: `#3a86ff` (electric blue)
     - Joep: `#ff6b35` (sunset)
     - Oli4: `#9d4edd` (purple)
     - Peter Pan: `#06d6a0` (mint)

### Open beslissingen (niet blocking — stap 2 mag zelf kiezen, fallback defaults hieronder)

- **Shared state via trip-code:** STATUS QUO (individueel, localStorage-only). Geen backend. Een eventuele "we zijn hier geweest" venue-toggle is een nice-to-have voor toekomst, niet voor deze chain.
- **Default Explore filter:** stap 2 kiest. Aanrader: "Tap een categorie" empty-state met alle 4 pills prominent (smart default zonder content-overload). Fallback: "Ruin Bars" als default (eerlijke interest reflectie).

---

## What WORKS (keep & replicate)

1. **De NL voice.** `Het Rad des Doods`, `Slinger het rad en het lot bepaalt wie de lul is`, `Monopoly-poen`, `Stijve Neansen`, `Lieg niet tegen jezelf`. Dit is het product. Elke visuele beslissing moet deze copy luider maken.
2. **Het 200×200 BeerCounter button.** Drunk-proof, tactiel, fun. Repliceer dit pattern: elke tab krijgt ONE "hero interaction". Explore mist er een, Tools heeft er 3 die vechten.
3. **`result-reveal` via `@starting-style`.** Moderne CSS-only entrance animatie, no JS. Gebruik dit idioom op tab-change, beer-milestones, filter-changes — maak het system motion.
4. **Token-systeem in Tailwind v4 @theme.** Volwassen design-engineering. Bouwen we op.
5. **Server-rendered FX-rate met `revalidate = 3600` + fallback flag.** Pragmatisch, snel, geen waterfall.
6. **`prefers-reduced-motion` correct geïmplementeerd** (`globals.css:170-179`). Behouden.

---

## Recommended Actions (chain progression)

**Stap 2 — `/redesign-existing-projects`** voert uit (volgorde):

1. **First — globals.css upgrade:** type-scale utilities, color semantics, shadow tiers, focus-visible rule, ink-muted contrast-fix, viewport-lock weghalen.
2. **Second — shared chrome:** SOS persistent FAB design + locatie-share, dynamic header per tab, SVG icon-set (8 icons), MapsButton verplaatsen naar Home.
3. **Third — per-tab redesigns:**
   - Tools: kies architectuur uit Strategic Question #1, herontwerp accordingly.
   - Explore: kill card-ception, kill side-stripe, kill default-Alles, voeg metadata-rows, group-titles per hu-color.
   - Home: SquadList prominenter (aliases als `body-md`, statussen als `label-xs hu-green`), FactsCarousel met scroll-counter, MapsButton geïntegreerd als "Onze Airbnb" card.
4. **Fourth — components:** SpinWheel DPR-fix + brand-palette segments + spin-again button; BeerCounter long-press undo + session/trip-totaal; CurrencyConverter quick-chips + ⇌ neutral; Lexicon bottom-sheet promotion.

**Stap 3 — `/emil-design-eng`** pakt de P3-laag:
- `flag-wipe` keyframe invoken op tab-change.
- Haptic op tab-change + filter-change.
- `result-reveal` reuse op beer-milestones en filter-changes.
- SOS pulse off-screen pauseren.
- Loading-state polish op CurrencyConverter fetch.
- Empty-state polish op filter "geen resultaten".
- Micro-press-feedback op alle taps (venue-cards, pills, tool-cards).
- Easing-curves finetunen op tab-transitions (huidige 380ms = good base, mogelijk 320–360ms voor snappier).
