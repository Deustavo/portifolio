import { useEffect, useRef, type CSSProperties } from "react";
import { REDUCE } from "../../hooks/useMedia";
import { T } from "../../components/T";

// [ano, empresa, cor] em ordem; o texto é about.t1..t8
const JOBS = [
  ["2026", "Ricochet360", "var(--c1)"],
  ["2025", "Speed to Contact · Ricochet360", "var(--c1)"],
  ["2025", "USP/Esalq", "var(--c11)"],
  ["2024", "Tray", "var(--c12)"],
  ["2023", "Tray", "var(--c12)"],
  ["2022", "Tray", "var(--c12)"],
  ["2021", "Avivatec · FATEC-SP", "var(--c5)"],
  ["2019", "Life Fibra", "var(--c13)"],
];
// um atalho por ano: o primeiro cargo daquele ano (os cargos vêm agrupados)
const YEARS = JOBS.flatMap(([y, , fill], i) => (i && JOBS[i - 1][0] === y ? [] : [{ y, fill, i }]));
const chipOf = JOBS.map(([y]) => YEARS.findIndex((c) => c.y === y));

const fill = (f: string) => ({ "--fill": f }) as CSSProperties;

/** Trajetória: o trilho enche com a rolagem, o cargo mais perto do centro acende
 *  e os atalhos de ano levam direto ao cargo. */
export function Timeline() {
  const ol = useRef<HTMLOListElement>(null);
  const nav = useRef<HTMLDivElement>(null);
  const reduce = () => matchMedia(REDUCE).matches;

  useEffect(() => {
    const tl = ol.current!;
    const items = [...tl.children] as HTMLElement[];
    const chips = [...nav.current!.children] as HTMLElement[];
    let on: HTMLElement | null = null, raf = 0;

    const update = () => {
      raf = 0;
      const mid = innerHeight / 2;
      let best = 0, dist = Infinity;
      items.forEach((li, i) => {
        const b = li.getBoundingClientRect();
        li.style.setProperty("--p", Math.max(0, Math.min(1, (mid - b.top) / b.height)).toFixed(3));
        const d = Math.abs(b.top + b.height / 2 - mid);
        if (d < dist) { dist = d; best = i; }
      });
      if (items[best] === on) return;
      on?.classList.remove("is-on");
      on = items[best];
      on.classList.add("is-on");
      chips.forEach((c, i) => c.setAttribute("aria-pressed", String(i === chipOf[best])));
    };
    const queue = () => void (raf ||= requestAnimationFrame(update));
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    update();

    // com JS, cada cargo entra deslizando quando aparece
    let io: IntersectionObserver | undefined;
    if (!reduce()) {
      tl.classList.add("is-js");
      io = new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io!.unobserve(e.target);
        }),
        { threshold: 0.2 },
      );
      items.forEach((li) => io!.observe(li));
    }
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
      io?.disconnect();
      tl.classList.remove("is-js");
      items.forEach((li) => li.classList.remove("is-on", "is-in"));
    };
  }, []);

  return (
    <>
      <div className="tl-years" ref={nav}>
        {YEARS.map(({ y, fill: f, i }) => (
          <button key={y} type="button" style={fill(f)}
            onClick={() => ol.current!.children[i].scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "center" })}>
            {y}
          </button>
        ))}
      </div>
      <ol className="tl" ref={ol}>
        {JOBS.map(([y, org, f], i) => (
          <li key={i} style={fill(f)}>
            <time>{y}</time>
            <div>
              <strong>{org}</strong>
              <T as="p" k={`about.t${i + 1}`} />
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
