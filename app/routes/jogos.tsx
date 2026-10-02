import type { CSSProperties } from "react";
import { Link } from "react-router";
import { caseBySlug, imgDir } from "../data/cases";
import { games } from "../data/games";
import { seo } from "../seo";
import css from "../styles/case-bento.css?url";
import { pageLinks } from "../styles/page";
import { Box } from "../components/Box";
import { Icon } from "../components/Icon";
import { Kpi, Kpis } from "../components/Kpis";
import { ReadBar } from "../components/ReadBar";
import { T } from "../components/T";
import { Tag } from "../components/Tag";

export const links = () => pageLinks(css);
export const meta = () =>
  seo(
    "Jogos — Gustavo Andrade",
    "Os jogos e projetos de Gustavo Andrade que rodam direto no navegador, sem baixar nada.",
    "/jogos",
  );

export default function Jogos() {
  return (
    <div className="wrap wrap--narrow">
      <Box as="header" className="head head--center">
        <Tag k="tree.kicker" />
        <T as="h1" k="tree.title" />
        <T as="p" className="head__sub" k="tree.sub" />
      </Box>

      <div className="tree">
        {games.map((g) => {
          const c = caseBySlug[g.slug];
          return (
            <Box as="article" key={g.slug} className="tree__card" style={{ "--fill": c.fill } as CSSProperties}>
              <a className="tree__main" href={g.play} target="_blank" rel="noopener">
                <img className="tree__thumb" src={`${imgDir(c)}/card.webp`} alt="" width={200} height={200} loading="lazy" />
                <span className="tree__txt">
                  <Tag k={`${c.card}.tag`} />
                  <strong>{c.name}</strong>
                  <T className="tree__sub" k={`${c.card}.metric`} />
                  <T className="tree__cta" k={g.cta} />
                </span>
                <span className="tree__go" aria-hidden="true">
                  <Icon name="arrow-right" className="" />
                </span>
              </a>
              <div className="tree__links">
                <T as={Link} className="tree__chip" to={`/projects/${g.slug}`} k="tree.case" />
                {g.chips.map((ch) => (
                  <T as="a" key={ch.k} className="tree__chip ar ar-out" href={ch.href} target="_blank" rel="noopener" k={ch.k} />
                ))}
              </div>
            </Box>
          );
        })}
      </div>

      <Kpis fill="var(--c1)">
        <Kpi k="tree.home" to="/#projetos" arrow="ar" />
      </Kpis>
      <ReadBar fill="var(--c1)" />
    </div>
  );
}
