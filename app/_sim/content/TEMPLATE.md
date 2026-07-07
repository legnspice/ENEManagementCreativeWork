# Content authoring guide (for the team)

We're building the moderation queue. **You only give links + a short description.** We handle the
classification (correct action, policy category, clear/borderline, rationale) and the sanitizing.

## What you do

In our shared Google Doc, add your items as blocks in exactly this shape (so we can auto-parse the
Markdown export). One block per item:

```
### Item — <your name>
Link: <url to the real post / article you found>
Description: <1–2 sentences: what it is, why you picked it, any context we'd miss>
```

That's it. Don't classify anything — just find good material and describe it.

## What to find — your 6 items

| You | Focus category |
| --- | --- |
| Member 1 | Graphic Violence |
| Member 2 | Hate Speech |
| Member 3 | Misinformation |
| Member 4 | Harassment / Bullying |
| Member 5 | Self-Harm |

Your 6 items:
1. A post in **your focus category** that's an **obvious** violation.
2. A post in **your focus category** that's a **borderline** call (this is the good stuff — where a
   reasonable person could argue two ways).
3. One more post in **any** other category.
4. **One real news/stat article** about content-moderation or workplace-stress labor issues
   (we cite it — save the link; it feeds our Works Cited).
5. A **wildcard** — anything that fits the theme (a Snowpiercer/American Sweatshop tie-in, etc.).
6. **Claim 1–2 Deleter stills** from the scene *you* analyzed (see BUILD_PLAN Appendix A) — tell us
   the scene + timestamp + a one-line caption. We'll place them as intrusion/reprimand/reveal.

## The test of a good item

> Could a reasonable person defend two different actions? If yes → great **borderline** item.
> If it's obvious to everyone → fine **clear-cut** item. If it's neither → it's noise, skip it.

## Safety (non-negotiable — from the assignment)

Critique the labor **without reproducing harmful material.** So:
- Find links for **reference** — we re-render everything as our own sanitized "SocHub" cards. Never
  paste graphic images; a link + description is enough.
- No real people targeted (we fictionalize into SocHub personas).
- Deleter stills: **mild frames only** (Lyra at the desk, the pills, zoning out — never the
  self-harm/suicide scenes).

## How it flows to the app

Doc owner: **File → Download → Markdown (.md)** → drop the file in `intake/`. We run
`parse-intake.ts`, sanitize, set the answer key, and generate `contributions/member-N.ts`. The
engine picks up real content automatically once ~20 items exist (until then it runs on the seed set).
