"use client";

import { useEffect } from "react";
import { useSim } from "../SimulatorProvider";
import { PostCard } from "../../_components/PostCard";
import { Comment } from "../../_components/CommentThread";
import { Hud } from "../components/Hud";
import { ActionBar } from "../components/ActionBar";
import { Feedback } from "../components/Feedback";

export function Shift() {
  const { state, dispatch } = useSim();
  const item = state.queue[state.index];

  // Feedback lingers (~4.5s) but can be tapped to continue sooner.
  useEffect(() => {
    if (!state.feedback) return;
    const t = setTimeout(() => dispatch({ type: "RESOLVE" }), 4500);
    return () => clearTimeout(t);
  }, [state.feedback, dispatch]);

  // Deterioration: color drains as the shift wears on and heavy content accumulates.
  const displayToll = Math.min(1, Math.max(state.toll, (1 - state.remaining / state.duration) * 0.5));

  return (
    <div
      className="flex h-screen flex-col overflow-hidden bg-console"
      style={{ ["--toll" as string]: displayToll } as React.CSSProperties}
    >
      <Hud />

      <main className="mx-auto flex w-full max-w-2xl min-h-0 flex-1 px-4 py-4">
        {/* The one item, in a monitor frame. Only the post scrolls. */}
        <section className="flex min-h-0 w-full flex-col">
          <div className="monitor deteriorate relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-hairline bg-bg shadow-sm">
            {/* frame chrome */}
            <div className="flex shrink-0 items-center gap-2 border-b border-hairline bg-panel-2 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              <span className="ml-2 text-[11px] text-text-muted">
                Review queue · item #{state.index + 1}
              </span>
              <span className="ml-auto text-[10px] uppercase tracking-widest text-text-muted">
                Awaiting decision
              </span>
            </div>

            {/* the post — the only scrollable region */}
            <div className="frame-scroll relative min-h-0 flex-1 overflow-y-auto">
              {item ? (
                <div key={item.id} className="anim-fade">
                  <PostCard post={item.post} />
                  {item.comments?.length ? (
                    <div className="border-t border-border">
                      <div className="flex items-center gap-2 px-4 pt-3 text-xs font-semibold text-text-muted">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                        </svg>
                        {item.comments.length} comment{item.comments.length > 1 ? "s" : ""}
                      </div>
                      <div className="px-4">
                        {item.comments.map((c) => (
                          <Comment key={c.id} comment={c} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <div className="px-4 pb-6 pt-2 text-center text-[11px] text-text-muted">
                    — end of post · make your call —
                  </div>
                </div>
              ) : (
                <div className="grid h-full place-items-center p-8 text-sm text-text-muted">
                  Queue empty.
                </div>
              )}

              {state.feedback && <Feedback data={state.feedback} />}
            </div>
          </div>

          {/* actions */}
          <div className="mt-3 shrink-0">
            <ActionBar />
          </div>
        </section>
      </main>
    </div>
  );
}
