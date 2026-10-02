import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { REDUCE } from "./useMedia";

// porte de transition.js: os blocos caem ao sair e sobem em cascata ao entrar;
// a .bar fica de fora e continua visível entre as rotas
const SEL = ".bento > *, .head, .filters, .wrap > *, .foot";
const IN_STEP = 55; // atraso entre um bloco e o seguinte, na entrada
const IN_FROM = "translateY(28px) scale(.985)";
const IN_EASE = "cubic-bezier(.22,.61,.36,1)";
const OUT_STEP = 34; // atraso entre os blocos, na saída
const OUT_TAIL = 430; // duração da queda de um bloco
const OUT_TO = "translateY(90px) scale(.97)";
const OUT_EASE = "cubic-bezier(.55,0,.85,.35)";

const items = () => [...document.querySelectorAll<HTMLElement>(SEL)];
const set = (el: HTMLElement, transition: string, opacity = "", transform = "", willChange = "") =>
  Object.assign(el.style, { transition, opacity, transform, willChange });
let pending = 0; // limpeza da entrada ou espera da saída

function enter() {
  clearTimeout(pending);
  const root = document.documentElement;
  const veil = document.querySelector<HTMLElement>(".fade-veil");
  // o véu da tela anterior some de vez, como numa página nova
  if (veil) veil.style.transition = "none";
  root.classList.remove("is-leaving");
  const els = items();
  els.forEach((el) => set(el, "none", "0", IN_FROM, "opacity, transform"));
  root.classList.remove("tr-pre"); // estado inicial que o script do <head> pintou
  void document.body.offsetHeight; // força o estado inicial a ser calculado
  if (veil) veil.style.transition = "";
  requestAnimationFrame(() =>
    els.forEach((el, i) => {
      const d = i * IN_STEP + "ms";
      set(el, `opacity .55s ${IN_EASE} ${d}, transform .65s ${IN_EASE} ${d}`);
    }),
  );
  // terminada a entrada, devolve os elementos ao CSS normal (hover e afins)
  pending = window.setTimeout(() => els.forEach((el) => set(el, "")), els.length * IN_STEP + 900);
}

function leave(go: () => void) {
  clearTimeout(pending);
  const els = items();
  document.documentElement.classList.add("is-leaving");
  // de baixo para cima: o rodapé cai primeiro
  els.reverse().forEach((el, i) => {
    const d = i * OUT_STEP + "ms";
    set(el, `opacity .42s ease-in ${d}, transform .52s ${OUT_EASE} ${d}`, "0", OUT_TO, "opacity, transform");
  });
  pending = window.setTimeout(go, OUT_TAIL + els.length * OUT_STEP);
}

/** Saída ao clicar num link interno, `navigate()`, entrada na nova rota (e no primeiro carregamento). */
export function usePageTransition() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (matchMedia(REDUCE).matches) return;
    enter();
  }, [pathname]);

  useEffect(() => {
    if (matchMedia(REDUCE).matches) return;
    const veil = document.createElement("div");
    veil.className = "fade-veil";
    document.body.appendChild(veil);

    // captura: roda antes do onClick do <Link>, que navegaria na hora
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      const href = a?.getAttribute("href");
      if (!a || !href || href[0] === "#") return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin || /\.\w+$/.test(url.pathname)) return; // externo ou arquivo
      if (url.pathname === location.pathname && url.hash) return; // âncora interna
      e.preventDefault();
      const same = url.pathname === location.pathname; // sem troca de rota, o efeito acima não roda
      leave(() => {
        navigate(url.pathname + url.search + url.hash);
        if (same) enter();
      });
    };
    // volta pelo histórico (bfcache): refaz a entrada em vez de mostrar a tela desmontada
    const onShow = (e: PageTransitionEvent) => e.persisted && enter();
    document.addEventListener("click", onClick, true);
    addEventListener("pageshow", onShow);
    return () => {
      document.removeEventListener("click", onClick, true);
      removeEventListener("pageshow", onShow);
      veil.remove();
    };
  }, [navigate]);
}
