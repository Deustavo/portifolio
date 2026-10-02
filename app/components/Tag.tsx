import type { CSSProperties } from "react";
import { T } from "./T";

export function Tag({ k, style }: { k: string; style?: CSSProperties }) {
  return <T k={k} className="tag" style={style} />;
}
