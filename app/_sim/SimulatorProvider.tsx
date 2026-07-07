"use client";

import { createContext, useContext, useReducer } from "react";
import type { State, Action } from "./engine/types";
import { reducer, initialState } from "./engine/reducer";
import { useCountdown } from "./engine/useCountdown";
import { QUEUE } from "./content";

type SimContext = { state: State; dispatch: React.Dispatch<Action> };

const Ctx = createContext<SimContext | null>(null);

export function SimulatorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, QUEUE, initialState);
  useCountdown(state, dispatch);
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function useSim(): SimContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSim must be used within SimulatorProvider");
  return ctx;
}
