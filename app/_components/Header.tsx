import Link from "next/link";

const FEED_URL = "/feed/search?query=%23YaniDrama";

export function FeedHeader() {
  return (
    <div className="sticky top-0 z-10 border-b border-border bg-bg/85 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href={FEED_URL} aria-label="SocHub home" className="text-text shrink-0 md:hidden">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
            <path d="M19.5 5.25c0-1.66-1.34-3-3-3H7.5c-1.66 0-3 1.34-3 3v3c0 1.66 1.34 3 3 3h6c.83 0 1.5.67 1.5 1.5v3c0 .83-.67 1.5-1.5 1.5h-6c-.83 0-1.5-.67-1.5-1.5v-.75H3v.75c0 1.66 1.34 3 3 3h9c1.66 0 3-1.34 3-3v-3.75c0-1.66-1.34-3-3-3H8.25c-.83 0-1.5-.67-1.5-1.5V6.75c0-.83.67-1.5 1.5-1.5h7.5c.83 0 1.5.67 1.5 1.5v.75h3v-2.25z" />
          </svg>
        </Link>
        <h1 className="font-bold text-lg text-text">
          <span className="text-accent">#YaniDrama</span>
        </h1>
      </div>
      <div className="flex border-b border-border">
        <div className="flex-1 flex items-center justify-center py-3 text-sm font-semibold text-text border-b-2 border-accent">
          Top
        </div>
        <button type="button" className="flex-1 flex items-center justify-center py-3 text-sm text-text-muted hover:bg-bg-elevated transition cursor-default" tabIndex={-1}>
          Latest
        </button>
        <button type="button" className="flex-1 flex items-center justify-center py-3 text-sm text-text-muted hover:bg-bg-elevated transition cursor-default" tabIndex={-1}>
          People
        </button>
        <button type="button" className="flex-1 flex items-center justify-center py-3 text-sm text-text-muted hover:bg-bg-elevated transition cursor-default" tabIndex={-1}>
          Media
        </button>
      </div>
    </div>
  );
}

export function PostHeader() {
  return (
    <div className="sticky top-0 z-10 border-b border-border bg-bg/85 backdrop-blur">
      <div className="flex items-center gap-4 px-4 py-3">
        <Link
          href={FEED_URL}
          className="flex h-9 w-9 items-center justify-center rounded-full text-text transition hover:bg-bg-elevated"
          aria-label="Back to feed"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </Link>
        <h1 className="font-bold text-xl text-text">Post</h1>
      </div>
    </div>
  );
}
