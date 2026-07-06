import { LeftNav, MobileBottomNav } from "./LeftNav";
import { RightRail } from "./RightRail";

export function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[72px_minmax(0,600px)] lg:grid-cols-[88px_minmax(0,600px)_minmax(300px,360px)] xl:grid-cols-[260px_minmax(0,600px)_minmax(300px,360px)]">
        <aside className="sticky top-0 hidden h-screen border-r border-border md:block">
          <LeftNav />
        </aside>

        <main className="min-w-0 border-x border-border pb-14 md:pb-0">{children}</main>

        <aside className="sticky top-0 hidden h-screen overflow-y-auto lg:block">
          <RightRail />
        </aside>
      </div>

      <MobileBottomNav />
    </div>
  );
}
