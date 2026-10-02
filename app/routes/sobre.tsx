import { seo } from "../seo";
import css from "../styles/case-bento.css?url";
import { pageLinks } from "../styles/page";
import { Box } from "../components/Box";
import { ContactBlock } from "../components/ContactBlock";
import { Fact, Facts } from "../components/Facts";
import { Kpi, Kpis } from "../components/Kpis";
import { ReadBar } from "../components/ReadBar";
import { T } from "../components/T";
import { Tag } from "../components/Tag";
import { HalftonePhoto } from "./sobre/HalftonePhoto";
import { Timeline } from "./sobre/Timeline";

export const links = () => pageLinks(css);
export const meta = () =>
  seo(
    "Sobre — Gustavo Andrade",
    "Quem é Gustavo Andrade: engenheiro de software desde 2019, com foco em front-end, full-stack e IA.",
    "/sobre",
  );

export default function Sobre() {
  return (
    <div className="wrap">
      <div className="about">
        <HalftonePhoto />
        <Box as="header" className="head">
          <Tag k="about.kicker" />
          <T as="h1" k="about.title" />
          <T as="p" className="head__sub" k="about.p1" />
          <T as="p" className="head__sub" k="about.p2" />
        </Box>
      </div>

      <Facts>
        <Fact k="about.f.base">São Paulo, BR</Fact>
        <Fact k="about.f.since" v="about.f.sinceV" />
        <Fact k="about.f.edu" v="about.f.eduV" />
        <Fact k="about.f.lang" v="about.f.langV" />
      </Facts>

      <Box as="section" className="block">
        <T as="h2" k="about.stackT" />
        <div>
          <ul>
            {[1, 2, 3, 4].map((n) => <T as="li" key={n} k={`about.s${n}`} />)}
          </ul>
          <Kpis>
            <Kpi k="about.aw1" fill="var(--c4)" />
            <Kpi k="about.aw2" fill="var(--c2)" />
          </Kpis>
        </div>
      </Box>

      <Box as="section" className="block">
        <T as="h2" k="about.hobT" />
        <Kpis className="kpis--3">
          <Kpi k="about.h1" fill="var(--c3)" />
          <Kpi k="about.h2" fill="var(--c1)" />
          <Kpi k="about.h3" fill="var(--c5)" />
        </Kpis>
      </Box>

      <Box as="section">
        <T className="strip__lbl" k="about.tlT" />
        <Timeline />
      </Box>

      <Kpis fill="var(--c1)">
        <Kpi k="tree.home" to="/#projetos" arrow="ar" />
        <Kpi k="about.top" href="#" arrow="ar ar-up" />
      </Kpis>

      <ContactBlock id="contato" />
      <ReadBar fill="var(--c1)" />
    </div>
  );
}
