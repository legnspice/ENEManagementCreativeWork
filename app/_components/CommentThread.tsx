import { Avatar } from "./Avatar";
import { Votes } from "./Votes";

export type CommentData = {
  id: string;
  author: string;
  authorHandle: string;
  avatarSrc?: string;
  badge?: "PROPHET";
  timestamp: string;
  body: React.ReactNode;
  upvotes: string;
  downvotes: string;
  replies?: CommentData[];
};

export function Comment({ comment, depth = 0 }: { comment: CommentData; depth?: number }) {
  return (
    <div className={depth > 0 ? "ml-10 border-l border-border pl-4" : ""}>
      <div className="py-3">
        <div className="flex gap-3">
          <div className="shrink-0">
            <Avatar
              handle={comment.authorHandle}
              name={comment.author}
              size={36}
              src={comment.avatarSrc}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1 text-sm">
              <span className="font-bold text-text">@{comment.authorHandle}</span>
              {comment.badge === "PROPHET" && (
                <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-bg">
                  PROPHET
                </span>
              )}
              <span className="text-text-muted">·</span>
              <span className="text-text-muted text-xs">{comment.timestamp}</span>
            </div>
            <div className="mt-1 text-sm text-text leading-relaxed">{comment.body}</div>
            <div className="mt-2">
              <Votes up={comment.upvotes} down={comment.downvotes} />
            </div>
          </div>
        </div>
        {comment.replies?.map((r) => (
          <Comment key={r.id} comment={r} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}
