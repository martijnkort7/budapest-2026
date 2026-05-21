"use client";

import { useState, type ReactNode } from "react";
import { TabNav, type TabId } from "./TabNav";
import { SosFab } from "./SosFab";
import { SQUAD } from "@/data/squad";
import { VENUE_GROUPS } from "@/data/venues";

type Props = {
  home: ReactNode;
  explore: ReactNode;
  tools: ReactNode;
};

const TOTAL_VENUES = VENUE_GROUPS.reduce((sum, g) => sum + g.venues.length, 0);

const HEADERS: Record<TabId, { kicker: string; title: string; subtitle: string }> = {
  home: {
    kicker: "21 - 24 mei 2026",
    title: "De Line-up",
    subtitle: `${SQUAD.length} dudes · klaar voor de slacht`,
  },
  explore: {
    kicker: "Boys-trip Atlas",
    title: "Spots",
    subtitle: `${TOTAL_VENUES} venues · 4 categorieën`,
  },
  tools: {
    kicker: "Drunk-Proof Kit",
    title: "Survival Kit",
    subtitle: "Drink · Wallet · Talk",
  },
};

export function AppShell({ home, explore, tools }: Props) {
  const [tab, setTab] = useState<TabId>("home");

  function handleTabChange(id: TabId) {
    setTab(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  const active = tab === "home" ? home : tab === "explore" ? explore : tools;
  const header = HEADERS[tab];

  return (
    <>
      <div key={`wipe-${tab}`} className="flag-wipe-overlay" aria-hidden="true">
        <span style={{ background: "var(--color-hu-red)" }} />
        <span style={{ background: "var(--color-hu-white)" }} />
        <span style={{ background: "var(--color-hu-green)" }} />
      </div>

      <header className="safe-top header-glow sticky top-0 z-50 border-b border-gold/20 px-5 pt-5 pb-4 text-center backdrop-blur-md">
        <div key={`hdr-${tab}`} className="tab-enter">
          <p className="font-display text-[11px] uppercase tracking-[0.3em] text-gold-dim mb-1">
            {header.kicker}
          </p>
          <h1 className="text-display-lg text-ink leading-none">{header.title}</h1>
          <p className="mt-1.5 text-label-xs text-ink-soft">{header.subtitle}</p>
        </div>
      </header>

      <main key={tab} className="tab-enter tab-enter--late pb-32">
        {active}
      </main>

      <SosFab />
      <TabNav active={tab} onSelect={handleTabChange} />
    </>
  );
}
