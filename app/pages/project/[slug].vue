<script setup lang="ts">
const route = useRoute()
const { getProjectBySlug } = useProjects()
const { lang } = useLang()
const { isDark } = useTheme()

const slug = computed(() => String(route.params.slug))
const project = computed(() => getProjectBySlug(slug.value))

const i18n = {
  pt: {
    back: 'Voltar',
    notFound: 'Projeto não encontrado.',
    visit: 'Ver projeto',
  },
  en: {
    back: 'Back',
    notFound: 'Project not found.',
    visit: 'Visit project',
  },
}

const fontHeadline = { fontFamily: "'Playfair Display', serif" }
const fontInter = { fontFamily: "'Inter', sans-serif" }

useHead(() => ({
  title: project.value
    ? `${project.value.title} — Gustavo Andrade`
    : "Gustavo Andrade's portfolio",
}))
</script>

<template>
  <section
    class="min-h-screen w-full bg-black dark:bg-white py-20 px-4"
  >
    <div class="max-w-3xl mx-auto">
      <NuxtLink
        to="/"
        :style="fontInter"
        class="inline-flex items-center gap-2 text-sm text-white/60 dark:text-slate-900/60 hover:text-white dark:hover:text-slate-900 transition-colors mb-8"
      >
        <span aria-hidden="true">←</span>
        {{ i18n[lang].back }}
      </NuxtLink>

      <div v-if="project">
        <img
          :src="project.image"
          :alt="project.title"
          class="w-full rounded-xl border-2 border-white/10 dark:border-slate-900/10 mb-8 object-cover"
        >

        <h1
          :style="fontHeadline"
          class="text-3xl md:text-4xl font-semibold text-white dark:text-slate-900 tracking-tight mb-2"
        >
          {{ project.title }}
        </h1>

        <p :style="fontInter" class="text-sm text-white/40 dark:text-slate-900/60 mb-6">
          {{ project.company }} · {{ project.tech }}
        </p>

        <p :style="fontInter" class="text-base leading-relaxed text-white/80 dark:text-slate-900/80 mb-8">
          {{ project.summary[lang] }}
        </p>

        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          :style="fontInter"
          class="inline-flex items-center gap-2 text-sm text-white dark:text-slate-900 underline underline-offset-4"
        >
          {{ i18n[lang].visit }}
        </a>
      </div>

      <p v-else :style="fontInter" class="text-white/60 dark:text-slate-900/60">
        {{ i18n[lang].notFound }}
      </p>
    </div>
  </section>
</template>
