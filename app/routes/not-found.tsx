import css from "../styles/case-bento.css?url";
import { pageLinks } from "../styles/page";
import { Box } from "../components/Box";
import { Kpi, Kpis } from "../components/Kpis";
import { ReadBar } from "../components/ReadBar";
import { T } from "../components/T";
import { Tag } from "../components/Tag";

export const links = () => pageLinks(css);
export const meta = () => [
  { title: "Página não encontrada — Gustavo Andrade" },
  { name: "description", content: "Essa página não existe. Volte para a home, para os projetos ou fale comigo." },
  { name: "robots", content: "noindex" },
];

export default function NotFound() {
  return (
    <div className="wrap wrap--narrow">
      <Box as="header" className="head nf">
        <Tag k="nf.kicker" />
        <p className="nf__code">
          4<span>0</span>4
        </p>
        <T as="h1" k="nf.title" />
        <T as="p" className="head__sub" k="nf.sub" />
        <Kpis fill="var(--c1)">
          <Kpi k="nf.home" to="/" />
          <Kpi k="nf.projects" to="/#projetos" />
          <Kpi k="nf.links" to="/jogos" />
          <Kpi k="nf.contact" to="/#contato" />
        </Kpis>
      </Box>
      <ReadBar fill="var(--c1)" />
    </div>
  );
}
