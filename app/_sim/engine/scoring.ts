import type { QueueItem, ModAction, PolicyCategory } from "./types";

export const ECONOMY = {
  start: 700,
  floor: 0, // deductions reduce your pay below the starting wage — a mistake really costs
  cap: 1400,
  correct: 25,
  incorrect: -100,
  shiftSeconds: 300,
  targetCount: 30,
} as const;

export function isCorrect(item: QueueItem, action: ModAction): boolean {
  return item.correctAction === action;
}

export function nextWage(wage: number, correct: boolean): number {
  const delta = correct ? ECONOMY.correct : ECONOMY.incorrect;
  return Math.max(ECONOMY.floor, Math.min(ECONOMY.cap, wage + delta));
}

export const CATEGORY_LABELS: Record<PolicyCategory, string> = {
  GraphicViolence: "Graphic Violence",
  HateSpeech: "Hate Speech",
  SelfHarm: "Self-Harm",
  Misinfo: "Misinformation",
  Nudity: "Nudity / Sexual",
  Harassment: "Harassment",
  Spam: "Spam / Scams",
  Benign: "Benign",
};

export const ACTION_LABELS: Record<ModAction, string> = {
  delete: "Delete",
  ignore: "Ignore",
};

export function formatPeso(n: number): string {
  return "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatClock(seconds: number): string {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}
