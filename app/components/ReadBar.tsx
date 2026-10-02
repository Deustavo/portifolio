import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

/** Barra de progresso de leitura no topo, na cor `fill`. Só no cliente, no fim do body. */
export function ReadBar({ fill }: { fill: string }) {
  const [mounted, setMounted] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
      el.classList.toggle("is-on", scrollY > 40 && p < 0.995);
    };
    const tick = () => void (raf ||= requestAnimationFrame(paint));
    addEventListener("scroll", tick, { passive: true });
    addEventListener("resize", tick);
    paint();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", tick);
      removeEventListener("resize", tick);
    };
  }, [mounted]);

  if (!mounted) return null;
  return createPortal(
    <div className="readbar" aria-hidden="true" style={{ "--accent": fill } as CSSProperties} ref={bar} />,
    document.body,
  );
}
