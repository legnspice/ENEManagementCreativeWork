"use client";

import { useEffect, useRef, useState } from "react";
import { useSim } from "../SimulatorProvider";
import { ECONOMY, formatPeso, formatClock } from "../engine/scoring";
import { BRAND } from "../brand";
import { Logo } from "./Logo";

function Stat({
  label,
  children,
  align = "left",
}: {
  label: string;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
        {label}
      </div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

export function Hud() {
  const { state, dispatch } = useSim();
  const prevWage = useRef(state.wage);
  const [delta, setDelta] = useState<{ v: number; id: number } | null>(null);
  useEffect(() => {
    const d = state.wage - prevWage.current;
    prevWage.current = state.wage;
    if (d !== 0) setDelta({ v: d, id: Date.now() });
  }, [state.wage]);
  const processed = state.decisions.length;
  const total = ECONOMY.targetCount;
  const wagePct = ((state.wage - ECONOMY.floor) / (ECONOMY.cap - ECONOMY.floor)) * 100;
  const progressPct = total > 0 ? Math.min(100, (processed / total) * 100) : 0;
  const low = state.remaining <= 60;
  const critical = state.remaining <= 15;

  return (
    <header className="shrink-0 border-b border-hairline bg-console/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7" />
          <div className="hidden sm:block leading-none">
            <div className="text-sm font-bold text-text">{BRAND.name}</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
              Moderation Console
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-5 sm:gap-8">
          {/* Wage — live counter with floating delta */}
          <Stat label="Today's pay">
            <div className="relative flex items-baseline gap-2">
              <span key={state.wage} className="anim-pop tabular text-lg font-bold text-money sm:text-xl">
                {formatPeso(state.wage)}
              </span>
              <span className="hidden text-[10px] text-text-muted sm:inline">
                / {formatPeso(ECONOMY.cap)}
              </span>
              {delta && (
                <span
                  key={delta.id}
                  onAnimationEnd={() => setDelta(null)}
                  className={`anim-float pointer-events-none absolute -top-3 left-0 text-xs font-bold ${
                    delta.v > 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {delta.v > 0 ? "+" : "−"}
                  {formatPeso(Math.abs(delta.v))}
                </span>
              )}
            </div>
            <div className="mt-1 h-1 w-28 overflow-hidden rounded-full bg-panel-2 sm:w-36">
              <div
                className="h-full rounded-full bg-money transition-all duration-500"
                style={{ width: `${Math.max(0, Math.min(100, wagePct))}%` }}
              />
            </div>
          </Stat>

          {/* Processed */}
          <Stat label="Processed">
            <div className="flex items-baseline gap-1">
              <span className="tabular text-lg font-bold text-text sm:text-xl">{processed}</span>
              <span className="text-xs text-text-muted">/ {total}</span>
            </div>
            <div className="mt-1 h-1 w-20 overflow-hidden rounded-full bg-panel-2 sm:w-28">
              <div
                className="h-full rounded-full bg-brand transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </Stat>

          {/* Timer */}
          <Stat label="Shift ends in" align="right">
            <div
              className={`tabular text-lg font-bold sm:text-2xl ${
                critical ? "text-danger pulse-danger" : low ? "text-danger" : "text-text"
              }`}
            >
              {formatClock(state.remaining)}
            </div>
          </Stat>

          <button
            type="button"
            onClick={() => dispatch({ type: "OPEN_TUTORIAL" })}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-hairline text-text-muted transition hover:border-brand hover:text-text"
            aria-label="Open policy reference"
            title="Policy (rules)"
          >
            ?
          </button>
        </div>
      </div>
    </header>
  );
}
