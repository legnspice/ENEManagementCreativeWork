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

  // A forced beat: sit with the image for 3s, then the way out fades in.
  useEffect(() => {
    setCanContinue(false);
    const t = setTimeout(() => setCanContinue(true), 3000);
    return () => clearTimeout(t);
  }, [data.id]);

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
        className="absolute inset-0 opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

      {/* skip-style prompt, below the midline */}
      <div className="absolute inset-x-0 bottom-[16%] z-10 flex justify-center px-6">
        {canContinue && (
          <button
            type="button"
            onClick={() => dispatch({ type: "DISMISS_DEVICE" })}
            className="anim-fade cursor-pointer rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            Keep working →
          </button>
        )}
      </div>
    </div>
  );
}
