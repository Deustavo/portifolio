import { HeroDots } from "./HeroDots";
import { T } from "./T";
import { Tag } from "./Tag";

const WA = "https://wa.me/5511977416788";
const MAIL = "gustavorodriguesandrade00@gmail.com";

/** .box.b-contact "Bora construir?" com a malha de pontos. `id` vira âncora (o sobre usa "contato"). */
export function ContactBlock({ id }: { id?: string }) {
  return (
    <div className="box b-contact" id={id}>
      <HeroDots />
      <Tag k="contact.kicker" style={{ color: "var(--c2)" }} />
      <T as="a" className="big" href={WA} target="_blank" rel="noopener" k="contact.ctaB" />
      <div className="chips">
        <a href={`mailto:${MAIL}`} rel="noopener">{MAIL}</a>
        <a href={WA} target="_blank" rel="noopener">WhatsApp</a>
        <a href="https://www.linkedin.com/in/gustavoandrade00" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  );
}
