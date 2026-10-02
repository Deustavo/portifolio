import { useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { LangToggle } from "./LangToggle";
import { MobileMenu } from "./MobileMenu";
import { T } from "./T";
import { ThemeToggle } from "./ThemeToggle";

const i = (n: number) => ({ "--i": n }) as CSSProperties; // cascata de entrada do menu mobile

/** Barra do topo. Na home e no sobre, as âncoras são da própria página. */
export function Bar({ page }: { page: string }) {
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const home = page === "/";
  const local = home || page === "/sobre"; // as duas páginas que têm #contato

  return (
    <div className={open ? "bar nav-open" : "bar"} ref={bar}>
      <strong>{home ? "Gustavo Andrade" : <Link to="/">Gustavo Andrade</Link>}</strong>
      <nav id="bar-nav" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
        {home ? <T as="a" href="#projetos" k="nav.work" style={i(0)} /> : <T as={Link} to="/#projetos" k="nav.work" style={i(0)} />}
        <T as={Link} to="/sobre" k="nav.about" style={i(1)} aria-current={page === "/sobre" ? "page" : undefined} />
        {local ? <T as="a" href="#contato" k="nav.contact" style={i(2)} /> : <T as={Link} to="/#contato" k="nav.contact" style={i(2)} />}
        <div className="nav-tools" style={i(3)}>
          <ThemeToggle />
          <LangToggle />
        </div>
      </nav>
      <MobileMenu open={open} setOpen={setOpen} barRef={bar} />
    </div>
  );
}
