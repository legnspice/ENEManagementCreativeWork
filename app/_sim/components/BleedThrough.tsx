"use client";

import { useEffect, useState } from "react";
import { useSim } from "../SimulatorProvider";
import { deviceLevel } from "../engine/devices";
import { DeviceImage } from "./DeviceImage";
import type { BleedThrough as BleedData } from "../engine/types";

export function BleedThrough({ data }: { data: BleedData }) {
  const { state, dispatch } = useSim();
  const level = deviceLevel(state);
  const [canContinue, setCanContinue] = useState(false);

  // A forced beat: you can't dismiss it immediately. Longer as the shift wears on.
  const hold = level === 1 ? 900 : level === 2 ? 1300 : 1700;

  useEffect(() => {
    setCanContinue(false);
    const t = setTimeout(() => setCanContinue(true), hold);
    return () => clearTimeout(t);
  }, [data.id, hold]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (canContinue && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        dispatch({ type: "DISMISS_DEVICE" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canContinue, dispatch]);

  // Level 3 lets the live feed ghost through underneath (content bleeding into the work).
  const bgOpacity = level >= 3 ? "bg-black/80" : "bg-black/95";

  return (
    <div
      className={`grain fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden ${bgOpacity}`}
      style={{ animation: "intrusion-in 0.5s ease-out both" }}
      role="dialog"
      aria-label="Intrusive memory"
    >
      <DeviceImage
        src={data.media}
        alt={data.alt}
        caption={data.timestamp}
        className="absolute inset-0 opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

      <div className="relative z-10 flex max-w-lg flex-col items-center px-6 text-center">
        {data.fragment && (
          <p
            className="text-xl font-light italic leading-relaxed text-white/90 sm:text-2xl"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)", animation: "fade-in 1.2s ease both" }}
          >
            {data.fragment}
          </p>
        )}
        {data.timestamp && (
          <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
            {data.timestamp}
          </p>
        )}

        <button
          type="button"
          disabled={!canContinue}
          onClick={() => dispatch({ type: "DISMISS_DEVICE" })}
          className={`mt-8 rounded-full border px-6 py-2.5 text-sm font-semibold transition
            ${
              canContinue
                ? "anim-fade cursor-pointer border-white/40 text-white hover:bg-white/10"
                : "cursor-not-allowed border-white/10 text-white/20"
            }`}
        >
          Keep working
        </button>
        {!canContinue && (
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
            the clock is still running
          </p>
        )}
      </div>
    </div>
  );
}
