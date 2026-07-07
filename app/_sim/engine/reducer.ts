import type { Action, State, QueueItem } from "./types";
import { ECONOMY, isCorrect, nextWage } from "./scoring";
import {
  shouldBleedThrough,
  pickBleedThrough,
  shouldReprimand,
  pickReprimand,
  INITIAL_LAST_DEVICE_ELAPSED,
} from "./devices";

/** Fisher–Yates shuffle (new array). Runs only on START_SHIFT — a client-only,
 *  post-interaction action — so it can't cause a server/client hydration mismatch. */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function initialState(queue: QueueItem[]): State {
  return {
    phase: "signin",
    queue,
    index: 0,
    wage: ECONOMY.start,
    correctCount: 0,
    wrongCount: 0,
    wrongStreak: 0,
    decisions: [],
    remaining: ECONOMY.shiftSeconds,
    duration: ECONOMY.shiftSeconds,
    toll: 0,
    activeDevice: null,
    pendingDevice: null,
    feedback: null,
    tutorialOpen: false,
    lastDeviceElapsed: INITIAL_LAST_DEVICE_ELAPSED,
    bleedFired: 0,
    reprimandFired: 0,
    ended: null,
  };
}

function advance(state: State): State {
  const next = state.index + 1;
  if (next >= state.queue.length) {
    return { ...state, phase: "summary", ended: state.ended ?? "queue", activeDevice: null };
  }
  return { ...state, index: next };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CLOCK_IN":
      return { ...state, phase: "tutorial" };

    case "START_SHIFT":
      return {
        ...initialState(shuffle(state.queue)),
        phase: "shift",
        remaining: state.duration,
        duration: state.duration,
      };

    case "OPEN_TUTORIAL":
      return { ...state, tutorialOpen: true };
    case "CLOSE_TUTORIAL":
      return { ...state, tutorialOpen: false };

    case "SUBMIT": {
      if (state.phase !== "shift" || state.feedback || state.activeDevice) return state;
      const item = state.queue[state.index];
      if (!item) return state;

      const correct = isCorrect(item, action.action);
      const wage = nextWage(state.wage, correct);
      const wrongStreak = correct ? 0 : state.wrongStreak + 1;
      const toll = item.heavy ? Math.min(1, state.toll + 0.14) : state.toll;

      const draft: State = {
        ...state,
        wage,
        correctCount: state.correctCount + (correct ? 1 : 0),
        wrongCount: state.wrongCount + (correct ? 0 : 1),
        wrongStreak,
        toll,
        decisions: [
          ...state.decisions,
          {
            itemId: item.id,
            category: item.category,
            chosen: action.action,
            correctAction: item.correctAction,
            correct,
          },
        ],
        feedback: {
          correct,
          chosen: action.action,
          correctAction: item.correctAction,
          category: item.category,
          tag: item.tag,
          rationale: item.rationale,
        },
      };

      // Queue at most one device to interpose before the next item.
      let pendingDevice = null as State["pendingDevice"];
      if (shouldBleedThrough(draft, item)) {
        pendingDevice = pickBleedThrough(draft.bleedFired);
      } else if (shouldReprimand(draft)) {
        pendingDevice = pickReprimand(draft);
      }
      return { ...draft, pendingDevice };
    }

    case "RESOLVE": {
      if (!state.feedback) return state;
      const cleared = { ...state, feedback: null };
      const device = state.pendingDevice;
      if (device) {
        return {
          ...cleared,
          activeDevice: device,
          pendingDevice: null,
          lastDeviceElapsed: state.duration - state.remaining,
          bleedFired: state.bleedFired + (device.kind === "bleedthrough" ? 1 : 0),
          reprimandFired: state.reprimandFired + (device.kind === "reprimand" ? 1 : 0),
        };
      }
      return advance(cleared);
    }

    case "DISMISS_DEVICE": {
      if (!state.activeDevice) return state;
      return advance({ ...state, activeDevice: null });
    }

    case "TICK": {
      if (state.phase !== "shift") return state;
      const remaining = state.remaining - 1;
      if (remaining <= 0) {
        return {
          ...state,
          remaining: 0,
          phase: "summary",
          ended: "time",
          activeDevice: null,
          pendingDevice: null,
          feedback: null,
        };
      }
      return { ...state, remaining };
    }

    case "RESET":
      return initialState(state.queue);

    default:
      return state;
  }
}
