import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
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

// onde ela consegue subir: pousa no topo quando cai de cima, atravessa por baixo
const PLATS = ".box, .tag, .kpi, .shot, img, button, .tree__chip";
const FALLEN = "chinela-caiu";

const caretAt = (px: number, py: number): [Node, number] | null => {
  if ("caretPositionFromPoint" in document) {
    const p = document.caretPositionFromPoint(px, py);
    return p && [p.offsetNode, p.offset];
  }
  const r = (document as Document).caretRangeFromPoint?.(px, py);
  return r ? [r.startContainer, r.startOffset] : null;
};

// letras derrubadas: o original some via ::highlight (sem tocar no DOM do React) e uma cópia cai
const knocked = new WeakMap<Text, { data: string; offs: Set<number> }>();
function knock(box: { l: number; r: number; t: number; b: number }) {
  if (typeof Highlight === "undefined" || !CSS.highlights) return;
  let hl = CSS.highlights.get(FALLEN);
  if (!hl) CSS.highlights.set(FALLEN, (hl = new Highlight()));
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const hit = caretAt(box.l + ((box.r - box.l) * (i + 0.5)) / 4, box.t + ((box.b - box.t) * (j + 0.5)) / 4);
      if (!hit || hit[0].nodeType !== Node.TEXT_NODE) continue;
      const t = hit[0] as Text;
      let k = knocked.get(t);
      if (!k || k.data !== t.data) knocked.set(t, (k = { data: t.data, offs: new Set() }));
      for (const off of [hit[1] - 1, hit[1]]) {
        if (off < 0 || off >= t.length || k.offs.has(off) || !t.data[off].trim()) continue;
        const range = new Range();
        range.setStart(t, off);
        range.setEnd(t, off + 1);
        const rr = range.getBoundingClientRect();
        if (rr.right < box.l || rr.left > box.r || rr.bottom < box.t || rr.top > box.b) continue;
        k.offs.add(off);
        hl.add(range);
        drop(t.data[off], rr, t.parentElement!);
      }
    }
}

function drop(ch: string, rr: DOMRect, from: Element) {
  const cs = getComputedStyle(from);
  const fill = cs.webkitTextFillColor;
  const s = document.createElement("span");
  s.className = "chinela-letra";
  s.textContent = ch;
  Object.assign(s.style, {
    left: `${rr.left}px`, top: `${rr.top}px`, height: `${rr.height}px`, lineHeight: `${rr.height}px`,
    fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight, fontStyle: cs.fontStyle,
    color: fill && fill !== "rgba(0, 0, 0, 0)" ? fill : cs.color,
  });
  document.body.append(s);
  const dx = (Math.random() - 0.5) * 120;
  const rot = (Math.random() - 0.5) * 540;
  s.animate(
    [
      { transform: "none", easing: "ease-out" },
      { transform: `translate(${dx * 0.2}px, -24px) rotate(${rot * 0.15}deg)`, offset: 0.2, easing: "cubic-bezier(.5,0,1,1)" },
      { transform: `translate(${dx}px, ${innerHeight - rr.top + 80}px) rotate(${rot}deg)` },
    ],
    { duration: 1000 + Math.random() * 500, fill: "forwards" },
  ).finished.then(() => s.remove(), () => s.remove());
}

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
  const page = useLocation().pathname;
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

  // trocou de página: as letras derrubadas da anterior não valem mais
  useEffect(() => CSS.highlights?.get(FALLEN)?.clear(), [page]);

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
    // plataforma onde ela está em pé (null = chão) e a que ela acabou de atravessar para baixo
    let plat: Element | null = null;
    let skip: Element | null = null;
    let plats: Element[] = [];
    let platsAt = 0;
    let frames = 0;
    const feet = (r: DOMRect) => r.right > x + W * 0.3 && r.left < x + W * 0.7;
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
      plat = null;
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
      } else {
        // em pé numa plataforma ela acompanha a rolagem; saiu da borda ou a plataforma sumiu, cai
        if (plat) {
          const r = plat.getBoundingClientRect();
          if (!plat.isConnected || r.top < W * 0.6 || !feet(r)) plat = null;
          else if (r.top >= innerHeight) (plat = null), (y = 0);
          else y = innerHeight - r.top;
        }
        if (!plat && (y > 0 || vy > 0)) {
          const prev = y;
          vy -= GRAVITY * dt;
          y = Math.max(0, y + vy * dt);
          if (vy < 0 && m === "free") {
            if (now - platsAt > 500) {
              plats = [...document.querySelectorAll(PLATS)].filter((e) => !e.closest(".chinela, .lb"));
              platsAt = now;
            }
            // pousa no topo mais alto que ela cruzou descendo
            for (const e of plats) {
              if (e === skip) continue;
              const r = e.getBoundingClientRect();
              const top = innerHeight - r.top;
              if (r.width < 24 || r.top < W * 0.6 || r.top > innerHeight || !feet(r)) continue;
              if (prev >= top && y <= top && (!plat || top > y)) (plat = e), (y = top);
            }
          }
          if (plat || y === 0) {
            vy = 0;
            drift = 0;
            skip = null;
          }
        }
      }

      if (m === "free" && (dir || vy) && frames++ % 2 === 0) {
        // o hit-test não pode achar ela mesma
        const b = el.current!;
        b.style.pointerEvents = "none";
        const t = innerHeight - y;
        knock({ l: x + W * 0.15, r: x + W * 0.85, t: t - W * 0.8, b: t - 2 });
        b.style.pointerEvents = "";
      }

      const air = y !== 0 && !plat;
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
      const grounded = y === 0 || plat;
      if (k === "j" && grounded && !e.repeat) {
        vy = JUMP;
        plat = null;
      } else if (k === "lick" && plat && !e.repeat) {
        // ↓ em cima de algo: desce atravessando
        skip = plat;
        plat = null;
      } else if (k === "lick" && grounded && !held.size) {
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
