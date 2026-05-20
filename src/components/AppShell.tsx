"use client";

import { useState, type ReactNode } from "react";
import { TabNav, type TabId } from "./TabNav";
import { SosFab } from "./SosFab";

type Props = {
  home: ReactNode;
  explore: ReactNode;
  tools: ReactNode;
};

const HEADERS: Record<TabId, { kicker: string; title: string }> = {
  home: { kicker: "Boys Trip · 2026", title: "De Line-up" },
  explore: { kicker: "15 spots gecureerd", title: "Spots" },
  tools: { kicker: "Het kit voor de nacht", title: "Survival Kit" },
};

export function AppShell({ home, explore, tools }: Props) {
  const [tab, setTab] = useState<TabId>("home");

  const active = tab === "home" ? home : tab === "explore" ? explore : tools;
  const header = HEADERS[tab];

  return (
    <>
      <header className="safe-top sticky top-0 z-50 border-b border-border bg-bg/85 px-5 pt-4 pb-3 backdrop-blur-md">
        <div key={tab} className="result-reveal flex items-baseline justify-between gap-3">
          <h1 className="text-display-lg text-ink">{header.title}</h1>
          <span className="text-label-xs text-hu-green">{header.kicker}</span>
        </div>
      </header>

      <main key={tab} className="tab-enter pb-32">
        {active}
      </main>

      <SosFab />
      <TabNav active={tab} onSelect={setTab} />
    </>
  );
}
