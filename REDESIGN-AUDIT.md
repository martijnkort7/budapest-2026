# Redesign Audit — Budapest Boys Trip v4 → Next.js port

Audit van [budapest_boys_trip_guide_v4.html](budapest_boys_trip_guide_v4.html), bedoeld als referentie tijdens de port en `/emil-design-eng` polish-fase. Geen code, alleen beslissingen.

---

## 1. STAYS SACRED — niet aanraken

Deze maken de identiteit. Wegpoetsen = karakter weg.

- **Anton display + Outfit body pairing** — Anton's condensed brutalist energy past perfect bij de boys-trip toon. Outfit blijft warm-modern. Niet wisselen.
- **Hungary vlag-stripe top (4px, red/white/green, full-width)** — sterke locatie-identiteit in één enkele lijn. Plaats blijft `position: fixed; top: 0; z-index: 100`.
- **Gold (#f5c518) + sunset (#ff453a) gradient** — signatuur op de hero-CTA ("Navigeer naar huis") en in de Anton-tekst-gradient van de header h1. Niet weghalen, maar wel terugschalen in gebruik (zie sectie 3).
- **Hungary red (#ce1126) op de SOS-box** — gevaar-rood is hier semantisch correct. Pulse-animation blijft (de juiste gimmick voor "ik ben verdwaald om 04:00").
- **Dark theme als basis** — boys-trip-app om 02:00 in een ruin bar; light theme zou bizar zijn.
- **Anton uppercase voor h1–h4** — typografische DNA, blijft.
- **Squad avatars als letter-circles met gold-tinted initial** — meer karakter dan generic stock-avatars. Blijft, maar zie sectie 3 voor refinements.
- **De raunchy Dutch copy** — "Vinger op de clit en gaan", "Marktonderzoek in de lokale pussy", "💀 DE LUL". Dit is GEEN AI-slop, dit is karakter. Letterlijk overzetten.

---

## 2. GETS KILLED — direct sneuvelen in de port

Generieke AI-design tells die het premium-gevoel verzieken.

### Borders & shapes
- **`border-radius: 16px` op alles** ([:98](budapest_boys_trip_guide_v4.html#L98), [:129](budapest_boys_trip_guide_v4.html#L129), [:141](budapest_boys_trip_guide_v4.html#L141), [:152](budapest_boys_trip_guide_v4.html#L152), [:156](budapest_boys_trip_guide_v4.html#L156), [:162](budapest_boys_trip_guide_v4.html#L162), enz.) — universal radius is het Inter-equivalent voor shapes. Vervangen door radius-ritme (zie sectie 3).
- **`border: 1px solid var(--border-color)` op iedere card** — dubbele containment (border + background contrast) is generic. Kies één.

### Shadows
- **`box-shadow: 0 6px 20px rgba(255, 69, 58, 0.2)` op btn-maps** ([:99](budapest_boys_trip_guide_v4.html#L99)), `0 8px 25px rgba(206, 17, 38, 0.4)` op btn-sos ([:185](budapest_boys_trip_guide_v4.html#L185)), `0 4px 15px rgba(255, 69, 58, 0.2)` op btn-action ([:170](budapest_boys_trip_guide_v4.html#L170)) — single-direction drop-shadows in primary-color-with-alpha = textbook AI shadow. Killen voor layered system.
- **`box-shadow: inset 0 0 20px rgba(0,0,0,0.8)` op btn-giant** ([:177](budapest_boys_trip_guide_v4.html#L177)) — inset zwart op een al-zwarte knop voegt niks toe. Weg.

### CTA gradient overuse
- **Gold→sunset gradient op btn-maps, btn-action, AND header h1** — drie keer is teveel. Reserveer voor één hero (de "Navigeer naar huis" knop). Anton h1 krijgt iets distinctievers (zie sectie 3).

### Emoji-spam in headers
- **`💀 DE LUL: NIEK!`** ([:657](budapest_boys_trip_guide_v4.html#L657)) — wheel result is al theatraal, skull-emoji maakt het cartoon
- **`(Swipe ➡️)` in section title** ([:292](budapest_boys_trip_guide_v4.html#L292)) — affordance via interactie, niet via text-emoji
- **`HET RAD DRAAIT...`** met geen visual feedback — text-only spinning state, weg ermee
- Vlag-emoji 🇭🇺 in `BUDAPEST BOYS TRIP 🇭🇺` ([:222](budapest_boys_trip_guide_v4.html#L222)) — vlag-stripe DOET dat al; emoji is dubbel-op. Weghalen, vlag-stripe doet het werk.

### Animation cheats
- **`transition: transform 0.1s` op alle :active** ([:102](budapest_boys_trip_guide_v4.html#L102), [:171](budapest_boys_trip_guide_v4.html#L171)) — 100ms is geen feel, alleen visual confirmation. Spring physics in port.
- **`transition: transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)` op wheel** ([:168](budapest_boys_trip_guide_v4.html#L168)) — naïef + de index-bug op [:655](budapest_boys_trip_guide_v4.html#L655). Compleet herschrijven (zie sectie 3).

### Code-niveau (port-only, niet relevant voor v4 sneuvelen)
- **Div soup** — geen `<nav>`, `<main>`, `<section>` (alleen .section divs). Port krijgt semantic HTML.
- **z-index magic numbers (30, 50, 100)** — z-index scale in Tailwind theme.
- **Inline styles** zoals `style="margin-top: 40px"` op survival-box ([:197](budapest_boys_trip_guide_v4.html#L197)) — naar Tailwind classes.
- **`window.confirm()`** in resetBeers ([:568](budapest_boys_trip_guide_v4.html#L568)) — vervangen door inline confirm-state of een mini-modal.

---

## 3. GETS REFINED — bestaande ideeën, premium uitvoering

### Border-radius ritme (vervangt het uniforme 16px)
Per element-archetype een eigen radius:

| Element | Radius | Reden |
|---|---|---|
| Vlag-stripe, kale lines | `0` | Sharp, geen visual noise |
| Dict-row data, calc-group | `4px` | Subtle, blijft "data" |
| Filter pills, badges | `9999px` | Volledig rond, signaleert "klikbaar/tag" |
| Cards (squad, fact, cat, recommendation) | `10px` | Bewust net niet 8/12, eigen ritme |
| Tool-box containers | `20px` | Soft, container-niveau |
| Hero CTA (btn-maps), btn-giant | `24px` of `28px` | Generous, pulls focus |
| SOS-box, btn-sos | `8px` op box, hard-edged | Communiceert "urgent/serieus", niet "leuk" |

### Shadow systeem (vervangt rgba drop-shadows)
Twee-laagse shadows met semantische intent:

```
Ambient (atmosfeer):        0 1px 0 rgba(255,255,255,0.04)   // top-edge highlight
Key (depth):                0 8px 24px -12px rgba(0,0,0,0.8)  // soft drop

Voor hero CTA:              voeg toe: 0 0 40px -8px rgba(245,197,24,0.3)  // gold halo
Voor SOS pulse:             keyframe op outer ring, not box-shadow stack
```

Niet meer dan twee shadow-lagen op een element. Geen drie-stack "premium" shadows.

### Wheel — volledig herschrijven
- **Bug fix**: correcte angle→index berekening (zie plan-file)
- **Easing**: niet één cubic-bezier maar een 3-fase animatie:
  1. Snel opspeed (0–400ms, ease-in)
  2. Hoge snelheid plateau (400ms–2.5s, linear, small wobble)
  3. Decelerate met overshoot-correctie (2.5–4.5s, custom spring)
- **Tick haptic** per segment-pass tijdens decelerate (laatste 1.5s) via `navigator.vibrate(8)` — geeft physical feel
- **Result reveal**: niet alleen text-change, maar:
  - Wheel-segment van de winnaar flasht 2x in goud
  - Naam slidet-in van onder met spring physics
  - Optioneel: korte confetti burst (canvas-confetti, 12kb, conditional load)

### Squad list refinement
- Letter-circles blijven, maar:
  - Vervang gold-on-dark-gray door **subtiel gradient per persoon** (afgeleid van naam-hash → 7 gedimde varianten tussen gold, sunset, hungary-red, deep-amber)
  - Behoud Anton voor de letter, maar **lowercase** i.p.v. uppercase voor onverwacht karakter
  - Badge "Beheerder" naast Niek: harde rechthoek 2px radius, monospace font, niet pill-shaped
- "Member-status" (de bijnamen) krijgt **italic Outfit 400** in plaats van regular — typografisch karakter zonder size-increase

### Filter pills (Explore)
- Active-state krijgt **onderstreep-indicator met spring-animation** die mee-floats tussen pills (Motion `layoutId`), in plaats van background-swap
- Niet alle pills wit-op-zwart bij active — varieer subtiel: "Beer & Craft" → gold underline, "Ruin Bars" → sunset, "Food" → off-white, "Cultuur" → hungary-green, "Alles" → wit

### Currency converter (Forint-Fixer Pro)
- Inputs krijgen **tabular-nums** (`font-variant-numeric: tabular-nums`) — getallen zonder kerning-drift
- Live rate krijgt klein label "live · 3 min geleden ververst" of "fallback: 361,84" — toont ISR-status zonder devtools
- Swap-icon tussen velden: huidige `fa-right-left` blijft, maar krijgt 180° rotate animatie op tap (toekomstige uitbreiding voor swap-direction)

### SOS-box
- Pulse-animation blijft, maar wordt **een ring rond de knop** in plaats van een box-shadow stack. Hardware-accelerated transform, geen layout repaint.
- Copy onveranderd (perfect)
- Achtergrond `rgba(206, 17, 38, 0.1)` wordt **radial gradient** vanuit knop-center → unrooted glow voelt dramatischer

### Beer counter
- Display-getal krijgt **count-up animation** bij +1 (Motion `useSpring` op number)
- Tap-down: scale + haptic vibrate(15) + subtle gold flash op de outer border (200ms decay)
- Reset-knop: huidige confirm() wordt **long-press to reset** (1s hold, ring fills up) — voelt premium, voorkomt accidentele resets

---

## 4. NEW PREMIUM OPPORTUNITIES — niet in v4, nu wel

Context-specifieke kansen voor een trip-app, niet generieke "premium-UI" trucs.

### a. Tab transitions met directional slide
Home → Explore → Tools links-naar-rechts in mental map. Tab swap krijgt:
- Outgoing tab schuift weg in zijn natuurlijke richting (Home→Explore = naar links uit)
- Incoming komt van de andere kant met opacity fade-in
- 240ms, custom spring (stiffness 300, damping 30) — voelt vloeibaar maar snel
- Motion `AnimatePresence` met `mode="popLayout"`

### b. Subtle grain overlay
Volledig fixed `<div>` met SVG noise op `pointer-events: none; opacity: 0.025; mix-blend-mode: overlay`. Breekt de digitale platheid. Onmerkbaar bewust, maar het pure-zwart-pure-flat AI-look verdwijnt.

### c. Vlag-stripe → animated on initial load
Bij eerste paint: red/white/green segmenten **wipe-in van links naar rechts** in 600ms staggered (red eerst, dan white, dan green). Eenmalig per app-launch. Subtiele "welkom in Budapest"-momentum zonder splash screen.

### d. Header h1 typography upgrade
Huidige `BUDAPEST BOYS TRIP 🇭🇺` met gold-sunset gradient is generic. Vervangen door:
- Anton, all-caps, maar **variabele tracking per woord**: "BUDAPEST" met -2% tracking, "BOYS" met +4% tracking, "TRIP" met -1% tracking — geeft het een editorial poster-feel
- Geen gradient. Pure off-white (`#fafaf9`). Op de zwarte achtergrond is dat al striking.
- Vlag-emoji weg (vlag-stripe doet het werk)

### e. Empty-state voor wheel
Vóór eerste spin: in plaats van een leeg `<div>` voor result-text, een subtle hint: "Wie krijgt de eerste shot pálinka?" in `Outfit italic 300`, low opacity. Verdwijnt na eerste spin.

### f. Connection-aware FX rate
Service worker checkt online status. Als offline:
- Toon banner top "📡 Offline · gebruikt laatste rate van 4u geleden" met dimmed style
- Tap op banner = retry fetch
- Online = banner weg, geen melding

### g. "App is installed" detection
Op homescreen launched (`display-mode: standalone`):
- Geen url-bar visible chrome → bottom nav krijgt iets MEER safe-area-padding
- Subtiele initiele animation: vlag-stripe wipe-in (zie 4c) speelt alleen in standalone mode (toont alleen aan installed users → reward-feel)
- Web-mode (Safari tab): zelfde content, geen wipe-in

### h. Squad list — drag-to-reorder (mogelijk descoped)
Lokaal opslaan welke volgorde squad-leden staan. Voor consensus-momenten ("ik vind dat ik vooraan moet"). Long-press → drag. Localized in localStorage als `squad-order`. Half hour werk, hoge group-fun-factor. **Beslissing**: alleen als dag 2 vooruit loopt op schema.

### i. Wheel — laadanimatie op idle
Als wheel 30s niet gespun is: subtiel wiebel-momentum (2° wobble, eens per 8s). Trekt aandacht zonder opdringerig te zijn.

---

## Prioritering voor implementatie

Tijdens de **port-fase** (dag 1): alleen sectie 1 (KEEP) en sectie 2 (KILL) toepassen. Dat is hygiëne en duurt nauwelijks extra tijd.

Tijdens **`/emil-design-eng` polish-fase** (dag 2): sectie 3 (REFINE) volledig + sectie 4 a/b/c/d/e/f/g uit NEW. Punt 4h (drag-reorder) en 4i (idle wiebel) zijn nice-to-have als tijd over is.
