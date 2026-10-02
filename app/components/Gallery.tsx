import type { ReactNode } from "react";
import { useLang } from "../i18n/LangProvider";
import { Box } from "./Box";
import { useZoom } from "./Lightbox";
import { T } from "./T";

/** section.box com rótulo e grade de telas (.shots--2/3/4). */
export function Gallery({ label, cols, children }: { label: string; cols?: number; children: ReactNode }) {
  return (
    <Box as="section">
      <T className="strip__lbl" k={label} />
      <div className={cols ? `shots shots--${cols}` : "shots"}>{children}</div>
    </Box>
  );
}

/** Uma tela: `k` é o alt e a legenda. Abre no Lightbox. */
export function Shot({ src, k }: { src: string; k: string }) {
  const { ta } = useLang();
  return (
    <figure className="shot">
      <img loading="lazy" src={src} alt={ta(k)} {...useZoom(k)} />
      <T as="figcaption" k={k} />
    </figure>
  );
}
