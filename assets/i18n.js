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

    /* placeholders — trocar pelos projetos reais */
    "p1.sub": "Fintech · App iOS/Android · 2026",  "p1.tag": "Fintech",
    "p2.sub": "Saúde · UX Research · 2025",        "p2.tag": "Saúde",
    "p3.sub": "Marca · Site institucional · 2024", "p3.tag": "Marca",
    "p4.sub": "Marketplace · E-commerce · 2023",   "p4.tag": "Marketplace",
    "p5.sub": "Design System · B2B · 2022",        "p5.tag": "Design System",
    "p.more": "Ver case"
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

    "p1.sub": "Fintech · iOS/Android app · 2026", "p1.tag": "Fintech",
    "p2.sub": "Health · UX Research · 2025",      "p2.tag": "Health",
    "p3.sub": "Brand · Website · 2024",           "p3.tag": "Brand",
    "p4.sub": "Marketplace · E-commerce · 2023",  "p4.tag": "Marketplace",
    "p5.sub": "Design System · B2B · 2022",       "p5.tag": "Design System",
    "p.more": "View case"
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
