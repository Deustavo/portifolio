import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../i18n/LangProvider";

const STORE = "ga-mascote-dispensada";

/** A mascote entra no canto e mia `delay` ms depois de abrir a página. Dispensada, some até fechar a aba. */
export function Mascote({ img, audio, delay }: { img: string; audio: string; delay: number }) {
  const { ta } = useLang();
  const [state, setState] = useState<"off" | "out" | "in">("off");
  const [meowing, setMeowing] = useState(false);
  const meow = useRef(() => {});
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORE) === "1") return;
    } catch {
      /* storage bloqueado */
    }
    setState("out");

    // o navegador só libera som depois de alguma interação: se for barrado,
    // fica armado para o primeiro toque, clique ou tecla
    const a = new Audio(audio);
    a.preload = "auto";
    a.volume = 0.55;
    let armed = false;
    const EVS = ["pointerdown", "keydown", "touchstart"] as const;
    const unlock = () => {
      armed = false;
      EVS.forEach((ev) => document.removeEventListener(ev, unlock));
      play();
    };
    const play = () => {
      try {
        a.currentTime = 0;
      } catch {
        /* ainda sem duração */
      }
      a.play().catch(() => {
        if (armed) return;
        armed = true;
        EVS.forEach((ev) => document.addEventListener(ev, unlock, { once: true }));
      });
    };
    meow.current = play;

    const timer = setTimeout(() => {
      setState("in");
      play();
    }, delay);
    return () => {
      clearTimeout(timer);
      EVS.forEach((ev) => document.removeEventListener(ev, unlock));
      a.pause();
    };
  }, [audio, delay]);

  if (state === "off") return null;
  return createPortal(
    <div
      ref={box}
      className={["mascote", state === "in" && "is-in", meowing && "is-meowing"].filter(Boolean).join(" ")}
      onAnimationEnd={() => setMeowing(false)}
    >
      <button
        type="button"
        className="mascote__cat"
        aria-label={ta("cat.meow")}
        onClick={() => {
          meow.current();
          // reinicia a animação mesmo no meio dela
          const b = box.current!;
          b.classList.remove("is-meowing");
          void b.offsetWidth;
          b.classList.add("is-meowing");
          setMeowing(true);
        }}
      >
        <img src={img} alt="" width={1216} height={1216} />
      </button>
      <button
        type="button"
        className="mascote__x"
        aria-label={ta("cat.dismiss")}
        onClick={() => {
          setState("out");
          try {
            sessionStorage.setItem(STORE, "1");
          } catch {
            /* ok */
          }
          setTimeout(() => setState("off"), 800);
        }}
      >
        ✕
      </button>
    </div>,
    document.body,
  );
}
