"use client";

import { useState } from "react";
import { DICTIONARY } from "@/data/dictionary";
import { IconCopy, IconCheck } from "./Icons";

function splitPronunciation(hu: string): { phrase: string; pronunciation: string | null } {
  const m = hu.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (!m) return { phrase: hu, pronunciation: null };
  return { phrase: m[1].trim(), pronunciation: m[2].trim() };
}

export function Lexicon() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copyPhrase(phrase: string, key: string) {
    try {
      await navigator.clipboard.writeText(phrase);
      setCopied(key);
      try {
        navigator.vibrate?.(8);
      } catch {}
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1400);
    } catch {
      // clipboard unavailable — silent fail
    }
  }

  return (
    <div className="rounded-tool border border-border bg-card px-5 pt-6 pb-6 shadow-card">
      <span className="text-label-xs text-hu-red">Praat als een local</span>
      <h2 className="mt-1 text-display-lg text-ink">Hongaars Kit</h2>

      <section className="mt-5">
        <h3 className="text-label-xs text-gold">Cruciaal · Vervoer</h3>
        <p className="mt-2 rounded-card border border-border-soft bg-bg px-4 py-3 text-body-md text-ink-soft">
          Uber bestaat hier niet. Gebruik uitsluitend de app{" "}
          <strong className="text-ink">Bolt</strong>. Stap nooit in een willekeurige
          straattaxi tenzij je beroofd wilt worden.
        </p>
      </section>

      <section className="mt-6">
        <h3 className="text-label-xs text-hu-green">Woordenboek</h3>
        <ul className="mt-2 flex flex-col">
          {DICTIONARY.map(({ nl, hu }, idx) => {
            const { phrase, pronunciation } = splitPronunciation(hu);
            const isCopied = copied === nl;
            return (
              <li
                key={nl}
                className={`group flex flex-col gap-1 py-3 ${
                  idx === DICTIONARY.length - 1
                    ? ""
                    : "border-b border-hairline-soft"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-label-xs text-ink-muted">{nl}</span>
                    <span className="mt-0.5 text-display-sm text-ink">{phrase}</span>
                    {pronunciation && (
                      <span className="mt-0.5 text-body-sm italic text-gold">
                        {pronunciation}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => copyPhrase(phrase, nl)}
                    aria-label={`Kopieer ${phrase}`}
                    className="grid size-11 shrink-0 place-items-center rounded-pill text-ink-muted hover:text-ink"
                  >
                    {isCopied ? (
                      <IconCheck size={20} aria-hidden="true" />
                    ) : (
                      <IconCopy size={18} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
