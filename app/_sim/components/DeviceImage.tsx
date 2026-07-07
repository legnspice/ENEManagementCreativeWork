"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Renders a Deleter still, degrading gracefully to a styled desaturated placeholder
 * when the frame hasn't been dropped into /public/deleter/ yet (so the flow works now).
 */
export function DeviceImage({
  src,
  alt,
  className = "",
  caption,
}: {
  src?: string;
  alt: string;
  className?: string;
  caption?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  // NOTE: the caller supplies the positioning (e.g. `absolute inset-0`). Don't hardcode
  // `relative` here — it collapses the box and hides the fill image.
  return (
    <div className={`overflow-hidden ${className}`}>
      {showPlaceholder ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#05070a]">
          <div className="flex flex-col items-center gap-2 opacity-60">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-text-muted" fill="currentColor" aria-hidden>
              <path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm2 3v8l6-4-6-4zm9 0h3v2h-3V8zm0 4h3v2h-3v-2z" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
              Deleter (2022)
            </span>
            {caption && <span className="px-6 text-center text-[10px] text-text-muted/70">{caption}</span>}
          </div>
        </div>
      ) : (
        <Image
          src={src as string}
          alt={alt}
          fill
          unoptimized
          onError={() => setFailed(true)}
          className="object-cover"
          style={{ filter: "grayscale(0.75) contrast(1.05)" }}
        />
      )}
    </div>
  );
}
