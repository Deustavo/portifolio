import transition from "./transition.css?url";
import interactions from "./interactions.css?url";

// home.css e case-bento.css redefinem os mesmos seletores (.bar, .box, .head...),
// então cada rota carrega o seu, na mesma ordem do site antigo:
// theme (root) > CSS da página > transition > interactions
export const pageLinks = (css: string) =>
  [css, transition, interactions].map((href) => ({ rel: "stylesheet", href }));
