/**
 * parse-intake.ts — manual helper (not imported by the app).
 *
 * Turns the team's Google-Doc Markdown export into QueueItem *drafts* for a human pass.
 * The team only supplies `Link:` + `Description:`; we fill correctAction/category/etc.
 *
 * Usage (from repo root):
 *   npx tsx app/_sim/content/parse-intake.ts app/_sim/content/intake/team.md > /tmp/drafts.ts
 *
 * Then: read each link, sanitize into a SocHub persona, set the answer key, and paste the
 * finished items into the relevant contributions/member-N.ts.
 */
import { readFileSync } from "node:fs";

type RawItem = { member?: string; link?: string; description?: string };

function parse(md: string): RawItem[] {
  const blocks = md.split(/^###\s+Item.*$/gim).slice(1);
  return blocks.map((block, i) => {
    const header = md.match(/^###\s+Item\s*[—-]\s*(.+)$/gim)?.[i] ?? "";
    const member = header.replace(/^###\s+Item\s*[—-]\s*/i, "").trim() || undefined;
    const link = block.match(/^\s*Link:\s*(.+)$/im)?.[1]?.trim();
    const description = block.match(/^\s*Description:\s*([\s\S]*)/im)?.[1]?.trim();
    return { member, link, description };
  });
}

function toDraft(raw: RawItem, i: number): string {
  const id = `m-${String(i + 1).padStart(2, "0")}`;
  return `  {
    id: "${id}",
    contributor: 0, // TODO set 1–5 (${raw.member ?? "?"})
    category: "Benign", // TODO classify from policy
    correctAction: "ignore", // TODO set answer key
    ambiguity: "clear", // TODO clear | ambiguous
    // heavy: true, // TODO uncomment for graphic / self-harm / harassment
    rationale: "TODO one line: which rule + why",
    // source: ${JSON.stringify(raw.link ?? "")}
    // note: ${JSON.stringify(raw.description ?? "")}
    post: {
      id: "${id}",
      author: "TODO", authorHandle: "todo",
      body: "TODO sanitized rewrite (no real people, text-forward)",
      upvotes: "0", downvotes: "0", timestamp: "1h",
    },
  },`;
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: tsx parse-intake.ts <path-to-exported.md>");
    process.exit(1);
  }
  const items = parse(readFileSync(file, "utf8"));
  console.log(`import type { QueueItem } from "../../engine/types";\n`);
  console.log(`// ${items.length} draft(s) parsed — classify, sanitize, then split by member.`);
  console.log(`export const drafts: QueueItem[] = [`);
  items.forEach((raw, i) => console.log(toDraft(raw, i)));
  console.log(`];`);
}

main();
