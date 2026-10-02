import { createContext, useContext, useEffect, useState } from "react";
import { DICT, type Lang } from "./dict";

const STORE = "ga-lang";

// escolha salva > idioma do navegador > EN (igual ao i18n.js)
function detect(): Lang {
  try {
    const saved = localStorage.getItem(STORE);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    /* storage bloqueado */
  }
  const nav = navigator.languages?.[0] || navigator.language || "";
  return nav.toLowerCase().startsWith("pt") ? "pt" : "en";
}

type Ctx = {
  lang: Lang;
  /** HTML do dicionário; sem a chave no idioma, cai no PT (o texto que já estava na página) */
  t: (k: string) => string;
  /** t(k) sem tags, para alt/aria-label (equivalente ao data-i18n-attr) */
  ta: (k: string) => string;
  toggle: () => void;
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  // o HTML pré-renderizado sai em PT; o idioma real entra depois da hidratação
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => setLang(detect()), []);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const t = (k: string) => DICT[lang][k] ?? DICT.pt[k] ?? "";
  const ta = (k: string) => t(k).replace(/<[^>]+>/g, " ");
  const toggle = () => {
    const next = lang === "pt" ? "en" : "pt";
    try {
      localStorage.setItem(STORE, next);
    } catch {
      /* ok */
    }
    setLang(next);
  };

  return <LangContext value={{ lang, t, ta, toggle }}>{children}</LangContext>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang fora do LangProvider");
  return ctx;
}
