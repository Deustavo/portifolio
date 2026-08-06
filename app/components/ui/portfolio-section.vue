<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { lang } = useLang()
const { isDark } = useTheme()
const { projects: projectList, getProjectBySlug } = useProjects()

const animatedCards = ref<number[]>([])
const timers: ReturnType<typeof setTimeout>[] = []

const selectedSlug = ref<string | null>(null)
const selectedProject = computed(() =>
  selectedSlug.value ? getProjectBySlug(selectedSlug.value) : null,
)

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

const projects = computed(() =>
  projectList.map((project) => ({
    ...project,
    description: project.description[lang.value],
  })),
)

onMounted(() => {
  projects.value.forEach((_, i) => {
    const t = setTimeout(() => {
      animatedCards.value = [...animatedCards.value, i]
    }, 90 * i)
    timers.push(t)
  })
})

onUnmounted(() => {
  timers.forEach(clearTimeout)
})
</script>

<template>
  <section id="portfolio" class="relative w-full bg-black dark:bg-white py-16 overflow-hidden">

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

    <!-- Square project cards grid -->
    <div class="max-w-5xl mx-auto px-4 md:px-8">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <button
          v-for="(project, index) in projects"
          :key="project.slug"
          type="button"
          class="project-card group flex flex-col text-left bg-transparent border-0 p-0 cursor-pointer"
          :style="{
            opacity: animatedCards.includes(index) ? 1 : 0,
            transform: animatedCards.includes(index) ? 'translateY(0)' : 'translateY(24px)',
          }"
          @click="selectedSlug = project.slug"
        >
          <div
            class="relative aspect-square w-full overflow-hidden rounded shadow-[0_4px_16px_rgba(17,17,26,0.08),0_8px_32px_rgba(17,17,26,0.08)]"
            :style="{ backgroundColor: isDark ? '#18181b' : '#f8fafc' }"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-20"
            >
          </div>
          <p
            :style="fontInter"
            class="mt-3 text-center text-sm md:text-base font-medium text-white dark:text-slate-900"
          >
            {{ project.title }}
          </p>
          <p
            :style="fontInter"
            class="text-center text-xs text-white/40 dark:text-slate-900/50"
          >
            {{ project.company }}
          </p>
        </button>
      </div>
    </div>

    <UiProjectModal
      v-if="selectedProject"
      :project="selectedProject"
      @close="selectedSlug = null"
    />

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

.project-card {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
</style>
