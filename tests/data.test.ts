import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { cases, caseBySlug, caseTitle, countBy, countLabel, imgDir, type Group } from "../app/data/cases.ts";
import { games } from "../app/data/games.ts";
import { DICT } from "../app/i18n/dict.ts";
import { seo } from "../app/seo.ts";

const pub = (p: string) => new URL(`../public${p}`, import.meta.url);
const uniq = (xs: string[]) => new Set(xs).size === xs.length;

test("slugs, prefixos e cards são únicos", () => {
  assert.ok(uniq(cases.map((c) => c.slug)));
  assert.ok(uniq(cases.map((c) => c.prefix)));
  assert.ok(uniq(cases.map((c) => c.card)));
});

test("caseBySlug acha todo case", () => {
  for (const c of cases) assert.equal(caseBySlug[c.slug], c);
  assert.equal(caseBySlug["nao-existe"], undefined);
});

test("next forma um ciclo único passando por todos os cases", () => {
  const seen = new Set<string>();
  let s = cases[0].slug;
  do {
    assert.ok(caseBySlug[s], `next aponta para slug inexistente: ${s}`);
    assert.ok(!seen.has(s), `ciclo curto em ${s}`);
    seen.add(s);
    s = caseBySlug[s].next;
  } while (s !== cases[0].slug);
  assert.equal(seen.size, cases.length);
});

test("cta e plainLinks exigem links", () => {
  for (const c of cases) if (c.cta || c.plainLinks) assert.ok(c.links?.length, c.slug);
});

test("galerias têm no máximo 4 (rótulos ga..gd)", () => {
  for (const c of cases) assert.ok(c.galleries.length <= 4, c.slug);
});

test("imgDir usa slug por padrão e imgDir quando definido", () => {
  const c = cases[0];
  assert.equal(imgDir({ ...c, imgDir: undefined }), `/assets/img/${c.slug}`);
  assert.equal(imgDir({ ...c, imgDir: "outra" }), "/assets/img/outra");
});

test("toda imagem referenciada existe em public/", () => {
  const missing = cases.flatMap((c) =>
    ["hero.png", "og.jpg", "card.webp", ...c.galleries.flatMap((g) => g.shots)]
      .map((f) => `${imgDir(c)}/${f}`)
      .filter((p) => !existsSync(pub(p))),
  );
  assert.deepEqual(missing, []);
});

test("caseTitle", () => {
  assert.equal(caseTitle(cases[0]), `${cases[0].name} — Gustavo Andrade`);
});

test("countBy soma os grupos e bate com o total", () => {
  const groups: Group[] = ["games", "systems", "sites", "protos"];
  assert.equal(countBy(), cases.length);
  assert.equal(groups.reduce((n, g) => n + countBy(g), 0), cases.length);
  for (const c of cases) assert.ok(groups.includes(c.group), c.slug);
});

test("countLabel: zero à esquerda e singular/plural", () => {
  const t = (k: string) => k;
  assert.equal(countLabel(1, t), "01 work.caseOne");
  assert.equal(countLabel(6, t), "06 work.caseMany");
  assert.equal(countLabel(16, t), "16 work.caseMany");
  assert.equal(countLabel(0, t), "00 work.caseMany");
});

test("games apontam para cases existentes e chaves i18n válidas", () => {
  for (const g of games) {
    assert.ok(caseBySlug[g.slug], g.slug);
    for (const k of [g.cta, ...g.chips.map((c) => c.k)]) assert.ok(k in DICT.pt && k in DICT.en, k);
  }
});

test("DICT: PT e EN têm as mesmas chaves e nenhum valor vazio", () => {
  assert.deepEqual(Object.keys(DICT.en).sort(), Object.keys(DICT.pt).sort());
  for (const lang of ["pt", "en"] as const)
    for (const [k, v] of Object.entries(DICT[lang])) assert.ok(v.trim(), `${lang} ${k} vazio`);
});

test("DICT: chaves usadas pelo template de case e pelo card existem", () => {
  for (const c of cases) {
    const shots = c.galleries.reduce((n, g) => n + g.shots.length, 0);
    const keys = [
      ...["kicker", "sub", "f1", "f2", "f3", "f4", "v1", "v2", "v3", "heroAlt", "h1", "h2", "h3", "c1", "c2", "c3"].map((k) => `${c.prefix}.${k}`),
      ...Array.from({ length: shots }, (_, i) => `${c.prefix}.g${i + 1}`),
      ...(c.links ?? []).map((_, i) => `${c.prefix}.l${i + 1}`),
      `${c.card}.tag`,
      `${c.card}.metric`,
    ];
    for (const k of keys) assert.ok(k in DICT.pt && k in DICT.en, k);
  }
});

test("seo monta título, descrição e URLs absolutas", () => {
  const m = seo("T", "D", "/sobre");
  const get = (key: string) => m.find((x) => ("property" in x && x.property === key) || ("name" in x && x.name === key));
  assert.deepEqual(m[0], { title: "T" });
  assert.equal(get("description")?.content, "D");
  assert.equal(get("og:url")?.content, "https://gustavoandrade.vercel.app/sobre");
  assert.equal(get("og:image")?.content, "https://gustavoandrade.vercel.app/assets/og-home.jpg");
  assert.equal(seo("T", "D", "/", "/x.jpg").find((x) => "property" in x && x.property === "og:image")?.content, "https://gustavoandrade.vercel.app/x.jpg");
});
