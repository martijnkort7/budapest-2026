"use client";

export type TabId = "home" | "explore" | "tools";

type Props = {
  active: TabId;
  onSelect: (id: TabId) => void;
};

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "explore", label: "Explore", icon: "🗺️" },
  { id: "tools", label: "Tools", icon: "🛠️" },
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
      {TABS.map((tab, idx) => {
        const isActive = idx === activeIdx;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            className={`flex w-1/3 flex-col items-center gap-1 py-1 transition-colors duration-200 ${
              isActive ? "text-ink" : "text-ink-muted"
            }`}
            style={{ transition: "color 200ms var(--ease-out-strong)" }}
            aria-current={isActive ? "page" : undefined}
          >
            <span
              aria-hidden="true"
              className="text-xl will-change-transform"
              style={{
                transform: isActive ? "scale(1.1)" : "scale(1)",
                transition: "transform 220ms var(--ease-out-strong)",
              }}
            >
              {tab.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
