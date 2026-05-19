# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-file, **Dutch-language**, mobile-first static HTML guide for a friends' trip to Budapest ([budapest_boys_trip_guide_v4.html](budapest_boys_trip_guide_v4.html)). No build system, no package manager, no tests, no backend, and not a git repo. To "run" it: open the `.html` file directly in a browser (ideally in a narrow viewport — the layout is capped at `max-width: 480px`). External assets (Google Fonts: Anton + Outfit; Font Awesome 6.4) load from CDNs, so an internet connection is needed for the first paint to look right.

## Architecture

Everything lives in one HTML file: markup, styles in a `<style>` block, and logic in a `<script>` block at the bottom.

- **Three-tab SPA pattern.** Tabs are `<div class="section">` blocks with ids `tab-home`, `tab-explore`, `tab-tools`. Bottom nav uses matching `.nav-item` elements with ids `btn-nav-home/explore/tools`. `switchTab(id)` at [budapest_boys_trip_guide_v4.html:525](budapest_boys_trip_guide_v4.html#L525) toggles the `.active` class on both. To add a tab, add the section + nav item with that id naming convention.
- **Explore filtering.** Items are `.exp-item` with a `data-cat` attribute. `filterExplore(category)` at [budapest_boys_trip_guide_v4.html:548](budapest_boys_trip_guide_v4.html#L548) shows/hides by category. Categories in use: `craft`, `ruin`, `food`, `culture` (plus `all`).
- **State.** All UI state is in the DOM. The only persisted state is `localStorage['solo-beers']` for the beer counter. No backend, no API.

## Hotspots — what gets edited between trips

- **Squad roster.** `squadNames` array at [budapest_boys_trip_guide_v4.html:577](budapest_boys_trip_guide_v4.html#L577) drives the spin wheel. The parallel `wheelColors` and `textColors` arrays on the next two lines must stay the same length when you add/remove people.
- **EUR/HUF rate.** `EXACT_RATE` const at [budapest_boys_trip_guide_v4.html:534](budapest_boys_trip_guide_v4.html#L534). Hardcoded and stale by definition — refresh it before each trip.
- **Venues / activities.** `.exp-item` blocks inside `#tab-explore` ([:323+](budapest_boys_trip_guide_v4.html#L323)); set `data-cat` to one of the four categories above so the filter pills pick them up.

## Conventions

- **Dutch copy, informal "boys trip" tone.** All user-facing strings are Dutch (see e.g. `"HET RAD DRAAIT..."`, `"💀 DE LUL: ..."`). Match the register on edits; don't introduce English.
- **Design tokens live in `:root` CSS vars** at [budapest_boys_trip_guide_v4.html:11-25](budapest_boys_trip_guide_v4.html#L11-L25) (Hungary flag red/green, gold/sunset accents, dark theme). Reuse them instead of hardcoding hex values.
- **Mobile-only layout.** The page is designed for phones (`max-width: 480px`, safe-area insets, sticky bottom nav). Always check changes in a narrow viewport — desktop browsers will show it centered in a phone-width column.

## Note on SKILL.md

[SKILL.md](SKILL.md) in this directory is a `frontend-design` skill definition, not project documentation or a README. Its aesthetic guidance (distinctive fonts, bold conceptual direction, avoid generic AI design) is on-brand for this page and worth applying when restyling.
