import type { State, QueueItem, BleedThrough, Reprimand } from "./types";
import { BLEEDTHROUGHS, REPRIMANDS } from "../content/devices";

// Devices are gated by POST NUMBER so they stay spread out and predictable:
// nothing in the opening posts, and a minimum number of posts between any two.
export const MAX_BLEED = 3; // stills stay rare
export const MAX_REPRIMAND = 4; // Simon can nag more often
const BLEED_MIN_GAP = 6; // posts between the (rare) stills
const REPRIMAND_MIN_GAP = 3; // Simon can come back sooner
const FIRST_BLEED_AFTER_POST = 4; // 0-indexed: no still before the 5th post
const FIRST_REPRIMAND_AFTER_POST = 2; // Simon can start a little earlier

/** Initial values so each device's first fire lands after its "first after" post. */
export const INITIAL_LAST_BLEED_INDEX = FIRST_BLEED_AFTER_POST - BLEED_MIN_GAP;
export const INITIAL_LAST_REPRIMAND_INDEX = FIRST_REPRIMAND_AFTER_POST - REPRIMAND_MIN_GAP;

/** Bleed-through fires on a heavy item, at most a few times, well spaced by post.
 *  Spacing is tracked independently, so Simon's reprimands can never delay a still. */
export function shouldBleedThrough(state: State, item: QueueItem): boolean {
  if (!item.heavy) return false;
  if (state.bleedFired >= MAX_BLEED) return false;
  return state.index - state.lastBleedIndex >= BLEED_MIN_GAP;
}

export function pickBleedThrough(firedCount: number): BleedThrough | null {
  if (BLEEDTHROUGHS.length === 0) return null;
  return BLEEDTHROUGHS[firedCount % BLEEDTHROUGHS.length];
}

/** Reprimand on a real error streak — rare + spaced by post. */
export function shouldReprimand(state: State): boolean {
  if (state.reprimandFired >= MAX_REPRIMAND) return false;
  if (state.index - state.lastReprimandIndex < REPRIMAND_MIN_GAP) return false;
  // Simon chimes in on any recent miss OR when you're dragging behind pace.
  const madeMistake = state.wrongStreak >= 1;
  const processed = state.index + 1;
  const expectedByNow = Math.floor((state.duration - state.remaining) / 12); // ~1 per 12s
  const behindPace = processed < expectedByNow - 1;
  return madeMistake || behindPace;
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
