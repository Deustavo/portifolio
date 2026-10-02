import { useEffect } from "react";
import { COARSE, REDUCE } from "../hooks/useMedia";

const CLICKY = 'a,button,summary,[role="button"],input,select,textarea,label,.chip,.shot img,img.cover';
const TEXTY = "p,li,h1,h2,h3,h4,blockquote,figcaption,td,th,dd,dt,span";

/** Blob maleável que segue o cursor (interactions.js). Só com mouse e sem reduced-motion. */
export function BlobCursor() {
  useEffect(() => {
    if (matchMedia(REDUCE).matches || matchMedia(COARSE).matches) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const mk = (cls: string) => {
      const el = document.createElement("div");
      el.className = cls;
      el.setAttribute("aria-hidden", "true");
      return document.body.appendChild(el);
    };
    const ring = mk("blobcur"), dot = mk("blobdot");

    // alvo é onde o cursor está; x,y é onde a massa está agora
    let tx = -100, ty = -100, x = tx, y = ty;
    let rot = 0, sx = 1, sy = 1;
    let awake = false, raf = 0, still = 0;

    const frame = () => {
      raf = 0;
      const dx = tx - x, dy = ty - y;
      // mola simples: 18% do caminho por quadro dá o atraso macio
      x += dx * 0.18;
      y += dy * 0.18;
      const speed = Math.sqrt(dx * dx + dy * dy);
      // quanto mais rápido, mais a massa se estica no eixo do movimento
      const pull = Math.min(speed / 150, 0.42);
      if (speed > 0.6) rot = (Math.atan2(dy, dx) * 180) / Math.PI;
      sx += (1 + pull - sx) * 0.2;
      sy += (1 - pull * 0.72 - sy) * 0.2;
      const r = ring.style, d = dot.style;
      r.setProperty("--x", x.toFixed(2) + "px");
      r.setProperty("--y", y.toFixed(2) + "px");
      r.setProperty("--rot", rot.toFixed(1) + "deg");
      r.setProperty("--sx", sx.toFixed(3));
      r.setProperty("--sy", sy.toFixed(3));
      d.setProperty("--x", tx.toFixed(2) + "px");
      d.setProperty("--y", ty.toFixed(2) + "px");
      // parada: quando a massa chega e volta ao redondo, o loop descansa
      if (speed < 0.4 && Math.abs(1 - sx) < 0.004 && Math.abs(1 - sy) < 0.004) {
        if (++still > 4) return void (still = 0);
      } else still = 0;
      raf = requestAnimationFrame(frame);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!awake) {
        awake = true;
        x = tx;
        y = ty;
        ring.classList.add("is-awake");
        dot.classList.add("is-awake");
      }
      const el = e.target as Element | null;
      const clicky = !!el?.closest?.(CLICKY);
      ring.classList.toggle("is-near", clicky);
      ring.classList.toggle("is-text", !clicky && !!el?.closest?.(TEXTY));
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const down = () => (ring.classList.add("is-down"), dot.classList.add("is-down"));
    const up = () => (ring.classList.remove("is-down"), dot.classList.remove("is-down"));
    // saiu da janela: a massa se recolhe
    const sleep = () => {
      awake = false;
      ring.classList.remove("is-awake", "is-near", "is-text", "is-down");
      dot.classList.remove("is-awake", "is-down");
    };
    const leave = (e: MouseEvent) => !e.relatedTarget && sleep();

    const opt = { passive: true };
    document.addEventListener("pointermove", move, opt);
    document.addEventListener("pointerdown", down, opt);
    document.addEventListener("pointerup", up, opt);
    document.addEventListener("mouseleave", leave);
    addEventListener("blur", sleep);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
      removeEventListener("blur", sleep);
      ring.remove();
      dot.remove();
    };
  }, []);
  return null;
}
