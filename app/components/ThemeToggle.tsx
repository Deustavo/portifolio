import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const STORE = "ga-theme";
type Theme = "dark" | "light";

export function ThemeToggle() {
  // o script do <head> já aplicou o tema; o estado só alcança depois da hidratação
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    if (document.documentElement.dataset.theme === "light") setTheme("light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORE, next);
    } catch {
      /* ok */
    }
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  };

  const label = theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
  return (
    <button className="themebtn" aria-label={label} title={label} aria-pressed={theme === "dark"} onClick={toggle}>
      <span className="ico-moon"><Icon name="moon" /></span>
      <span className="ico-sun"><Icon name="sun" /></span>
    </button>
  );
}
