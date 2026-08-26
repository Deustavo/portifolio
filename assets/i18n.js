/* =========================================================
   i18n compartilhado pelas duas direções.
   Idioma inicial: escolha salva > idioma do navegador > EN.
   Valores podem conter HTML (<br>, <span>).
   ========================================================= */
const DICT = {
  pt: {
    "doc.title":      "Gustavo Andrade — UI & UX Designer",
    "doc.desc":       "Gustavo Andrade, UI & UX Designer em São Paulo. Interfaces claras, produtos com intenção.",
    "nav.work":       "Projetos",
    "nav.contact":    "Contato",
    "nav.back":       "↩ Direções",

    "hero.status":    "Disponível para projetos — São Paulo, BR",
    "hero.statusShort":"● Disponível — São Paulo, BR",
    "hero.role":      "UI &amp; UX<br>Designer",
    "hero.roleInline":"UI &amp; UX Designer",
    "hero.roleLabel": "Função",
    "hero.bio":       "Designer de produto desde 2019. Gosto de problema mal definido: pesquiso, prototipo e corto até a interface ficar óbvia.",
    "hero.bioShort":  "UI &amp; UX Designer. Desenho interfaces e entendo o código que as sustenta.",

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
    "work.count":     "05 cases",

    "contact.kicker": "Contato — resposta em 24h",
    "contact.cta":    "Vamos<br>conversar",
    "contact.ctaB":   "Bora<br><span>construir?</span>",

    "foot.rights":    "© 2026 Gustavo Andrade",
    "foot.a":         "Bloco amarelo · barras pretas",
    "foot.b":         "Outline 2px · preenche no hover",

    /* projetos — 01 real, 02–05 ainda placeholder */
    "p1.sub": "Segurança · App iOS/Android · 2021", "p1.tag": "Segurança",
    "p1.metric": "Protótipo de 14 telas para a Life Tecnologia",
    "p2.sub": "Saúde · UX Research · 2025",        "p2.tag": "Saúde",
    "p3.sub": "Marca · Site institucional · 2024", "p3.tag": "Marca",
    "p4.sub": "Marketplace · E-commerce · 2023",   "p4.tag": "Marketplace",
    "p5.sub": "Design System · B2B · 2022",        "p5.tag": "Design System",
    "p.more": "Ver case",

    /* ---- case Life Guard ---- */
    "lg.kicker": "Case 01 — 2021",
    "lg.sub":    "Protótipo de um aplicativo para a Life Tecnologia: as câmeras de segurança instaladas na casa do cliente, no celular dele, sem manual e sem senha para esquecer.",
    "lg.f1": "Cliente",  "lg.v1": "Life Tecnologia",
    "lg.f2": "Papel",    "lg.v2": "UI &amp; UX Design, prototipação",
    "lg.f3": "Escopo",   "lg.v3": "App iOS + Android, 14 telas",
    "lg.f4": "Ano",
    "lg.h1": "O contexto",
    "lg.c1": "<p>A Life Tecnologia vende internet e instala câmeras de segurança na casa do cliente. O equipamento era bom; o jeito de olhar para ele, não. O cliente recebia o software genérico do fabricante — login por e-mail e senha que ninguém lembra, menu em inglês, nenhuma relação com a marca de quem vendeu.</p><p>O resultado chegava na central de atendimento em forma de ligação: <i>não consigo ver minha câmera</i>. A pergunta que me trouxeram foi se dava para ter um app da Life onde o cliente entrasse com o número que já está no cadastro e visse a casa dele na primeira tela.</p>",
    "lg.h2": "O processo",
    "lg.c2": "<p>Comecei pelo caminho mais curto entre abrir o app e ver a sala de estar, e desenhei tudo em volta disso. Entrada por celular e código de validação, sem senha para criar nem para esquecer. Depois da entrada, uma tela de perfil — a assinatura é da casa, não de uma pessoa, então marido, esposa e filho precisavam de acessos separados sem virar três contas.</p><p>A home virou a lista de câmeras com o nome do cômodo, não o número do canal. O player abre ao vivo e leva para a gravação por data em um toque. O menu da conta reúne o que antes era ligação: gerenciar usuários, alterar plano, relatar problema, falar com a central.</p><p>A parte que deu mais trabalho foram os estados que costumam ficar de fora. Número não registrado, busca sem resultado e — o mais comum na operação da Life — o cliente que assinou mas ainda está na fila de instalação. Em vez de uma home vazia sugerindo que algo quebrou, uma tela que diz o que está acontecendo e que isso pode levar alguns dias.</p><p>A interface é escura porque o conteúdo é vídeo: quadro escuro faz a imagem da câmera ser a coisa mais clara da tela. O laranja da marca ficou reservado para ação — botão principal, link, item ativo. Nada mais disputa atenção com a imagem.</p>",
    "lg.h3": "O resultado",
    "lg.c3": "<p>A entrega foi o protótipo navegável: 14 telas, do splash até a edição de um usuário, com os caminhos de erro e os estados vazios já resolvidos — o tipo de decisão que normalmente sobra para a fase de desenvolvimento e custa caro lá.</p><ul><li>Entrada sem senha: celular + código de validação</li><li>Perfis múltiplos por assinatura, sem multiplicar contas</li><li>Estados de erro, busca vazia e pré-instalação desenhados</li><li>Componentes e espaçamentos pensados para virar React Native direto</li></ul><p>O projeto parou no protótipo, e ele valeu como protótipo: deu à Life uma versão concreta do produto para discutir — escopo, esforço e cara da marca — em vez de uma descrição.</p>",
    "lg.heroAlt": "Telas do Life Guard sobre o laranja da marca",
    "lg.ga": "Entrada — do splash ao perfil",
    "lg.gb": "Uso diário — câmeras, player e conta",
    "lg.gc": "Estados e gestão — o que costuma faltar",
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
    "lg.work": "Trabalhar juntos →"
  },
  en: {
    "doc.title":      "Gustavo Andrade — UI & UX Designer",
    "doc.desc":       "Gustavo Andrade, UI & UX Designer based in São Paulo. Clear interfaces, products with intent.",
    "nav.work":       "Work",
    "nav.contact":    "Contact",
    "nav.back":       "↩ Directions",

    "hero.status":    "Available for projects — São Paulo, BR",
    "hero.statusShort":"● Available — São Paulo, BR",
    "hero.role":      "UI &amp; UX<br>Designer",
    "hero.roleInline":"UI &amp; UX Designer",
    "hero.roleLabel": "Role",
    "hero.bio":       "Product designer since 2019. I like badly defined problems: I research, prototype and cut until the interface becomes obvious.",
    "hero.bioShort":  "UI &amp; UX Designer. I design interfaces and understand the code behind them.",

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
    "work.count":     "05 cases",

    "contact.kicker": "Contact — reply within 24h",
    "contact.cta":    "Let's<br>talk",
    "contact.ctaB":   "Let's<br><span>build it?</span>",

    "foot.rights":    "© 2026 Gustavo Andrade",
    "foot.a":         "Yellow slab · black bars",
    "foot.b":         "2px outline · fills on hover",

    "p1.sub": "Security · iOS/Android app · 2021", "p1.tag": "Security",
    "p1.metric": "14-screen prototype for Life Tecnologia",
    "p2.sub": "Health · UX Research · 2025",      "p2.tag": "Health",
    "p3.sub": "Brand · Website · 2024",           "p3.tag": "Brand",
    "p4.sub": "Marketplace · E-commerce · 2023",  "p4.tag": "Marketplace",
    "p5.sub": "Design System · B2B · 2022",       "p5.tag": "Design System",
    "p.more": "View case",

    /* ---- Life Guard case ---- */
    "lg.kicker": "Case 01 — 2021",
    "lg.sub":    "Prototype of an app for Life Tecnologia: the security cameras installed in the client's home, on their phone, with no manual and no password to forget.",
    "lg.f1": "Client", "lg.v1": "Life Tecnologia",
    "lg.f2": "Role",   "lg.v2": "UI &amp; UX Design, prototyping",
    "lg.f3": "Scope",  "lg.v3": "iOS + Android app, 14 screens",
    "lg.f4": "Year",
    "lg.h1": "The context",
    "lg.c1": "<p>Life Tecnologia sells internet plans and installs security cameras in its clients' homes. The hardware was good; the way of looking at it wasn't. Clients were handed the manufacturer's generic software — email-and-password login nobody remembers, menus in English, no connection to the brand that sold it.</p><p>The result reached the support desk as phone calls: <i>I can't see my camera</i>. The question they brought me was whether Life could have its own app, where the client signs in with the number already on file and sees their house on the first screen.</p>",
    "lg.h2": "The process",
    "lg.c2": "<p>I started from the shortest path between opening the app and seeing the living room, then designed everything around it. Sign-in by phone number plus a validation code — no password to create and none to forget. Right after, a profile screen: the subscription belongs to the household, not to one person, so parents and kids needed separate access without becoming three accounts.</p><p>The home became a list of cameras labelled by room, not by channel number. The player opens live and reaches recordings by date in one tap. The account menu gathers what used to be a phone call: manage users, change plan, report a problem, call support.</p><p>The hardest part was the states that usually get left out. Unregistered number, empty search results, and — the most common case in Life's operation — the client who subscribed but is still in the installation queue. Instead of an empty home suggesting something broke, a screen that says what's happening and that it may take a few days.</p><p>The interface is dark because the content is video: a dark frame lets the camera image be the brightest thing on screen. The brand orange is reserved for action — primary button, link, active item. Nothing else competes with the picture.</p>",
    "lg.h3": "The outcome",
    "lg.c3": "<p>The deliverable was the clickable prototype: 14 screens, from splash to editing a user, with error paths and empty states already resolved — the kind of decision that usually spills into development, where it costs far more.</p><ul><li>Passwordless entry: phone number + validation code</li><li>Multiple profiles per subscription, without multiplying accounts</li><li>Error, empty-search and pre-installation states designed</li><li>Components and spacing built to translate straight into React Native</li></ul><p>The project stopped at the prototype, and it earned its keep as one: it gave Life a concrete version of the product to argue about — scope, effort, brand presence — instead of a description.</p>",
    "lg.heroAlt": "Life Guard screens over the brand orange",
    "lg.ga": "Entry — from splash to profile",
    "lg.gb": "Daily use — cameras, player and account",
    "lg.gc": "States and management — what usually gets left out",
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
    "lg.work": "Let's work together →"
  }
};

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
