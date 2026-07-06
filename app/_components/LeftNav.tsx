import Link from "next/link";
import Image from "next/image";

const FEED_URL = "/feed/search?query=%23YaniDrama";

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="currentColor"
      aria-hidden
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}
function ExploreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="currentColor"
      aria-hidden
    >
      <path d="M10.5 3a7.5 7.5 0 015.92 12.12l4.23 4.23-1.42 1.42-4.23-4.23A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
    </svg>
  );
}
function NotifIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}
function MsgIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}
function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function SocHubLogo() {
  return (
    <Image
      src="/logo/sochub.svg"
      width="32"
      height="32"
      alt="SocHub Logo"
      className="h-8 w-8"
    />
  );
}

const NAV = [
  { label: "Home", icon: <HomeIcon />, href: FEED_URL },
  { label: "Explore", icon: <ExploreIcon /> },
  { label: "Notifications", icon: <NotifIcon /> },
  { label: "Messages", icon: <MsgIcon /> },
  { label: "Bookmarks", icon: <BookmarkIcon /> },
  { label: "Profile", icon: <ProfileIcon /> },
];

export function LeftNav() {
  return (
    <nav className="flex h-full flex-col items-center px-2 py-3 xl:items-start xl:px-4">
      <Link
        href={FEED_URL}
        aria-label="SocHub home"
        className="mb-2 flex h-12 w-12 items-center justify-center rounded-full text-text transition hover:bg-bg-elevated xl:ml-1"
      >
        <SocHubLogo />
      </Link>

      <ul className="flex flex-col gap-1 w-full">
        {NAV.map(({ label, icon, href }) => {
          const inner = (
            <span className="flex items-center gap-4 rounded-full px-3 py-3 transition hover:bg-bg-elevated xl:pr-6">
              {icon}
              <span className="hidden xl:block text-xl font-normal">
                {label}
              </span>
            </span>
          );
          return (
            <li key={label}>
              {href ? (
                <Link href={href} className="flex w-full text-text">
                  {inner}
                </Link>
              ) : (
                <button
                  type="button"
                  className="flex w-full text-text cursor-default"
                  tabIndex={-1}
                >
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-4 w-full xl:block">
        <button
          type="button"
          className="hidden xl:flex w-full items-center justify-center rounded-full bg-accent px-4 py-3 font-bold text-white transition hover:bg-accent-hover cursor-default"
          tabIndex={-1}
        >
          Post
        </button>
        <button
          type="button"
          className="flex xl:hidden h-12 w-12 items-center justify-center rounded-full bg-accent text-white transition hover:bg-accent-hover cursor-default"
          tabIndex={-1}
          aria-label="Post"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="currentColor"
            aria-hidden
          >
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-14 items-center justify-around border-t border-border bg-bg md:hidden">
      <Link
        href={FEED_URL}
        aria-label="Home"
        className="flex h-10 w-10 items-center justify-center rounded-full text-text transition hover:bg-bg-elevated"
      >
        <HomeIcon />
      </Link>
      {[ExploreIcon, NotifIcon, MsgIcon, ProfileIcon].map((Icon, i) => (
        <button
          key={i}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted cursor-default"
          tabIndex={-1}
        >
          <Icon />
        </button>
      ))}
    </nav>
  );
}
