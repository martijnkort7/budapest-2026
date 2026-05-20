import { SQUAD } from "@/data/squad";

export function SquadList() {
  return (
    <ul className="overflow-hidden rounded-tool border border-border bg-card shadow-card">
      {SQUAD.map((member, idx) => (
        <li
          key={member.name}
          className={`flex items-start gap-3.5 px-4 py-3.5 ${
            idx === SQUAD.length - 1
              ? ""
              : "border-b border-hairline-soft"
          }`}
        >
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-full text-display-md text-app"
            style={{ backgroundColor: member.accentColor }}
          >
            {member.initial}
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-display-sm text-ink">{member.name}</span>
              <span
                className="text-label-xs"
                style={{ color: member.accentColor }}
              >
                {member.alias}
              </span>
              {member.isBeheerder && (
                <span className="ml-auto rounded-data bg-hu-green/15 px-1.5 py-0.5 text-label-xs text-hu-green">
                  Beheerder
                </span>
              )}
            </div>
            <p className="mt-1 text-body-sm text-ink-soft">{member.status}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
