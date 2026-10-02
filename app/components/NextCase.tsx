import type { CSSProperties } from "react";
import { Link } from "react-router";
import type { Case } from "../data/cases";
import { useTilt } from "../hooks/useTilt";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { T } from "./T";
import { Tag } from "./Tag";

/** .box.next: card do próximo case, na cor dele. */
export function NextCase({ c }: { c: Case }) {
  const ref = useTilt<HTMLAnchorElement>();
  return (
    <Box as={Link} className="next" to={`/projects/${c.slug}`} style={{ "--fill": c.fill } as CSSProperties} ref={ref}>
      <Tag k="case.next" />
      <T as="strong" k={`${c.prefix}.title`} />
      <span>
        <Icon name="arrow-right" />
      </span>
    </Box>
  );
}
