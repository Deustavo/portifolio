import lifeguardImg from '~/assets/img/lifeguard/ligefuard.png'
import liriosImg from '~/assets/img/lirios-odonto/liriosodonto.png'
import lojaImg from '~/assets/img/loja-de-aplicativos/lojadeaplicativos.png'
import pilatesImg from '~/assets/img/sistema-pilates/sistemapilates.png'
import solidtyImg from '~/assets/img/solidty-bank/solidty-bank.png'
import skillusImg from '~/assets/img/skillus/skillus.png'
import lifeGuardFigmaImg from '~/assets/img/lifeguard/life-guard.png'
import danielAraujoImg from '~/assets/img/daniel-araujo-advocacia/daniel-araujo-advocacia.png'

export interface Project {
  slug: string
  title: string
  description: { pt: string; en: string }
  summary: { pt: string; en: string }
  image: string
  modalImage: string
  tech: string
  company: string
  link?: string
}

const projects: Project[] = [
  {
    slug: 'lifeguard',
    title: 'Lifeguard',
    description: {
      pt: 'Monitoramento de câmeras',
      en: 'Camera monitoring',
    },
    summary: {
      pt: 'Aplicação para monitoramento remoto de câmeras de segurança, com foco em fluxo de vídeo em tempo real e alertas.',
      en: 'Application for remote monitoring of security cameras, focused on real-time video streaming and alerts.',
    },
    image: lifeGuardFigmaImg,
    modalImage: lifeguardImg,
    tech: 'React Native · Node.js',
    company: 'Life Tecnologia',
  },
  {
    slug: 'lirios-odonto',
    title: 'Lírios Odonto',
    description: {
      pt: 'Site para consultório odontológico',
      en: 'Dental clinic website',
    },
    summary: {
      pt: 'Site institucional desenvolvido para um consultório odontológico, com foco em apresentação de serviços e captação de pacientes.',
      en: 'Institutional website built for a dental clinic, focused on presenting services and attracting patients.',
    },
    image: liriosImg,
    modalImage: liriosImg,
    tech: 'Nuxt 3 · Vue 3',
    company: 'Freelance',
  },
  {
    slug: 'loja-de-aplicativos',
    title: 'Loja de Aplicativos',
    description: {
      pt: 'Marketplace de apps para e-commerce',
      en: 'App marketplace for e-commerce',
    },
    summary: {
      pt: 'Marketplace de aplicativos integráveis a lojas de e-commerce, permitindo instalação e gestão de extensões.',
      en: 'Marketplace of apps that integrate with e-commerce stores, allowing installation and management of extensions.',
    },
    image: lojaImg,
    modalImage: lojaImg,
    tech: 'Vue 2 · PHP · REST',
    company: 'Tray / Locaweb',
  },
  {
    slug: 'sistema-pilates',
    title: 'Sistema Pilates',
    description: {
      pt: 'Gestão de estúdio de pilates',
      en: 'Pilates studio management',
    },
    summary: {
      pt: 'Sistema completo de gestão para estúdios de pilates: alunos, aulas, pacotes e financeiro.',
      en: 'Complete management system for pilates studios: students, classes, packages and finances.',
    },
    image: pilatesImg,
    modalImage: pilatesImg,
    tech: 'Nuxt 3 · Vue 3 · SQLite',
    company: 'Freelance',
  },
  {
    slug: 'solidty-bank',
    title: 'Solidty Bank',
    description: {
      pt: 'Banco digital (case de curso)',
      en: 'Digital bank (course case study)',
    },
    summary: {
      pt: 'Banco digital desenvolvido como case durante um curso de React JS e React Native oferecido pela Gama Academy em parceria com a Accenture, com foco em dashboard intuitivo e fluxo de páginas fluido.',
      en: 'Digital bank built as a case study during a React JS and React Native course by Gama Academy in partnership with Accenture, focused on an intuitive dashboard and a fluid page flow.',
    },
    image: solidtyImg,
    modalImage: solidtyImg,
    tech: 'React · React Native',
    company: 'Gama Academy · Accenture',
    link: 'https://solidtybank.vercel.app/',
  },
  {
    slug: 'skillus',
    title: 'Skillus',
    description: {
      pt: 'Plataforma de troca de habilidades',
      en: 'Skill-swapping platform',
    },
    summary: {
      pt: 'Projeto de conclusão de curso: plataforma para conexão entre pessoas que querem ensinar e aprender novas habilidades entre si.',
      en: 'Capstone project: a platform connecting people who want to teach and learn new skills from each other.',
    },
    image: skillusImg,
    modalImage: skillusImg,
    tech: 'Figma · UX/UI',
    company: 'Projeto acadêmico',
    link: 'https://www.figma.com/file/t9y57BfK9urOXT4fbqLoWv/Skill.Us-PI-Final?node-id=0%3A1',
  },
  {
    slug: 'daniel-araujo-advocacia',
    title: 'Daniel Araujo Advocacia',
    description: {
      pt: 'Site institucional para escritório de advocacia',
      en: 'Institutional website for a law firm',
    },
    summary: {
      pt: 'Site institucional desenvolvido para um escritório de advocacia, com foco em apresentação de áreas de atuação e captação de clientes.',
      en: 'Institutional website built for a law firm, focused on presenting practice areas and attracting clients.',
    },
    image: danielAraujoImg,
    modalImage: danielAraujoImg,
    tech: 'React · Next.js',
    company: 'Freelance',
    link: 'https://danielaraujoadvocacia.com/',
  },
]

export function useProjects() {
  function getProjectBySlug(slug: string) {
    return projects.find((project) => project.slug === slug)
  }

  return { projects, getProjectBySlug }
}
