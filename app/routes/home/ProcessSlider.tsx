import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Link } from "react-router";
import { useLang } from "../../i18n/LangProvider";
import { useInView } from "../../hooks/useInView";
import { REDUCE } from "../../hooks/useMedia";
import { Box } from "../../components/Box";
import { Icon } from "../../components/Icon";
import { T } from "../../components/T";

const DUR = 2200;
const STEPS = [
  { fill: "var(--c11)", to: "/projects/greeimage" },
  { fill: "var(--c1)", to: "/projects/life-guard" },
  { fill: "var(--c13)", to: "/projects/follow-me" },
  { fill: "var(--c12)", to: "/projects/radar-governamental" },
];
// linhas de "código" da etapa 04
const CODE: Record<string, string>[] = [
  { "--l": "55%", "--cc": "var(--c5)" },
  { "--l": "70%", "--in": "12%" },
  { "--l": "45%", "--in": "24%", "--cc": "var(--c2)" },
  { "--l": "60%", "--in": "24%" },
  { "--l": "35%", "--in": "12%", "--cc": "var(--c4)" },
  { "--l": "50%", "--cc": "var(--c5)" },
];
const css = (o: Record<string, string>) => o as CSSProperties;

/** "Como eu trabalho": botões, barra e play trocam data-s no palco; o CSS faz a tela mudar.
 *  Quando a seção aparece, as etapas passam sozinhas até alguém mexer. */
export function ProcessSlider() {
  const { ta } = useLang();
  const [cur, setCur] = useState(3); // sem JS (e com reduced-motion) fica na última etapa
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const seen = useInView(root, 0.5);
  const dragging = useRef(false);

  useEffect(() => {
    setReady(true);
    if (!matchMedia(REDUCE).matches) setCur(0);
  }, []);

  // ao aparecer, toca do começo, se ninguém mexeu ainda
  useEffect(() => {
    if (seen && cur === 0 && !matchMedia(REDUCE).matches) setPlaying(true);
  }, [seen]);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => (cur === 3 ? setPlaying(false) : setCur(cur + 1)), DUR);
    return () => clearTimeout(timer);
  }, [playing, cur]);

  const go = (n: number) => {
    setPlaying(false);
    setCur(n);
  };

  // arrastar na barra escolhe a etapa pela posição do dedo
  const pick = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setCur(Math.max(0, Math.min(3, Math.floor(((e.clientX - r.left) / r.width) * 4))));
  };

  return (
    <div className="bento">
      <Box className="b-proc" ref={root}>
        <div className="proc-stage" data-s={cur} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => <span key={i} className="pp" />)}
          {[0, 1, 2, 3].map((i) => <span key={i + 5} className="pp cut" />)}
          <span className="proc-code">
            {CODE.map((s, i) => <i key={i} style={css(s)} />)}
          </span>
        </div>
        <div className="proc-steps" aria-live="polite">
          {STEPS.map((s, i) => (
            <div key={i} className={i === cur ? "proc-step is-on" : "proc-step"} style={css({ "--fill": s.fill })}>
              <small>{`0${i + 1} / 04`}</small>
              <T as="h3" k={`proc.s${i + 1}`} />
              <T as="p" k={`proc.s${i + 1}d`} />
              <blockquote>
                <T k={`proc.s${i + 1}q`} />
                <br />
                <T as={Link} to={s.to} k="proc.see" className="ar" />
              </blockquote>
            </div>
          ))}
        </div>
        <div className="proc-ctl" hidden={!ready}>
          <button className={playing ? "proc-play is-on" : "proc-play"} type="button" aria-label={ta(playing ? "proc.pause" : "proc.play")}
            onClick={() => (playing ? setPlaying(false) : (setCur(cur === 3 ? 0 : cur), setPlaying(true)))}>
            <Icon name="play" className="ic-play" />
            <Icon name="pause" className="ic-pause" />
          </button>
          <div className="proc-bar" aria-hidden="true" style={css({ "--dur": DUR + "ms" })}
            onPointerDown={(e) => {
              setPlaying(false);
              e.currentTarget.setPointerCapture(e.pointerId);
              dragging.current = true;
              pick(e);
            }}
            onPointerMove={(e) => dragging.current && pick(e)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}>
            {STEPS.map((_, i) => (
              <span key={i} className={["proc-seg", (playing ? i < cur : i <= cur) && "is-done", playing && i === cur && "is-run"].filter(Boolean).join(" ")}>
                <i />
              </span>
            ))}
          </div>
          <div className="proc-btns" role="group" aria-label={ta("proc.label")}>
            {STEPS.map((_, i) => (
              <button key={i} type="button" aria-pressed={i === cur} onClick={() => go(i)}>
                <b>{`0${i + 1}`}</b>
                <T k={`proc.b${i + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
}
