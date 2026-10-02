# Plano de migração para React

Objetivo: trocar o site estático (21 HTML + 7 scripts IIFE) por uma app React sem
perder nenhuma funcionalidade, sem mudar URL pública e sem mexer no visual.

## 1. Stack

| Escolha | Motivo |
|---|---|
| **Vite + React 19 + TypeScript** | build rápido; o tipo do `Case` pega campo faltando na hora de adicionar projeto |
| **React Router v7 em modo framework, `ssr: false` + `prerender`** | gera um HTML estático por rota no build. Sem isso os cards de compartilhamento (og:image de cada case no WhatsApp/LinkedIn) quebram, porque crawler não roda JS |
| **CSS atual, importado como está** | `theme.css`, `case-bento.css`, `interactions.css`, `transition.css` e o `<style>` da home viram arquivos importados no root. Reescrever em Tailwind/CSS Modules é risco de regressão visual sem ganho |
| **Sem lib de i18n, estado, animação** | o dicionário e as animações já existem; só mudam de casa |

Deploy continua na Vercel, como site estático.

## 2. Roteamento

URLs atuais (com `cleanUrls`) ficam idênticas:

| Rota | Arquivo hoje | Rota React |
|---|---|---|
| `/` | `index.html` | `routes/home.tsx` |
| `/sobre` | `sobre.html` | `routes/sobre.tsx` |
| `/jogos` | `jogos.html` | `routes/jogos.tsx` |
| `/projects/:slug` | 16 arquivos `projects/*.html` | **uma** rota `routes/case.tsx`, dados em `data/cases.ts` |
| `*` | `404.html` | `routes/not-found.tsx` (prerender gera o `404.html`) |

```ts
// app/routes.ts
export default [
  layout("components/Layout.tsx", [
    index("routes/home.tsx"),
    route("sobre", "routes/sobre.tsx"),
    route("jogos", "routes/jogos.tsx"),
    route("projects/:slug", "routes/case.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
];

// react-router.config.ts
export default {
  ssr: false,
  prerender: () => ["/", "/sobre", "/jogos", ...cases.map(c => `/projects/${c.slug}`)],
};
```

Detalhes que precisam sobreviver:

- **Âncoras da home** (`#projetos`, `#contato`, `#jogos`, `#sistemas`, `#sites`, `#prototipos`): o filtro continua lendo e escrevendo o hash. Links vindos de outras páginas (`/#contato`) rolam até o alvo depois da montagem.
- **Links antigos com `.html`** já compartilhados: redirect 308 no `vercel.json` (`/projects/:slug.html` → `/projects/:slug`, `/sobre.html`, `/jogos.html`, `/index.html`).
- **`<ScrollRestoration />`** no root, para voltar pelo histórico na mesma posição.
- **Meta por rota** (`title`, `description`, `og:*`) via `export const meta` de cada rota. O case lê do `cases.ts`.
- Todo `<a href="...html">` interno vira `<Link to="...">`.

## 3. Estrutura de pastas

```
app/
  root.tsx                 html, head, script anti-flash do tema, providers, CSS global
  routes.ts
  routes/
    home.tsx               + home/Hero.tsx RoleRotator.tsx Counter.tsx Filters.tsx ProcessSlider.tsx
    sobre.tsx              + sobre/HalftonePhoto.tsx Timeline.tsx
    jogos.tsx
    case.tsx
    not-found.tsx
  components/              globais, ver seção 4
  hooks/                   useMedia.ts useTilt.ts useInView.ts usePageTransition.ts
  i18n/                    dict.ts (o DICT atual, sem alteração) + LangProvider.tsx
  data/                    cases.ts games.ts
  styles/                  os CSS atuais + home.css (o <style> do index)
public/assets/             img/, audio/, favicons, og-home.jpg (mesmo caminho de hoje)
```

Componente usado por uma página só fica junto da página, não em `components/`.

## 4. Componentes globais

Levantados pelo que hoje se repete entre páginas:

| Componente | Substitui | Usado em |
|---|---|---|
| `Layout` | estrutura comum das 21 páginas | todas (Bar + `<Outlet>` + Foot + transição + BlobCursor) |
| `Bar` | barra copiada em 21 arquivos | todas; recebe a página ativa para `aria-current` |
| `MobileMenu` | `menu()` do interactions.js | dentro do Bar |
| `ThemeToggle` / `LangToggle` | `theme.js`, clique do `i18n.js` | Bar |
| `Foot` | rodapé, com CTA opcional "Trabalhar juntos" | todas |
| `Icon` | ~40 cópias inline dos SVGs (seta, lua, sol, play, pause) | `<Icon name="arrow-right" />` |
| `T` | `data-i18n` | `<T k="lg.c1" />` (renderiza HTML do dicionário) |
| `Tag` | `.tag` | todas |
| `Box` | `.box` / `a.box` com preenchimento no hover | cards, blocos, next |
| `SectionHead` | `.head` com âncora `#` | home |
| `Facts` / `Fact` | `.facts` | case, sobre |
| `Kpis` / `Kpi` | `.kpis` (link ou estático) | case, sobre, jogos, 404 |
| `ContactBlock` | bloco "Bora construir?" duplicado | home, sobre |
| `HeroDots` | malha de pontos que segue o cursor | hero, ContactBlock |
| `ProjectCard` | `.p-card` (16 cópias na home) | home, gerado do `cases.ts` |
| `Gallery` + `Shot` | `section.box` com `.shots` | case |
| `Lightbox` | `lightbox()` | case (contexto que registra as imagens da página) |
| `NextCase` | `.box.next` | case |
| `ReadBar` | `progress()` | case |
| `BlobCursor` | `blob()` | Layout |
| `Mascote` | `mascote.js` | case com `mascote: true` (Chinela) |

Hooks: `useTilt(ref)` para o tilt nos cards, `useMedia('(prefers-reduced-motion: reduce)')` e `useMedia('(hover: none)')` substituindo as checagens espalhadas, `useInView` para os contadores.

## 5. Dados

### `data/cases.ts`

Os 16 cases são o mesmo gabarito com conteúdo trocado, então viram dados:

```ts
type Case = {
  slug: string;            // URL
  name: string;            // h1 e card
  prefix: string;          // prefixo i18n: "lg", "lsite"...
  card: string;            // índice do card na home: "p1", "p12"...
  imgDir: string;          // nem sempre é o slug (follow-me usa hackathon-unimar)
  fill: string;            // "var(--c1)"
  group: "games" | "systems" | "sites" | "protos";
  size?: "wide" | "xwide";
  shotArt?: boolean;
  year: string;
  meta: { title: string; description: string };   // PT, para o prerender
  galleries: { cols?: 3 | 4; shots: string[] }[]; // rótulo: prefix.ga/gb/gc; legenda: prefix.gN contínuo
  links?: { href: string; k: string }[];          // tiles .kpi no resultado
  cta?: { href: string; k: string };              // .head__cta
  next: string;            // slug do próximo, mantém a corrente atual
  mascote?: boolean;
};
```

A ordem do array é a ordem da home. Daí saem de graça:

- a grade da home (fim das 16 cópias de card)
- as contagens (`counts.js` deixa de existir: `cases.filter(c => c.group === g).length`)
- o `{n}` nos textos traduzidos
- a lista de rotas do prerender

A extração dos 16 HTML para o `cases.ts` dá para fazer com um script descartável (os arquivos seguem o mesmo padrão), conferindo à mão os que fogem: Owna (sem galeria), Metrics/Chinela/Polvo/Demon (links e CTA), Fábrica 1 (`shots--3/4`).

### `data/games.ts`

Os três cards do `/jogos` (thumb, link principal, chips de case/itch/GitHub).

### i18n

`DICT` vai inteiro para `i18n/dict.ts`, sem mudar chave. `LangProvider` expõe `{ lang, t, toggle }`, guarda em `localStorage("ga-lang")` e detecta pelo navegador como hoje. O HTML pré-renderizado sai em PT; o idioma salvo é aplicado depois da hidratação (mesmo comportamento de hoje, que também troca o texto via JS).

Atributos (`alt`, `aria-label`) usam `t(k)` com as tags removidas, igual ao `data-i18n-attr`.

### Tema

O script inline do `<head>` fica no `root.tsx` (é o que evita o flash). `ThemeToggle` lê e grava `ga-theme`, padrão escuro.

## 6. Inventário de funcionalidades

Checklist de paridade. Nada sai do ar sem estar marcado.

| # | Funcionalidade | Hoje | Destino |
|---|---|---|---|
| 1 | Tema claro/escuro, padrão escuro, sem flash | theme.js + script inline | root.tsx + ThemeToggle |
| 2 | PT/EN com detecção e memória | i18n.js | LangProvider + T |
| 3 | Transição de entrada/saída entre páginas | transition.js | `usePageTransition` no Layout: intercepta a navegação, roda a saída, chama `navigate()`, roda a entrada na nova rota; respeita reduced-motion |
| 4 | Nome letra a letra | hero.js | home/Hero |
| 5 | Cargo rotativo com largura animada | hero.js | home/RoleRotator (pausa com aba oculta) |
| 6 | Números que sobem ao entrar na tela | hero.js | home/Counter + useInView |
| 7 | Malha de pontos com parallax | hero.js | HeroDots |
| 8 | Contagem de cases automática | counts.js | derivado do `cases.ts` |
| 9 | Filtro de projetos com hash na URL | interactions.js | home/Filters (cascata de entrada ao trocar) |
| 10 | Slider "Como eu trabalho" (autoplay, arrastar, botões) | interactions.js | home/ProcessSlider |
| 11 | Tilt e brilho nos cards | interactions.js | useTilt |
| 12 | Blob que segue o cursor | interactions.js | BlobCursor |
| 13 | Menu hambúrguer no mobile | interactions.js | MobileMenu (Esc, clique fora, volta ao desktop) |
| 14 | Lightbox com FLIP, teclado, swipe, foco preso | interactions.js | Lightbox |
| 15 | Barra de progresso de leitura na cor do case | interactions.js | ReadBar (recebe `fill` por prop) |
| 16 | Trajetória com trilho e atalhos de ano | interactions.js | sobre/Timeline |
| 17 | Foto em halftone revelada pelo cursor | interactions.js | sobre/HalftonePhoto (miniatura importada como módulo; o data URI deixa de ser necessário porque não há mais `file://`) |
| 18 | Mascote que mia, dispensável por sessão | mascote.js | Mascote |
| 19 | Corrente de "próximo projeto" | HTML | `next` no `cases.ts` |
| 20 | Meta/OG por página | HTML | `meta` por rota + prerender |
| 21 | Cache longo de imagem | vercel.json | mantido; regra de JS/CSS vira `immutable` porque o Vite gera nome com hash |
| 22 | Fallback sem JS | progressivo | o prerender entrega o HTML completo; interações dependem de JS como hoje |

**Bug que a migração corrige:** hoje o `apply()` do `i18n.js` sobrescreve `document.title` com `doc.title` em todas as páginas, então todo case fica com o título da home depois que o JS roda. Com `meta` por rota isso some.

## 7. Fases

Cada fase termina com o site rodando. Trabalhar numa branch `react`; a `main` continua no ar até a fase 7.

| Fase | Entrega | Pronto quando |
|---|---|---|
| 0. Base | Vite + RR7 configurados, `public/assets` com os arquivos atuais, CSS importado | `npm run dev` abre uma página em branco já com tema e fontes |
| 1. Esqueleto global | root, Layout, Bar, MobileMenu, Foot, Icon, T, LangProvider, ThemeToggle, rotas vazias | navega entre as 5 rotas, tema e idioma funcionam e persistem |
| 2. Dados | `cases.ts`, `games.ts`, `dict.ts` | `tsc` passa; cada slug tem todas as chaves em PT e EN (checagem no build) |
| 3. Case | rota `case.tsx`, Facts, Gallery, Lightbox, Kpis, NextCase, ReadBar, useTilt, Mascote | os 16 cases idênticos aos atuais, lado a lado |
| 4. Home | Hero, RoleRotator, Counter, HeroDots, Filters, ProjectCard, ProcessSlider, ContactBlock | home idêntica, filtro com hash, contagens corretas |
| 5. Demais páginas | Sobre (HalftonePhoto, Timeline), Jogos, 404 | idênticas às atuais |
| 6. Efeitos globais | transição de página, BlobCursor, ScrollRestoration, rolagem por hash | checklist da seção 6 todo marcado |
| 7. Deploy | `vercel.json` com redirects `.html`, build com prerender, preview na Vercel | `curl` de `/projects/life-guard` traz o og:image certo sem JS; deploy de preview revisado |
| 8. Limpeza | apagar HTML e scripts antigos, atualizar a skill `add-project` | adicionar case = imagens + entrada no `cases.ts` + chaves no `dict.ts` |

## 8. Como conferir paridade

- Rodar o site antigo (`python3 -m http.server 8000` na `main`) e o novo (`npm run preview`) lado a lado.
- Por rota, nos dois temas e nos dois idiomas, em desktop e 390px de largura.
- Teclado: Tab pelo Bar, filtros, slider e lightbox; Esc fecha menu e lightbox.
- `prefers-reduced-motion` ligado no DevTools: nenhuma animação roda.
- Network sem 404 de imagem.
- Opcional, se valer o tempo: script Playwright que tira screenshot de cada rota nas duas versões para comparar.

## 9. Fora do escopo

- Redesenho, troca de CSS, novas features.
- CMS ou MDX para os cases: o `cases.ts` + `dict.ts` resolve enquanto quem edita é uma pessoa só.
- Testes unitários de componente: a conferência da seção 8 cobre a paridade. Única checagem automática que vale: a de chaves i18n faltando, na fase 2.
