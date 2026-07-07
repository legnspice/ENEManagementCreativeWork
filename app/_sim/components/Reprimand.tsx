"use client";

import { useEffect } from "react";
import { useSim } from "../SimulatorProvider";
import type { Reprimand as ReprimandData } from "../engine/types";

export function Reprimand({ data }: { data: ReprimandData }) {
  const { dispatch } = useSim();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        dispatch({ type: "DISMISS_DEVICE" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  const initial = data.sender.charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-slate-900/20 p-4 sm:p-6">
      {/* workplace chat notification, slides in top-right */}
      <div className="anim-rise w-full max-w-sm overflow-hidden rounded-xl border border-hairline bg-panel shadow-2xl shadow-slate-900/20">
        <div className="flex items-center gap-2 border-b border-hairline bg-panel-2 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-danger" />
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
            {data.channel}
          </span>
          <span className="ml-auto text-[10px] text-text-muted">now</span>
        </div>
        <div className="flex gap-3 px-4 py-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-sm font-bold text-white">
            {initial}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-text">{data.sender}</div>
            <p className="mt-1 text-sm leading-relaxed text-text">{data.message}</p>
            <button
              type="button"
              onClick={() => dispatch({ type: "DISMISS_DEVICE" })}
              className="mt-3 rounded-lg bg-brand px-4 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
