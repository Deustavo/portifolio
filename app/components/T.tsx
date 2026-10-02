import type { ComponentPropsWithoutRef, ElementType } from "react";
import { useLang } from "../i18n/LangProvider";

type Props<E extends ElementType> = { k: string; as?: E } & Omit<ComponentPropsWithoutRef<E>, "children">;

/** Equivalente ao data-i18n: renderiza o HTML do dicionário dentro do elemento `as` (padrão span). */
export function T<E extends ElementType = "span">({ k, as, ...rest }: Props<E>) {
  const { t } = useLang();
  const Tag: ElementType = as ?? "span";
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: t(k) }} />;
}
