// SVGs inline que se repetiam pelas páginas
const ICONS = {
  "arrow-right": { sw: 3, d: <path d="M5 12h13M12 5l7 7-7 7" /> },
  "arrow-left": { sw: 3, d: <path d="M19 12H6M12 19l-7-7 7-7" /> },
  "arrow-down": { sw: 3, d: <path d="M12 5v13M5 12l7 7 7-7" /> },
  close: { sw: 3, d: <path d="M6 6l12 12M18 6 6 18" /> },
  moon: { sw: 2.5, d: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /> },
  sun: {
    sw: 2.5,
    d: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
  },
  play: { sw: 0, d: <path d="M7 4.5v15l13-7.5z" /> },
  pause: {
    sw: 0,
    d: (
      <>
        <rect x="5" y="4" width="5" height="16" rx="1.5" />
        <rect x="14" y="4" width="5" height="16" rx="1.5" />
      </>
    ),
  },
};

export type IconName = keyof typeof ICONS;

/** className padrão "ic"; passe "" para o svg sem classe (ex.: seta do .p-card__go). */
export function Icon({ name, className = "ic" }: { name: IconName; className?: string }) {
  const { sw, d } = ICONS[name];
  const stroke = sw
    ? { fill: "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" } as const
    : { fill: "currentColor" };
  return (
    <svg className={className || undefined} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      {d}
    </svg>
  );
}
