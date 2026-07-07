import type { QueueItem, PolicyCategory } from "../engine/types";
import { ECONOMY } from "../engine/scoring";
import { SEED } from "./seed";
import { member1 } from "./contributions/member-1";
import { member2 } from "./contributions/member-2";
import { member3 } from "./contributions/member-3";
import { member4 } from "./contributions/member-4";
import { member5 } from "./contributions/member-5";

export { REVEALS } from "./devices";

const ACTIONS = new Set(["delete", "flag", "ignore"]);
const CATEGORIES: PolicyCategory[] = [
  "GraphicViolence", "HateSpeech", "SelfHarm", "Misinfo",
  "Nudity", "Harassment", "Spam", "Benign",
];

const contributed: QueueItem[] = [
  ...member1, ...member2, ...member3, ...member4, ...member5,
];

/** Use the team's real content once enough is supplied; otherwise the seed set. */
const assembled = contributed.length >= 20 ? contributed : SEED;

/** Structural checks throw (bad data must not ship); coverage gaps only warn. */
function validate(queue: QueueItem[], usingSeed: boolean) {
  const ids = new Set<string>();
  for (const it of queue) {
    if (!it.id || ids.has(it.id)) throw new Error(`[content] duplicate/missing id: "${it.id}"`);
    ids.add(it.id);
    if (!ACTIONS.has(it.correctAction)) throw new Error(`[content] ${it.id}: bad correctAction`);
    if (!CATEGORIES.includes(it.category)) throw new Error(`[content] ${it.id}: bad category`);
    if (!it.rationale?.trim()) throw new Error(`[content] ${it.id}: missing rationale`);
    if (!it.post) throw new Error(`[content] ${it.id}: missing post`);
  }
  if (process.env.NODE_ENV !== "production") {
    const source = usingSeed ? "SEED (team content not yet supplied)" : "team contributions";
    if (queue.length < ECONOMY.targetCount) {
      console.warn(`[content] using ${source}: ${queue.length}/${ECONOMY.targetCount} items.`);
    }
    const present = new Set(queue.map((q) => q.category));
    const missing = CATEGORIES.filter((c) => c !== "Benign" && !present.has(c));
    if (missing.length) console.warn(`[content] categories not covered: ${missing.join(", ")}`);
  }
}

validate(assembled, assembled === SEED);

export const QUEUE: QueueItem[] = assembled;
