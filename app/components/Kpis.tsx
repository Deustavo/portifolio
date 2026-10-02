import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router";
import { useTilt } from "../hooks/useTilt";
import { T } from "./T";

const fillStyle = (fill?: string) => (fill ? ({ "--fill": fill } as CSSProperties) : undefined);

export function Kpis({ fill, className, children }: { fill?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className ? `kpis ${className}` : "kpis"} style={fillStyle(fill)}>
      {children}
    </div>
  );
}

type KpiProps = {
  k: string;
  href?: string; // link externo, abre em nova aba; "#" é o topo da página
  to?: string; // link interno
  fill?: string;
  arrow?: string; // classe do texto: "ar", "ar ar-out", "ar ar-up"
};

/** .kpi: link externo (href), interno (to) ou estático. */
export function Kpi({ k, href, to, fill, arrow }: KpiProps) {
  const ref = useTilt<HTMLAnchorElement & HTMLDivElement>();
  const label = <T k={k} className={arrow} />;
  const style = fillStyle(fill);
  if (href === "#") // âncora da própria página ("voltar ao topo")
    return (
      <a className="kpi" href="#" style={style} ref={ref}>
        {label}
      </a>
    );
  if (href)
    return (
      <a className="kpi" href={href} target="_blank" rel="noopener" style={style} ref={ref}>
        {label}
      </a>
    );
  if (to)
    return (
      <Link className="kpi" to={to} style={style} ref={ref}>
        {label}
      </Link>
    );
  return (
    <div className="kpi" style={style} ref={ref}>
      {label}
    </div>
  );
}
