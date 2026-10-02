import { useEffect, useRef } from "react";
import { COARSE, REDUCE, useMedia } from "./useMedia";

const MAX = 5; // graus

/** Tilt e brilho seguindo o cursor (.tilt/.is-tracking + --rx/--ry/--gx/--gy, ver interactions.css).
 *  Desligado com reduced-motion e em telas sem hover, como no interactions.js. */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduce = useMedia(REDUCE);
  const coarse = useMedia(COARSE);
  const off = reduce || coarse;

  useEffect(() => {
    const card = ref.current;
    if (!card || off) return;
    let raf = 0, rx = 0, ry = 0, gx = 50, gy = 50;
    const paint = () => {
      raf = 0;
      card.style.setProperty("--rx", rx.toFixed(2) + "deg");
      card.style.setProperty("--ry", ry.toFixed(2) + "deg");
      card.style.setProperty("--gx", gx.toFixed(1) + "%");
      card.style.setProperty("--gy", gy.toFixed(1) + "%");
    };
    const enter = () => card.classList.add("is-tracking");
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      gx = px * 100;
      gy = py * 100;
      // o card inclina na direção do cursor, como se ele empurrasse a superfície
      ry = (px - 0.5) * 2 * MAX;
      rx = (0.5 - py) * 2 * MAX;
      raf ||= requestAnimationFrame(paint);
    };
    const leave = () => {
      card.classList.remove("is-tracking");
      rx = ry = 0;
      raf ||= requestAnimationFrame(paint);
    };
    card.classList.add("tilt");
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      card.classList.remove("tilt", "is-tracking");
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
    };
  }, [off]);

  return ref;
}
