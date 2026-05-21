# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## What this is

A **Dutch-language**, mobile-first PWA trip guide for a friends' weekend in Budapest (21–24 mei 2026). Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, pnpm. To run it: `pnpm dev` and open [http://localhost:3000](http://localhost:3000) in a narrow viewport (≤ 480 px). External fonts (Anton + Outfit via `next/font`) and a ServiceWorker are loaded automatically.

## Commands

```bash
pnpm dev      # dev server (localhost:3000)
pnpm build    # production build — run this to catch type errors
pnpm start    # serve the production build
```

No test suite. Type-check via `pnpm build`.

## Architecture

```
src/
  app/          # Next.js App Router — layout.tsx, page.tsx (server component)
  components/   # React client/server components
  data/         # Pure data: squad.ts, venues.ts, facts.ts, dictionary.ts
  lib/          # Utilities: fx.ts (EUR/HUF fetch)
```

**Tab pattern.** `AppShell` ([src/components/AppShell.tsx](src/components/AppShell.tsx)) is a client component holding `useState<TabId>`. The server page (`src/app/page.tsx`) fetches the FX rate (ISR, `revalidate = 3600`) and passes it down. The three tabs — `HomeTab`, `ExploreTab`, `ToolsTab` — are lazy-rendered by swapping the active child in `AppShell`.

**Data layer.** All editable content lives in `src/data/`. Components import from there — never hardcode content in JSX.

**Server vs. client.** `page.tsx` and `layout.tsx` are server components. Only add `"use client"` where you need hooks or browser APIs (AppShell, ExploreTab, BeerCounter, SpinWheel, CurrencyConverter…).

**Design tokens.** Defined in the `@theme` block of [src/app/globals.css](src/app/globals.css). Tailwind 4 reads them directly as CSS custom properties — use the semantic names (`bg-card`, `text-gold`, `border-border`) instead of hardcoded hex values.

## Hotspots — what gets edited between trips

| What | Where |
|---|---|
| Trip dates | [src/components/AppShell.tsx:32](src/components/AppShell.tsx#L32) — hardcoded `"21 - 24 mei 2026"` |
| Squad roster | [src/data/squad.ts](src/data/squad.ts) — `SQUAD` array; `accentColor` must be unique per member |
| Venues / activities | [src/data/venues.ts](src/data/venues.ts) — `VENUE_GROUPS`; categories: `food`, `craft`, `ruin`, `culture` |
| EUR/HUF fallback | [src/lib/fx.ts:1](src/lib/fx.ts#L1) — `FALLBACK_RATE`; refresh before the trip |

## Conventions

**Dutch copy, informal boys-trip tone.** All user-visible strings are Dutch (e.g. `"HET RAD DRAAIT..."`, `"💀 DE LUL: ..."`). Match that register. Never introduce English copy.

**Type scale.** Use the named utilities defined in `globals.css` (`text-display-xl`, `text-display-md`, `text-body-md`, `text-label-xs`, …). Don't use ad-hoc `text-xl`/`text-2xl` from Tailwind — those bypass the intentional type rhythm.

**Shadow tiers** (by role, not by gut): `shadow-surface` → list items / sub-cards; `shadow-card` → primary cards; `shadow-hero` → max 1 per screen; `shadow-go` → primary green CTA; `shadow-sos-ring` → SOS only.

**Animations.** Tab transitions use `.tab-enter` + `@starting-style` CSS (hardware-accelerated, no JS). Stagger lists: add `.stagger-item` + `style={{ "--i": idx }}`. Don't add JS-driven animation where CSS suffices.

**Mobile-only.** `max-width: 480px`, safe-area insets, sticky bottom nav. Always check changes in a narrow viewport.

## Guard rails

- Don't add English strings to the UI.
- Don't hardcode hex colors — use `@theme` tokens.
- Don't add `"use client"` to components that don't need it.
- Don't add features beyond what's asked; this is a low-maintenance one-off tool.
- The EUR/HUF rate is fetched server-side with ISR. Don't move this to client-side fetch.

## Supporting docs

- **[AGENTS.md](AGENTS.md)** — important note on Next.js 16 API changes; read before touching routing/rendering code.
- **[DESIGN.md](DESIGN.md)** — detailed design audit (scores, blocking issues, component-level notes). Feed to `/redesign-existing-projects` or `/emil-design-eng` for design work.
- **[SKILL.md](SKILL.md)** — `frontend-design` skill definition; aesthetic guidance that's on-brand for this project.
