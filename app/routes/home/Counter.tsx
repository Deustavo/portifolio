import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { REDUCE } from "../../hooks/useMedia";

/** <b> cujo primeiro número sobe quando entra na tela (hero.js). Com reduced-motion, fica parado. */
export function Counter({ text }: { text: string }) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, 0.4);
  const [v, setV] = useState<number | null>(null); // null = texto final
  const job = useRef<{ token: string; target: number; from: number } | null>(null);

  // zera antes de aparecer, para não mostrar o valor final e voltar
  useLayoutEffect(() => {
    const m = text.match(/\d+/);
    if (!m || matchMedia(REDUCE).matches) return;
    const target = parseInt(m[0], 10);
    job.current = { token: m[0], target, from: target > 1000 ? target - 12 : 0 };
    setV(job.current.from);
  }, []);

  useEffect(() => {
    const j = job.current;
    if (!seen || !j) return;
    let raf = 0;
    const timer = setTimeout(() => {
      let t0: number | null = null;
      const step = (ts: number) => {
        t0 ??= ts;
        const p = Math.min(1, (ts - t0) / 1100);
        const e = 1 - Math.pow(1 - p, 3);
        setV(p < 1 ? Math.round(j.from + (j.target - j.from) * e) : null);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, 650);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [seen]);

  const j = job.current;
  return <b ref={ref}>{v === null || !j ? text : text.replace(j.token, String(v))}</b>;
}
