"use client";

import { IconHome, IconCompass, IconSatchel } from "./Icons";

export type TabId = "home" | "explore" | "tools";

type Props = {
  active: TabId;
  onSelect: (id: TabId) => void;
};

const TABS: { id: TabId; label: string; Icon: typeof IconHome }[] = [
  { id: "home", label: "Home", Icon: IconHome },
  { id: "explore", label: "Spots", Icon: IconCompass },
  { id: "tools", label: "Kit", Icon: IconSatchel },
];

export function TabNav({ active, onSelect }: Props) {
  const activeIdx = TABS.findIndex((t) => t.id === active);

  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="safe-bottom fixed bottom-0 left-1/2 z-[100] flex w-full max-w-[480px] -translate-x-1/2 border-t border-border bg-card/85 px-2 pt-2.5 pb-2.5 backdrop-blur-xl backdrop-saturate-150"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 h-0.5 w-1/3 rounded-pill bg-gold will-change-transform"
        style={{
          transform: `translateX(${activeIdx * 100}%)`,
          transition: "transform 380ms var(--ease-drawer)",
        }}
      />
      {TABS.map(({ id, label, Icon }, idx) => {
        const isActive = idx === activeIdx;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`flex w-1/3 flex-col items-center gap-1 py-1 transition-colors duration-200 ${
              isActive ? "text-ink" : "text-ink-muted"
            }`}
            style={{ transition: "color 200ms var(--ease-out-strong)" }}
            aria-current={isActive ? "page" : undefined}
          >
            <span
              className="will-change-transform"
              style={{
                transform: isActive ? "scale(1.08)" : "scale(1)",
                transition: "transform 220ms var(--ease-out-strong)",
              }}
            >
              <Icon size={24} strokeWidth={isActive ? 1.9 : 1.6} />
            </span>
            <span className="text-label-xs">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
