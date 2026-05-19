"use client";

import { useState, type ReactNode } from "react";
import { TabNav, type TabId } from "./TabNav";
import { MapsButton } from "./MapsButton";

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
      <header className="safe-top sticky top-0 z-50 border-b border-border bg-bg/90 px-5 pt-4 pb-3 text-center backdrop-blur-md">
        <h1 className="font-display text-2xl uppercase tracking-[0.04em] text-ink">
          <span style={{ letterSpacing: "-0.02em" }}>Budapest</span>{" "}
          <span style={{ letterSpacing: "0.06em" }}>Boys</span>{" "}
          <span style={{ letterSpacing: "-0.01em" }}>Trip</span>
        </h1>
      </header>

      <MapsButton />

      <main key={tab} className="tab-enter pb-28">
        {active}
      </main>

      <TabNav active={tab} onSelect={setTab} />
    </>
  );
}
