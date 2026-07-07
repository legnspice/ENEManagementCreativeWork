"use client";

import { useSim } from "../SimulatorProvider";
import type { Feedback as FeedbackData } from "../engine/types";
import { ACTION_LABELS } from "../engine/scoring";

export function Feedback({ data }: { data: FeedbackData }) {
  const good = data.correct;
  const { dispatch } = useSim();
  return (
    <button
      type="button"
      onClick={() => dispatch({ type: "RESOLVE" })}
      aria-label="Continue"
      className={`anim-rise absolute inset-x-0 bottom-0 z-20 flex cursor-pointer flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t p-3 backdrop-blur-sm transition
        ${good ? "border-success/40 bg-success/12 hover:bg-success/20" : "border-danger/40 bg-danger/12 hover:bg-danger/20"}`}
    >
      <span className={`text-base font-bold ${good ? "text-success" : "text-danger"}`}>
        {good ? "✓ Correct" : "✕ Incorrect"}
      </span>
      {!good && (
        <span className="text-sm text-text-muted">
          should&apos;ve been {ACTION_LABELS[data.correctAction]}
        </span>
      )}
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          good ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
        }`}
      >
        {data.tag}
      </span>
      <span className="w-full text-center text-[11px] uppercase tracking-wide text-text-muted">
        tap to continue
      </span>
    </button>
  );
}
