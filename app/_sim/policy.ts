import type { PolicyCategory, ModAction } from "./engine/types";

export type PolicyRule = {
  category: PolicyCategory;
  label: string;
  glyph: string;
  rule: string;
  actions: ModAction[];
};

/** Condensed cheat sheet — mirrors the two buttons for fast scanning. */
export const DELETE_WHEN = [
  "Real violence or gore",
  "Hate or slurs aimed at people",
  "Explicit sexual content",
  "Doxxing, threats, or targeted harassment",
  "False claims stated as fact",
  "Spam and scams",
  "Posts that encourage self-harm",
];

export const IGNORE_WHEN = [
  "Everyday, harmless posts",
  "Opinions, jokes, and satire",
  "Criticism of public figures",
  "Talking about discrimination (no slurs)",
  "Medical or educational nudity",
  "Support or recovery posts",
];

/** Full per-category rules (kept for reference / future use). */
export const POLICY: PolicyRule[] = [
  {
    category: "GraphicViolence",
    label: "Graphic Violence",
    glyph: "▲",
    rule: "Delete if it shows real, non-consensual harm. When authenticity is unclear, err toward removal.",
    actions: ["delete"],
  },
  {
    category: "HateSpeech",
    label: "Hate Speech",
    glyph: "✖",
    rule: "Delete if it attacks a person or group by identity. Ignore if it's commentary about discrimination without slurs.",
    actions: ["delete", "ignore"],
  },
  {
    category: "SelfHarm",
    label: "Self-Harm",
    glyph: "✚",
    rule: "Delete content that depicts or encourages self-harm. Ignore genuine support/recovery posts (e.g. sharing a hotline).",
    actions: ["delete", "ignore"],
  },
  {
    category: "Misinfo",
    label: "Misinformation",
    glyph: "◍",
    rule: "Delete if it makes a false, checkable factual claim. Ignore if it's opinion, satire, or clearly labeled speculation.",
    actions: ["delete", "ignore"],
  },
  {
    category: "Nudity",
    label: "Nudity / Sexual",
    glyph: "◐",
    rule: "Delete if explicit. Ignore if the context is clearly artistic, medical, or educational.",
    actions: ["delete", "ignore"],
  },
  {
    category: "Harassment",
    label: "Harassment / Bullying",
    glyph: "❢",
    rule: "Delete if it targets an identifiable private person (doxxing, pile-ons). Ignore if it's general criticism of a public figure.",
    actions: ["delete", "ignore"],
  },
  {
    category: "Spam",
    label: "Spam / Scams",
    glyph: "$",
    rule: "Delete automatically.",
    actions: ["delete"],
  },
  {
    category: "Benign",
    label: "Benign",
    glyph: "○",
    rule: "No violation. Ignore and move on.",
    actions: ["ignore"],
  },
];
