import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cases, countBy, countLabel, type Group } from "../../data/cases";
import { useLang } from "../../i18n/LangProvider";
import { T } from "../../components/T";
import { ProjectCard } from "./ProjectCard";
import { SectionHead } from "./SectionHead";

type Filter = Group | "all";

// cada grupo tem uma âncora (#jogos, #sistemas...) que vale como filtro na URL
const GROUPS: { g: Group; id: string; k: string }[] = [
  { g: "games", id: "jogos", k: "work.games" },
  { g: "systems", id: "sistemas", k: "work.systems" },
  { g: "sites", id: "sites", k: "work.sites" },
  { g: "protos", id: "prototipos", k: "work.protos" },
];
const CHIPS: { f: Filter; k: string }[] = [{ f: "all", k: "filter.all" }, ...GROUPS.map(({ g, k }) => ({ f: g, k }))];

function fromHash(): Filter | null {
  const h = location.hash.replace(/^#/, "");
  if (!h) return null;
  // aceita também o nome interno do filtro, caso alguém digite #protos
  return GROUPS.find((x) => x.id === h || x.g === h)?.g ?? null;
}

/** "Projetos selecionados": filtro com hash na URL e cascata de entrada a cada troca. */
export function Filters() {
  const { t, ta } = useLang();
  const [active, setActive] = useState<Filter>("all");
  const [runs, setRuns] = useState(0); // cada troca recomeça a cascata
  const cur = useRef(active);
  cur.current = active;
  const grids = useRef<Partial<Record<Group, HTMLDivElement | null>>>({});

  const run = (f: Filter) => {
    setActive(f);
    setRuns((n) => n + 1);
  };

  useEffect(() => {
    const initial = fromHash();
    if (initial) {
      run(initial);
      // depois de esconder os outros grupos a página encurta: reancora no alvo
      const target = document.getElementById(location.hash.slice(1));
      if (target) requestAnimationFrame(() => target.scrollIntoView());
    }
    const onHash = () => {
      const f = fromHash() ?? "all";
      if (f !== cur.current) run(f);
    };
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);

  // os cards entram um atrás do outro
  useLayoutEffect(() => {
    if (!runs) return;
    for (const { g } of GROUPS) {
      const grid = grids.current[g];
      if (!grid || (active !== "all" && active !== g)) continue;
      grid.classList.remove("is-filtering");
      [...grid.children].forEach((c, n) => (c as HTMLElement).style.setProperty("--i", String(n)));
      void grid.offsetWidth;
      grid.classList.add("is-filtering");
    }
  }, [runs]);

  const pick = (f: Filter) => {
    if (f === active) return;
    run(f);
    const hash = f === "all" ? "" : "#" + GROUPS.find((x) => x.g === f)!.id;
    // mantém o state do React Router no histórico
    history.replaceState(history.state, "", location.pathname + location.search + hash);
  };

  return (
    <>
      <SectionHead id="projetos" k="work.title">
        <span className="tag">{countLabel(countBy(active === "all" ? undefined : active), t)}</span>
      </SectionHead>
      <div className="filters" role="group" aria-label={ta("filter.label")}>
        {CHIPS.map(({ f, k }) => (
          <button key={f} className={f === active ? "chip is-on" : "chip"} type="button" aria-pressed={f === active} onClick={() => pick(f)}>
            <T k={k} />
          </button>
        ))}
      </div>
      {GROUPS.map(({ g, id, k }) => {
        const hidden = active !== "all" && active !== g;
        return (
          <Fragment key={g}>
            <SectionHead sub id={id} k={k} data-group={g} hidden={hidden}>
              <span className="tag">{countLabel(countBy(g), t)}</span>
            </SectionHead>
            <div className="bento" data-group={g} hidden={hidden} ref={(el) => void (grids.current[g] = el)}>
              {cases.filter((c) => c.group === g).map((c) => <ProjectCard key={c.slug} c={c} />)}
            </div>
          </Fragment>
        );
      })}
    </>
  );
}
