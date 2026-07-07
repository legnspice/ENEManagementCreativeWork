"use client";

import { useEffect } from "react";
import { useSim } from "../SimulatorProvider";
import { ACTION_THEME } from "./ui";
import type { ModAction } from "../engine/types";

const ORDER: ModAction[] = ["delete", "ignore"];

const GLYPH: Record<ModAction, React.ReactNode> = {
  delete: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2zM4 6h16v1H4V6z" />
    </svg>
  ),
  ignore: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 5c-5 0-9 4.5-10 7 1 2.5 5 7 10 7s9-4.5 10-7c-1-2.5-5-7-10-7zm0 11a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  ),
};

export function ActionBar() {
  const { state, dispatch } = useSim();
  const locked = !!state.feedback || !!state.activeDevice || state.phase !== "shift";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (locked) return;
      if (e.key === "1") dispatch({ type: "SUBMIT", action: "delete" });
      else if (e.key === "2") dispatch({ type: "SUBMIT", action: "ignore" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, dispatch]);

  return (
    <div className="grid grid-cols-2 gap-3">
      {ORDER.map((action) => {
        const t = ACTION_THEME[action];
        return (
          <button
            key={action}
            type="button"
            disabled={locked}
            onClick={() => dispatch({ type: "SUBMIT", action })}
            className={`group relative flex items-center justify-center gap-2 rounded-xl border px-3 py-4 font-semibold transition
              ${t.text} ${t.bg} ${t.border} ${t.ring}
              hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0
              focus-visible:outline-none focus-visible:ring-2
              disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:brightness-100`}
          >
            {GLYPH[action]}
            <span className="text-base">{t.label}</span>
            <kbd className="absolute right-2 top-2 rounded bg-black/5 px-1 text-[10px] font-normal text-text-muted">
              {t.key}
            </kbd>
          </button>
        );
      })}
    </div>
  );
}
