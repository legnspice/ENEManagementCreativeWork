"use client";

import { useSim } from "../SimulatorProvider";
import { DELETE_WHEN, IGNORE_WHEN } from "../policy";
import { ACTION_THEME } from "../components/ui";
import { ECONOMY, formatPeso } from "../engine/scoring";
import { BRAND } from "../brand";

const ACTION_ONE_LINER: Record<"delete" | "ignore", string> = {
  delete: "It breaks a rule — take it down.",
  ignore: "No violation — leave it up.",
};

function ActionTiles() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {(["delete", "ignore"] as const).map((a) => (
        <div key={a} className={`rounded-lg border p-3 ${ACTION_THEME[a].bg} ${ACTION_THEME[a].border}`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm font-bold ${ACTION_THEME[a].text}`}>{ACTION_THEME[a].label}</span>
            <kbd className="rounded bg-black/5 px-1 text-[10px] text-text-muted">{ACTION_THEME[a].key}</kbd>
          </div>
          <div className="mt-1 text-[11px] leading-snug text-text-muted">{ACTION_ONE_LINER[a]}</div>
        </div>
      ))}
    </div>
  );
}

function CheatColumn({
  action,
  items,
}: {
  action: "delete" | "ignore";
  items: string[];
}) {
  const t = ACTION_THEME[action];
  return (
    <div className={`rounded-lg border p-3 ${t.bg} ${t.border}`}>
      <div className={`mb-2 text-sm font-bold ${t.text}`}>{t.label} when…</div>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-xs leading-snug text-text">
            <span className={`mt-1 h-1 w-1 shrink-0 rounded-full ${t.text} bg-current`} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheatSheet() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <CheatColumn action="delete" items={DELETE_WHEN} />
      <CheatColumn action="ignore" items={IGNORE_WHEN} />
    </div>
  );
}

export function Tutorial() {
  const { state, dispatch } = useSim();
  const onboarding = state.phase === "tutorial";
  const primary = () => dispatch({ type: onboarding ? "START_SHIFT" : "CLOSE_TUTORIAL" });

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm sm:p-8">
      <div className="anim-scale my-auto w-full max-w-lg rounded-2xl border border-hairline bg-panel shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-text">
              {onboarding ? "Welcome to your shift" : "Policy reference"}
            </h2>
            <p className="text-xs text-text-muted">
              {onboarding ? `${BRAND.name} · ${BRAND.site}` : "The hard rules — reopen anytime with ?"}
            </p>
          </div>
          {!onboarding && (
            <button
              type="button"
              onClick={primary}
              className="rounded-full border border-hairline px-3 py-1.5 text-xs text-text-muted hover:text-text"
            >
              Close
            </button>
          )}
        </div>

        <div className="max-h-[64vh] overflow-y-auto px-6 py-5 frame-scroll">
          {onboarding && (
            <>
              <p className="mb-4 text-sm text-text">
                You review posts <strong>one at a time</strong> and make a call. Two choices:
              </p>
              <ActionTiles />
              <ol className="mt-5 space-y-3">
                {[
                  "Decide fast — the queue never stops and the clock is always running.",
                  `Each correct call pays +${formatPeso(ECONOMY.correct)}. Each mistake costs −${formatPeso(-ECONOMY.incorrect)}. You start at ${formatPeso(ECONOMY.start)}.`,
                  "You can reopen these rules anytime with the ? in the top bar.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm text-text-muted">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
                      {i + 1}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </>
          )}

          {!onboarding && (
            <div className="mb-4">
              <ActionTiles />
            </div>
          )}

          <div className="mb-2 mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            The rules, in short
          </div>
          <CheatSheet />
        </div>

        {/* footer */}
        <div className="border-t border-hairline px-6 py-4">
          <button
            type="button"
            onClick={primary}
            className="w-full rounded-lg bg-gradient-to-r from-brand to-brand-2 px-4 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            {onboarding ? "Clock in & start shift" : "Back to work"}
          </button>
        </div>
      </div>
    </div>
  );
}
