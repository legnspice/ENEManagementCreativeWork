import type { Post } from "../../_components/PostCard";
import type { CommentData } from "../../_components/CommentThread";

export type Phase = "signin" | "tutorial" | "shift" | "summary";

export type PolicyCategory =
  | "GraphicViolence"
  | "HateSpeech"
  | "SelfHarm"
  | "Misinfo"
  | "Nudity"
  | "Harassment"
  | "Spam"
  | "Benign";

export type ModAction = "delete" | "ignore";

/** A scored moderation item, rendered as a SocHub card. */
export type QueueItem = {
  id: string;
  /** 1–5 = teammate; 0 = seed/author. Drives member attribution. */
  contributor: 0 | 1 | 2 | 3 | 4 | 5;
  post: Post;
  /** Optional comment thread — often where the real moral weight lives. */
  comments?: CommentData[];
  category: PolicyCategory;
  correctAction: ModAction;
  /** 2–4 word reason shown in the feedback pop-up (e.g. "Doxxing", "Just an opinion"). */
  tag: string;
  /** One line: which rule + why. Internal answer key (not shown to players). */
  rationale: string;
  ambiguity: "clear" | "ambiguous";
  /** Graphic / self-harm / harassment → may seed a bleed-through intrusion. */
  heavy?: boolean;
};

/** Non-scored film-still devices that operate ON the player. */
export type BleedThrough = {
  kind: "bleedthrough";
  id: string;
  /** Path under /public, or undefined → styled placeholder. */
  media?: string;
  alt: string;
  fragment?: string;
  timestamp?: string;
};
export type Reprimand = {
  kind: "reprimand";
  id: string;
  sender: string; // e.g. "Mara — Team Lead"
  channel: string; // e.g. "Direct message"
  message: string;
};
export type RevealCard = {
  kind: "reveal";
  id: string;
  media?: string;
  alt?: string;
  text: string;
  timestamp?: string;
};
export type DeviceItem = BleedThrough | Reprimand;

export type Decision = {
  itemId: string;
  category: PolicyCategory;
  chosen: ModAction;
  correctAction: ModAction;
  correct: boolean;
};

export type Feedback = {
  correct: boolean;
  chosen: ModAction;
  correctAction: ModAction;
  category: PolicyCategory;
  tag: string;
  rationale: string;
};

export type State = {
  phase: Phase;
  queue: QueueItem[];
  index: number;
  wage: number;
  correctCount: number;
  wrongCount: number;
  /** consecutive wrong answers, for reprimand triggers */
  wrongStreak: number;
  decisions: Decision[];
  remaining: number; // seconds
  duration: number; // seconds (start value)
  /** accumulated exposure to heavy content; drives device escalation (0..1-ish after scaling) */
  toll: number;
  activeDevice: DeviceItem | null;
  /** device queued after the feedback beat resolves */
  pendingDevice: DeviceItem | null;
  feedback: Feedback | null;
  tutorialOpen: boolean;
  /** device throttling (post-based, tracked separately so Simon never starves the stills) */
  lastBleedIndex: number;
  lastReprimandIndex: number;
  bleedFired: number;
  reprimandFired: number;
  ended: "time" | "queue" | null;
};

export type Action =
  | { type: "CLOCK_IN" }
  | { type: "START_SHIFT" }
  | { type: "OPEN_TUTORIAL" }
  | { type: "CLOSE_TUTORIAL" }
  | { type: "SUBMIT"; action: ModAction }
  | { type: "RESOLVE" } // clears feedback → show pending device or advance
  | { type: "DISMISS_DEVICE" }
  | { type: "TICK" }
  | { type: "RESET" };
