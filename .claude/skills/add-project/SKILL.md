---
name: add-project
description: Adiciona um novo case ao portfólio seguindo o padrão do Life Guard. Use quando pedirem para "adicionar projeto", "criar case", "novo case no portfólio", "add project to portfolio" ou quando derem screenshots de um projeto para publicar.
---

# Adicionar um case ao portfólio

O site é React Router com prerender. Todo case é a mesma rota
(`app/routes/case.tsx`) alimentada por dados, então adicionar case é:

1. imagens em `public/assets/img/<slug>/`
2. uma entrada no array `cases` de `app/data/cases.ts`
3. as chaves de texto em `app/i18n/dict.ts`, em PT e em EN
4. `npm run build`

Rota, card na home, contagem de cases, `{n}` dos textos, meta/OG e lista do
prerender saem do `cases.ts` sozinhos. Nada de CSS novo, nada de componente novo.
Se algo não couber nos blocos existentes, pare e pergunte antes de inventar.

## Antes de escrever

Leia para pegar o padrão vigente (o Life Guard é a referência):

- `app/data/cases.ts`: tipo `Case` e a entrada `life-guard`
- `app/i18n/dict.ts`: blocos `/* ---- case Life Guard ---- */` (PT) e
  `/* ---- Life Guard case ---- */` (EN), e as chaves `p1.*` do card
- `app/routes/case.tsx`: o gabarito, para ver onde cada chave aparece
- `app/styles/case-bento.css`: classes disponíveis, não editar

Colete do usuário (pergunte o que faltar, não invente):

| Campo | Exemplo |
|---|---|
| slug | `life-site` (kebab-case, vira URL `/projects/<slug>` e pasta de imagens) |
| Nome exibido | `Life Site` |
| Cliente | `Life Tecnologia` |
| Papel | `UI & UX Design, prototipação` |
| Escopo | `Site institucional, 6 públicos` |
| Ano | `2021` |
| Grupo na home | jogos, sistemas, sites ou protótipos |
| Links públicos | jogo no ar, repositório, página em loja (se houver) |

E decida você, conferindo no código:

- prefixo i18n: curto e único (`lsite`). Confira com
  `grep -o 'prefix: "[^"]*"' app/data/cases.ts`
- índice do card: o próximo `pN` livre. Confira com
  `grep -oE '"p[0-9]+\.tag"' app/i18n/dict.ts | sort -V | tail -1`
- cor: uma `var(--cN)` ainda não usada por outro case
  (`grep -o 'fill: "[^"]*"' app/data/cases.ts`). Se todas estiverem em uso,
  pergunte, porque cor nova é CSS novo no `theme.css`

## Passo 1: imagens

1. `mkdir -p public/assets/img/<slug>`
2. Nomes em kebab-case descrevendo a tela, não `1.png`: `home.png`,
   `menu-servicos.png`, `internet-fixa.png`.
3. Screenshot de protótipo costuma vir com a moldura do Figma: margem cinza
   uniforme e o nome do frame em cima. Apare isso, a legenda da `figcaption` já
   diz o nome da tela. Receita: detecte a cor de fundo pelo pixel `(0,0)`,
   marque cada pixel diferente dela, e recorte pela primeira e última linha e
   coluna com mais de 50% de pixels marcados. O limiar de 50% pula a faixa do
   rótulo, porque texto fino ocupa pouco da largura.
4. Arquivos fixos da pasta, além das telas:

   | Arquivo | Uso | Tamanho |
   |---|---|---|
   | `hero.png` | capa do case | 1920×1080 (outro tamanho: declare em `hero` no `cases.ts`) |
   | `og.jpg` | og:image da página, montado pelo `seo.ts` | 1200×630 |
   | `card.webp` | fundo do card na home e no `/jogos` | confira os existentes, ex. `life-guard/card.webp` |

   As telas da galeria são os nomes que vão em `galleries[].shots`.
5. `hero.png` é a capa, largura cheia em `aspect-ratio:16/7`, 1920×1080.
   Screenshot vertical direto na capa fica cortado. O padrão do portfólio é um
   mosaico inclinado, igual ao `public/assets/img/life-guard/hero.png`: telas em
   colunas contínuas sobre fundo creme `#f9e8d8`, cantos arredondados em 20px,
   sombra preta a 85 de alfa com desfoque gaussiano de 26, canvas grande girado
   `-12°` e recorte central de 1920×1080. Tela de celular é estreita, então
   encha as colunas sem intervalo vertical, senão sobra um buraco creme no meio
   da capa. Tela de sistema, larga, é o contrário: sem respiro as telas colam
   uma na outra e a capa vira um borrão. Aí use coluna de cerca de 900px de
   largura e 90px de intervalo nos dois eixos, com as colunas deslocadas
   verticalmente entre si para o creme aparecer entre as telas.
6. Se o usuário colou as imagens no chat em vez de dar arquivos, elas **não**
   chegam ao disco. Gere placeholders com os nomes finais (PIL, fundo escuro,
   borda laranja, texto `PLACEHOLDER` + rótulo + dimensão) e avise que ele
   precisa sobrescrever os arquivos.
7. Screenshot de sistema real vem com dado de pessoa de verdade: nome, telefone,
   e-mail, data de nascimento. Não publique e não borre a tela inteira, porque
   uma tabela borrada não mostra design nenhum. Redesenhe o texto:

   - a fonte dessas telas é Lato (`/usr/share/fonts/truetype/lato/`). Calibre
     antes de escrever: meça a largura em pixels do texto original e ache o par
     peso/corpo do Lato que chega mais perto. Nas telas do pilates deu
     `Bold 14` para nome de tabela, `Medium 13` para card, `Bold 16` para nome
     em lista de painel e `Regular 13` para texto secundário
   - para cada trecho, pegue uma caixa de busca que contenha só aquele texto.
     O fundo é a cor mais frequente da caixa, a cor da fonte é o pixel mais
     distante do fundo, e a posição vem do bbox da tinta. Assim funciona em
     card colorido e em linha de tabela sem escrever cor na mão
   - alinhe pelo bbox: desenhe em `bbox.left - fnt.getbbox(antigo)[0]` e
     `bbox.bottom - fnt.getbbox(antigo)[3]`. Cai no mesmo lugar do original,
     com a mesma linha de base. Se o texto novo for mais largo e houver algo à
     direita, alinhe pela direita em vez da esquerda
   - use um mapa de nome antigo para nome novo, único para todas as telas. A
     mesma aluna aparece na agenda e no cadastro, e trocar por nomes diferentes
     em cada tela entrega a fraude. Mantenha acento, mantenha a ordem
     alfabética se a tela estiver ordenada, e mantenha o formato do campo
   - o nome do cliente pode ficar, o nome de terceiro não. Pergunte antes.
     Usuário logado troque pelo nome dele
   - `identify` e `convert` não existem nessa máquina, e não há `numpy`. É PIL
     puro. Confira cada tela com um recorte ampliado em 3x ou 4x antes de
     instalar, é onde aparece peso errado e retângulo de apagar sobrando
   - guarde os originais em `_originais/<slug>/` na raiz do repo, fora de
     `public/`, em vez de apagar, e diga ao usuário que a pasta existe. Tudo
     que está em `public/` vai para o build e fica acessível na URL
8. Quando ele largar os arquivos na pasta, confira um por um antes de renomear.
   Vem screenshot que não é do projeto no meio do lote. O que não for do case,
   tire da pasta em vez de apagar, e diga onde foi parar.

## Passo 2: entrada no `cases.ts`

Adicione um objeto ao array `cases`. **A posição no array é a ordem do card na
home**, dentro do grupo dele. Campos do tipo `Case`:

| Campo | Obrigatório | O que faz |
|---|---|---|
| `slug` | sim | URL `/projects/<slug>` e pasta padrão das imagens |
| `name` | sim | `<h1>` do case, `<h3>` do card e base do `<title>` (montado por `caseTitle`) |
| `prefix` | sim | prefixo de todas as chaves do case no `dict.ts` |
| `card` | sim | prefixo das chaves do card (`pN.tag`, `pN.metric`) |
| `imgDir` | não | pasta em `/assets/img/` quando não é o slug (o `follow-me` usa `hackathon-unimar`) |
| `fill` | sim | cor do case: card, tiles de link, CTA, barra de leitura e o "próximo projeto" que aponta para ele |
| `group` | sim | `"games"`, `"systems"`, `"sites"` ou `"protos"`: seção e filtro da home |
| `size` | não | `"wide"` ocupa 2 das 4 colunas da grade, `"xwide"` ocupa 3. Sem `size`, 1 coluna |
| `shotArt` | não | o `card.webp` é arte com fundo transparente: encosta no canto inferior direito em altura cheia, sem máscara, em vez de cobrir o card como screenshot (só o Chinela) |
| `year` | sim | valor do quarto fato (`f4`, "Ano") |
| `description` | sim | meta description e og:description, em PT |
| `hero` | não | `[largura, altura]` do `hero.png` quando não é 1920×1080 |
| `galleries` | sim | lista de galerias, cada uma `{ cols?, shots }`. `shots` são os arquivos da pasta. Pode ser `[]` (Owna) |
| `earlyGallery` | não | `true` põe a 1ª galeria entre "O contexto" e "O processo"; o padrão é todas depois do processo |
| `links` | não | hrefs que viram tiles `.kpi` no fim do bloco de resultado; rótulos `l1..lN` |
| `cta` | não | `true` põe um botão no cabeçalho com `links[0]` e rótulo `l1`. Exige `links` |
| `plainLinks` | não | `true` tira a seta dos tiles e do CTA (só o Chinela) |
| `next` | sim | slug do case que aparece em "Próximo projeto" no rodapé |
| `mascote` | não | `{ img, audio, delay }`: a gata que mia no canto (só o Chinela). Não use sem pedido |

Regras da galeria:

- 2 ou 3 grupos, cada um com seu rótulo explicando o recorte do grupo
- sem `cols` a grade abre em 5 colunas no desktop. Grupo com 2, 3 ou 4 telas
  deixa coluna vazia à direita, então ponha `cols: 2 | 3 | 4` para a linha
  fechar cheia. Grupo de 1 imagem só, sem `cols`
- no máximo 4 galerias (rótulos `ga` a `gd`)

### Grade da home

Cada grupo tem sua grade de 4 colunas. Some as larguras dos cards do grupo
(1, `wide` = 2, `xwide` = 3) e ajuste `size` para fechar linhas cheias, sem
sobra pendurada. Mexer no `size` de outro case do grupo é permitido.

### Corrente do "próximo projeto"

Os `next` formam um ciclo fechado que passa por todos os cases. Encaixe o novo
em um ponto: escolha o case `A` que vai apontar para ele, copie o `next` de `A`
para o novo e troque o `next` de `A` para o slug novo. Se esquecer de mexer em
`A`, o case novo fica fora do ciclo; se apontar para slug que não existe, a
página quebra. Para ver a corrente:

```bash
grep -oE 'slug: "[^"]*"|next: "[^"]*"' app/data/cases.ts
```

### Jogo

Se o case for jogo publicado, pergunte se ele entra no `/jogos`. Se sim,
adicione em `app/data/games.ts` (`slug`, link principal `play`, `cta` e os
chips de itch/GitHub). Nome, cor, thumb e textos vêm do case.

## Passo 3: textos PT e EN

No `app/i18n/dict.ts`, adicione um bloco `/* ---- case Nome ---- */` depois do
último bloco de case, dentro de `pt:` e de `en:`. Mesmas chaves nos dois, na
mesma ordem. Chaves que o gabarito usa (`<pfx>` é o `prefix`):

```
<pfx>.title                         nome no card "Próximo projeto" de quem aponta para ele
<pfx>.kicker <pfx>.sub              etiqueta e subtítulo do cabeçalho
<pfx>.f1 <pfx>.f2 <pfx>.f3 <pfx>.f4 rótulos dos fatos (Cliente, Papel, Escopo, Ano)
<pfx>.v1 <pfx>.v2 <pfx>.v3          valores dos três primeiros fatos (o do Ano é `year`)
<pfx>.heroAlt                       alt da capa
<pfx>.h1 <pfx>.c1                   contexto   (c* aceita HTML: <p>, <ul>, <i>)
<pfx>.h2 <pfx>.c2                   processo
<pfx>.h3 <pfx>.c3                   resultado
<pfx>.ga <pfx>.gb [<pfx>.gc <pfx>.gd]  rótulo de cada galeria, na ordem do array
<pfx>.g1..gN                        alt e legenda de cada tela, numeração contínua
                                    entre as galerias (a 2ª galeria continua do g4, não do g1)
<pfx>.l1..lN                        rótulo de cada link, na ordem de `links` (l1 também é o CTA)
pN.tag pN.metric                    etiqueta e frase do card na home e no /jogos
```

`pN.sub`, `<pfx>.next` e `<pfx>.work` existem em cases antigos mas não são
lidos por nada; não precisa criar. O total de cases e a etiqueta "NN cases"
são calculados, não há chave para atualizar.

Cuidados:

- o valor é injetado como HTML: `&` vira `&amp;`
- o `kicker` segue a numeração dos cases: `Case 17 · 2021`. Pegue o maior
  número com `grep -o 'Case [0-9]*' app/i18n/dict.ts | sort -V | tail -1`
- rótulo de link costuma terminar em `↗` quando vai para fora (veja `chinela.l1`)

### Como escrever a prosa

O tom do portfólio é primeira pessoa, seco, sem adjetivo de vendedor.

- **Nunca use travessão (—) na prosa.** Vira frase com cara de IA. Use vírgula,
  dois-pontos ou ponto.
- Contexto: qual era a situação e a pergunta que o cliente fez. Uma tensão real,
  não "o cliente queria modernizar".
- Processo: as decisões, na ordem em que foram tomadas, com o motivo de cada uma.
  É a parte mais longa, 3 a 4 parágrafos.
- Resultado: o que foi entregue de fato, uma `<ul>` de 3 a 4 itens concretos, e
  um parágrafo final honesto. Se parou no protótipo, escreva que parou no
  protótipo.
- **Não invente número.** Sem métrica confirmada pelo usuário, descreva a
  decisão de design em vez de fabricar um percentual. Se um dado for suposição
  (ano, papel, se foi para produção), avise o usuário no fim em vez de deixar
  passar como fato.
- **Não invente conteúdo.** Só o que o usuário contou e o que as imagens
  mostram. Legenda descreve a tela que está na imagem.
- O EN é tradução do mesmo conteúdo, não um texto novo, e também sem travessão.
- A `description` do `cases.ts` segue as mesmas regras.

## Passo 4: conferir

```bash
npm run typecheck
npm run build      # falha listando as chaves que faltam em PT ou EN
npm run preview    # serve build/client; abra / e /projects/<slug>
```

O `react-router.config.ts` confere, para cada case, todas as chaves do Passo 3
(galerias, legendas e links contados a partir do `cases.ts`) em PT e EN, e
derruba `dev`, `typecheck` e `build` se faltar alguma.

Checklist:

- [ ] `typecheck` e `build` passam
- [ ] nenhuma imagem faltando (aba Network sem 404): hero, og, card e telas
- [ ] tema claro e escuro, e o toggle EN, sem `—` sobrando na tela
- [ ] a grade do grupo na home fecha as linhas em desktop, tablet e mobile
- [ ] nenhum travessão na prosa PT ou EN
- [ ] o "Próximo projeto" do case anterior abre o novo, e o do novo segue o ciclo

Feche relatando o que foi suposto e o que o usuário ainda precisa fornecer.
