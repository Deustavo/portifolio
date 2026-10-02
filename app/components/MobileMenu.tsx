import { useEffect, useRef, type RefObject } from "react";
import { useLang } from "../i18n/LangProvider";

type Props = { open: boolean; setOpen: (v: boolean) => void; barRef: RefObject<HTMLDivElement | null> };

/** Botão hambúrguer do Bar (só aparece ≤680px via CSS). Esc, clique fora e volta ao desktop fecham. */
export function MobileMenu({ open, setOpen, barRef }: Props) {
  const { ta } = useLang();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    const wide = matchMedia("(min-width:681px)");
    const onWide = (m: MediaQueryListEvent) => m.matches && setOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open, setOpen, barRef]);

  return (
    <button
      ref={btn}
      type="button"
      className="menubtn"
      aria-controls="bar-nav"
      aria-expanded={open}
      aria-label={ta("nav.menu") || "Menu"}
      onClick={() => setOpen(!open)}
    >
      <i aria-hidden="true"></i>
    </button>
  );
}
