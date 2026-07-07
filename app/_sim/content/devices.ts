import type { BleedThrough, Reprimand, RevealCard } from "../engine/types";

/**
 * Deleter stills as devices that operate ON the player (see BUILD_PLAN Appendix A).
 * `media` points under /public/deleter/ — until the team drops real frames there,
 * overlays render a styled desaturated placeholder + caption, so the flow works now.
 */

// Bleed-through (Lyra) — intrusive flashes after heavy content. Focalization.
export const BLEEDTHROUGHS: BleedThrough[] = [
  {
    kind: "bleedthrough",
    id: "bt-screen-glow",
    media: "/deleter/lyra-screen.jpg",
    alt: "Lyra lit only by her monitor in the dark",
    fragment: "…the screen is the only light left.",
    timestamp: "Deleter 00:10:57",
  },
  {
    kind: "bleedthrough",
    id: "bt-zoning",
    media: "/deleter/lyra-bathroom.jpg",
    alt: "Lyra staring at nothing, dissociating",
    fragment: "…how long have I been sitting here?",
    timestamp: "Deleter 00:11:00",
  },
  {
    kind: "bleedthrough",
    id: "bt-burnout",
    media: "/deleter/lyra-burnout.jpg",
    alt: "The content blurring into Lyra's vision",
    fragment: "…I can still see the last one.",
    timestamp: "Deleter 00:11:00–00:13:20",
  },
  {
    kind: "bleedthrough",
    id: "bt-apathy",
    media: "/deleter/lyra-apathy.jpg",
    alt: "Lyra's blank, apathetic stare",
    fragment: "…it doesn't reach me anymore.",
    timestamp: "Deleter 00:52:10",
  },
];

// Reprimand — external pressure on errors / falling behind, styled as a workplace
// chat notification (Slack-like). Varied, corporate, no film reference. Binary opposition.
export const REPRIMANDS: Reprimand[] = [
  {
    kind: "reprimand",
    id: "rp-pace",
    sender: "Mara — Team Lead",
    channel: "Direct message",
    message: "You're falling behind the floor. Everyone else is keeping pace — let's pick it up. 🙏",
  },
  {
    kind: "reprimand",
    id: "rp-target",
    sender: "Mara — Team Lead",
    channel: "Direct message",
    message: "Reminder: target is 30 reviews this shift. You're trailing. Stay focused.",
  },
  {
    kind: "reprimand",
    id: "rp-speed",
    sender: "Mara — Team Lead",
    channel: "Direct message",
    message: "Don't overthink each one. Speed is the metric today — the backlog's climbing on your station.",
  },
  {
    kind: "reprimand",
    id: "rp-rate",
    sender: "Ops Bot",
    channel: "#floor-alerts",
    message: "⚠️ Your review rate dropped in the last few minutes. Keep moving to stay on quota.",
  },
  {
    kind: "reprimand",
    id: "rp-accuracy",
    sender: "Mara — Team Lead",
    channel: "Direct message",
    message: "Seeing some misses on your queue. Pull it together — mistakes come out of your pay.",
  },
];

// Reveal (Aileen, mild) — summary screen. Effects of the issue.
export const REVEALS: RevealCard[] = [
  {
    kind: "reveal",
    id: "rv-aileen-breakdown",
    media: "/deleter/aileen-floor.jpg",
    alt: "Aileen breaking down on the floor from stress",
    text: "Aileen broke down on this same floor. Nothing changed. The queue reopened the next morning.",
    timestamp: "Deleter 00:23:55",
  },
  {
    kind: "reveal",
    id: "rv-aileen-remember",
    media: "/deleter/aileen-remember.jpg",
    alt: "Aileen forcing Lyra to remember what she witnessed",
    text: "You can look away from the feed. You can't look away from what it already put in your head.",
    timestamp: "Deleter 01:22:32",
  },
];
