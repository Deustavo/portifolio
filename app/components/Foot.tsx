import { Link } from "react-router";
import { T } from "./T";

export function Foot({ cta }: { cta?: boolean }) {
  return (
    <div className="foot">
      <T k="foot.rights" />
      {cta && <T as={Link} to="/#contato" k="case.cta" className="ar" />}
    </div>
  );
}
