import type { ComponentProps, ElementType } from "react";

type Props<E extends ElementType> = { as?: E } & ComponentProps<E>;

/** .box (cards, blocos, next). `as` escolhe o elemento: section, header, a, Link... */
export function Box<E extends ElementType = "div">({ as, className, ...rest }: Props<E>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={className ? `box ${className}` : "box"} {...rest} />;
}
