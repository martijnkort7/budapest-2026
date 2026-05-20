"use client";

import { useState, type ReactNode } from "react";
import { TabNav, type TabId } from "./TabNav";
import { SosFab } from "./SosFab";

type Props = {
  home: ReactNode;
  explore: ReactNode;
  tools: ReactNode;
};

export function AppShell({ home, explore, tools }: Props) {
  const [tab, setTab] = useState<TabId>("home");

  const active = tab === "home" ? home : tab === "explore" ? explore : tools;

  return (
    <>
      <div key={`wipe-${tab}`} className="flag-wipe-overlay" aria-hidden="true">
        <span style={{ background: "var(--color-hu-red)" }} />
        <span style={{ background: "var(--color-hu-white)" }} />
        <span style={{ background: "var(--color-hu-green)" }} />
      </div>

      <header className="safe-top header-glow sticky top-0 z-50 border-b border-gold/20 px-5 pt-5 pb-4 text-center backdrop-blur-md">
        <p className="font-display text-[11px] uppercase tracking-[0.3em] text-gold-dim mb-0.5">
          22–25 MEI 2026
        </p>
        <h1 className="font-display leading-none uppercase">
          <span className="block text-4xl text-gold" style={{ letterSpacing: "-0.02em" }}>
            Budapest
          </span>
          <span className="block text-xl tracking-[0.18em] text-ink/80">
            Boys Trip
          </span>
        </h1>
      </header>

      <main key={tab} className="tab-enter pb-32">
        {active}
      </main>

      <SosFab />
      <TabNav active={tab} onSelect={setTab} />
    </>
  );
}
