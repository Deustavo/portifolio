import { useEffect, type CSSProperties } from "react";
import { useLocation } from "react-router";
import type { Route } from "./+types/case";
import { caseBySlug, caseTitle, imgDir } from "../data/cases";
import { seo } from "../seo";
import css from "../styles/case-bento.css?url";
import { pageLinks } from "../styles/page";
import { useLang } from "../i18n/LangProvider";
import { Box } from "../components/Box";
import { Fact, Facts } from "../components/Facts";
import { Gallery, Shot } from "../components/Gallery";
import { Kpi, Kpis } from "../components/Kpis";
import { Lightbox, useZoom } from "../components/Lightbox";
import { CHEGAR } from "../components/Chinela";
import { NextCase } from "../components/NextCase";
import { ReadBar } from "../components/ReadBar";
import { T } from "../components/T";
import { Tag } from "../components/Tag";

export const links = () => pageLinks(css);

// uma rota por slug (routes.ts): o slug é o último trecho da URL
const slugOf = (pathname: string) => pathname.replace(/\/$/, "").split("/").pop()!;

export const meta = ({ location }: Route.MetaArgs) => {
  const c = caseBySlug[slugOf(location.pathname)];
  return seo(caseTitle(c), c.description, `/projects/${c.slug}`, `${imgDir(c)}/og.jpg`);
};

function Block({ h, c }: { h: string; c: string }) {
  return (
    <Box as="section" className="block">
      <T as="h2" k={h} />
      <T as="div" k={c} />
    </Box>
  );
}

function Cover({ src, k, size }: { src: string; k: string; size: [number, number] }) {
  const { ta } = useLang();
  return <img className="cover" src={src} alt={ta(k)} width={size[0]} height={size[1]} {...useZoom(k)} />;
}

export default function Case() {
  const c = caseBySlug[slugOf(useLocation().pathname)];
  const p = c.prefix;
  const dir = imgDir(c);
  const arrow = c.plainLinks ? undefined : "ar ar-out";

  // a Chinela chega andando no canto um tempo depois de abrir o case dela
  useEffect(() => {
    if (!c.mascote) return;
    const t = setTimeout(() => window.dispatchEvent(new Event(CHEGAR)), c.mascote);
    return () => clearTimeout(t);
  }, [c.mascote]);

  // legendas g1..gN contínuas entre as galerias
  let n = 0;
  const galleries = c.galleries.map((g, gi) => (
    <Gallery key={gi} label={`${p}.g${"abcd"[gi]}`} cols={g.cols}>
      {g.shots.map((s) => (
        <Shot key={s} src={`${dir}/${s}`} k={`${p}.g${++n}`} />
      ))}
    </Gallery>
  ));
  const [early, rest] = c.earlyGallery ? [galleries[0], galleries.slice(1)] : [null, galleries];

  return (
    <Lightbox key={c.slug}>
      <div className="wrap">
        <Box as="header" className="head">
          <Tag k={`${p}.kicker`} />
          <h1>{c.name}</h1>
          <T as="p" className="head__sub" k={`${p}.sub`} />
          {c.cta && (
            <T as="a" className={arrow ? `head__cta ${arrow}` : "head__cta"} href={c.links![0]} target="_blank" rel="noopener"
              style={{ "--fill": c.fill } as CSSProperties} k={`${p}.l1`} />
          )}
        </Box>

        <Facts>
          <Fact k={`${p}.f1`} v={`${p}.v1`} />
          <Fact k={`${p}.f2`} v={`${p}.v2`} />
          <Fact k={`${p}.f3`} v={`${p}.v3`} />
          <Fact k={`${p}.f4`}>{c.year}</Fact>
        </Facts>

        <Cover src={`${dir}/hero.png`} k={`${p}.heroAlt`} size={c.hero ?? [1920, 1080]} />

        <Block h={`${p}.h1`} c={`${p}.c1`} />
        {early}
        <Block h={`${p}.h2`} c={`${p}.c2`} />
        {rest}

        <Box as="section" className="block">
          <T as="h2" k={`${p}.h3`} />
          <T as="div" k={`${p}.c3`} />
          {c.links && (
            <Kpis fill={c.fill}>
              {c.links.map((href, i) => (
                <Kpi key={href} k={`${p}.l${i + 1}`} href={href} arrow={arrow} />
              ))}
            </Kpis>
          )}
        </Box>

        <NextCase c={caseBySlug[c.next]} />
      </div>
      <ReadBar fill={c.fill} />
    </Lightbox>
  );
}
