import { useSyncExternalStore } from "react";

/** matchMedia reativo. No prerender (e na hidratação) vale false. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}

export const REDUCE = "(prefers-reduced-motion: reduce)";
export const COARSE = "(hover: none)";
