import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LangProvider";

export const STORE = "ga-chinela"; // "free" ou "corner"
const AUDIO = "/assets/audio/miado1.mp3";
const BACK_IN = 4000; // depois de fechada, quanto tempo ela some antes de voltar pro canto
export const CHEGAR = "chinela:chega";

const SPRITE = "/assets/img/jogo-chinela-destroyer/chinelaSprite.png";
const W = 128; // quadro de 64px do sprite, ampliado 2x
const SPEED = 260;
const JUMP = 880;
const GRAVITY = 1900;
// quadros do sprite (base 0): 0 parada, 1-3 andando, 4 pulo, 5 piscando, 6-8 lambendo a pata
const WALK = [1, 2, 3];
const BLINK = [5];
const LICK = [6, 7, 8, 7, 8, 7, 6];

const KEYS: Record<string, "l" | "r" | "j" | "lick"> = {
  a: "l", arrowleft: "l", d: "r", arrowright: "r",
  w: "j", arrowup: "j", " ": "j", s: "lick", arrowdown: "lick",
};

type Mode = "off" | "free" | "out" | "away" | "home" | "corner";

const save = (m: "free" | "corner") => {
  try {
    sessionStorage.setItem(STORE, m);
  } catch {
    /* storage bloqueado */
  }
};

/**
 * A Chinela: chega andando e senta no canto (CHEGAR, disparado pelo case do Chinela Destroyer).
 * Clicada, pula e fica solta pelo site inteiro, controlada com WASD ou setas.
 * Fechada no ✕, pula e cai para fora da tela; volta andando e senta no canto de novo.
 */
export function Chinela() {
  const { ta } = useLang();
  const [mode, setMode] = useState<Mode>("off");
  const [hint, setHint] = useState(true);
  const el = useRef<HTMLDivElement>(null);
  // o loop roda fora do React; os cliques mexem nele por aqui
  const ctl = useRef({ release: () => {}, close: () => {} });

  useEffect(() => {
    try {
      const m = sessionStorage.getItem(STORE);
      if (m === "free" || m === "corner") setMode(m);
    } catch {
      /* storage bloqueado */
    }
    // só chega se ainda não estiver no site
    const chega = () => setMode((m) => (m === "off" ? "home" : m));
    window.addEventListener(CHEGAR, chega);
    return () => window.removeEventListener(CHEGAR, chega);
  }, []);

  const on = mode !== "off";
  useEffect(() => {
    if (!on) return;
    const corner = () => innerWidth - W - 24;
    let m: Mode = mode;
    // x da borda esquerda; y = altura acima do chão (rodapé da janela)
    let x = m === "home" ? innerWidth + 10 : corner();
    let y = 0;
    let vy = 0;
    let drift = 0;
    let face = -1; // o sprite olha para a direita; -1 espelha
    const held = new Set<string>();
    let idle: number[] = [];
    let frameAt = 0;
    let nextIdle = performance.now() + 2500;
    let walkT = 0;
    let last = performance.now();
    let raf = 0;
    let timer = 0;
    const go = (next: Mode) => {
      m = next;
      setMode(next);
    };

    const meow = () => new Audio(AUDIO).play().catch(() => {});

    ctl.current.release = () => {
      meow();
      // no toque não há teclado para controlá-la: só mia
      if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      // dá um pulo e vai um pouco para a esquerda
      vy = JUMP;
      drift = -180;
      save("free");
      go("free");
    };
    ctl.current.close = () => {
      // pula e cai para baixo da tela; depois de um tempo volta andando pro canto
      held.clear();
      vy = JUMP;
      drift = 0;
      save("corner");
      go("out");
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      let dir = m === "free" ? (held.has("r") ? 1 : 0) - (held.has("l") ? 1 : 0) : 0;
      if (m === "home") {
        dir = -1;
        if (x <= corner()) {
          x = corner();
          dir = 0;
          save("corner");
          meow();
          go("corner");
        }
      }
      if (dir) {
        face = dir;
        drift = 0;
      }
      x += (dir * (m === "home" ? SPEED * 0.6 : SPEED) + drift) * dt;
      if (m === "free") x = Math.max(0, Math.min(innerWidth - W, x));
      if (m === "corner") x = corner();
      if (m === "out") {
        vy -= GRAVITY * dt;
        y += vy * dt;
        if (y < -W * 1.5) {
          go("away");
          timer = window.setTimeout(() => {
            x = innerWidth + 10;
            y = 0;
            vy = 0;
            go("home");
          }, BACK_IN);
        }
      } else if (y > 0 || vy > 0) {
        vy -= GRAVITY * dt;
        y = Math.max(0, y + vy * dt);
        if (y === 0) {
          vy = 0;
          drift = 0;
        }
      }

      const air = y !== 0;
      let frame = 0;
      if (air) frame = 4;
      else if (dir) {
        walkT += dt;
        frame = WALK[Math.floor(walkT / (m === "home" ? 0.15 : 0.11)) % WALK.length];
      } else if (idle.length) {
        frame = idle[0];
        if (now - frameAt > 150) {
          idle = idle.slice(1);
          frameAt = now;
          if (!idle.length) nextIdle = now + 2000 + Math.random() * 3500;
        }
      } else if (now > nextIdle) {
        // parada, ela varia entre piscar e lamber a pata
        idle = Math.random() < 0.6 ? BLINK : LICK;
        frameAt = now;
      }
      if (air || dir) {
        idle = [];
        nextIdle = now + 2500;
      }

      const b = el.current;
      if (b) {
        b.style.transform = `translate3d(${x}px, ${-y}px, 0)`;
        b.style.setProperty("--f", String(frame));
        b.style.setProperty("--face", String(face));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      const k = KEYS[e.key.toLowerCase()];
      if (m !== "free" || !k || e.ctrlKey || e.metaKey || e.altKey) return;
      const tg = e.target as HTMLElement;
      // não rouba teclas de campos, botões focados (espaço) nem do lightbox aberto
      if (tg.closest("input, textarea, select, [contenteditable]")) return;
      if (k === "j" && e.key === " " && tg.closest("button, a")) return;
      if (document.documentElement.classList.contains("lb-lock")) return;
      e.preventDefault();
      if (e.type === "keyup") return void held.delete(k);
      setHint(false);
      if (k === "j" && y === 0 && !e.repeat) vy = JUMP;
      else if (k === "lick" && y === 0 && !held.size) {
        idle = LICK;
        frameAt = performance.now();
      } else if (k === "l" || k === "r") held.add(k);
    };
    const clear = () => held.clear();
    addEventListener("keydown", onKey);
    addEventListener("keyup", onKey);
    addEventListener("blur", clear);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      removeEventListener("keydown", onKey);
      removeEventListener("keyup", onKey);
      removeEventListener("blur", clear);
    };
    // o loop nasce uma vez; as trocas de modo seguintes passam por go()
  }, [on]);

  if (!on) return null;
  const sprite = <i className="chinela__sprite" aria-hidden="true" style={{ backgroundImage: `url(${SPRITE})` }} />;
  return (
    <div ref={el} className="chinela" hidden={mode === "away"}>
      {mode === "free" && hint && <span className="chinela__hint">{ta("cat.controls")}</span>}
      {mode === "corner" ? (
        <button type="button" className="chinela__cat" aria-label={ta("cat.meow")} onClick={() => ctl.current.release()}>
          {sprite}
        </button>
      ) : (
        sprite
      )}
      {mode === "free" && (
        <button type="button" className="chinela__x" aria-label={ta("cat.dismiss")} onClick={() => ctl.current.close()}>
          ✕
        </button>
      )}
    </div>
  );
}
