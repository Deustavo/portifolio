<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import lifeguardImg from '~/assets/img/ligefuard.png'
import liriosImg from '~/assets/img/liriosodonto.png'
import lojaImg from '~/assets/img/lojadeaplicativos.png'
import pilatesImg from '~/assets/img/sistemapilates.png'

const { lang } = useLang()
const { isDark } = useTheme()

const activeIndex = ref(0)
const animatedOptions = ref<number[]>([])
const timers: ReturnType<typeof setTimeout>[] = []

const fontInter = { fontFamily: "'Inter', sans-serif" }
const fontHeadline = computed(() => ({
  fontFamily: "'Playfair Display', serif",
  textShadow: isDark.value
    ? '0 0 50px rgba(0,0,0,0.3)'
    : '0 0 50px rgba(255,255,255,0.3)',
}))

const i18n = {
  pt: {
    tag: 'portifólio',
    heading: 'Portifolio de projetos',
    subtitle: 'Veja alguns dos projetos que eu trabalhei',
  },
  en: {
    tag: 'portfolio',
    heading: 'Portfolio of projects',
    subtitle: 'See some of the projects I worked on',
  },
}

const projects = computed(() => {
  const pt = lang.value === 'pt'
  return [
    {
      title: 'Lifeguard',
      description: pt ? 'Monitoramento de câmeras' : 'Camera monitoring',
      image: lifeguardImg,
      tech: 'React Native · Node.js',
      company: 'Life Tecnologia',
    },
    {
      title: 'Lírios Odonto',
      description: pt ? 'Site para consultório odontológico' : 'Dental clinic website',
      image: liriosImg,
      tech: 'Nuxt 3 · Vue 3',
      company: 'Freelance',
    },
    {
      title: 'Loja de Aplicativos',
      description: pt ? 'Marketplace de apps para e-commerce' : 'App marketplace for e-commerce',
      image: lojaImg,
      tech: 'Vue 2 · PHP · REST',
      company: 'Tray / Locaweb',
    },
    {
      title: 'Sistema Pilates',
      description: pt ? 'Gestão de estúdio de pilates' : 'Pilates studio management',
      image: pilatesImg,
      tech: 'Nuxt 3 · Vue 3 · SQLite',
      company: 'Freelance',
    },
  ]
})

function handleOptionClick(index: number) {
  if (index !== activeIndex.value) activeIndex.value = index
}

onMounted(() => {
  projects.value.forEach((_, i) => {
    const t = setTimeout(() => {
      animatedOptions.value = [...animatedOptions.value, i]
    }, 180 * i)
    timers.push(t)
  })
})

onUnmounted(() => {
  timers.forEach(clearTimeout)
})
</script>

<template>
  <section class="relative w-full bg-black dark:bg-white py-16 overflow-hidden">

    <!-- Section header -->
    <div class="text-center mb-10 px-4 animate-fade-in-top" style="animation-delay: 0.3s">
      <p
        :style="fontInter"
        class="text-xs uppercase tracking-[0.3em] text-white/40 dark:text-slate-900/60 mb-2"
      >
        {{ i18n[lang].tag }}
      </p>
      <h2
        :style="fontHeadline"
        class="text-2xl md:text-3xl font-semibold text-white dark:text-slate-900 tracking-tight"
      >
        {{ i18n[lang].heading }}
      </h2>
      <p
        :style="fontInter"
        class="mt-2 text-sm text-white/40 dark:text-slate-900/60"
      >
        {{ i18n[lang].subtitle }}
      </p>
    </div>

    <!-- Mobile: vertical stacked cards -->
    <div class="md:hidden flex flex-col gap-3 w-full px-4">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-500"
        :style="{
          height: activeIndex === index ? '220px' : '72px',
          borderColor: activeIndex === index
            ? (isDark ? '#fff' : '#1e293b')
            : (isDark ? '#292929' : '#e2e8f0'),
          backgroundImage: `url('${project.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: animatedOptions.includes(index) ? 1 : 0,
          transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-40px)',
        }"
        @click="handleOptionClick(index)"
      >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />
        <div class="absolute bottom-4 left-4 right-4 flex items-end gap-3">
          <div class="text-white">
            <div class="font-bold text-base leading-tight">{{ project.title }}</div>
            <div v-if="activeIndex === index" class="text-sm text-gray-300 mt-1">{{ project.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop: horizontal accordion -->
    <div class="hidden md:flex justify-center px-4">
      <div
        class="selector flex w-full max-w-[900px] h-[400px] items-stretch"
        style="min-width: min(600px, 100%)"
      >
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="option relative flex flex-col justify-end overflow-hidden cursor-pointer transition-all duration-700 ease-in-out"
          :style="{
            backgroundImage: `url('${project.image}')`,
            backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
            backgroundPosition: 'center',
            opacity: animatedOptions.includes(index) ? 1 : 0,
            transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
            minWidth: '60px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: activeIndex === index
              ? (isDark ? '#fff' : '#1e293b')
              : (isDark ? '#292929' : '#e2e8f0'),
            backgroundColor: isDark ? '#18181b' : '#f8fafc',
            boxShadow: activeIndex === index
              ? '0 20px 60px rgba(0,0,0,0.50)'
              : '0 10px 30px rgba(0,0,0,0.20)',
            flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
            zIndex: activeIndex === index ? 10 : 1,
            willChange: 'flex-grow, box-shadow, background-size',
          }"
          @click="handleOptionClick(index)"
        >
          <!-- Bottom shadow overlay -->
          <div
            class="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
            :style="{
              bottom: activeIndex === index ? '0' : '-40px',
              height: '120px',
              boxShadow: activeIndex === index
                ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000'
                : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000',
            }"
          />

          <!-- Label -->
          <div class="absolute left-0 right-0 bottom-5 flex items-center gap-3 z-10 pointer-events-none px-4 w-full">
            <!-- Icon circle -->
            <div class="min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(20,20,20,0.85)] dark:bg-[rgba(255,255,255,0.85)] backdrop-blur-[10px] shadow border-2 border-[#444] dark:border-slate-300 flex-shrink-0 transition-all duration-200">
              <!-- Camera icon — Lifeguard -->
              <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" class="dark:stroke-slate-900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              <!-- Tooth icon — Lírios Odonto -->
              <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" class="dark:stroke-slate-900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2C8 2 5 5 5 8c0 2 .5 3.5 1 5l2 9h2l1-5 1 5h2l2-9c.5-1.5 1-3 1-5 0-3-3-6-6-6z"/>
              </svg>
              <!-- ShoppingBag icon — Loja de Aplicativos -->
              <svg v-else-if="index === 2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" class="dark:stroke-slate-900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <!-- Activity icon — Sistema Pilates -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" class="dark:stroke-slate-900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>

            <!-- Text info -->
            <div class="text-white overflow-hidden">
              <div
                class="font-bold text-lg transition-all duration-700 ease-in-out whitespace-nowrap"
                :style="{
                  opacity: activeIndex === index ? 1 : 0,
                  transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                }"
              >
                {{ project.title }}
              </div>
              <div
                class="text-sm text-gray-300 transition-all duration-700 ease-in-out whitespace-nowrap"
                :style="{
                  opacity: activeIndex === index ? 1 : 0,
                  transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                }"
              >
                {{ project.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active project tech badge -->
    <div class="flex justify-center mt-6 px-4">
      <Transition name="badge-fade" mode="out-in">
        <div
          :key="activeIndex"
          :style="fontInter"
          class="flex items-center gap-2 text-xs text-white/60 dark:text-slate-900/60"
        >
          <span class="text-white/30 dark:text-slate-900/30">{{ projects[activeIndex].company }}</span>
          <span class="text-white/20 dark:text-slate-900/20">·</span>
          <span>{{ projects[activeIndex].tech }}</span>
        </div>
      </Transition>
    </div>

  </section>
</template>

<style scoped>
.animate-fade-in-top {
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInFromTop 0.8s ease-in-out forwards;
}

@keyframes fadeInFromTop {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.option {
  transition:
    flex-grow 0.7s ease-in-out,
    box-shadow 0.7s ease-in-out,
    background-size 0.7s ease-in-out,
    opacity 0.5s ease,
    transform 0.5s ease,
    border-color 0.4s ease;
}

.badge-fade-enter-active,
.badge-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.badge-fade-enter-from,
.badge-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
