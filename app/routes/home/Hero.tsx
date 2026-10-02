import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router";
import { Box } from "../../components/Box";
import { HeroDots } from "../../components/HeroDots";
import { Icon } from "../../components/Icon";
import { T } from "../../components/T";
import { Tag } from "../../components/Tag";
import { REDUCE } from "../../hooks/useMedia";
import { RoleRotator } from "./RoleRotator";

const EASE = "cubic-bezier(.22,.61,.36,1)";
const chars = (s: string) => [...s].map((c, i) => <span className="ch" key={i}>{c}</span>);

/** Hero da home: nome que entra letra a letra (hero.js), cargo rotativo, malha de pontos. */
export function Hero() {
  const name = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (matchMedia(REDUCE).matches) return;
    const cs = [...name.current!.querySelectorAll<HTMLElement>(".ch")];
    cs.forEach((c) => {
      c.style.transform = "translateY(108%)";
      c.style.opacity = "0";
    });
    let done = 0;
    const timer = setTimeout(() => {
      cs.forEach((c, i) => {
        const d = i * 40 + "ms";
        c.style.transition = `transform .78s ${EASE} ${d}, opacity .5s ease ${d}`;
        c.style.transform = "";
        c.style.opacity = "";
      });
      done = window.setTimeout(() => cs.forEach((c) => (c.style.transition = "")), cs.length * 40 + 900);
    }, 420);
    return () => {
      clearTimeout(timer);
      clearTimeout(done);
      cs.forEach((c) => c.removeAttribute("style"));
    };
  }, []);

  return (
    <Box className="b-hero">
      <HeroDots />
      <div className="b-hero__top">
        <Tag k="hero.statusShort" style={{ color: "var(--c2)" }} />
        <RoleRotator />
      </div>
      <h1 className="hero-name" ref={name}>
        <span className="line">{chars("Gustavo")}</span>
        <span className="line">
          {chars("Andrade")}
          <span className="ch"><i className="dot">.</i></span>
        </span>
      </h1>
      <div className="hero-foot">
        <T as="p" className="hero-bio" k="hero.bioShort" />
        <div className="hero-ctas">
          <a className="hero-cue" href="#projetos">
            <T k="hero.cue" />
            <i><Icon name="arrow-down" /></i>
          </a>
          <Link className="hero-cue hero-cue--alt" to="/sobre">
            <T k="hero.about" />
            <i><Icon name="arrow-right" /></i>
          </Link>
        </div>
      </div>
    </Box>
  );
}
