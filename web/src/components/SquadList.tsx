import { SQUAD } from "@/data/squad";

export function SquadList() {
  return (
    <ul className="rounded-card border border-border bg-card overflow-hidden">
      {SQUAD.map((member, idx) => (
        <li
          key={member.name}
          className="flex items-center gap-3 px-3.5 py-3"
          style={{
            borderBottom:
              idx === SQUAD.length - 1 ? "none" : "1px solid var(--color-border)",
          }}
        >
          <span
            className="grid size-11 place-items-center rounded-full border border-border bg-bg font-display text-lg lowercase text-gold"
            aria-hidden="true"
          >
            {member.initial.toLowerCase()}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink truncate">
                {member.name}
              </span>
              {member.isBeheerder && (
                <span className="rounded-data bg-ink-soft/10 px-1.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wide text-sunset">
                  Beheerder
                </span>
              )}
            </div>
            <div className="text-sm italic text-ink-muted">
              {member.alias} // {member.status}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
