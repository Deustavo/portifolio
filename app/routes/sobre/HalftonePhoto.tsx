import { useEffect, useRef, useState } from "react";
import { TOCA } from "../../components/Chinela";
import { COARSE } from "../../hooks/useMedia";
import mini from "./foto-mini.webp";

/* Lê a foto num canvas pequeno (um pixel por célula) e desenha um ponto por célula,
   maior onde a foto é clara no tema escuro e onde é escura no claro. O canvas fica por
   cima da foto; o furo da máscara (--hole, ver case-bento.css) mostra a real.
   ponytail: a miniatura é gerada à mão; trocou a foto, gere de novo (160x200, cinza). */
function draw(box: HTMLElement, cv: HTMLCanvasElement, probe: HTMLCanvasElement, src: HTMLImageElement) {
  const ctx = cv.getContext("2d")!;
  const pctx = probe.getContext("2d", { willReadFrequently: true })!;
  const dpr = devicePixelRatio || 1;
  const W = Math.round(box.clientWidth * dpr), H = Math.round(box.clientHeight * dpr);
  if (!W || !H) return;
  const cell = 8 * dpr;
  const cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
  cv.width = W; cv.height = H;
  probe.width = cols; probe.height = rows;

  // mesmo recorte do object-fit:cover / object-position:50% 35%
  const k = Math.max(cols / src.naturalWidth, rows / src.naturalHeight);
  const dw = src.naturalWidth * k, dh = src.naturalHeight * k;
  pctx.imageSmoothingQuality = "high";
  pctx.drawImage(src, (cols - dw) * 0.5, (rows - dh) * 0.35, dw, dh);
  const px = pctx.getImageData(0, 0, cols, rows).data;

  const css = getComputedStyle(box);
  const dark = document.documentElement.getAttribute("data-theme") !== "light";
  ctx.fillStyle = css.getPropertyValue("--bg");
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = css.getPropertyValue("--fg");
  // estica o contraste: o mais escuro vira 0 e o mais claro vira 1
  const lum: number[] = [];
  let lo = 1, hi = 0;
  for (let i = 0; i < px.length; i += 4) {
    const v = (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;
    lum.push(v);
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  const span = hi - lo || 1;
  const max = cell * 0.58;
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const l = (lum[y * cols + x] - lo) / span;
      const t = dark ? Math.pow(l, 0.8) : Math.pow(1 - l, 1.2);
      if (t < 0.06) continue;
      ctx.beginPath();
      ctx.arc((x + 0.5) * cell, (y + 0.5) * cell, t * max, 0, 6.2832);
      ctx.fill();
    }
}

const COM_CHINELA = "/assets/img/sobre/eu-e-chinela.webp";

/** Foto do sobre em malha de pontos; o cursor (ou o toque) abre um furo que mostra a foto.
    Quando a Chinela encosta, o furo cresce dali até tomar tudo e a foto vira a dos dois, sem pontos. */
export function HalftonePhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const [comChinela, setComChinela] = useState(false);

  useEffect(() => {
    const box = ref.current!;
    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    const probe = document.createElement("canvas");
    const src = new Image();
    let raf = 0;
    const queue = () => void (raf ||= requestAnimationFrame(() => { raf = 0; draw(box, cv, probe, src); }));
    const ro = new ResizeObserver(queue);
    const mo = new MutationObserver(queue);

    const aim = (e: MouseEvent) => {
      const r = box.getBoundingClientRect();
      cv.style.setProperty("--mx", e.clientX - r.left + "px");
      cv.style.setProperty("--my", e.clientY - r.top + "px");
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      aim(e);
      box.classList.add("is-open");
    };
    const leave = (e: PointerEvent) => e.pointerType === "mouse" && box.classList.remove("is-open");
    // no toque não existe hover: cada toque abre ou fecha o furo ali
    const click = (e: MouseEvent) => {
      if (!matchMedia(COARSE).matches) return;
      aim(e);
      box.classList.toggle("is-open");
    };
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerleave", leave);
    box.addEventListener("click", click);

    let found = false;
    const toca = (e: Event) => {
      if (found) return;
      found = true;
      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail;
      const next = new Image();
      next.src = COM_CHINELA;
      // só troca com a foto nova já pronta, para o furo não revelar um vazio
      next.decode().catch(() => {}).then(() => {
        unhover();
        const r = box.getBoundingClientRect();
        cv.style.setProperty("--mx", x - r.left + "px");
        cv.style.setProperty("--my", y - r.top + "px");
        setComChinela(true);
        box.classList.add("is-found");
        cv.addEventListener("transitionend", () => (cv.remove(), ro.disconnect(), mo.disconnect()), { once: true });
      });
    };
    const unhover = () => {
      box.classList.remove("is-open");
      box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerleave", leave);
      box.removeEventListener("click", click);
    };
    box.addEventListener(TOCA, toca);

    src.onload = () => {
      box.appendChild(cv);
      draw(box, cv, probe, src);
      ro.observe(box);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    };
    src.src = mini;
    return () => {
      src.onload = null;
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      cv.remove();
      unhover();
      box.classList.remove("is-found");
      box.removeEventListener(TOCA, toca);
    };
  }, []);

  return (
    <div className="box about__photo" ref={ref} data-chinela-toca="">
      {comChinela ? (
        <img src={COM_CHINELA} alt="Gustavo Andrade com a Chinela" width={800} height={1000} />
      ) : (
        <img src="/assets/img/sobre/foto.webp" alt="Gustavo Andrade" width={800} height={1000} />
      )}
    </div>
  );
}
