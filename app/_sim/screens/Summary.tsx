"use client";

import { useSim } from "../SimulatorProvider";
import { ECONOMY, formatPeso } from "../engine/scoring";

export function Summary() {
  const { state, dispatch } = useSim();
  const total = state.decisions.length;
  const correct = state.correctCount;
  const wrong = state.wrongCount;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  const wagePct = Math.max(
    0,
    Math.min(100, ((state.wage - ECONOMY.floor) / (ECONOMY.cap - ECONOMY.floor)) * 100),
  );

  return (
    <div className="min-h-screen overflow-y-auto bg-console">
      <div className="mx-auto max-w-xl px-4 py-12">
        {/* clock-out */}
        <div className="anim-rise">
          <p className="text-[11px] uppercase tracking-[0.3em] text-text-muted">
            {state.ended === "time" ? "Shift over — time's up" : "Shift over — queue cleared"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-text">You clocked out.</h1>
        </div>

        {/* paycheck */}
        <div className="anim-scale mt-6 rounded-2xl border border-hairline bg-panel p-6 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
                Today&apos;s take-home
              </div>
              <div className="tabular mt-1 text-4xl font-black text-money">
                {formatPeso(state.wage)}
              </div>
              <div className="mt-1 text-xs text-text-muted">
                of a possible {formatPeso(ECONOMY.cap)} · you started at {formatPeso(ECONOMY.start)}
              </div>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <div className="tabular text-2xl font-bold text-success">{correct}</div>
                <div className="text-[10px] uppercase tracking-wide text-text-muted">correct</div>
              </div>
              <div>
                <div className="tabular text-2xl font-bold text-danger">{wrong}</div>
                <div className="text-[10px] uppercase tracking-wide text-text-muted">wrong</div>
              </div>
              <div>
                <div className="tabular text-2xl font-bold text-text">{accuracy}%</div>
                <div className="text-[10px] uppercase tracking-wide text-text-muted">accuracy</div>
              </div>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-panel-2">
            <div className="h-full rounded-full bg-money" style={{ width: `${wagePct}%` }} />
          </div>
        </div>

        {/* the point */}
        <div className="anim-fade mt-8 space-y-4 text-[15px] leading-relaxed text-text">
          <p>
            That was five minutes as a content moderator. Real people do this all day. A lot of
            them here in the Philippines, cleaning up the worst of the internet off everyone else&apos;s
            screens.
          </p>
          <p>
            That&apos;s what Deleter (2022) is about. It keeps you inside Lyra&apos;s head as the
            job wears her down, and when she&apos;s barely holding on, her boss just hands her anxiety
            pills instead of actually helping. The point isn&apos;t that she&apos;s weak; it&apos;s that a
            company is prioritizing profit and quotas over the people doing the actual work.
          </p>
          <p className="font-semibold">
            87% of Filipino workers say their job has affected their mental health. Behind every clean
            feed is a real person absorbing the violence so you don&apos;t have to, and with proper
            support, none of it has to be this way. This is just a choice the people in power keep
            making.
          </p>
        </div>

        {/* reset for the next participant */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-hairline pt-8">
          <button
            type="button"
            onClick={() => dispatch({ type: "RESET" })}
            className="rounded-full bg-gradient-to-r from-brand to-brand-2 px-8 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            Start over for the next person
          </button>
          <p className="text-[11px] text-text-muted">
            Group 5 · a creative output on the labor behind content moderation
          </p>
        </div>
      </div>
    </div>
  );
}
