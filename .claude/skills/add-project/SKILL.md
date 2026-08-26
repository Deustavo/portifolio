---
name: add-project
description: Adiciona um novo case ao portfólio seguindo o padrão do Life Guard. Use quando pedirem para "adicionar projeto", "criar case", "novo case no portfólio", "add project to portfolio" ou quando derem screenshots de um projeto para publicar.
---

# Adicionar um case ao portfólio

Todo case do portfólio é a mesma página com conteúdo trocado. Nada de CSS novo,
nada de layout novo. Se algo não couber nos blocos existentes, pare e pergunte
antes de inventar componente.

## Antes de escrever

Leia estes arquivos para pegar o padrão vigente (o Life Guard é a referência):

- `projects/life-guard.html` — gabarito da página de case
- `assets/i18n.js` — dicionário PT/EN, bloco `/* ---- case Life Guard ---- */`
- `index.html` — grade de cards da home
- `assets/case-bento.css` — classes disponíveis, não editar

Colete do usuário (pergunte o que faltar, não invente):

| Campo | Exemplo |
|---|---|
| slug | `life-site` (kebab-case, vira nome de arquivo e da pasta de imagens) |
| Nome exibido | `Life Site` |
| Cliente | `Life Tecnologia` |
| Papel | `UI & UX Design, prototipação` |
| Escopo | `Site institucional, 6 públicos` |
| Ano | `2021` |
| Prefixo i18n | `lsite` (curto, único, sem colidir com `lg`, `p1`…) |
| Cor de destaque | `--c1` a `--c5` ou `--ink`, uma ainda não usada por outro card |

## Passo 1 — imagens

1. `mkdir -p assets/img/<slug>`
2. Nomes em kebab-case descrevendo a tela, não `1.png`: `home.png`,
   `menu-servicos.png`, `internet-fixa.png`.
3. Screenshot de protótipo costuma vir com a moldura do Figma: margem cinza
   uniforme e o nome do frame em cima. Apare isso, a legenda da `figcaption` já
   diz o nome da tela. Receita: detecte a cor de fundo pelo pixel `(0,0)`,
   marque cada pixel diferente dela, e recorte pela primeira e última linha e
   coluna com mais de 50% de pixels marcados. O limiar de 50% pula a faixa do
   rótulo, porque texto fino ocupa pouco da largura.
4. `hero.png` é a capa, largura cheia em `aspect-ratio:16/7`, 1920×1080.
   Screenshot vertical direto na capa fica cortado. O padrão do portfólio é um
   mosaico inclinado, igual ao `assets/img/life-guard/hero.png`: telas em
   colunas contínuas sobre fundo creme `#f9e8d8`, cantos arredondados em 20px,
   sombra preta a 85 de alfa com desfoque gaussiano de 26, canvas grande girado
   `-12°` e recorte central de 1920×1080. Encha as colunas sem intervalo
   vertical, senão sobra um buraco creme no meio da capa.
5. Se o usuário colou as imagens no chat em vez de dar arquivos, elas **não**
   chegam ao disco. Gere placeholders com os nomes finais (PIL, fundo escuro,
   borda laranja, texto `PLACEHOLDER` + rótulo + dimensão) e avise que ele
   precisa sobrescrever os arquivos.
6. Quando ele largar os arquivos na pasta, confira um por um antes de renomear.
   Vem screenshot que não é do projeto no meio do lote. O que não for do case,
   tire da pasta em vez de apagar, e diga onde foi parar.

## Passo 2 — página do case

Copie `projects/life-guard.html` para `projects/<slug>.html` e troque:

- `<title>` e `<meta name="description">` (estáticos, em PT)
- `<h1>` com o nome exibido
- todo `lg.` pelo prefixo novo
- os caminhos `../assets/img/life-guard/` pela pasta nova
- a quantidade de `.fact`, de blocos `<section class="box">` de galeria e de
  `<figure class="shot">` conforme o material real

Regras do bloco de galeria:

- 2 ou 3 grupos, cada um com sua `.strip__lbl` explicando o recorte do grupo
- `.shots` sozinha abre em 5 colunas no desktop. Grupo com 3 ou 4 telas deixa
  coluna vazia à direita, então some `shots--3` ou `shots--4` na `div` para a
  linha fechar cheia. Grupo de 1 imagem só, não
- cada `figure` precisa de `loading="lazy"`, `data-i18n-attr="alt:<pfx>.gN"` e
  `<figcaption data-i18n="<pfx>.gN">`

## Passo 3 — textos PT e EN

No `assets/i18n.js`, adicione um bloco por idioma logo depois do último bloco de
case, dentro de `pt:` e de `en:`. Mesmas chaves nos dois, na mesma ordem:

```
<pfx>.title <pfx>.kicker <pfx>.sub
<pfx>.f1..f4 / <pfx>.v1..v3        rótulos e valores dos fatos
<pfx>.h1 <pfx>.c1                  contexto  (c* aceita HTML: <p>, <ul>, <i>)
<pfx>.h2 <pfx>.c2                  processo
<pfx>.h3 <pfx>.c3                  resultado
<pfx>.heroAlt
<pfx>.ga <pfx>.gb [<pfx>.gc]       rótulos dos grupos
<pfx>.g1..gN                       legenda de cada tela
```

Cuidados:

- `&` dentro de valor precisa ser `&amp;`, porque o valor é injetado como HTML
- o `kicker` segue a numeração dos cases: `Case 02 · 2021`
- ao inserir depois da última chave de um bloco, acrescente a vírgula que faltava

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
- O EN é tradução do mesmo conteúdo, não um texto novo, e também sem travessão.

## Passo 4 — card na home

Em `index.html`, dentro do `.bento` de projetos:

```html
<a class="box p-card wide" href="projects/<slug>.html" style="--fill:var(--cN)"><span class="tag" data-i18n="pK.tag">Rótulo</span>
  <span><h3>Nome</h3><p data-i18n="pK.metric">Uma linha concreta</p><span class="p-card__go"><i data-i18n="p.more">Ver case</i> <span>→</span></span></span></a>
```

- `pK` é o próximo índice livre de projeto no `i18n.js` (`p6`, `p7`…); adicione
  `pK.sub`, `pK.tag` e `pK.metric` em PT e EN
- a grade tem 4 colunas. `wide` ocupa 2. Some as larguras de todos os cards e
  ajuste quem é `wide` para fechar linhas cheias, sem sobra pendurada
- atualize `work.count` (`"05 cases"` → `"06 cases"`) nos dois idiomas

## Passo 5 — corrente de navegação

O rodapé de cada case aponta para o próximo, em ciclo fechado. Encaixe o case
novo em um ponto da corrente: altere o `.box next` do case anterior para apontar
ao novo (`href`, `--fill` e `data-i18n` do título) e faça o novo apontar para
quem o anterior apontava.

```bash
grep -n 'class="box next"' -A3 projects/*.html
```

## Passo 6 — conferir

```bash
node --check assets/i18n.js
python3 -m http.server 8000   # abra /index.html e /projects/<slug>.html
```

Checklist:

- [ ] `node --check` passa no `i18n.js`
- [ ] toda chave `data-i18n` da página nova existe em `pt` **e** em `en`
- [ ] nenhuma imagem faltando (aba Network sem 404)
- [ ] tema claro e escuro, e o toggle EN, sem `—` sobrando na tela
- [ ] a grade da home fecha as linhas em desktop, tablet e mobile
- [ ] nenhum travessão na prosa PT ou EN
- [ ] a corrente de "próximo projeto" continua fechando o ciclo

Feche relatando o que foi suposto e o que o usuário ainda precisa fornecer.
