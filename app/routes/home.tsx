import { countBy } from "../data/cases";
import { useLang } from "../i18n/LangProvider";
import { useTilt } from "../hooks/useTilt";
import { seo } from "../seo";
import css from "../styles/home.css?url";
import { pageLinks } from "../styles/page";
import { ContactBlock } from "../components/ContactBlock";
import { T } from "../components/T";
import { Counter } from "./home/Counter";
import { Filters } from "./home/Filters";
import { Hero } from "./home/Hero";
import { ProcessSlider } from "./home/ProcessSlider";
import { SectionHead } from "./home/SectionHead";

export const links = () => pageLinks(css);
export const meta = () =>
  seo(
    "Gustavo Andrade — Product Design e Engenharia de Software",
    "Gustavo Andrade: UI & UX, front-end e engenharia de software em São Paulo.",
    "",
  );

/** .b-stat: número (animado com `count`) e legenda. */
function Stat({ long, count, k, lbl }: { long?: boolean; count?: string; k?: string; lbl: string }) {
  const ref = useTilt<HTMLDivElement>();
  return (
    <div className={long ? "box b-stat long" : "box b-stat"} ref={ref}>
      {count != null ? <Counter text={count} /> : <T as="b" k={k!} />}
      <T as="small" k={lbl} />
    </div>
  );
}

export default function Home() {
  const { t } = useLang();
  return (
    <>
      <div className="bento">
        <Hero />
        <Stat long count={t("stat.since")} lbl="stat.sinceLbl" />
        <Stat count={String(countBy())} lbl="stat.productsLbl" />
        <Stat count={t("stat.awards")} lbl="stat.awardsLbl" />
        <Stat long k="stat.edu" lbl="stat.eduLbl" />
      </div>
      <Filters />
      <SectionHead id="processo" k="proc.title">
        <T className="tag" k="proc.hint" />
      </SectionHead>
      <ProcessSlider />
      <SectionHead id="contato" k="contact.title" />
      <div className="bento">
        <ContactBlock />
      </div>
    </>
  );
}
