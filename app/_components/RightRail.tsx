const TRENDS = [
  { tag: "#YaniDrama", category: "Social Media Drama", count: "12.5M posts" },
  { tag: "#TeamStarr", category: "Drama channels", count: "8.2M posts" },
  { tag: "Yani", category: "Internet Culture", count: "5.1M posts" },
  { tag: "#CelebDrama", category: "Entertainment", count: "3.8M posts" },
  { tag: "Parasocial", category: "Society", count: "2.4M posts" },
];

const SUGGEST = [
  { name: "ClipZone", handle: "clipzone", color: "#e84c22" },
  { name: "AnonExposed", handle: "anonexposed", color: "#7c3aed" },
  { name: "StarlightReacts", handle: "starlightreacts", color: "#0891b2" },
];

export function RightRail() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto py-4 px-4 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0">
      <div className="flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-4 py-2 text-sm">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-text-muted"
          fill="currentColor"
          aria-hidden
        >
          <path d="M10.5 3a7.5 7.5 0 015.92 12.12l4.23 4.23-1.42 1.42-4.23-4.23A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
        </svg>
        <input
          readOnly
          value="#YaniDrama"
          className="flex-1 bg-transparent outline-none text-text-muted text-sm"
        />
      </div>

      <div className="rounded-2xl border border-border bg-bg-elevated overflow-hidden">
        <h2 className="px-4 pt-3 pb-2 font-bold text-lg text-text">
          Trends for you
        </h2>
        {TRENDS.map((t) => (
          <div
            key={t.tag}
            className="flex items-start justify-between px-4 py-3 hover:bg-bg transition cursor-default"
          >
            <div className="min-w-0">
              <p className="text-xs text-text-muted">{t.category}</p>
              <p className="font-bold text-text text-sm truncate">{t.tag}</p>
              <p className="text-xs text-text-muted">{t.count}</p>
            </div>
            <button
              type="button"
              className="ml-2 mt-1 text-text-muted hover:text-accent rounded-full p-1 transition cursor-default"
              tabIndex={-1}
              aria-label="More"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          className="w-full px-4 py-3 text-sm text-accent hover:bg-bg transition text-left cursor-default"
          tabIndex={-1}
        >
          Show more
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-bg-elevated overflow-hidden">
        <h2 className="px-4 pt-3 pb-2 font-bold text-lg text-text">
          Who to follow
        </h2>
        {SUGGEST.map((u) => (
          <div
            key={u.handle}
            className="flex items-center gap-3 px-4 py-3 hover:bg-bg transition"
          >
            <div
              style={{
                width: 40,
                height: 40,
                minWidth: 40,
                backgroundColor: u.color,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {u.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-text truncate flex items-center gap-1">
                {u.name}
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-accent shrink-0"
                  fill="currentColor"
                  aria-label="Verified"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </p>
              <p className="text-xs text-text-muted">@{u.handle}</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-text px-3 py-1 text-sm font-bold text-text transition hover:bg-bg-elevated cursor-default"
              tabIndex={-1}
            >
              Follow
            </button>
          </div>
        ))}
        <button
          type="button"
          className="w-full px-4 py-3 text-sm text-accent hover:bg-bg transition text-left cursor-default"
          tabIndex={-1}
        >
          Show more
        </button>
      </div>

      <p className="px-2 text-xs text-text-muted leading-relaxed pb-4">
        Terms of Service · Privacy Policy · Cookie Policy · Accessibility · Ads
        info · More · © 2026 SocHub
      </p>
    </aside>
  );
}
