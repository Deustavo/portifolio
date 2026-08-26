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
    "work.count":     "09 cases",

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
    "p7.sub": "Blockchain · React · 2022", "p7.tag": "Front-end",
    "p7.metric": "Front-end em React de um registro autoral em blockchain",
    "p8.sub": "E-commerce · Front-end · 2023", "p8.tag": "Front-end",
    "p8.metric": "Consulta de pedidos das lojas Tray, pixel perfect e mobile first",
    "p9.sub": "E-commerce · Nuxt · 2024", "p9.tag": "Front-end",
    "p9.metric": "Catálogo em Nuxt com renderização no servidor, feito para ser indexado",
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
    "lsite.g7": "Game Station",

    /* ---- case Owna ---- */
    "owna.title": "Owna",
    "owna.kicker": "Case 03 \u00b7 2022",
    "owna.sub":    "Sistema onde a obra do cliente \u00e9 registrada em blockchain e o autor recebe um certificado com o hash do arquivo e o n\u00famero da autentica\u00e7\u00e3o. Entrei como desenvolvedor front-end.",
    "owna.f1": "Cliente",  "owna.v1": "Owna Lurin Tech",
    "owna.f2": "Papel",    "owna.v2": "Desenvolvimento front-end, React",
    "owna.f3": "Escopo",   "owna.v3": "Plataforma de registro autoral",
    "owna.f4": "Ano",
    "owna.h1": "O contexto",
    "owna.c1": "<p>A Owna registrava em blockchain a autoria das obras dos clientes. O arquivo gera um hash, esse hash entra em uma transa\u00e7\u00e3o com data e hora em UTC, e o autor recebe um certificado que aponta para esse registro. \u00c9 uma resposta t\u00e9cnica para uma pergunta velha, que \u00e9 provar desde quando uma obra existe.</p><p>Eu n\u00e3o desenhei o produto. Entrei para ficar \u00e0 frente das demandas de front-end, com React como ferramenta principal.</p>",
    "owna.h2": "O processo",
    "owna.c2": "<p>O React era a parte que eu j\u00e1 sabia fazer. O que era novo estava depois dele. Foi meu primeiro cargo como desenvolvedor pleno, e a primeira vez que teste e deploy eram assunto meu, e n\u00e3o de outra pessoa. Passei o projeto aprendendo essas duas ferramentas em cima de c\u00f3digo que j\u00e1 estava em uso.</p><p>A pe\u00e7a que exige mais do front-end \u00e9 o certificado, porque \u00e9 a \u00fanica que sai da plataforma e vai ser lida por quem n\u00e3o \u00e9 usu\u00e1rio. Ele carrega o t\u00edtulo da obra, o nome do arquivo, o hashcode inteiro, o n\u00famero da autentica\u00e7\u00e3o em blockchain e dois QR, um de autores e um de titulares. Tem seletor de apar\u00eancia clara e escura, download e vers\u00e3o para celular. Um hashcode de 64 caracteres em tela de telefone \u00e9 o tipo de detalhe que decide o layout.</p>",
    "owna.h3": "O resultado",
    "owna.c3": "<p>Respondi pelo front-end da plataforma enquanto estive no projeto.</p><p>O que levei dele foi menos sobre React e mais sobre o que vem depois de escrever a tela: escrever o teste que segura a regra e acompanhar a publica\u00e7\u00e3o, em vez de entregar branch e sair.</p>",
    "owna.heroAlt": "Certificado de registro autoral da Owna nos temas claro e escuro e na vers\u00e3o para celular",
    /* ---- case Central do cliente (Tray) ---- */
    "cdc.title": "Central do cliente",
    "cdc.kicker": "Case 04 · 2023",
    "cdc.sub":    "Plataforma web onde o comprador de uma loja Tray acompanha o status do pedido e cuida do próprio cadastro. Atuei nas demandas de front-end.",
    "cdc.f1": "Cliente",  "cdc.v1": "Tray",
    "cdc.f2": "Papel",    "cdc.v2": "Desenvolvimento front-end",
    "cdc.f3": "Escopo",   "cdc.v3": "Área do cliente das lojas Tray",
    "cdc.f4": "Ano",
    "cdc.h1": "O contexto",
    "cdc.c1": "<p>A Tray é plataforma de e-commerce, então a Central do cliente não serve uma loja, serve o comprador de qualquer loja hospedada nela. Quem abre essa tela não está comprando nada. Está atrás de uma resposta: onde está meu pedido, o que eu comprei, qual endereço eu deixei cadastrado.</p><p>Entrei no time de front-end para tocar as demandas da Central. Elas se dividiam em duas pilhas, funcionalidade nova e falha para corrigir, e as duas caíam sobre a mesma base de código que já estava no ar.</p>",
    "cdc.h2": "O processo",
    "cdc.c2": "<p>A Central roda dentro da loja do lojista, com a marca dele em cima. As telas aqui são da FutFanatics, e o mesmo código atende as outras lojas. Isso coloca o front-end em um lugar específico: o layout precisa ser fiel ao desenho no pixel, porque a régua não é o meu gosto, é o que o design entregou e é o que o lojista vê rodando na própria casa.</p><p>Mobile first pelo motivo mais óbvio de quem consulta pedido. A consulta acontece no celular, no meio do dia, com a notificação da transportadora ainda aberta. Então cada peça foi resolvida primeiro na largura pequena e só depois ganhou as colunas do desktop. A linha do tempo do pedido é a que mais sofre nessa passagem: no desktop ela é uma barra horizontal com as etapas distribuídas ao longo dela, e no celular esse mesmo estado precisa de outra leitura.</p><p>Toda demanda que entrou saiu com documentação e teste unitário. Não era exigência herdada pronta, era o jeito de a próxima pessoa mexer naquela tela sem precisar me perguntar o que a regra fazia. Em código que já está em produção e que atende lojas de terceiros, o teste é o que separa corrigir uma falha de criar a próxima.</p><p>Durante o projeto o time recebeu alguém que estava saindo do design para o desenvolvimento, e fiquei de mentor. Montei apresentações sobre os fundamentos de front-end para dar o vocabulário, e o resto foi pair programming em cima da demanda real, que é onde a dúvida aparece de verdade.</p>",
    "cdc.h3": "O resultado",
    "cdc.c3": "<p>Respondi pelas demandas de front-end da Central enquanto estive no projeto.</p><ul><li>Funcionalidades novas e correções entregues no front-end da Central</li><li>Cada entrega acompanhada de documentação e teste unitário</li><li>Layout fiel ao desenho e resolvido do celular para cima</li><li>Mentoria de um integrante em transição do design para o desenvolvimento</li></ul><p>O que ficou desse projeto foi a parte de explicar. Ensinar front-end para quem vem do design obriga a nomear em voz alta a decisão que você toma no automático, e depois disso é difícil escrever código do mesmo jeito.</p>",
    "cdc.heroAlt": "Telas da Central do cliente da Tray repetidas em um mosaico inclinado",
    "cdc.ga": "As três telas da consulta, do resumo ao detalhe",
    "cdc.g1": "Minha conta, com o último pedido, a linha do tempo do status e o preenchimento do cadastro",
    "cdc.g2": "Meus pedidos, a lista com data, valor e situação de cada compra",
    "cdc.g3": "Detalhe do pedido, com os produtos, o endereço de entrega e o resumo do pagamento",

    /* ---- case Loja de aplicativos ---- */
    "lapp.title": "Loja de aplicativos",
    "lapp.kicker": "Case 05 · 2024",
    "lapp.sub":    "Catálogo dos aplicativos que o lojista instala no painel e na loja da Tray Commerce. Fui o principal responsável pelo front-end.",
    "lapp.f1": "Cliente",  "lapp.v1": "Tray Commerce",
    "lapp.f2": "Papel",    "lapp.v2": "Desenvolvimento front-end",
    "lapp.f3": "Escopo",   "lapp.v3": "Catálogo de aplicativos da plataforma",
    "lapp.f4": "Ano",
    "lapp.h1": "O contexto",
    "lapp.c1": "<p>A plataforma da Tray aceita aplicativos de terceiros, que o lojista instala no painel e na própria loja para resolver frete, pós-venda, marketing, integração com marketplace. O que faltava era o lugar onde esse aplicativo é apresentado antes de ser instalado.</p><p>Quem procura um app não sai do painel pensando em passear por um catálogo. A pessoa tem um problema, digita esse problema em um buscador e cai direto na página de um aplicativo. Isso muda o que a página precisa ser: cada app é uma porta de entrada independente do site, e não uma folha pendurada em um menu.</p><p>Fui o principal responsável pelo desenvolvimento do front-end.</p>",
    "lapp.h2": "O processo",
    "lapp.c2": "<p>A primeira decisão foi o Nuxt. É um framework em cima do Vue com renderização no servidor, e escolhi por causa do parágrafo acima: se a página tem que ser indexada, o buscador precisa receber o conteúdo já montado no HTML da resposta, não um esqueleto que só ganha texto depois que o JavaScript roda no navegador. Uma aplicação Vue comum entrega o esqueleto. O Nuxt entrega a página.</p><p>Com o SSR resolvido, cuidei dos metadados página por página. Título, descrição e as tags de compartilhamento saem do conteúdo de cada aplicativo e de cada categoria, então a listagem de logística e a página do Tray Envios não chegam ao índice com o mesmo cabeçalho. E configurei o Google Tag Manager para que a medição não dependesse de alguém abrir o código a cada tag nova.</p><p>O layout foi feito mobile first e pixel perfect. As duas coisas juntas, porque catálogo é um problema de grade: o card do aplicativo tem ícone, nome, descrição cortada e o selo de pago ou grátis, e essa mesma peça precisa cair em uma coluna no celular e em três no desktop sem quebrar o alinhamento que o design definiu.</p><p>Todo componente saiu com documentação e teste unitário. Um catálogo cresce por repetição, o mesmo card aparece na home, na coleção e na categoria, então o componente é reusado antes de estar estável. O teste é o que permite mexer nele depois sem descobrir o estrago em produção.</p>",
    "lapp.h3": "O resultado",
    "lapp.c3": "<p>A loja de aplicativos está no ar com o catálogo completo da plataforma.</p><ul><li>Front-end em Nuxt com renderização no servidor, para as páginas serem indexáveis</li><li>Metadados próprios por aplicativo, categoria e coleção</li><li>Google Tag Manager configurado para medição sem depender de deploy</li><li>Grade de cards resolvida do celular para cima, fiel ao desenho</li><li>Documentação e teste unitário para todos os componentes</li></ul><p>O que esse projeto me ensinou foi olhar SEO como decisão de arquitetura e não como ajuste de fim de sprint. A escolha do framework veio antes da primeira tela, e foi ela que determinou se o resto do trabalho seria encontrado.</p>",
    "lapp.heroAlt": "Telas da loja de aplicativos da Tray repetidas em um mosaico inclinado",
    "lapp.ga": "A descoberta, da home à coleção",
    "lapp.gb": "A categoria e a página do aplicativo",
    "lapp.g1": "Home, com a busca em destaque e a faixa de aplicativos mais instalados",
    "lapp.g2": "Coleção Mais instalados, a lista completa em grade de três colunas",
    "lapp.g3": "Categoria Pós-vendas, com a navegação lateral pelas demais categorias",
    "lapp.g4": "Página do Tray Envios, com o botão de instalar acima da descrição do aplicativo"
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
    "work.count":     "09 cases",

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
    "p7.sub": "Blockchain · React · 2022", "p7.tag": "Front-end",
    "p7.metric": "React front-end for a blockchain authorship registry",
    "p8.sub": "E-commerce · Front-end · 2023", "p8.tag": "Front-end",
    "p8.metric": "Order lookup for Tray stores, pixel perfect and mobile first",
    "p9.sub": "E-commerce · Nuxt · 2024", "p9.tag": "Front-end",
    "p9.metric": "A Nuxt catalogue with server side rendering, built to be indexed",
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
    "lsite.g7": "Game Station",

    /* ---- case Owna ---- */
    "owna.title": "Owna",
    "owna.kicker": "Case 03 \u00b7 2022",
    "owna.sub":    "A system that records a client's work on a blockchain and hands the author a certificate carrying the file hash and the authentication number. I joined as the front-end developer.",
    "owna.f1": "Client", "owna.v1": "Owna Lurin Tech",
    "owna.f2": "Role",   "owna.v2": "Front-end development, React",
    "owna.f3": "Scope",  "owna.v3": "Authorship registry platform",
    "owna.f4": "Year",
    "owna.h1": "The context",
    "owna.c1": "<p>Owna recorded the authorship of its clients' works on a blockchain. The file produces a hash, that hash goes into a transaction stamped with a UTC date and time, and the author receives a certificate pointing at that record. It is a technical answer to an old question, which is proving how far back a work exists.</p><p>I did not design the product. I came in to take the lead on the front-end work, with React as the main tool.</p>",
    "owna.h2": "The process",
    "owna.c2": "<p>React was the part I already knew how to do. What was new came after it. This was my first mid-level developer role, and the first time testing and deployment were mine to answer for rather than someone else's. I spent the project learning both of those on top of code that was already in use.</p><p>The piece that asks the most of the front-end is the certificate, because it is the only one that leaves the platform and gets read by someone who is not a user. It carries the title of the work, the file name, the full hashcode, the blockchain authentication number and two QR codes, one for authors and one for rights holders. It has a light and dark appearance switch, a download and a phone version. A 64 character hashcode on a phone screen is the kind of detail that settles the layout.</p>",
    "owna.h3": "The outcome",
    "owna.c3": "<p>I answered for the platform's front-end while I was on the project.</p><p>What I took from it was less about React and more about what comes after writing the screen: writing the test that holds the rule and following the release, instead of handing over a branch and walking away.</p>",
    "owna.heroAlt": "Owna authorship certificate in light and dark themes and in its phone version",
    /* ---- case Central do cliente (Tray) ---- */
    "cdc.title": "Customer area",
    "cdc.kicker": "Case 04 · 2023",
    "cdc.sub":    "A web platform where the buyer of a Tray store follows an order's status and manages their own account details. I worked on the front-end.",
    "cdc.f1": "Client", "cdc.v1": "Tray",
    "cdc.f2": "Role",   "cdc.v2": "Front-end development",
    "cdc.f3": "Scope",  "cdc.v3": "Customer area for Tray stores",
    "cdc.f4": "Year",
    "cdc.h1": "The context",
    "cdc.c1": "<p>Tray is an e-commerce platform, so the customer area does not serve one store, it serves the buyer of any store hosted on it. Nobody opens that screen to buy something. They are after an answer: where is my order, what did I buy, which address did I leave on file.</p><p>I joined the front-end team to take on the customer area work. It came in two stacks, new features and defects to fix, and both landed on the same code base that was already live.</p>",
    "cdc.h2": "The process",
    "cdc.c2": "<p>The customer area runs inside the merchant's own store, with their brand on top. The screens here are from FutFanatics, and the same code serves every other store. That puts the front-end in a specific place: the layout has to be faithful to the design down to the pixel, because the measure is not my taste, it is what design handed over and what the merchant sees running in their own house.</p><p>Mobile first for the most obvious reason there is when someone checks an order. That check happens on a phone, in the middle of the day, with the carrier's notification still open. So every piece was solved at the small width first and only then earned its desktop columns. The order timeline suffers the most in that crossing: on desktop it is a horizontal bar with the stages spread along it, and on a phone that same state needs a different reading.</p><p>Every piece of work that came in went out with documentation and a unit test. It was not a requirement I inherited, it was how the next person could touch that screen without having to ask me what the rule did. On code that is already in production and serving other people's stores, the test is what separates fixing a defect from creating the next one.</p><p>Partway through, the team took in someone moving from design into development, and I was their mentor. I put together talks on front-end fundamentals to give them the vocabulary, and the rest was pair programming on the real work, which is where the actual questions show up.</p>",
    "cdc.h3": "The outcome",
    "cdc.c3": "<p>I answered for the customer area's front-end work while I was on the project.</p><ul><li>New features and fixes shipped in the customer area front-end</li><li>Every delivery paired with documentation and a unit test</li><li>Layout faithful to the design and solved from the phone up</li><li>Mentoring for a teammate moving from design into development</li></ul><p>What stayed with me from this project was the explaining. Teaching front-end to someone coming from design forces you to say out loud the decision you usually make on autopilot, and after that it is hard to write code the same way.</p>",
    "cdc.heroAlt": "Screens from Tray's customer area repeated in a tilted mosaic",
    "cdc.ga": "The three screens of the lookup, from summary to detail",
    "cdc.g1": "My account, with the latest order, the status timeline and how complete the profile is",
    "cdc.g2": "My orders, the list with date, amount and status for each purchase",
    "cdc.g3": "Order detail, with the products, the shipping address and the payment summary",

    /* ---- case App store ---- */
    "lapp.title": "App store",
    "lapp.kicker": "Case 05 · 2024",
    "lapp.sub":    "The catalogue of apps a merchant installs into their Tray Commerce dashboard and storefront. I led the front-end.",
    "lapp.f1": "Client", "lapp.v1": "Tray Commerce",
    "lapp.f2": "Role",   "lapp.v2": "Front-end development",
    "lapp.f3": "Scope",  "lapp.v3": "The platform's app catalogue",
    "lapp.f4": "Year",
    "lapp.h1": "The context",
    "lapp.c1": "<p>Tray's platform takes third party apps, which a merchant installs into the dashboard and into their own store to handle shipping, post-purchase, marketing, marketplace integration. What was missing was the place where an app gets presented before anyone installs it.</p><p>Nobody looking for an app leaves the dashboard meaning to browse a catalogue. They have a problem, they type that problem into a search engine and they land straight on one app's page. That changes what the page has to be: every app is an independent front door to the site, not a leaf hanging off a menu.</p><p>I led the front-end development.</p>",
    "lapp.h2": "The process",
    "lapp.c2": "<p>The first decision was Nuxt. It is a framework on top of Vue with server side rendering, and I chose it because of the paragraph above: if the page has to be indexed, the crawler needs the content already assembled in the HTML of the response, not a skeleton that only gets its text once JavaScript runs in the browser. A plain Vue app hands over the skeleton. Nuxt hands over the page.</p><p>With SSR settled, I took care of the metadata page by page. Title, description and the sharing tags come out of each app's and each category's own content, so the logistics listing and the Tray Envios page do not reach the index wearing the same heading. And I set up Google Tag Manager so measurement would not depend on someone opening the code for every new tag.</p><p>The layout was built mobile first and pixel perfect. Both at once, because a catalogue is a grid problem: an app card carries an icon, a name, a truncated description and the paid or free badge, and that same piece has to land in one column on a phone and three on desktop without breaking the alignment design set.</p><p>Every component shipped with documentation and a unit test. A catalogue grows by repetition, the same card shows up on the home, in a collection and in a category, so the component gets reused before it is stable. The test is what lets you touch it later without finding out the damage in production.</p>",
    "lapp.h3": "The outcome",
    "lapp.c3": "<p>The app store is live with the platform's full catalogue.</p><ul><li>Nuxt front-end with server side rendering, so the pages are indexable</li><li>Metadata of its own per app, category and collection</li><li>Google Tag Manager set up so measurement does not wait on a deploy</li><li>Card grid solved from the phone up, faithful to the design</li><li>Documentation and a unit test for every component</li></ul><p>What this project taught me was to treat SEO as an architecture decision and not an end of sprint adjustment. The framework choice came before the first screen, and it was that choice that decided whether the rest of the work would be found.</p>",
    "lapp.heroAlt": "Screens from Tray's app store repeated in a tilted mosaic",
    "lapp.ga": "Discovery, from the home to a collection",
    "lapp.gb": "The category and the app page",
    "lapp.g1": "Home, with search up front and a strip of the most installed apps",
    "lapp.g2": "The Most installed collection, the full list in a three column grid",
    "lapp.g3": "The Post-purchase category, with side navigation through the other categories",
    "lapp.g4": "The Tray Envios page, with the install button above the app description"
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
