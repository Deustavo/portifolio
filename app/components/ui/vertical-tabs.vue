<template>
  <section class="w-full bg-black dark:bg-white py-8 md:py-16 lg:py-24">
    <div class="w-full px-4 md:px-8 lg:px-12 xl:px-20 mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        <!-- Left Column: Tabs -->
        <div class="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4 pl-6">
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
              <div class="absolute left-[-24px] top-0 bottom-0 w-[2px] bg-white/20 dark:bg-slate-900/20">
                <div
                  v-if="activeIndex === index && !isPaused"
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
                    class="text-white/60 dark:text-slate-900/60 text-sm md:text-base leading-relaxed max-w-sm pb-2"
                  >
                    {{ service.description[lang] }}
                  </p>
                </Transition>
              </div>
            </button>
          </div>
        </div>

        <!-- Right Column: Image -->
        <div class="lg:col-span-7 order-1 lg:order-2">
          <div
            class="relative"
            @mouseenter="isPaused = true"
            @mouseleave="isPaused = false"
          >
            <div
              class="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[16/11] max-h-[600px] rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-slate-900/20 cursor-pointer"
              @click="handleNext"
            >
              <Transition :name="transitionName">
                <img
                  :key="activeIndex"
                  :src="services[activeIndex].image"
                  :alt="services[activeIndex].title[lang]"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </Transition>

              <!-- Gradient overlay -->
              <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />

              <!-- Navigation buttons -->
              <div class="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                <button
                  @click.stop="handlePrev"
                  class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 dark:bg-white/50 backdrop-blur-md border border-white/30 dark:border-slate-900/30 flex items-center justify-center text-white dark:text-slate-900 hover:bg-black/70 dark:hover:bg-white/70 transition-all active:scale-90"
                  aria-label="Anterior"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  @click.stop="handleNext"
                  class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 dark:bg-white/50 backdrop-blur-md border border-white/30 dark:border-slate-900/30 flex items-center justify-center text-white dark:text-slate-900 hover:bg-black/70 dark:hover:bg-white/70 transition-all active:scale-90"
                  aria-label="Próximo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useLang } from '~/composables/useLang'

const AUTO_PLAY_DURATION = 5000

const { lang } = useLang()

const i18n = {
  pt: {
    heading: 'Como posso te ajudar',
    tag: '(SERVIÇOS)',
  },
  en: {
    heading: 'How can I help you',
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
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200',
  },
  {
    id: '02',
    title: { pt: 'Sistemas de gerenciamento', en: 'Management Systems' },
    description: {
      pt: 'Aplicações web sob medida para automatizar processos, gerenciar dados e otimizar a operação do seu negócio.',
      en: 'Custom web applications to automate processes, manage data, and streamline your business operations.',
    },
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200',
  },
  {
    id: '03',
    title: { pt: 'Engenharia de software', en: 'Software Engineering' },
    description: {
      pt: 'Consultoria técnica, arquitetura e desenvolvimento de soluções robustas e escaláveis para desafios complexos.',
      en: 'Technical consulting, architecture, and development of robust, scalable solutions for complex challenges.',
    },
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200',
  },
]

const activeIndex = ref(0)
const direction = ref(1)
const isPaused = ref(false)
const progressKey = ref(0)

const transitionName = computed(() => direction.value > 0 ? 'slide-up' : 'slide-down')

const handleNext = () => {
  direction.value = 1
  activeIndex.value = (activeIndex.value + 1) % services.length
  progressKey.value++
}

const handlePrev = () => {
  direction.value = -1
  activeIndex.value = (activeIndex.value - 1 + services.length) % services.length
  progressKey.value++
}

const handleTabClick = (index: number) => {
  if (index === activeIndex.value) return
  direction.value = index > activeIndex.value ? 1 : -1
  activeIndex.value = index
  isPaused.value = false
  progressKey.value++
}

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  watch([activeIndex, isPaused], () => {
    if (interval) clearInterval(interval)
    if (!isPaused.value) {
      interval = setInterval(handleNext, AUTO_PLAY_DURATION)
    }
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

/* Image slide up (next) */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
  position: absolute !important;
  inset: 0;
  width: 100%;
  height: 100%;
}
.slide-up-enter-from { transform: translateY(-100%); opacity: 0; }
.slide-up-leave-to  { transform: translateY(100%);  opacity: 0; }

/* Image slide down (prev) */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
  position: absolute !important;
  inset: 0;
  width: 100%;
  height: 100%;
}
.slide-down-enter-from { transform: translateY(100%);  opacity: 0; }
.slide-down-leave-to  { transform: translateY(-100%); opacity: 0; }

/* Progress bar fill */
@keyframes progress-fill {
  from { height: 0% }
  to   { height: 100% }
}
.progress-fill {
  animation: progress-fill linear forwards;
}
</style>
