import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLang } from "../../i18n/LangProvider";
import { REDUCE } from "../../hooks/useMedia";
import { T } from "../../components/T";

const EASE = "cubic-bezier(.22,.61,.36,1)";

/** Cargo que se troca sozinho (hero.js). A largura do slot acompanha a palavra; pausa com a aba oculta. */
export function RoleRotator() {
  const { t } = useLang();
  const list = t("hero.roles").replace(/&amp;/g, "&").split("|").map((s) => s.trim()).filter(Boolean);
  const key = list.join("|");
  const [i, setI] = useState(0);
  const slot = useRef<HTMLSpanElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const widths = useRef<number[]>([]);
  const at = useRef(0); // índice atual para os callbacks
  at.current = i;

  // mede cada palavra fora da tela para poder animar a largura do slot
  useLayoutEffect(() => {
    const measure = () => {
      const ghost = word.current!.cloneNode(false) as HTMLElement;
      ghost.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;width:auto";
      slot.current!.appendChild(ghost);
      widths.current = list.map((w) => ((ghost.textContent = w), ghost.offsetWidth));
      slot.current!.removeChild(ghost);
      slot.current!.style.width = (widths.current[at.current] || 0) + "px";
    };
    // idioma trocado: volta para a primeira palavra
    setI((at.current = 0));
    measure();
    addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => removeEventListener("resize", measure);
  }, [key]);

  useEffect(() => {
    if (matchMedia(REDUCE).matches || list.length < 2) return;
    let timer = 0, out = 0;
    const tick = () => {
      const n = (at.current + 1) % list.length;
      const w = word.current!;
      // a largura acompanha a troca, então o badge desliza em vez de saltar
      slot.current!.style.width = (widths.current[n] || slot.current!.offsetWidth) + "px";
      w.style.transition = "transform .38s ease-in, opacity .38s ease-in";
      w.style.transform = "translateY(-110%)";
      w.style.opacity = "0";
      out = window.setTimeout(() => {
        setI((at.current = n));
        w.style.transition = "none";
        w.style.transform = "translateY(110%)";
        requestAnimationFrame(() => {
          w.style.transition = `transform .55s ${EASE}, opacity .45s ease`;
          w.style.transform = "";
          w.style.opacity = "";
        });
      }, 380);
    };
    const start = () => {
      clearInterval(timer);
      timer = window.setInterval(tick, 2800);
    };
    const vis = () => (document.hidden ? clearInterval(timer) : start());
    start();
    document.addEventListener("visibilitychange", vis);
    return () => {
      clearInterval(timer);
      clearTimeout(out);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [key]);

  return (
    <div className="hero-role">
      <T className="hero-role__lbl" k="hero.roleLabel" />
      <span className="hero-role__slot" ref={slot}>
        <span className="hero-role__word" ref={word}>{list[i] ?? list[0]}</span>
      </span>
      <T hidden k="hero.roles" />
    </div>
  );
}
