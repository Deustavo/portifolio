import { useLang } from "../i18n/LangProvider";

export function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button className="langbtn" aria-label={lang === "pt" ? "Switch to English" : "Mudar para português"} onClick={toggle}>
      {lang === "pt" ? "EN" : "PT"}
    </button>
  );
}
