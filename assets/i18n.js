/* =========================================================
   i18n compartilhado pelas duas direções.
   Idioma inicial: escolha salva > idioma do navegador > EN.
   Valores podem conter HTML (<br>, <span>).
   ========================================================= */
const DICT = {
  pt: {
    "doc.title":      "Gustavo Andrade — Product Design e Engenharia de Software",
    "doc.desc":       "Gustavo Andrade: UI & UX, front-end e engenharia de software em São Paulo. Interfaces claras, produtos com intenção.",
    "nav.work":       "Projetos",
    "nav.contact":    "Contato",

    "hero.status":    "Disponível para projetos · São Paulo, BR",
    "hero.statusShort":"● Disponível · São Paulo, BR",
    "hero.role":      "UI &amp; UX<br>Designer",
    "hero.roleInline":"UI &amp; UX Designer",
    "hero.roleLabel": "Atuação",
    "hero.roles":     "UI &amp; UX|Front-end Dev|Engenheiro de Software|Product Design",
    "hero.cue":       "Ver os projetos",
    "hero.bio":       "Design de produto e engenharia de software desde 2019. Gosto de problema mal definido: pesquiso, prototipo, corto até a interface ficar óbvia e depois construo.",
    "hero.bioShort":  "UI &amp; UX, front-end e engenharia de software. Desenho a interface e construo o código que a sustenta.",

    "stat.since":     "Desde 2019",
    "stat.sinceLbl":  "de prática",
    "stat.products":  "20+",
    "stat.productsLbl":"produtos entregues",
    "stat.awards":    "2×",
    "stat.awardsLbl": "vitórias em hackathon",
    "stat.edu":       "USP/Esalq",
    "stat.eduLbl":    "pós em Eng. de Software",
    "stat.city":      "SP",
    "stat.cityLbl":   "São Paulo, BR",
    "stat.inline":    "Desde 2019 · 20+ produtos<br>2× hackathon · Pós USP/Esalq",

    "work.title":     "Projetos selecionados",
    "work.count":     "06 cases",

    "contact.kicker": "Contato · resposta em 24h",
    "contact.cta":    "Vamos<br>conversar",
    "contact.ctaB":   "Bora<br><span>construir?</span>",

    "case.back":      "← Voltar",
    "case.label":     "Case",
    "case.client":    "Cliente",
    "case.role":      "Papel",
    "case.scope":     "Escopo",
    "case.year":      "Ano",
    "case.context":   "O contexto",
    "case.process":   "O processo",
    "case.result":    "O resultado",
    "case.next":      "Próximo projeto",
    "case.cta":       "Trabalhar juntos →",

    "foot.rights":    "© 2026 Gustavo Andrade",
    "foot.b":         "Outline 2px · preenche no hover",

    /* projetos — 01 e 06 reais, 02–05 ainda placeholder */
    "p1.sub": "Segurança · App iOS/Android · 2021", "p1.tag": "Segurança",
    "p1.metric": "Protótipo de 14 telas para a Life Tecnologia",
    "p2.sub": "Saúde · UX Research · 2025",        "p2.tag": "Saúde",
    "p3.sub": "Marca · Site institucional · 2024", "p3.tag": "Marca",
    "p4.sub": "Marketplace · E-commerce · 2023",   "p4.tag": "Marketplace",
    "p5.sub": "Design System · B2B · 2022",        "p5.tag": "Design System",
    "p6.sub": "Site institucional · Multi-público · 2021", "p6.tag": "Institucional",
    "p6.metric": "Um catálogo de 8 serviços em 3 gabaritos",
    "p.more": "Ver case",

    /* ---- case Life Guard ---- */
    "lg.title": "Life Guard",
    "lg.kicker": "Case 01 · 2021",
    "lg.sub":    "Protótipo de um app para a Life Tecnologia, onde o cliente vê no celular as câmeras de segurança instaladas na casa dele.",
    "lg.f1": "Cliente",  "lg.v1": "Life Tecnologia",
    "lg.f2": "Papel",    "lg.v2": "UI &amp; UX Design, prototipação",
    "lg.f3": "Escopo",   "lg.v3": "App iOS + Android, 14 telas",
    "lg.f4": "Ano",
    "lg.h1": "O contexto",
    "lg.c1": "<p>A Life Tecnologia vende internet e instala câmeras de segurança na casa do cliente. O equipamento era bom. O jeito de olhar para ele, não. Quem comprava recebia o software genérico do fabricante, com login por e-mail e senha, menu em inglês e nenhuma cara da marca que vendeu.</p><p>Isso virava ligação na central de atendimento, e o motivo mais comum era sempre o mesmo: <i>não consigo ver minha câmera</i>. Me chamaram para responder uma pergunta. Dá para ter um app da Life onde o cliente entra com o número que já está no cadastro e vê a casa dele na primeira tela?</p>",
    "lg.h2": "O processo",
    "lg.c2": "<p>Comecei pelo caminho mais curto entre abrir o app e ver a sala de estar. Todo o resto foi desenhado em volta disso.</p><p>A entrada é por celular e código de validação. Não tem senha para criar nem para esquecer. Logo depois vem a tela de perfil, porque a assinatura é da casa e não de uma pessoa. Marido, esposa e filho precisavam de acessos separados sem virar três contas.</p><p>A home é a lista de câmeras, com o nome do cômodo no lugar do número do canal. O player abre ao vivo e chega na gravação por data em um toque. No menu da conta juntei o que antes era ligação: gerenciar usuários, alterar plano, relatar problema, falar com a central.</p><p>O que deu mais trabalho foram os estados que costumam ficar de fora. Número não registrado, busca sem resultado e o caso mais comum na operação da Life, que é o cliente já assinante mas ainda na fila de instalação. Em vez de uma home vazia, que parece defeito, uma tela dizendo o que está acontecendo e que pode levar alguns dias.</p><p>A interface é escura porque o conteúdo é vídeo. Com o fundo escuro, a imagem da câmera fica sendo a coisa mais clara da tela. O laranja da marca ficou só para ação: botão principal, link, item ativo.</p>",
    "lg.h3": "O resultado",
    "lg.c3": "<p>A entrega foi o protótipo navegável. São 14 telas, do splash até a edição de um usuário, com os caminhos de erro e os estados vazios já resolvidos. Normalmente essas decisões sobram para a fase de desenvolvimento, onde custam bem mais caro.</p><ul><li>Entrada sem senha: celular e código de validação</li><li>Perfis múltiplos por assinatura, sem multiplicar contas</li><li>Estados de erro, busca vazia e pré-instalação desenhados</li><li>Componentes e espaçamentos pensados para virar React Native direto</li></ul><p>O projeto parou no protótipo. Como protótipo, funcionou: a Life ficou com uma versão concreta do produto para discutir escopo, esforço e presença de marca, no lugar de uma descrição no papel.</p>",
    "lg.heroAlt": "Telas do Life Guard sobre o laranja da marca",
    "lg.ga": "Entrada: do splash ao perfil",
    "lg.gb": "Uso diário: câmeras, player e conta",
    "lg.gc": "Estados e gestão: o que costuma faltar",
    "lg.g1":  "Splash",
    "lg.g2":  "Aviso de Wi-Fi",
    "lg.g3":  "Entrada por celular",
    "lg.g4":  "Código de validação",
    "lg.g5":  "Quem está acessando",
    "lg.g6":  "Lista de câmeras",
    "lg.g7":  "Player ao vivo",
    "lg.g8":  "Gravação por data",
    "lg.g9":  "Menu da conta",
    "lg.g10": "Número não registrado",
    "lg.g11": "Busca sem resultado",
    "lg.g12": "Aguardando instalação",
    "lg.g13": "Gerenciar usuários",
    "lg.g14": "Editar usuário",
    "lg.next": "Próximo projeto",
    "lg.work": "Trabalhar juntos →",

    /* ---- case Life Site ---- */
    "lsite.title": "Life Site",
    "lsite.kicker": "Case 02 · 2021",
    "lsite.sub":    "Redesenho do site da Life Tecnologia, uma empresa que vende internet, câmera, telefonia e TV para seis públicos diferentes na mesma vitrine.",
    "lsite.f1": "Cliente",  "lsite.v1": "Life Tecnologia",
    "lsite.f2": "Papel",    "lsite.v2": "UI &amp; UX Design, prototipação",
    "lsite.f3": "Escopo",   "lsite.v3": "Site institucional, 6 públicos",
    "lsite.f4": "Ano",
    "lsite.h1": "O contexto",
    "lsite.c1": "<p>A Life vende mais coisa do que cabe em um menu. Internet fixa, internet móvel, telefonia, HDTV, câmera, rede interna, marketplace e serviços de TI. E vende tudo isso para seis públicos que não se parecem: casa, condomínio, empresa, fazenda, cidade e outros provedores que revendem o link dela.</p><p>O site tratava todo mundo igual. Quem entrava caía numa lista de produtos sem saber qual metade daquilo era para ele. O time comercial resolvia isso no telefone, explicando de novo o que o site já deveria ter dito.</p><p>A pergunta era fácil de formular e chata de resolver: como uma home só recebe o dono de casa procurando 100 mega e o provedor procurando link dedicado, sem parecer duas empresas?</p>",
    "lsite.h2": "O processo",
    "lsite.c2": "<p>A primeira decisão foi tirar o público do menu de produtos e colocá-lo acima dele. Nasceu a faixa superior com os seis destinos: para sua casa, para sua cidade, para seu ISP, para sua empresa, para seu condomínio, para sua fazenda. Ela é a primeira coisa da página e não sai da tela.</p><p>Abaixo dela o site inteiro muda de assunto. Escolhido o público, a home mostra os serviços daquele público em uma grade de ícones, com o item ativo em laranja, e depois os planos de fibra em cartões onde a velocidade é a informação maior e o preço vem em segundo lugar. Foi o inverso do que estava lá antes, que abria pelo preço.</p><p>As páginas de produto ganharam um gabarito único: título com a palavra-chave em laranja, um parágrafo, uma citação, a imagem do produto sobre uma forma orgânica laranja, o bloco de vantagens e um botão. Internet fixa, celular, Life Guard e Game Station são a mesma página com o conteúdo trocado. Isso era o ponto: a Life lança produto com frequência e precisava de uma página que o time montasse sem me chamar.</p><p>A parte empresarial pedia densidade em vez de vitrine. Ali os planos viram uma grade de oito cartões com dois destaques em escuro, e o rodapé assume o papel de mapa do site, porque no B2B a pessoa sabe o nome do que quer e só precisa do caminho.</p>",
    "lsite.h3": "O resultado",
    "lsite.c3": "<p>A entrega foi o protótipo navegável do site, com a home dos públicos, as páginas de produto, a área empresarial e os menus abertos.</p><ul><li>Seis públicos como primeiro nível de navegação, acima dos produtos</li><li>Um gabarito de página de produto que serve para o catálogo todo</li><li>Cartão de plano com hierarquia de velocidade, e não de preço</li><li>Rodapé como mapa do site, com os oito serviços listados</li></ul><p>O valor do projeto não estava em nenhuma tela isolada, estava em reduzir um catálogo grande a três gabaritos. Depois disso, produto novo na Life passou a ser conteúdo novo, e não página nova.</p>",
    "lsite.heroAlt": "Home do site da Life com a faixa de públicos e os planos de fibra",
    "lsite.ga": "A home e os públicos",
    "lsite.gb": "Um gabarito, quatro produtos",
    "lsite.g1": "Página inicial",
    "lsite.g2": "Menu de serviços",
    "lsite.g3": "Área empresarial",
    "lsite.g4": "Internet fixa",
    "lsite.g5": "Celular",
    "lsite.g6": "Life Guard",
    "lsite.g7": "Game Station"
  },
  en: {
    "doc.title":      "Gustavo Andrade — Product Design & Software Engineering",
    "doc.desc":       "Gustavo Andrade: UI & UX, front-end and software engineering, based in São Paulo. Clear interfaces, products with intent.",
    "nav.work":       "Work",
    "nav.contact":    "Contact",

    "hero.status":    "Available for projects · São Paulo, BR",
    "hero.statusShort":"● Available · São Paulo, BR",
    "hero.role":      "UI &amp; UX<br>Designer",
    "hero.roleInline":"UI &amp; UX Designer",
    "hero.roleLabel": "Focus",
    "hero.roles":     "UI &amp; UX|Front-end Dev|Software Engineer|Product Design",
    "hero.cue":       "See the projects",
    "hero.bio":       "Product design and software engineering since 2019. I like badly defined problems: I research, prototype, cut until the interface becomes obvious, then build it.",
    "hero.bioShort":  "UI &amp; UX, front-end and software engineering. I design the interface and build the code behind it.",

    "stat.since":     "Since 2019",
    "stat.sinceLbl":  "in practice",
    "stat.products":  "20+",
    "stat.productsLbl":"products shipped",
    "stat.awards":    "2×",
    "stat.awardsLbl": "hackathon wins",
    "stat.edu":       "USP/Esalq",
    "stat.eduLbl":    "postgrad, Software Eng.",
    "stat.city":      "SP",
    "stat.cityLbl":   "São Paulo, Brazil",
    "stat.inline":    "Since 2019 · 20+ products<br>2× hackathon · USP/Esalq postgrad",

    "work.title":     "Selected work",
    "work.count":     "06 cases",

    "contact.kicker": "Contact · reply within 24h",
    "contact.cta":    "Let's<br>talk",
    "contact.ctaB":   "Let's<br><span>build it?</span>",

    "case.back":      "← Voltar",
    "case.label":     "Case",
    "case.client":    "Cliente",
    "case.role":      "Papel",
    "case.scope":     "Escopo",
    "case.year":      "Ano",
    "case.context":   "O contexto",
    "case.process":   "O processo",
    "case.result":    "O resultado",
    "case.next":      "Próximo projeto",
    "case.cta":       "Trabalhar juntos →",

    "case.back":      "← Back",
    "case.label":     "Case",
    "case.client":    "Client",
    "case.role":      "Role",
    "case.scope":     "Scope",
    "case.year":      "Year",
    "case.context":   "The context",
    "case.process":   "The process",
    "case.result":    "The outcome",
    "case.next":      "Next project",
    "case.cta":       "Let's work together →",

    "foot.rights":    "© 2026 Gustavo Andrade",
    "foot.b":         "2px outline · fills on hover",

    "p1.sub": "Security · iOS/Android app · 2021", "p1.tag": "Security",
    "p1.metric": "14-screen prototype for Life Tecnologia",
    "p2.sub": "Health · UX Research · 2025",      "p2.tag": "Health",
    "p3.sub": "Brand · Website · 2024",           "p3.tag": "Brand",
    "p4.sub": "Marketplace · E-commerce · 2023",  "p4.tag": "Marketplace",
    "p5.sub": "Design System · B2B · 2022",       "p5.tag": "Design System",
    "p6.sub": "Marketing site · Multi-audience · 2021", "p6.tag": "Marketing site",
    "p6.metric": "An 8-service catalogue in 3 templates",
    "p.more": "View case",

    /* ---- Life Guard case ---- */
    "lg.title": "Life Guard",
    "lg.kicker": "Case 01 · 2021",
    "lg.sub":    "Prototype of an app for Life Tecnologia, where the client watches the security cameras installed in their home from their phone.",
    "lg.f1": "Client", "lg.v1": "Life Tecnologia",
    "lg.f2": "Role",   "lg.v2": "UI &amp; UX Design, prototyping",
    "lg.f3": "Scope",  "lg.v3": "iOS + Android app, 14 screens",
    "lg.f4": "Year",
    "lg.h1": "The context",
    "lg.c1": "<p>Life Tecnologia sells internet plans and installs security cameras in its clients' homes. The hardware was good. The way of looking at it was not. Buyers got the manufacturer's generic software, with email and password login, menus in English and no trace of the brand that sold it.</p><p>That turned into calls to the support desk, and the reason was almost always the same: <i>I can't see my camera</i>. They brought me in to answer one question. Could Life have its own app, where the client signs in with the number already on file and sees their house on the first screen?</p>",
    "lg.h2": "The process",
    "lg.c2": "<p>I started from the shortest path between opening the app and seeing the living room. Everything else was designed around that.</p><p>Sign-in is by phone number and a validation code. There is no password to create and none to forget. Right after comes the profile screen, because the subscription belongs to the household and not to one person. Parents and kids needed separate access without turning into three accounts.</p><p>The home screen is the camera list, labelled by room instead of by channel number. The player opens live and reaches recordings by date in one tap. In the account menu I gathered what used to be a phone call: manage users, change plan, report a problem, call support.</p><p>The hardest part was the states that usually get left out. Unregistered number, empty search results, and the most common case in Life's operation, the client who already subscribed but is still in the installation queue. Instead of an empty home screen, which reads like a bug, a screen that says what is going on and that it may take a few days.</p><p>The interface is dark because the content is video. Against a dark background, the camera image ends up being the brightest thing on screen. The brand orange was kept for action only: primary button, link, active item.</p>",
    "lg.h3": "The outcome",
    "lg.c3": "<p>The deliverable was the clickable prototype. Fourteen screens, from splash to editing a user, with error paths and empty states already resolved. Those decisions usually spill into development, where they cost a lot more.</p><ul><li>Passwordless entry: phone number and validation code</li><li>Multiple profiles per subscription, without multiplying accounts</li><li>Error, empty-search and pre-installation states designed</li><li>Components and spacing built to translate straight into React Native</li></ul><p>The project stopped at the prototype. As a prototype, it did its job: Life ended up with a concrete version of the product to argue scope, effort and brand presence over, instead of a description on paper.</p>",
    "lg.heroAlt": "Life Guard screens over the brand orange",
    "lg.ga": "Entry: from splash to profile",
    "lg.gb": "Daily use: cameras, player and account",
    "lg.gc": "States and management: what usually gets left out",
    "lg.g1":  "Splash",
    "lg.g2":  "Wi-Fi notice",
    "lg.g3":  "Sign in by phone",
    "lg.g4":  "Validation code",
    "lg.g5":  "Who's watching",
    "lg.g6":  "Camera list",
    "lg.g7":  "Live player",
    "lg.g8":  "Recording by date",
    "lg.g9":  "Account menu",
    "lg.g10": "Unregistered number",
    "lg.g11": "Empty search",
    "lg.g12": "Awaiting installation",
    "lg.g13": "Manage users",
    "lg.g14": "Edit user",
    "lg.next": "Next project",
    "lg.work": "Let's work together →",

    /* ---- case Life Site ---- */
    "lsite.title": "Life Site",
    "lsite.kicker": "Case 02 · 2021",
    "lsite.sub":    "Redesign of the Life Tecnologia website, a company selling internet, cameras, telephony and TV to six different audiences from the same storefront.",
    "lsite.f1": "Client", "lsite.v1": "Life Tecnologia",
    "lsite.f2": "Role",   "lsite.v2": "UI &amp; UX Design, prototyping",
    "lsite.f3": "Scope",  "lsite.v3": "Marketing site, 6 audiences",
    "lsite.f4": "Year",
    "lsite.h1": "The context",
    "lsite.c1": "<p>Life sells more than fits in a menu. Fixed internet, mobile internet, telephony, HDTV, cameras, in-home networking, a marketplace and IT services. And it sells all of that to six audiences that look nothing alike: homes, apartment buildings, businesses, farms, city governments and other providers who resell its backbone.</p><p>The site treated everyone the same. Visitors landed on a product list with no way to tell which half of it was meant for them. Sales fixed that on the phone, explaining again what the site should have said already.</p><p>The question was easy to state and tedious to solve: how does a single home page welcome the homeowner shopping for 100 mega and the provider shopping for a dedicated link, without looking like two companies?</p>",
    "lsite.h2": "The process",
    "lsite.c2": "<p>The first decision was to pull the audience out of the product menu and put it above it. That produced the top strip with six destinations: for your home, for your city, for your ISP, for your business, for your building, for your farm. It is the first thing on the page and it never leaves the screen.</p><p>Below it, the whole site changes subject. Once an audience is picked, the home page shows that audience's services in a grid of icons, with the active item in orange, followed by the fibre plans as cards where speed is the largest piece of information and price comes second. That inverted what was there before, which led with price.</p><p>Product pages got a single template: a headline with the key word in orange, one paragraph, a pull quote, the product image over an organic orange shape, the benefits block and a button. Fixed internet, mobile, Life Guard and Game Station are the same page with the content swapped. That was the point: Life ships products often and needed a page the team could assemble without calling me.</p><p>The business side asked for density instead of a storefront. There the plans become a grid of eight cards with two dark highlights, and the footer takes over as the sitemap, because in B2B people know the name of what they want and only need the path to it.</p>",
    "lsite.h3": "The outcome",
    "lsite.c3": "<p>The deliverable was the clickable prototype of the site, with the audience home page, the product pages, the business area and the open menus.</p><ul><li>Six audiences as the first level of navigation, above the products</li><li>One product-page template that covers the entire catalogue</li><li>Plan cards built around speed, not around price</li><li>Footer as sitemap, listing all eight services</li></ul><p>The value of the project was not in any single screen, it was in cutting a large catalogue down to three templates. After that, a new product at Life became new content instead of a new page.</p>",
    "lsite.heroAlt": "Life website home page with the audience strip and the fibre plans",
    "lsite.ga": "The home page and the audiences",
    "lsite.gb": "One template, four products",
    "lsite.g1": "Home page",
    "lsite.g2": "Services menu",
    "lsite.g3": "Business area",
    "lsite.g4": "Fixed internet",
    "lsite.g5": "Mobile",
    "lsite.g6": "Life Guard",
    "lsite.g7": "Game Station"
  }
};

/* funde o conteúdo dos cases, quando i18n-cases.js estiver carregado antes */
if (window.GA_CASES) {
  for (const lang of Object.keys(DICT)) {
    Object.assign(DICT[lang], window.GA_CASES[lang] || {});
  }
}

const STORE = "ga-lang";

function detect() {
  try {
    const saved = localStorage.getItem(STORE);
    if (saved === "pt" || saved === "en") return saved;
  } catch (e) { /* storage bloqueado */ }
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || "";
  return nav.toLowerCase().startsWith("pt") ? "pt" : "en";
}

function apply(lang) {
  const d = DICT[lang] || DICT.en;
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = d[el.dataset.i18n];
    if (v != null) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(el => {
    // formato: "attr:chave"
    el.dataset.i18nAttr.split(",").forEach(pair => {
      const [attr, key] = pair.split(":").map(s => s.trim());
      if (d[key] != null) el.setAttribute(attr, d[key].replace(/<[^>]+>/g, " "));
    });
  });

  const t = d["doc.title"];
  if (t) document.title = t;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && d["doc.desc"]) meta.setAttribute("content", d["doc.desc"]);

  document.querySelectorAll("[data-lang-toggle]").forEach(btn => {
    btn.textContent = lang === "pt" ? "EN" : "PT";
    btn.setAttribute("aria-label", lang === "pt" ? "Switch to English" : "Mudar para português");
  });
}

let current = detect();
apply(current);

document.addEventListener("click", e => {
  const btn = e.target.closest("[data-lang-toggle]");
  if (!btn) return;
  e.preventDefault();
  current = current === "pt" ? "en" : "pt";
  try { localStorage.setItem(STORE, current); } catch (e2) { /* ok */ }
  apply(current);
});
