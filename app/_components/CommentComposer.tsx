"use client";

import { useState } from "react";
import { Avatar } from "./Avatar";

type LocalComment = {
  id: string;
  body: string;
};

export function CommentComposer({
  onAdd,
}: {
  onAdd: (body: string) => void;
}) {
  const [text, setText] = useState("");

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <div className="flex gap-3 px-4 py-3 border-b border-border">
      <Avatar handle="user992" name="You" size={40} src="/avatars/user992.svg" />
      <div className="flex-1 min-w-0">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Post your reply"
          rows={2}
          className="w-full resize-none bg-transparent text-text placeholder:text-text-muted text-sm outline-none leading-relaxed"
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={submit}
            disabled={!text.trim()}
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-white transition hover:bg-accent-hover disabled:opacity-40 disabled:cursor-default"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export function CommentSection({ children }: { children: React.ReactNode }) {
  const [local, setLocal] = useState<LocalComment[]>([]);

  const addComment = (body: string) => {
    setLocal((prev) => [{ id: crypto.randomUUID(), body }, ...prev]);
  };

  return (
    <div>
      <CommentComposer onAdd={addComment} />
      {local.map((c) => (
        <div key={c.id} className="flex gap-3 px-4 py-3 border-b border-border bg-bg-elevated/40">
          <Avatar handle="user992" name="You" size={36} src="/avatars/user992.svg" />
          <div className="min-w-0 flex-1">
            <span className="text-sm font-bold text-text">@you</span>
            <p className="mt-0.5 text-sm text-text leading-relaxed whitespace-pre-wrap">{c.body}</p>
          </div>
        </div>
      ))}
      {children}
    </div>
  );
}
