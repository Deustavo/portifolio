import type { ReactNode } from "react";
import { useTilt } from "../hooks/useTilt";
import { T } from "./T";

export function Facts({ children }: { children: ReactNode }) {
  return <div className="facts">{children}</div>;
}

/** Rótulo `k` traduzido; valor traduzido (`v`) ou fixo (children). */
export function Fact({ k, v, children }: { k: string; v?: string; children?: ReactNode }) {
  const ref = useTilt<HTMLDivElement>();
  return (
    <div className="fact" ref={ref}>
      <T k={k} />
      {v ? <T as="strong" k={v} /> : <strong>{children}</strong>}
    </div>
  );
}
