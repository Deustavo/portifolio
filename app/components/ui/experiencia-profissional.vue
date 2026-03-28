<script setup lang="ts">
import {
  Briefcase,
  Code2,
  Layers,
  Rocket,
  Globe,
  GraduationCap,
} from 'lucide-vue-next'
import type { TimelineItem } from './radial-orbital-timeline.vue'

const { lang } = useLang()

const fontInter = { fontFamily: "'Inter', sans-serif" }
const fontHeadline = { fontFamily: "'Playfair Display', serif", textShadow: '0 0 50px rgba(255, 255, 255, 0.3)' }

const timelineData = computed<TimelineItem[]>(() => {
  const pt = lang.value === 'pt'

  return [
    {
      id: 1,
      title: pt ? 'Big Data no Agronegócio' : 'Agribusiness Big Data',
      date: '2018 – 2021',
      content: pt
        ? 'Formação em metodologias ágeis, ciência de dados, engenharia de dados, machine learning, engenharia de software e experiência do usuário.\n\nFATEC Shunji Nishimura.'
        : 'Training in agile methodologies, data science, data engineering, machine learning, software engineering, and user experience.\n\nFATEC Shunji Nishimura.',
      category: 'FATEC Shunji Nishimura',
      icon: Rocket,
      relatedIds: [2],
      status: 'completed',
      energy: 10,
    },
    {
      id: 2,
      title: pt ? 'Life Tecnologia' : 'Life Technology',
      date: '2019 – 2021',
      content: pt
        ? 'Desenvolvimento full-stack de dois projetos: Lifeguard: Um app de monitoramento de câmeras de segurança; UCS: Um sistema de comunicação interna com feed de notícias, chat e chamadas de voz.'
        : 'Full-stack development of two projects: Lifeguard: A camera monitoring app; UCS: An internal communication system with a company feed, chat, and voice call channel.',
      category: 'Life Tecnologia',
      icon: Globe,
      relatedIds: [3],
      status: 'completed',
      energy: 30,
    },
    {
      id: 3,
      title: 'Avivatec',
      date: '2021 – 2022',
      content: pt
        ? 'Liderança das tarefas de frontend no sistema de registro de direitos autorais em blockchain (Owna), onde os registros de patentes dos clientes eram gravados na blockchain. Primeira experiência como desenvolvedor pleno, com aprendizado de ferramentas de testes e deploy.'
        : 'Led frontend tasks for a blockchain copyright registration system (Owna), where clients\' patents were recorded on the blockchain. First experience as a mid-level developer, learning testing and deployment tools.',
      category: 'Avivatec',
      icon: Layers,
      relatedIds: [4],
      status: 'completed',
      energy: 40,
    },
    {
      id: 4,
      title: 'Tray / Locaweb',
      date: '2022 – 2025',
      content: pt
        ? 'Desenvolvimento de projetos estratégicos na plataforma de e-commerce Tray (grupo Locaweb): integrador de pagamentos (PagSeguro, Mercado Pago), App Store, Client Center para gestão de pedidos. Mentoria de novo integrante da equipe em transição de design para desenvolvimento.'
        : 'Delivered strategic projects for Tray e-commerce platform (Locaweb group): a payment integrator supporting PagSeguro and Mercado Pago, an App Store, and a Client Center platform for order tracking. Mentored a team member transitioning from design to development.',
      category: 'Tray / Locaweb',
      icon: Code2,
      relatedIds: [5],
      status: 'completed',
      energy: 65,
    },
    {
      id: 5,
      title: pt ? 'MBA em Engenharia de Software' : 'Software Engineering MBA',
      date: '2023 – 2025',
      content: pt
        ? 'Formação abrangente em engenharia de software, com módulos em desenvolvimento de software, computação em nuvem, dados, gestão de times e negócios.\n\nEscola Superior de Agricultura Luiz de Queiroz, USP.'
        : 'Comprehensive training in software engineering, covering modules on software development, cloud computing, data, team management, and business.\n\nEscola Superior de Agricultura Luiz de Queiroz, USP.',
      category: pt ? 'ESALQ – USP' : 'ESALQ – USP',
      icon: GraduationCap,
      relatedIds: [6],
      status: 'completed',
      energy: 82,
    },
    {
      id: 6,
      title: 'Ricochet 360',
      date: pt ? '2025 – atual' : '2025 – current',
      content: pt
        ? 'Refatoração de uma plataforma CRM de grande escala para chamadas e gestão de usuários. Trabalho estratégico focado em escalabilidade com arquitetura bem estruturada de micro-frontends, resultando em melhor desempenho.'
        : 'Refactoring a large-scale CRM platform used for calls and user management. Strategic work focused on enhancing system scalability through a well-structured micro-frontend architecture, resulting in improved performance.',
      category: 'Ricochet 360',
      icon: Briefcase,
        relatedIds: [],
        status: 'in-progress',
        energy: 100,
      },
    ]
  })

const title = computed(() =>
  lang.value === 'pt' ? 'Experiência Profissional' : 'Professional Experience'
)

const subtitle = computed(() =>
  lang.value === 'pt'
    ? 'Clique em um nó para explorar cada etapa da minha trajetória'
    : 'Click a node to explore each milestone of my journey'
)
</script>

<template>
  <section class="relative bg-black">
    <!-- Section header -->
    <div class="absolute top-10 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none px-4">
      <p :style="fontInter" class="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
        {{ lang === 'pt' ? 'trajetória' : 'career' }}
      </p>
      <h2 :style="fontHeadline" class="text-2xl md:text-3xl font-semibold text-white tracking-tight">
        {{ title }}
      </h2>
      <p :style="fontInter" class="mt-2 text-sm text-white/40">{{ subtitle }}</p>
    </div>

    <UiRadialOrbitalTimeline :timeline-data="timelineData" />
  </section>
</template>
