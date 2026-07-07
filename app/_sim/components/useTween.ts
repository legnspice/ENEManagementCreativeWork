"use client";

import { useEffect, useRef, useState } from "react";

/** Smoothly animates a number toward `target` (ease-out cubic). */
export function useTween(target: number, ms = 550): number {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(() => {
    fromRef.current = val;
    const start = performance.now();
    const from = fromRef.current;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (target - from) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ms]);

  return val;
}
