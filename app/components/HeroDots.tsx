import { useEffect, useRef } from "react";
import { COARSE, REDUCE, useMedia } from "../hooks/useMedia";

/** Malha de pontos (.hero-dots) que segue o cursor dentro do elemento pai, com parallax.
 *  Parada com reduced-motion e em telas sem hover, como no hero.js. */
export function HeroDots() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMedia(REDUCE);
  const coarse = useMedia(COARSE);
  const off = reduce || coarse;

  useEffect(() => {
    const mesh = ref.current!, hero = mesh.parentElement!;
    if (off) return;
    let raf = 0, mx = 50, my = 115, px = 0, py = 0;
    const paint = () => {
      raf = 0;
      mesh.style.setProperty("--mx", mx + "%");
      mesh.style.setProperty("--my", my + "%");
      mesh.style.setProperty("--px", px.toFixed(1) + "px");
      mesh.style.setProperty("--py", py.toFixed(1) + "px");
    };
    const move = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width) * 100;
      my = ((e.clientY - r.top) / r.height) * 100;
      px = (mx - 50) * 0.22;
      py = (my - 50) * 0.22;
      raf ||= requestAnimationFrame(paint);
    };
    const leave = () => {
      mx = 50; my = 115; px = 0; py = 0;
      raf ||= requestAnimationFrame(paint);
    };
    hero.addEventListener("mousemove", move);
    hero.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", move);
      hero.removeEventListener("mouseleave", leave);
    };
  }, [off]);

  return <div className="hero-dots" aria-hidden="true" ref={ref} />;
}
