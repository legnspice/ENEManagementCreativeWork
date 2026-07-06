"use client";

import { useState } from "react";

export function LoadMoreButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setLoading(true)}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 py-4 text-sm text-accent transition hover:bg-bg-elevated disabled:cursor-default"
    >
      {loading ? (
        <>
          <span
            className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent"
            style={{ animation: "spin 0.75s linear infinite" }}
            aria-hidden
          />
          Loading…
        </>
      ) : (
        "Load more comments"
      )}
    </button>
  );
}
