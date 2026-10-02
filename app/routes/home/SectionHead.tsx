import type { ComponentProps } from "react";
import { T } from "../../components/T";

type Props = { id: string; k: string; sub?: boolean } & ComponentProps<"div">;

/** .head com o título como âncora "#id". `sub` = subtítulo de grupo (h3). */
export function SectionHead({ id, k, sub, children, ...rest }: Props) {
  const H = sub ? "h3" : "h2";
  return (
    <div className={sub ? "head sub" : "head"} id={id} {...rest}>
      <H><T as="a" className="anchor" href={`#${id}`} k={k} /></H>
      {children}
    </div>
  );
}
