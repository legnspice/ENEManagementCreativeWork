# Build Plan — "Putting on the Mask" Content-Moderation Shift Simulator

> Creative output for ENE Major Task 2 (Group 5). An interactive website that casts the
> audience as a Filipino content moderator working a 5-minute "shift," dramatizing the labor
> issue analyzed in **Deleter (2022)**: harsh working conditions with no support for mental
> well-being. This document is the spec we build against in one pass.

---

## 1. Intent & thesis mapping (why every mechanic exists)

Thesis: *Deleter* uses **ideological focalization** (we live inside Lyra's deteriorating mind)
and the **binary opposition of company profit vs. employee well-being** to expose unsupported,
harsh conditions for content moderators. The simulator makes each of those *felt*, not observed:

| Thesis element | Mechanic in the build |
| --- | --- |
| Ideological focalization — the viewer *becomes* the worker | The participant **is** the moderator; the whole UI is first-person labor |
| Focalization → intrusive trauma / hallucination | **Bleed-through** device: Deleter stills you can't act on, triggered by heavy content |
| Binary opposition: profit/quota vs. well-being | The **wage counter + quota + 5-min timer** pressure you; **Simon reprimands** speak for profit |
| "Superficial support" (Simon offers pills) | Reprimand device offers pills instead of real help |
| The invisible human behind a clean feed | **Summary/reveal** unmasks the cost; a news card *about* moderator abuse implicates the player |
| Apathy as survival (Lyra numbs to cope) | The **"Keep working"** dismiss makes the player *perform* the suppression |

Rubric coverage (Creative Output 12 / Content 25): novel interactive expression (bleed-through,
economy), maximizes the web medium, clarity of the labor issue, textual evidence (Deleter
timestamps embedded in device captions + rationale), external evidence (news/stat cards feed
Works Cited).

---

## 2. Locked design decisions (from brainstorm)

- **Actions:** 3 buttons — **Delete / Flag / Ignore**. No separate policy-tag input (keeps the
  ~10s/post pace). Policy maps: Approve→Ignore, Escalate→Flag, Self-harm always→Flag.
- **Feedback:** correct category + rationale shown as micro-feedback after each decision, and
  compiled in the summary (teaches policy mastery without the click tax).
- **Timer:** single global **5:00** countdown. Shift ends at 0:00 or when the queue is done.
- **Economy:** start **₱700**, cap **₱1,400**, correct **+₱25**, incorrect **−₱100**, floor ₱700,
  **30 items**.
- **Content intake:** team supplies real posts as links → we **read → sanitize → designate correct
  action → re-render as SocHub cards** (never embed raw). Each item needs the answer-key block.
- **Film stills are NOT queue items.** They are a **device layer** in three roles:
  - **Bleed-through (Lyra):** full-screen desaturated still, no action buttons, fires *after a
    heavy item*, dismissed with "Keep working." Escalates over the shift.
  - **Reprimand (Simon):** a "message from management" card, fires on *errors / falling behind*,
    offers pills.
  - **Reveal (Aileen, mild frames only):** on the summary screen, ties wage/score to human cost.

---

## 3. Architecture (Next.js 16 App Router)

Confirmed against `node_modules/next/dist/docs`:
- Layouts/pages are Server Components by default; interactivity requires `"use client"`.
- Context providers must be Client Components wrapping `{children}` (mounted in a layout/page).
- `params`/`searchParams` are Promises in this version (await them) — only relevant if we keep
  dynamic feed routes.

**Shape:** one **client-driven state machine** rather than multiple routes, because the experience
shares one global timer + score across screens and must reset cleanly for the next participant.

- `app/page.tsx` (Server Component) renders `<SimulatorProvider><Simulator /></SimulatorProvider>`.
- `Simulator` (client) switches on `state.phase`: `signin → tutorial → shift → summary`.
- Reset = a `RESET` reducer action (and a full page reload also resets) → kiosk turn-taking.
- The existing **SocHub feed at `/feed/*` stays** as the "platform" the moderator serves (optional
  link / easter egg). Root `/` no longer redirects to the feed; it boots the simulator.

State lives in `useReducer` + React context (client). No backend, no persistence needed for the
core experience (in-memory; reset on reload). Optional: mirror final score to `localStorage` for
a between-runs leaderboard — deferred, not in scope for v1.

---

## 4. File structure

```
app/
  page.tsx                      # MODIFY: boot the simulator (was redirect to feed)
  layout.tsx                    # MODIFY: title/description → the simulator; keep fonts
  globals.css                   # MODIFY: add device/animation tokens (grain, fade, pulse)
  _sim/
    SimulatorProvider.tsx       # client: context + useReducer store (phase, wage, timer, log)
    Simulator.tsx               # client: phase switch / top-level orchestrator
    engine/
      types.ts                  # ModItem, Action, Phase, Decision, State types
      reducer.ts                # pure reducer: SUBMIT, TICK, INTRUDE, DISMISS, RESET, START...
      scoring.ts                # +25 / -100, floor 700, cap 1400; correctness check
      devices.ts                # trigger logic: when to fire bleed-through / reprimand + escalation
      useCountdown.ts           # client hook: 5:00 countdown → dispatch TICK, END at 0
    screens/
      SignIn.tsx                # "clock in" kiosk screen (fake creds)
      Tutorial.tsx              # policy modal (skippable, reopenable)
      Shift.tsx                 # dashboard: HUD + post frame + actions + notes + policy panel
      Summary.tsx               # reveal: score, wage, breakdown, thesis payload, RESET
    components/
      Hud.tsx                   # wage counter (animated), processed count, timer
      PolicyPanel.tsx           # the 7-category rules, always-visible side reference
      ActionBar.tsx             # Delete / Flag / Ignore buttons (+ keyboard shortcuts)
      Feedback.tsx              # post-decision micro-feedback (✓/✗ + category + rationale)
      BleedThrough.tsx          # full-screen intrusion overlay ("Keep working")
      Reprimand.tsx             # Simon management-message card
      NotesPad.tsx              # the textarea from the wireframe
    content/
      TEMPLATE.md               # authoring guide + Google-Doc entry format for the 5 teammates
      index.ts                  # concat all contributions + devices + dev-time validator
      devices.ts                # the film-still device items (bleed/reprimand/reveal)
      seed.ts                   # my seed queue (covers Nudity/Spam/Benign + examples) — playable now
      parse-intake.ts           # manual: exported Doc .md → sanitized QueueItem drafts
      intake/                   # raw Google-Doc markdown exports land here
      contributions/
        member-1.ts ... member-5.ts   # each exports QueueItem[] (6 items); teammates’ real content
  _components/                  # REUSE unchanged: PostCard, Avatar, Votes, etc.
public/
  avatars/  embeds/             # add safe placeholders so existing feed stops 404-ing
  deleter/                      # team drops mild Deleter stills here (device media)
```

---

## 5. Data model

```ts
// app/_sim/engine/types.ts
export type PolicyCategory =
  | "GraphicViolence" | "HateSpeech" | "SelfHarm" | "Misinfo"
  | "Nudity" | "Harassment" | "Spam" | "Benign";

export type ModAction = "delete" | "flag" | "ignore";

export type QueueItem = {
  id: string;
  kind: "post";                 // scored moderation items rendered as SocHub cards
  contributor: 1|2|3|4|5|0;     // 0 = seed/author; drives member attribution
  post: Post;                   // reuses existing _components/PostCard `Post` type
  category: PolicyCategory;
  correctAction: ModAction;
  rationale: string;            // shown in feedback + summary; MLA-able note
  ambiguity: "clear" | "ambiguous";
  heavy?: boolean;              // graphic/self-harm/harassment → may seed a bleed-through
};

export type DeviceItem =
  | { kind: "bleedthrough"; id: string; media: string; alt: string; fragment?: string }
  | { kind: "reprimand"; id: string; media?: string; message: string; offersPills?: boolean }
  | { kind: "reveal"; id: string; media?: string; text: string };  // summary use
```

`Post` (existing) = `{ id, author, authorHandle, avatarSrc?, verified?, pinned?, title?, body?,
embedSrc?, embedAlt?, upvotes, downvotes, timestamp }`. **Avatars fall back to colored initials
when `avatarSrc` is omitted** → most items need zero image assets. Keep it text-forward per the
safety mandate.

**Validator (`content/index.ts`, dev-time):** throws if item count ≠ 30, a policy category is
missing across the queue, any item lacks `correctAction`/`rationale`, or a referenced media path
is unknown. Fails loudly during `next dev`/`build` so bad content can't ship silently.

---

## 6. The engine

**Phases:** `signin → tutorial → shift → summary`.

**Reducer actions:**
- `START_SHIFT` — leave tutorial, seed queue order, start timer.
- `SUBMIT { action }` — score current item, push a `Decision`, advance index; maybe enqueue a
  bleed-through (if item was `heavy`) and/or a reprimand (see triggers).
- `INTRUDE { device }` / `DISMISS` — show/clear a bleed-through; timer keeps running.
- `TICK` — decrement remaining seconds; at 0 → `phase = summary`.
- `OPEN_TUTORIAL` / `CLOSE_TUTORIAL` — reopen policy mid-shift (pauses nothing — pressure stays).
- `RESET` — back to `signin`, fresh state (kiosk).

**Scoring (`scoring.ts`):** `correct = action === item.correctAction`. `wage += correct ? +25 :
-100`, clamped to `[700, 1400]`. Track `correctCount`, `wrongCount`, per-category tallies.

**Timer (`useCountdown.ts`):** `useEffect` + `setInterval(1000)` dispatching `TICK`; cleared on
unmount / phase change. Single source of truth = `state.remainingSeconds` (starts 300).

**Note on the math:** all-correct = 700 + 30×25 = 1450 → capped **1400** (cap hit at 28 correct).
7 wrong bottoms you out at the ₱700 floor. Bleed-throughs cost seconds (timer keeps running), so a
"perfect" run is *deliberately* hard — the system is stacked, not rigged. Device frequency is tuned
so the ceiling stays reachable.

---

## 7. Screens

**SignIn** — kiosk "clock in." Fake username/password (any input accepted), a SocHub/Contentle
work-portal look, a "Clock in" button → `tutorial`. Sets the fiction: you are an employee starting
a shift.

**Tutorial** — modal with the 7-category **policy table** (the "hard rules"). Skippable ("Start
shift") and reopenable during play via a "?" in the HUD. Also mirrored persistently in the side
**PolicyPanel** during the shift (matches the wireframe's notes/policy panel).

**Shift (dashboard)** — the core screen, responsive per moodboard (mobile stacked / widescreen
3-column):
- **HUD** (top): live **wage** (animated ticking), **processed count** (`12 / 30`), **timer**
  (5:00 countdown, turns red near 0). A "?" reopens the tutorial.
- **Center frame:** **one item at a time** (Deleter logic — *not* an infinite feed). The current
  item is rendered by `PostCard` inside a **fixed-height frame that scrolls internally** (long
  posts/threads scroll *within* the frame); you cannot scroll ahead to future items or back to
  processed ones. Acting advances to the next item; the frame is also where devices take over.
- **ActionBar:** Delete / Flag / Ignore (+ keyboard 1/2/3 for pace). After submit → brief
  **Feedback** (✓/✗, correct category, one-line rationale) → next item.
- **Side panel (widescreen):** PolicyPanel + NotesPad (the wireframe's "TextArea for notes").
- Devices overlay this screen (bleed-through full-screen; reprimand as a card).

**Summary / reveal** — end state:
- Score: correct/incorrect, final **wage vs. the ₱1,400 ceiling**, per-category accuracy.
- **The reveal:** Aileen (mild) still + thesis payload — MLA-cited stats ("87% of Filipino workers
  report a work-related mental-health issue…"; Fenol "dirtiest job"; Alquino & Bartolo; De Leon),
  the Simon/pills parallel, and the line: *behind every clean feed is a real person — and for the
  last five minutes, that was you.*
- **Reset** button → next participant.

---

## 8. Device layer (the differentiators)

**Bleed-through (Lyra):**
- Trigger: fires right *after* the player processes a `heavy` item (graphic violence / self-harm /
  harassment). Cause→effect the player learns without words.
- UX: full-screen desaturated still (film grain, no SocHub chrome), no action buttons; ~1s forced
  beat, then a single **"Keep working"** button; timer keeps running the whole time.
- Escalation: early = rare/short/one frame; mid = ~2s + a text fragment; late = more frequent and
  starts *ghosting over* the live post (feed gets harder to read). Driven by a `toll` counter and
  elapsed time in `devices.ts`.

**Reprimand (Simon):**
- Trigger: on falling behind pace (processed count vs. elapsed-time expectation) or an error streak.
- UX: a "message from management" card — "Simon · Supervisor" — pressure text + "take one of these"
  (pills). Acknowledge to continue. Visually external (a DM/notification), contrasting the internal
  bleed-through.

**Distinction table** (internal toll vs. external pressure) is itself the binary opposition made
visible. Devices are **never scored** (no `correctAction`), consistent with the intake flow.

---

## 9. Content authoring workflow (for the 5 non-technical teammates)

**Intake mechanism (locked):** the team collaborates in **one shared Google Doc**. Each member
adds their items as **links to real posts** (X / Facebook / Instagram / Reddit / news) plus a short
answer-key block per item. The Doc owner **downloads the Doc as Markdown** (File → Download →
Markdown `.md`) and hands it to us; **we parse that `.md`** → read → **sanitize** (fictionalize into
SocHub personas, strip real identities) → **designate the correct action** → generate the typed
`QueueItem`s in `member-N.ts`. Teammates never touch code, never paste screenshots — just links + a
few lines each.

**What the team provides = link + brief description only.** They do **not** classify anything —
*we* derive `correctAction`, `category`, `ambiguity`, and `rationale` during parsing/sanitization.
This keeps the ask trivial for non-technical members and keeps the answer-key consistent (one
person's judgment across all 30). Doc entry format (one block per item, parses deterministically):

```
### Item — <member name>
Link: <url to the source post/article>
Description: <1–2 sentences: what it is / why they picked it / any context>
```

- **Category focus (all 7 covered):** M1 Graphic Violence · M2 Hate Speech · M3 Misinformation ·
  M4 Harassment · M5 Self-Harm. Nudity / Spam / Benign covered by the seed set.
- **Per-member recipe (6 items):** 3 moderatable posts (clear + borderline + 1 free) · 1 **real
  news/stat card** (→ Works Cited) · 1 wildcard · **+ claim 1–2 of the 8 shared Deleter stills**
  (Appendix A) matched to the scene they analyzed (they confirm timestamp + one-line caption;
  stills are a shared device pool, not per-item moderation).
- **Safety (non-negotiable):** critique the labor without reproducing harmful material — we
  re-render every linked post as a sanitized SocHub card (no raw embeds, no real people, text
  forward), no real gore / self-harm imagery, mild Deleter stills only.

**Ingestion pipeline (our side):** exported `.md` dropped in `content/intake/`; a parser
(`content/parse-intake.ts`, run manually) splits on the `### Item` blocks, fetches/reads each link,
and emits sanitized `QueueItem` drafts into `member-N.ts` for a final human pass. We ship a
**seeded playable set** now (`seed.ts`); teammates' real content and Deleter stills
(`public/deleter/`) drop in later without touching the engine.

---

## 10. Assets

- **Broken scaffold fix:** `public/avatars` and `public/embeds` are empty → existing feed 404s.
  Add lightweight safe placeholders (or omit `avatarSrc`/`embedSrc` on seed content to use the
  initials fallback). Existing `#YaniDrama` feed cleaned up so `/feed` renders.
- **Deleter stills:** `public/deleter/` — team-supplied mild frames for device items. Until then,
  device overlays render with a styled placeholder (solid desaturated panel + caption) so the flow
  works without assets.
- No external/CDN assets; everything local (kiosk may be offline).

---

## 11. Accessibility, responsive, kiosk

- Responsive: mobile (stacked, single column, actions pinned) and widescreen (3-column) per
  moodboard. Laptop/widescreen is the onsite target; link works on any device.
- Keyboard: 1/2/3 = Delete/Flag/Ignore for pace; Enter to dismiss devices.
- Kiosk: fast reset (button + reload), no auth/network dependency, tab title + favicon set.
- Reduced-motion: respect `prefers-reduced-motion` for the grain/flash (a11y + avoids nausea).

---

## 12. Build sequence (the one-shot order)

1. Fix scaffold assets so `/feed` renders (placeholders / omit srcs).
2. `engine/types.ts` + `scoring.ts` + `reducer.ts` + `useCountdown.ts` + `devices.ts`.
3. `content/` — `types` wired, `seed.ts` (playable across all 7 categories), `devices.ts`,
   empty `member-N.ts` stubs, `index.ts` validator, `TEMPLATE.md`.
4. `SimulatorProvider` + `Simulator` phase switch.
5. Screens: SignIn → Tutorial → Shift (HUD, frame, ActionBar, Feedback, PolicyPanel, NotesPad) →
   Summary.
6. Devices: BleedThrough + Reprimand overlays wired to triggers + escalation + globals.css anims.
7. `app/page.tsx` + `layout.tsx` + globals.css updates.
8. **Verify:** `next build` clean; `next dev` and drive the full flow end-to-end (sign in → make
   correct/incorrect calls → trigger a bleed-through and a reprimand → run timer to 0 → summary →
   reset). Confirm wage clamps at 700/1400 and the validator passes.

---

## 13. What the team must still provide (post-build)

- Real content for `member-1.ts … member-5.ts` (30 items total) via the worksheet.
- Mild Deleter stills into `public/deleter/` (named per device item).
- Finalized reveal copy / exact MLA in-text citations (draft provided; they confirm against Works
  Cited).

## 14. Risks / watch-items

- **Next 16 API drift** — consult `node_modules/next/dist/docs` per file; don't assume prior APIs.
- **Pace vs. devices** — tune device frequency so ₱1,400 stays reachable (feels stacked, not rigged).
- **Safety** — enforce text-forward, no-real-gore in both seed content and the template.
- **Copyright** — Deleter stills used for criticism/teaching, non-commercial, cited (PH IP Code
  §185); stills over clips.

---

## Appendix A — Deleter assets & effects

Guiding rule: **mild frames only.** We evoke the toll; we never reproduce the gore or the
self-harm act. Every still below comes from a scene already analyzed in the group's notes.

### A.1 Stills we display (real frames — team sources ~6–8 files → `public/deleter/`)

| # | Scene | Timestamp | Narrative concept | Role / where | How it appears |
| --- | --- | --- | --- | --- | --- |
| 1 | Simon offers Lyra anxiety pills | 00:07:40–00:08:50 | Moral stance — superficial support | **Reprimand (Simon)** | Management card when you fall behind: pressure + "take one of these" |
| 2 | Lyra asks Simon for a raise | 00:09:30–00:10:00 | Binary opposition — profit vs. worker | **Reprimand (Simon)** | Fires when wage is low / after deductions — the boss denies |
| 3 | POV *of Lyra's computer* / screen glow | 00:10:57 | Perceptual focalization | **Bleed-through** + frame vignette | Flash after a heavy item; also the ambient monitor-glow around the frame |
| 4 | Lyra zoning out (bathroom) | 00:11:00 | Focalization — dissociation | **Bleed-through** | Full-screen desaturated still, "Keep working" |
| 5 | Content exposure / burnout blur | 00:11:00–00:13:20 | The job invading the mind | **Bleed-through** (mid/late) | Ghosts over the live post + a text fragment |
| 6 | Lyra's apathetic stare | 00:52:10 | Apathy as survival/coping | **Bleed-through** (late) | The numbest intrusion; pairs with "Keep working" |
| 7 | Aileen breaking down on the floor | 00:23:55 / 00:55:55 | Effects of the issue (mild) | **Reveal (Summary)** | Still beside the thesis payload — the cost |
| 8 | Aileen forces Lyra to remember | 01:22:32 | Focalizer confronts the suppressed | **Reveal (Summary)** | Closing beat — you can't un-see it either |

**Excluded, deliberately (never shown, only referenced in text on the reveal):** Aileen's suicide
(00:24:36), the later self-harm (01:23:20), any graphic content Lyra actually moderates.

### A.2 Effects we recreate in code (no image files — CSS/JS; all respect `prefers-reduced-motion`)

| Effect | What it does | Deleter link |
| --- | --- | --- |
| **Progressive desaturation** | Console drains of color as the `toll` counter rises across the shift | Lyra's deterioration; cold palette |
| **Film grain + flicker** | Grain overlay on bleed-throughs, faint on the frame late-shift | Horror register bleeding into the workspace |
| **Screen-glow vignette** | Frame lit like a monitor in a dark room; darkens over time | POV "of Lyra's computer" (00:10:57); cubicle isolation |
| **Ghosting / superimposition** | Late bleed-throughs composite semi-transparent over the live post | Hallucination / content invading perception (00:11:00–00:13:20) |
| **"Tuldok" dehumanization** | In intrusions, faces/people abstract into dots | Lyra viewing people as data / *tuldok* |
| **Pill motif** | Simon's reprimand offers a pill icon instead of help | 00:07:40–00:08:50 |
| **The mask** | Sign-in = "Put on the mask / Clock in"; Summary = "Take off the mask" | Title: *Putting on the Mask* |
| **Rising timer dread** | Timer reddens / pulses near 0:00 | Quota pressure |

### A.3 Team ask for stills

Each teammate **claims 1–2 of the 8 stills** above (matched to the scene they analyzed), confirms
its timestamp, and writes a one-line caption. Until real frames arrive, device overlays render as
styled desaturated placeholders + caption, so the flow is fully playable without assets.
</content>
</invoke>
