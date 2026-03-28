<template>
  <section id="services" class="w-full bg-black dark:bg-white py-8 md:py-16 lg:py-24">
    <div class="w-full max-w-3xl px-4 md:px-8 mx-auto">

      <div class="space-y-1 mb-12">
        <h2
          :style="fontHeadline"
          class="tracking-tighter text-balance text-3xl font-medium md:text-4xl lg:text-5xl text-white dark:text-slate-900"
        >
          {{ i18n[lang].heading }}
        </h2>
        <span
          :style="fontInter"
          class="text-[10px] font-medium text-white/50 dark:text-slate-900/50 uppercase tracking-[0.3em] block ml-0.5"
        >
          {{ i18n[lang].tag }}
        </span>
      </div>

      <div class="flex flex-col">
        <button
          v-for="(service, index) in services"
          :key="service.id"
          @click="handleTabClick(index)"
          class="relative flex items-start gap-4 py-6 md:py-8 text-left transition-all duration-500 border-t border-white/20 dark:border-slate-900/20"
          :class="[
            index === 0 ? 'border-t-0' : '',
            activeIndex === index
              ? 'text-white dark:text-slate-900'
              : 'text-white/40 dark:text-slate-900/40 hover:text-white/80 dark:hover:text-slate-900/80'
          ]"
        >
          <!-- Progress bar -->
          <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-white/20 dark:bg-slate-900/20">
            <div
              v-if="activeIndex === index"
              :key="`progress-${index}-${progressKey}`"
              class="absolute top-0 left-0 w-full bg-white dark:bg-slate-900 progress-fill"
              :style="{ animationDuration: AUTO_PLAY_DURATION + 'ms' }"
            />
          </div>

          <span :style="fontInter" class="text-[9px] md:text-[10px] font-medium mt-1 tabular-nums opacity-50">
            /{{ service.id }}
          </span>

          <div class="flex flex-col gap-2 flex-1">
            <span
              :style="fontHeadline"
              class="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight"
            >
              {{ service.title[lang] }}
            </span>

            <Transition name="expand">
              <p
                v-if="activeIndex === index"
                :style="fontInter"
                class="text-white/60 dark:text-slate-900/60 text-sm md:text-base leading-relaxed max-w-xl pb-2"
              >
                {{ service.description[lang] }}
              </p>
            </Transition>
          </div>
        </button>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useLang } from '~/composables/useLang'

const AUTO_PLAY_DURATION = 5000

const { lang } = useLang()

const i18n = {
  pt: {
    heading: 'Como posso te ajudar',
    tag: '(SERVIÇOS)',
  },
  en: {
    heading: 'Ways I can help you',
    tag: '(SERVICES)',
  },
}

const services = [
  {
    id: '01',
    title: { pt: 'Site institucional', en: 'Institutional Website' },
    description: {
      pt: 'Desenvolvimento de websites profissionais que comunicam a identidade da sua empresa com design moderno e alta performance.',
      en: "Professional websites that communicate your company's identity with modern design and outstanding performance.",
    },
  },
  {
    id: '02',
    title: { pt: 'Sistemas de gerenciamento', en: 'Management Systems' },
    description: {
      pt: 'Aplicações web sob medida para automatizar processos, gerenciar dados e otimizar a operação do seu negócio.',
      en: 'Custom web applications to automate processes, manage data, and streamline your business operations.',
    },
  },
  {
    id: '03',
    title: { pt: 'Engenharia de software', en: 'Software Engineering' },
    description: {
      pt: 'Consultoria técnica, arquitetura e desenvolvimento de soluções robustas e escaláveis para desafios complexos.',
      en: 'Technical consulting, architecture, and development of robust, scalable solutions for complex challenges.',
    },
  },
]

const activeIndex = ref(0)
const progressKey = ref(0)

const handleNext = () => {
  activeIndex.value = (activeIndex.value + 1) % services.length
  progressKey.value++
}

const handleTabClick = (index: number) => {
  if (index === activeIndex.value) return
  activeIndex.value = index
  progressKey.value++
}

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  watch(activeIndex, () => {
    if (interval) clearInterval(interval)
    interval = setInterval(handleNext, AUTO_PLAY_DURATION)
  }, { immediate: true })
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

const fontInter = { fontFamily: "'Inter', sans-serif" }
const fontHeadline = { fontFamily: "'Playfair Display', serif" }
</script>

<style scoped>
/* Description expand/collapse */
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.3s ease, max-height 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  max-height: 200px;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

/* Progress bar fill */
@keyframes progress-fill {
  from { height: 0% }
  to   { height: 100% }
}
.progress-fill {
  animation: progress-fill linear forwards;
}
</style>
