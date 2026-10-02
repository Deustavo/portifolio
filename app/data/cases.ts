// Os 16 cases, na ordem dos cards da home. Textos ficam no dict.ts sob `prefix`:
// kicker, sub, f1-f3/v1-v3 (f4 é o ano), heroAlt, h1-h3/c1-c3, ga/gb/gc/gd (rótulo da
// galeria), g1..gN (alt e legenda, numeração contínua entre galerias), l1..lN (links), title.
// O card da home usa `${card}.tag` e `${card}.metric`.
export type Group = "games" | "systems" | "sites" | "protos";

export type Case = {
  slug: string; // URL /projects/<slug>
  name: string; // h1 e card
  prefix: string; // prefixo i18n
  card: string; // prefixo i18n do card na home: "p1", "p12"...
  imgDir?: string; // pasta em /assets/img/; padrão = slug (follow-me usa hackathon-unimar)
  fill: string; // cor do case: card, kpis, cta, ReadBar, "next" do anterior
  group: Group;
  size?: "wide" | "xwide";
  shotArt?: boolean;
  year: string; // fato "Ano"
  description: string; // meta description PT; title = `${name} — Gustavo Andrade`, og:image = imgDir/og.jpg
  hero?: [number, number]; // width/height do hero.png; padrão 1920x1080
  galleries: { cols?: 2 | 3 | 4; shots: string[] }[];
  earlyGallery?: true; // a 1ª galeria vem antes do bloco "O processo" (h2)
  links?: string[]; // hrefs dos .kpi no bloco "O resultado", rótulos l1..lN
  cta?: true; // .head__cta com links[0] e rótulo l1
  plainLinks?: true; // cta e kpis sem a seta "ar ar-out" (só Chinela)
  next: string; // slug do próximo case
  mascote?: { img: string; audio: string; delay: number };
};

export const cases: Case[] = [
  {
    slug: "jogo-chinela-destroyer",
    name: "Chinela Destroyer",
    prefix: "chinela",
    card: "p12",
    fill: "var(--c2)",
    group: "games",
    size: "xwide",
    shotArt: true,
    year: "2026",
    description: "Meu primeiro jogo, feito sozinho de ponta a ponta: desenhei os sprites e programei tudo em Phaser. As personagens são as minhas gatas, Chinela e Pera.",
    galleries: [
      { cols: 4, shots: ["carregando.png", "menu.png", "partida.png", "fim-de-jogo.png"] },
      { cols: 3, shots: ["loja-de-itens.png", "conquistas.png", "ranking.png"] },
    ],
    earlyGallery: true,
    links: ["https://chinela-destroyer.vercel.app/", "https://deustavo.itch.io/chinela-destroyer", "https://github.com/Deustavo/chinela-destroyer"],
    cta: true,
    plainLinks: true,
    next: "demon-arena",
    mascote: { img: "/assets/img/jogo-chinela-destroyer/chinela.png", audio: "/assets/audio/miado1.mp3", delay: 3000 },
  },
  {
    slug: "demon-arena",
    name: "Demon Arena",
    prefix: "demon",
    card: "p19",
    fill: "var(--c15)",
    group: "games",
    year: "2026",
    description: "Jogo online de navegador: horda cooperativa de 1 a 4 jogadores defendendo uma base, em campanha de oito fases. Canvas puro no cliente, servidor autoritativo em Node com WebSocket.",
    hero: [1917, 957],
    galleries: [
      { cols: 2, shots: ["acampamento.png", "mapa-da-campanha.png"] },
      { cols: 2, shots: ["sala-de-espera.png", "partida.png"] },
    ],
    links: ["https://demonarena.vercel.app/"],
    cta: true,
    next: "pergunte-ao-polvo",
  },
  {
    slug: "metrics",
    name: "Metrics",
    prefix: "vsm",
    card: "p14",
    fill: "var(--c10)",
    group: "systems",
    size: "wide",
    year: "2026",
    description: "Projeto pessoal para acompanhar streams do YouTube, da Twitch e da Kick ao mesmo tempo, com coleta em tempo real e relatório de audiência por evento.",
    galleries: [
      { cols: 3, shots: ["landing.png", "grupos.png", "grupo-streams.png"] },
      { cols: 3, shots: ["relatorio-resumo.png", "relatorio-distribuicao.png", "relatorio-insights.png"] },
    ],
    earlyGallery: true,
    links: ["https://visualstreammetrics.vercel.app/"],
    cta: true,
    next: "greeimage",
  },
  {
    slug: "ricochet-360",
    name: "Ricochet360",
    prefix: "r360",
    card: "p10",
    fill: "var(--c5)",
    group: "systems",
    year: "2026",
    description: "Reescrita do CRM e do discador do Ricochet360, o sistema em que o agente de vendas passa o dia ligando, anotando e mudando o status do lead.",
    galleries: [
      { shots: ["sistema-legado.png"] },
      { cols: 2, shots: ["dashboard-chamadas.png", "lead-management.png"] },
    ],
    earlyGallery: true,
    next: "site-dentista",
  },
  {
    slug: "tray-central-do-cliente",
    name: "Central do cliente",
    prefix: "cdc",
    card: "p8",
    fill: "var(--c7)",
    group: "systems",
    year: "2023",
    description: "Front-end da Central do cliente da Tray, onde o comprador de uma loja acompanha o status do pedido e gerencia o próprio cadastro.",
    galleries: [
      { cols: 3, shots: ["minha-conta.png", "meus-pedidos.png", "detalhe-do-pedido.png"] },
    ],
    next: "tray-loja-de-aplicativos",
  },
  {
    slug: "sistema-pilates",
    name: "MC Blessed Pilates",
    prefix: "mcb",
    card: "p13",
    fill: "var(--c9)",
    group: "systems",
    year: "2026",
    description: "Sistema de gestão de um estúdio de pilates: cadastro de alunos, agenda semanal de aulas e controle financeiro. Produto, design e desenvolvimento em Nuxt 3 com SQLite.",
    galleries: [
      { shots: ["painel.png"] },
      { cols: 2, shots: ["agenda-semanal.png", "alunos.png"] },
    ],
    earlyGallery: true,
    next: "metrics",
  },
  {
    slug: "owna",
    name: "Owna",
    prefix: "owna",
    card: "p7",
    fill: "var(--c6)",
    group: "systems",
    year: "2022",
    description: "Front-end em React de uma plataforma de registro autoral que grava a autoria de cada obra na blockchain e devolve um certificado verificável.",
    galleries: [],
    next: "tray-central-do-cliente",
  },
  {
    slug: "radar-governamental",
    name: "Radar Governamental",
    prefix: "radar",
    card: "p16",
    fill: "var(--c12)",
    group: "systems",
    size: "wide",
    year: "2021",
    description: "Protótipo e front-end do painel de operação do Radar Governamental: cadastro de radares de monitoramento e a ficha de cada casa legislativa.",
    galleries: [
      { shots: ["radares.png"] },
      { cols: 2, shots: ["casa-visao-geral.png", "casa-setores.png"] },
    ],
    next: "follow-me",
  },
  {
    slug: "site-dentista",
    name: "Lírios Odontologia",
    prefix: "lirios",
    card: "p11",
    fill: "var(--c4)",
    group: "sites",
    size: "xwide",
    year: "2026",
    description: "Site da clínica Lírios Odontologia, em São Paulo. Freelance de ponta a ponta: desenho das telas, front-end em Nuxt, textos e publicação.",
    galleries: [
      { shots: ["home.png"] },
      { cols: 2, shots: ["resultados-em-video.png", "faq-e-contato.png"] },
    ],
    earlyGallery: true,
    next: "jogo-chinela-destroyer",
  },
  {
    slug: "tray-loja-de-aplicativos",
    name: "Loja de aplicativos",
    prefix: "lapp",
    card: "p9",
    fill: "var(--c8)",
    group: "sites",
    year: "2024",
    description: "Front-end da Loja de aplicativos da Tray Commerce, catálogo dos apps que o lojista instala no painel e na loja, feito em Nuxt com renderização no servidor.",
    galleries: [
      { cols: 2, shots: ["home.png", "colecao-mais-instalados.png"] },
      { cols: 2, shots: ["categoria-pos-vendas.png", "detalhe-do-aplicativo.png"] },
    ],
    next: "ricochet-360",
  },
  {
    slug: "life-site",
    name: "Life Site",
    prefix: "lsite",
    card: "p6",
    fill: "var(--c3)",
    group: "sites",
    year: "2021",
    description: "Redesenho do site institucional da Life Tecnologia, com seis públicos como primeiro nível de navegação.",
    galleries: [
      { cols: 3, shots: ["home.png", "menu-servicos.png", "empresa.png"] },
      { cols: 4, shots: ["internet-fixa.png", "celular.png", "guard.png", "game-station.png"] },
    ],
    next: "owna",
  },
  {
    slug: "pergunte-ao-polvo",
    name: "Pergunte ao Polvo",
    prefix: "polvo",
    card: "p20",
    fill: "var(--c16)",
    group: "sites",
    size: "xwide",
    year: "2024",
    description: "Recriação de um site que saiu do ar: uma página só, duas opções, e um polvo que decide por você. Nuxt 3 com Vue, TypeScript e SCSS, com temas que trocam sozinhos pela data do calendário.",
    galleries: [
      { cols: 2, shots: ["resultado.png", "polvo-real.png"] },
      { cols: 4, shots: ["evento-halloween.png", "evento-natal.png", "evento-carnaval.png", "evento-primeiro-de-abril.png"] },
    ],
    links: ["https://pergunteaopolvo.com/", "https://github.com/Deustavo/Pergunte-ao-polvo"],
    cta: true,
    next: "sistema-pilates",
  },
  {
    slug: "life-guard",
    name: "Life Guard",
    prefix: "lg",
    card: "p1",
    fill: "var(--c1)",
    group: "protos",
    year: "2021",
    description: "Protótipo do app que conecta as câmeras de segurança da Life Tecnologia ao celular do cliente.",
    galleries: [
      { shots: ["splash.png", "aviso-wifi.png", "login.png", "verificacao.png", "perfis.png"] },
      { shots: ["home.png", "player-ao-vivo.png", "player-gravacao.png", "menu.png"] },
      { shots: ["login-erro.png", "busca-vazia.png", "aguardando-instalacao.png", "usuarios.png", "editar-usuario.png"] },
    ],
    next: "life-site",
  },
  {
    slug: "follow-me",
    name: "Follow Me",
    prefix: "fme",
    card: "p17",
    imgDir: "hackathon-unimar",
    fill: "var(--c13)",
    group: "protos",
    size: "xwide",
    year: "2022",
    description: "Pesquisa e protótipo de um app que localiza pacientes dentro do hospital por pulseira RFID, feito no Hackathon Saúde da Unimar.",
    galleries: [
      { cols: 3, shots: ["pesquisa-visao.png", "pesquisa-objetivos.png", "pesquisa-e-nao-e.png", "pesquisa-how-might-we.png", "pesquisa-pulseiras-rfid.png", "pesquisa-arquitetura-rfid.png"] },
      { cols: 4, shots: ["visitante-abertura.png", "visitante-apresentacao.png", "visitante-nome.png", "visitante-adicionar-paciente.png"] },
      { cols: 3, shots: ["visitante-qr-code.png", "visitante-lista.png", "visitante-ficha.png"] },
      { cols: 3, shots: ["medico-login.png", "medico-sms.png", "medico-lista.png"] },
    ],
    next: "fabrica1",
  },
  {
    slug: "greeimage",
    name: "Greeimage",
    prefix: "gree",
    card: "p15",
    fill: "var(--c11)",
    group: "protos",
    size: "xwide",
    year: "2021",
    description: "Protótipo vencedor do NASA Space Apps Challenge em Marília: um sistema de apoio à decisão que mede área verde por habitante a partir de imagens aéreas.",
    galleries: [
      { cols: 3, shots: ["busca.png", "carregando-mapa.png", "mapa-gvi.png"] },
      { shots: ["sobre-ideacao.png"] },
    ],
    links: ["https://2021.spaceappschallenge.org/locations/marilia-sao-paulo/teams/"],
    next: "radar-governamental",
  },
  {
    slug: "fabrica1",
    name: "Fábrica 1",
    prefix: "fab",
    card: "p18",
    fill: "var(--c14)",
    group: "protos",
    year: "2021",
    description: "Protótipo de um app para recarregar o cartão de consumo do bar Fábrica 1 pelo celular, por aproximação, sem passar no caixa.",
    galleries: [
      { cols: 3, shots: ["abertura.png", "como-vai-ser-o-role.png", "cartoes.png"] },
      { cols: 3, shots: ["valor-vazio.png", "valor-teclado.png", "revisao.png"] },
      { cols: 4, shots: ["aproxime-cartao.png", "recarregando.png", "sucesso.png", "sucesso-saldo.png"] },
    ],
    next: "life-guard",
  },
];

export const caseBySlug = Object.fromEntries(cases.map((c) => [c.slug, c]));

export const imgDir = (c: Case) => `/assets/img/${c.imgDir ?? c.slug}`;

export const caseTitle = (c: Case) => `${c.name} — Gustavo Andrade`;

// substitui o counts.js: total (sem grupo) ou por grupo. O `{n}` dos textos é countBy().
export const countBy = (group?: Group) => cases.filter((c) => !group || c.group === group).length;

// etiqueta "06 cases" / "01 case" ao lado dos títulos
export const countLabel = (n: number, t: (k: string) => string) =>
  `${n < 10 ? "0" + n : n} ${t(n === 1 ? "work.caseOne" : "work.caseMany")}`;
