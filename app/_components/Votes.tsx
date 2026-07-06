"use client";

import { useState } from "react";

type VoteState = 0 | 1 | -1;

function parseCompactCount(value: string) {
  const normalized = value.trim().toLowerCase();
  const match = normalized.match(/^([0-9]+(?:\.[0-9]+)?)([km])?$/);

  if (!match) {
    return null;
  }

  const amount = Number(match[1]);
  const multiplier = match[2] === "m" ? 1_000_000 : match[2] === "k" ? 1_000 : 1;

  return Math.round(amount * multiplier);
}

function displayCount(value: string, active: boolean) {
  if (!active) {
    return value;
  }

  const parsed = parseCompactCount(value);

  if (parsed === null) {
    return `${value}+1`;
  }

  return (parsed + 1).toLocaleString("en-US");
}

export function Votes({ up, down }: { up: string; down: string }) {
  const [vote, setVote] = useState<VoteState>(0);
  const toggle = (next: VoteState) => setVote((cur) => (cur === next ? 0 : next));

  return (
    <div className="flex items-center gap-1 text-sm text-text-muted">
      <button
        type="button"
        onClick={() => toggle(1)}
        className={`flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-bg-elevated ${
          vote === 1 ? "text-[#ff4500]" : "hover:text-[#ff4500]"
        }`}
        aria-label="Upvote"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M12 4l8 9h-5v7H9v-7H4l8-9z" />
        </svg>
        <span className="tabular-nums">{displayCount(up, vote === 1)}</span>
      </button>
      <span className="text-text-muted">|</span>
      <button
        type="button"
        onClick={() => toggle(-1)}
        className={`flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-bg-elevated ${
          vote === -1 ? "text-accent" : "hover:text-accent"
        }`}
        aria-label="Downvote"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M12 20l-8-9h5V4h6v7h5l-8 9z" />
        </svg>
        <span className="tabular-nums">{displayCount(down, vote === -1)}</span>
      </button>
    </div>
  );
}
