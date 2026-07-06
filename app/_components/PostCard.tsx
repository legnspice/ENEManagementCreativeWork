import Image from "next/image";
import Link from "next/link";
import { Avatar } from "./Avatar";
import { Votes } from "./Votes";

export type Post = {
  id: string;
  author: string;
  authorHandle: string;
  avatarSrc?: string;
  verified?: boolean;
  pinned?: boolean;
  title?: string;
  body?: React.ReactNode;
  embedSrc?: string;
  embedAlt?: string;
  upvotes: string;
  downvotes: string;
  timestamp: string;
  href?: string;
  sponsorText?: React.ReactNode;
};

function VerifiedBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-accent"
      fill="currentColor"
      aria-label="Verified"
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
}

function PostContent({ post }: { post: Post }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-1 text-sm">
        <span className="truncate font-bold text-text">{post.author}</span>
        {post.verified && <VerifiedBadge />}
        <span className="text-text-muted">@{post.authorHandle}</span>
        <span className="text-text-muted">·</span>
        <span className="text-text-muted">{post.timestamp}</span>
      </div>
      {post.title && <p className="mt-0.5 font-semibold leading-snug text-text">{post.title}</p>}
      {post.body && <div className="mt-1 text-sm leading-relaxed text-text">{post.body}</div>}
      {post.embedSrc && (
        <div className="mt-3 overflow-hidden rounded-xl border border-border">
          <Image
            src={post.embedSrc}
            alt={post.embedAlt ?? ""}
            width={600}
            height={338}
            className="w-full object-cover"
            unoptimized
          />
        </div>
      )}
      {post.sponsorText && (
        <div className="mt-2 rounded-lg border border-border bg-bg-elevated px-3 py-2 text-xs text-text-muted">
          {post.sponsorText}
        </div>
      )}
    </>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article
      className={`border-b border-border px-4 py-4 transition-colors ${
        post.href ? "hover:bg-bg-elevated" : ""
      }`}
    >
      {post.pinned && (
        <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-text-muted">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
            <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
          </svg>
          Pinned
        </p>
      )}
      <div className="flex gap-3">
        <div className="shrink-0">
          <Avatar handle={post.authorHandle} name={post.author} size={44} src={post.avatarSrc} />
        </div>
        <div className="min-w-0 flex-1">
          {post.href ? (
            <Link href={post.href} className="block cursor-pointer">
              <PostContent post={post} />
            </Link>
          ) : (
            <PostContent post={post} />
          )}
          <div className="mt-3 flex items-center gap-6">
            <Votes up={post.upvotes} down={post.downvotes} />
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-text-muted rounded-full px-2 py-1 hover:bg-bg-elevated hover:text-accent transition cursor-default"
              tabIndex={-1}
              aria-label="Reply"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </button>
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-text-muted rounded-full px-2 py-1 hover:bg-bg-elevated hover:text-green-500 transition cursor-default"
              tabIndex={-1}
              aria-label="Repost"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
              </svg>
            </button>
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-text-muted rounded-full px-2 py-1 hover:bg-bg-elevated hover:text-accent transition cursor-default"
              tabIndex={-1}
              aria-label="Share"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
