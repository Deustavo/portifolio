import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../i18n/LangProvider";
import { COARSE, REDUCE, useMedia } from "../hooks/useMedia";
import { Icon } from "./Icon";
import { T } from "./T";

const EASE = "cubic-bezier(.22,.61,.36,1)";
// prints pequenos (mockups de 184px) crescem para valer a pena; acima de 2.5x borra
const MAX_UP = 2.5;
// as miniaturas são achadas no DOM, na ordem da página, como no interactions.js
const THUMBS = "img.cover, .shot img";

const Ctx = createContext<(img: HTMLImageElement) => void>(() => {});

/** Props da miniatura que abre o lightbox: botão de verdade (clique, Enter, espaço). `k` é a chave da legenda. */
export function useZoom(k: string) {
  const show = useContext(Ctx);
  const { ta } = useLang();
  return {
    tabIndex: 0,
    role: "button",
    "aria-label": `${ta("lb.open")}: ${ta(k)}`.trim(),
    onClick: (e: { currentTarget: HTMLImageElement }) => show(e.currentTarget),
    onKeyDown: (e: KeyboardEvent<HTMLImageElement>) => {
      if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
      e.preventDefault();
      show(e.currentTarget);
    },
  };
}

const caption = (img: HTMLImageElement) =>
  img.closest("figure")?.querySelector("figcaption")?.textContent?.trim() || img.getAttribute("alt") || "";

/** Lightbox das telas do case: FLIP a partir da miniatura, setas/Home/End, swipe, foco preso, Esc. */
export function Lightbox({ children }: { children: ReactNode }) {
  const { ta } = useLang();
  const reduce = useMedia(REDUCE);
  const coarse = useMedia(COARSE);
  const [built, setBuilt] = useState(false); // o véu só entra no DOM na primeira abertura
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // .is-open, um quadro depois de aparecer
  const [hidden, setHidden] = useState(true);
  const [i, setI] = useState(0);
  const thumbs = useRef<HTMLImageElement[]>([]);
  const from = useRef<DOMRect | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const pending = useRef(false);
  const openRef = useRef(false);
  const veil = useRef<HTMLDivElement>(null);
  const fig = useRef<HTMLElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const cap = useRef<HTMLElement>(null);
  const btnClose = useRef<HTMLButtonElement>(null);
  const btnPrev = useRef<HTMLButtonElement>(null);
  const btnNext = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const n = thumbs.current.length;
  const thumb = thumbs.current[i];

  function fit() {
    const im = img.current!, f = fig.current!;
    const nw = im.naturalWidth, nh = im.naturalHeight;
    if (!nw || !nh) return;
    const availW = f.clientWidth;
    // a legenda ocupa a linha de baixo do grid: a imagem usa o que sobra
    const gap = parseFloat(getComputedStyle(f).rowGap) || 14;
    const availH = f.clientHeight - cap.current!.offsetHeight - gap;
    if (availW < 40 || availH < 40) return;
    const k = Math.min(availW / nw, availH / nh, MAX_UP);
    im.style.width = Math.round(nw * k) + "px";
    im.style.height = Math.round(nh * k) + "px";
  }

  // a imagem cresce da miniatura até o palco
  function flip(r: DOMRect | null) {
    const im = img.current!;
    if (reduce || !r) return;
    const to = im.getBoundingClientRect();
    if (!to.width || !to.height) return;
    const dx = r.left + r.width / 2 - (to.left + to.width / 2);
    const dy = r.top + r.height / 2 - (to.top + to.height / 2);
    im.style.transition = "none";
    im.style.transform = `translate(${dx}px,${dy}px) scale(${r.width / to.width},${r.height / to.height})`;
    im.style.opacity = ".6";
    requestAnimationFrame(() => {
      im.style.transition = `transform .44s ${EASE}, opacity .3s ease`;
      im.style.transform = "";
      im.style.opacity = "";
    });
  }

  // depois de trocar a imagem: dimensiona e anima assim que ela tiver tamanho
  function settle() {
    if (!pending.current) return;
    pending.current = false;
    fit();
    flip(from.current);
    from.current = null;
  }
  useLayoutEffect(() => {
    if (hidden) return;
    pending.current = true;
    if (img.current!.complete && img.current!.naturalWidth) settle();
  }, [i, hidden]);

  function show(el: HTMLImageElement) {
    thumbs.current = Array.from(document.querySelectorAll<HTMLImageElement>(THUMBS));
    from.current = el.getBoundingClientRect();
    lastFocus.current = document.activeElement as HTMLElement;
    openRef.current = true;
    document.documentElement.classList.add("lb-lock");
    setBuilt(true);
    setHidden(false);
    setOpen(true);
    setI(thumbs.current.indexOf(el));
    requestAnimationFrame(() => setShown(true));
  }

  function hide() {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    setShown(false);
    document.documentElement.classList.remove("lb-lock");
    setTimeout(() => !openRef.current && setHidden(true), reduce ? 0 : 300);
    lastFocus.current?.focus({ preventScroll: true });
  }

  // troca com um respiro, sem o FLIP da abertura; `at` permite Home/End
  function go(step: number, at = i) {
    if (n < 2) return;
    const im = img.current!;
    im.style.transition = "none";
    im.style.opacity = "0";
    im.style.transform = `translateX(${step * 22}px)`;
    from.current = null;
    setI((at + step + n) % n);
    requestAnimationFrame(() => {
      im.style.transition = `opacity .28s ease, transform .34s ${EASE}`;
      im.style.opacity = "";
      im.style.transform = "";
    });
  }

  useLayoutEffect(() => {
    if (open) btnClose.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); hide(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "Home") { e.preventDefault(); go(1, -1); }
      else if (e.key === "End") { e.preventDefault(); go(-1, 0); }
      else if (e.key === "Tab") {
        // o foco fica preso nos três botões enquanto o lightbox está aberto
        const stops = [btnClose.current!, btnPrev.current!, btnNext.current!].filter((b) => !b.disabled);
        const at = stops.indexOf(document.activeElement as HTMLButtonElement);
        e.preventDefault();
        const nx = e.shiftKey ? at - 1 : at + 1;
        stops[(nx + stops.length) % stops.length].focus();
      }
    };
    const onResize = () => fit();
    document.addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      removeEventListener("resize", onResize);
    };
  });

  const veilEl = built && thumb && (
    <div
      ref={veil}
      className={shown ? "lb is-open" : "lb"}
      hidden={hidden}
      role="dialog"
      aria-modal="true"
      aria-label={ta("lb.title")}
      // clicar no vazio fecha
      onClick={(e) => {
        const t = e.target as HTMLElement;
        if (t === veil.current || t.classList.contains("lb__stage")) hide();
      }}
      onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) hide();
      }}
    >
      <div className="lb__top">
        <span className="lb__count">{`${i + 1} / ${n}`}</span>
        <button ref={btnClose} className="lb__btn" data-lb="close" type="button" aria-label={ta("lb.close")} onClick={hide}>
          <Icon name="close" />
        </button>
      </div>
      <div className="lb__stage">
        <button ref={btnPrev} className="lb__btn" data-lb="prev" type="button" aria-label={ta("lb.prev")} disabled={n < 2}
          onClick={(e) => { e.stopPropagation(); go(-1); }}>
          <Icon name="arrow-left" />
        </button>
        <figure ref={fig} className="lb__fig">
          {/* clicar na imagem avança */}
          <img ref={img} className="lb__img" src={thumb.currentSrc || thumb.src} alt={thumb.getAttribute("alt") || ""} onLoad={settle}
            onClick={(e) => { e.stopPropagation(); go(1); }} />
          <figcaption ref={cap} className="lb__cap">{caption(thumb)}</figcaption>
        </figure>
        <button ref={btnNext} className="lb__btn" data-lb="next" type="button" aria-label={ta("lb.next")} disabled={n < 2}
          onClick={(e) => { e.stopPropagation(); go(1); }}>
          <Icon name="arrow-right" />
        </button>
      </div>
      {/* no toque as setas do teclado não ajudam: a dica vira o gesto */}
      <T as="div" className="lb__foot" k={coarse ? "lb.hintTouch" : "lb.hint"} />
    </div>
  );

  return (
    <Ctx value={show}>
      {children}
      {veilEl && createPortal(veilEl, document.body)}
    </Ctx>
  );
}
