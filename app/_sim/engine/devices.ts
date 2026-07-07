import type { State, QueueItem, BleedThrough, Reprimand } from "./types";
import { BLEEDTHROUGHS, REPRIMANDS } from "../content/devices";

// Devices are gated by TIME so they spread across the whole 5-minute shift
// instead of clustering early — a couple of moments, well apart.
export const MAX_BLEED = 3;
export const MAX_REPRIMAND = 2;
const MIN_GAP_SEC = 80; // minimum seconds between any two devices
const FIRST_DEVICE_AFTER_SEC = 40; // nothing intrudes in the opening stretch

/** Initial value so the first device becomes eligible at FIRST_DEVICE_AFTER_SEC. */
export const INITIAL_LAST_DEVICE_ELAPSED = FIRST_DEVICE_AFTER_SEC - MIN_GAP_SEC;

function elapsed(state: State): number {
  return state.duration - state.remaining;
}
function longEnoughSinceLastDevice(state: State): boolean {
  return elapsed(state) - state.lastDeviceElapsed >= MIN_GAP_SEC;
}

/** Bleed-through fires on a heavy item, at most a couple times, well spaced. */
export function shouldBleedThrough(state: State, item: QueueItem): boolean {
  if (!item.heavy) return false;
  if (state.bleedFired >= MAX_BLEED) return false;
  return longEnoughSinceLastDevice(state);
}

export function pickBleedThrough(firedCount: number): BleedThrough | null {
  if (BLEEDTHROUGHS.length === 0) return null;
  return BLEEDTHROUGHS[firedCount % BLEEDTHROUGHS.length];
}

/** Reprimand on a real error streak or clearly behind pace — rare + spaced. */
export function shouldReprimand(state: State): boolean {
  if (state.reprimandFired >= MAX_REPRIMAND) return false;
  if (!longEnoughSinceLastDevice(state)) return false;
  const processed = state.index + 1;
  const expected = Math.floor(elapsed(state) / 12); // lenient pace
  const behindPace = processed < expected - 2;
  const errorStreak = state.wrongStreak >= 3;
  return behindPace || errorStreak;
}

export function pickReprimand(state: State): Reprimand | null {
  if (REPRIMANDS.length === 0) return null;
  return REPRIMANDS[state.reprimandFired % REPRIMANDS.length];
}

/** 1 = early / subtle, 2 = mid, 3 = late / heavier. */
export function deviceLevel(state: State): 1 | 2 | 3 {
  const frac = state.duration > 0 ? 1 - state.remaining / state.duration : 0;
  if (frac < 0.34) return 1;
  if (frac < 0.67) return 2;
  return 3;
}
