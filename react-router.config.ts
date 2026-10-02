import type { Config } from "@react-router/dev/config";
import { cases } from "./app/data/cases";
import { DICT } from "./app/i18n/dict";

// chaves EN que faltam de propósito no DICT original (o site cai no PT). Hoje nenhuma.
const ALLOW_MISSING_EN: string[] = [];

// toda chave que o template de case usa, em PT e EN; roda em dev, typegen e build
const missing = cases.flatMap((c) => {
  const p = c.prefix;
  const shots = c.galleries.reduce((n, g) => n + g.shots.length, 0);
  const keys = [
    ...["kicker", "sub", "f1", "f2", "f3", "f4", "v1", "v2", "v3", "heroAlt", "h1", "h2", "h3", "c1", "c2", "c3", "title"],
    ...c.galleries.map((_, i) => "g" + "abcd"[i]),
    ...Array.from({ length: shots }, (_, i) => `g${i + 1}`),
    ...(c.links ?? []).map((_, i) => `l${i + 1}`),
  ].map((k) => `${p}.${k}`);
  keys.push(`${c.card}.tag`, `${c.card}.metric`);
  return keys.flatMap((k) => [
    ...(k in DICT.pt ? [] : [`pt ${k}`]),
    ...(k in DICT.en || ALLOW_MISSING_EN.includes(k) ? [] : [`en ${k}`]),
  ]);
});
if (missing.length) throw new Error(`Chaves i18n faltando no dict.ts:\n${missing.join("\n")}`);

export default {
  ssr: false,
  // "/404" casa com a rota "*"; o build copia o HTML dele para 404.html
  prerender: ["/", "/sobre", "/jogos", "/404", ...cases.map((c) => `/projects/${c.slug}`)],
} satisfies Config;
