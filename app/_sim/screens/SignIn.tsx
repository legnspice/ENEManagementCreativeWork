"use client";

import { useState } from "react";
import { useSim } from "../SimulatorProvider";
import { BRAND } from "../brand";

export function SignIn() {
  const { dispatch } = useSim();
  const [user, setUser] = useState("mod-0442");
  const [pass, setPass] = useState("nightshift");

  const clockIn = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "CLOCK_IN" });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-console px-4">
      {/* ambient backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 560px at 50% -10%, rgba(37,99,235,0.08), transparent 60%), radial-gradient(760px 480px at 82% 118%, rgba(79,70,229,0.07), transparent 60%)",
        }}
      />

      <div className="anim-rise relative w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-2xl font-black text-white shadow-lg shadow-brand/20">
            {BRAND.initial}
          </div>
          <h1 className="text-xl font-bold text-text">{BRAND.name}</h1>
          <p className="mt-1 text-sm text-text-muted">
            {BRAND.unit} — {BRAND.site}
          </p>
        </div>

        <form
          onSubmit={clockIn}
          className="rounded-2xl border border-hairline bg-panel p-6 shadow-xl shadow-slate-900/5"
        >
          <label className="mb-1 block text-xs font-semibold text-text-muted">Employee ID</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="mod-0442"
            className="mb-4 w-full rounded-lg border border-hairline bg-console/70 px-3 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-brand focus:outline-none"
          />
          <label className="mb-1 block text-xs font-semibold text-text-muted">Password</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="••••••••"
            className="mb-5 w-full rounded-lg border border-hairline bg-console/70 px-3 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-brand focus:outline-none"
          />
          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-brand to-brand-2 px-4 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            <span className="relative z-10">Log In</span>
            <span className="sheen absolute inset-0 opacity-0 group-hover:opacity-100" />
          </button>
        </form>
      </div>
    </div>
  );
}
