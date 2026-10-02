import type { CSSProperties } from "react";
import { Link } from "react-router";
import { imgDir, type Case } from "../../data/cases";
import { useTilt } from "../../hooks/useTilt";
import { Box } from "../../components/Box";
import { Icon } from "../../components/Icon";
import { T } from "../../components/T";
import { Tag } from "../../components/Tag";

/** .p-card da home, gerado do cases.ts. */
export function ProjectCard({ c }: { c: Case }) {
  const ref = useTilt<HTMLAnchorElement>();
  const cls = ["p-card", c.size, c.shotArt && "shot-art"].filter(Boolean).join(" ");
  const style = { "--shot": `url(${imgDir(c)}/card.webp)`, "--fill": c.fill } as CSSProperties;
  return (
    <Box as={Link} className={cls} to={`/projects/${c.slug}`} style={style} ref={ref}>
      <Tag k={`${c.card}.tag`} />
      <span>
        <h3>{c.name}</h3>
        <T as="p" k={`${c.card}.metric`} />
        <span className="p-card__go">
          <T as="i" k="p.more" /> <span><Icon name="arrow-right" className="" /></span>
        </span>
      </span>
    </Box>
  );
}
