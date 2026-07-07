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
    media: "/lyra-screen.png",
    alt: "Lyra lit only by her monitor in the dark",
    fragment: "…the screen is the only light left.",
  },
  {
    kind: "bleedthrough",
    id: "bt-zoning",
    media: "/lyra-bathroom.png",
    alt: "Lyra staring at nothing, dissociating",
    fragment: "…how long have I been sitting here?",
  },
  {
    kind: "bleedthrough",
    id: "bt-burnout",
    media: "/lyra-burnout.png",
    alt: "The content blurring into Lyra's vision",
    fragment: "…I can still see the last one.",
  },
  {
    kind: "bleedthrough",
    id: "bt-apathy",
    media: "/lyra-apathy.png",
    alt: "Lyra's blank, apathetic stare",
    fragment: "…it doesn't reach me anymore.",
  },
];

// Reprimand — external pressure on errors / falling behind, styled as a workplace
// chat notification (Slack-like). Varied, corporate, no film reference. Binary opposition.
export const REPRIMANDS: Reprimand[] = [
  {
    kind: "reprimand",
    id: "rp-replace",
    sender: "Simon",
    channel: "Supervisor · direct message",
    message: "Uy, okay ka lang ba? Ang bagal-bagal mo kanina eh. Sayang, akala ko ikaw pa 'yung maaasahan ko dito 🙂",
  },
  {
    kind: "reprimand",
    id: "rp-pay",
    sender: "Simon",
    channel: "Supervisor · direct message",
    message: "No pressure ha, pero baka gusto mong tingnan ulit 'yang pay mo bago ka mag-relax masyado. Basta, sinabi ko na sa'yo 🙂",
  },
  {
    kind: "reprimand",
    id: "rp-door",
    sender: "Simon",
    channel: "Supervisor · direct message",
    message: "Ang dami palang nag-a-apply para sa position mo, alam mo ba? Swerte mo nga eh. Sana lang ma-feel mo 'yun 🙂",
  },
  {
    kind: "reprimand",
    id: "rp-cameras",
    sender: "Simon",
    channel: "Supervisor · direct message",
    message: "Nakikita ko naman lahat dito ha, wag kang mag-alala. Just trying to help you improve lang naman. Kaya mo pa ba talaga 'to?",
  },
  {
    kind: "reprimand",
    id: "rp-last",
    sender: "Simon",
    channel: "Supervisor · direct message",
    message: "Ayoko sanang maging ganito, pero... ikaw na bahala sa sarili mo bukas ah. Sana tama 'yung ginagawa mo ngayon 🙂",
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
  },
  {
    kind: "reveal",
    id: "rv-aileen-remember",
    media: "/deleter/aileen-remember.jpg",
    alt: "Aileen forcing Lyra to remember what she witnessed",
    text: "You can look away from the feed. You can't look away from what it already put in your head.",
  },
];
