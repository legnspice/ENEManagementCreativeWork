"use client";

import { useEffect } from "react";
import type { Action, State } from "./types";

/**
 * Drives the single global shift countdown. Runs only during the shift phase.
 * The clock keeps ticking through devices/feedback — that's the point: the job
 * steals your time regardless. Ends the shift at 0 (handled by the reducer).
 */
export function useCountdown(state: State, dispatch: React.Dispatch<Action>) {
  const running = state.phase === "shift" && state.remaining > 0;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(id);
  }, [running, dispatch]);
}
