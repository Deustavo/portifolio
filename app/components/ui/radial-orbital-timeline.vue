<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Component } from 'vue'
import { Zap, Link as LinkIcon, ArrowRight } from 'lucide-vue-next'
import { useLang } from '@/composables/useLang'

const { lang } = useLang()
const { isDark } = useTheme()

const fontInter = { fontFamily: "'Inter', sans-serif" }
const fontHeadline = { fontFamily: "'Playfair Display', serif" }

export interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: Component
  relatedIds: number[]
  status: 'completed' | 'in-progress' | 'pending'
  energy: number
}

const props = defineProps<{
  timelineData: TimelineItem[]
}>()

const expandedItems = ref<Record<number, boolean>>({})
const rotationAngle = ref<number>(0)
const autoRotate = ref<boolean>(true)
const showClickHint = ref<boolean>(true)
const pulseEffect = ref<Record<number, boolean>>({})
const centerOffset = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const activeNodeId = ref<number | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const orbitRef = ref<HTMLDivElement | null>(null)

let rotationTimer: ReturnType<typeof setInterval> | null = null

const startRotation = () => {
  if (rotationTimer) clearInterval(rotationTimer)
  rotationTimer = setInterval(() => {
    rotationAngle.value = Number(((rotationAngle.value + 0.3) % 360).toFixed(3))
  }, 50)
}

const stopRotation = () => {
  if (rotationTimer) {
    clearInterval(rotationTimer)
    rotationTimer = null
  }
}

onMounted(() => {
  watch(autoRotate, (val) => {
    if (val) startRotation()
    else stopRotation()
  }, { immediate: true })
})

onUnmounted(() => stopRotation())

const nodePositions = computed(() => {
  const total = props.timelineData.length
  return props.timelineData.map((_, index) => {
    const angle = ((index / total) * 360 + rotationAngle.value) % 360
    const radius = 200
    const radian = (angle * Math.PI) / 180
    const x = radius * Math.cos(radian) + centerOffset.value.x
    const y = radius * Math.sin(radian) + centerOffset.value.y
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))
    return { x, y, zIndex, opacity }
  })
})

const handleContainerClick = (e: MouseEvent) => {
  if (e.target === containerRef.value || e.target === orbitRef.value) {
    expandedItems.value = {}
    activeNodeId.value = null
    pulseEffect.value = {}
    autoRotate.value = true
  }
}

const getRelatedItems = (itemId: number): number[] => {
  const item = props.timelineData.find(i => i.id === itemId)
  return item ? item.relatedIds : []
}

const centerViewOnNode = (nodeId: number) => {
  const nodeIndex = props.timelineData.findIndex(i => i.id === nodeId)
  const total = props.timelineData.length
  const targetAngle = (nodeIndex / total) * 360
  rotationAngle.value = 270 - targetAngle
}

const toggleItem = (id: number) => {
  showClickHint.value = false
  const newState = { ...expandedItems.value }
  Object.keys(newState).forEach(key => {
    if (parseInt(key) !== id) newState[parseInt(key)] = false
  })
  newState[id] = !expandedItems.value[id]

  if (!expandedItems.value[id]) {
    activeNodeId.value = id
    autoRotate.value = false
    const related = getRelatedItems(id)
    const newPulse: Record<number, boolean> = {}
    related.forEach(relId => { newPulse[relId] = true })
    pulseEffect.value = newPulse
    centerViewOnNode(id)
  } else {
    activeNodeId.value = null
    autoRotate.value = true
    pulseEffect.value = {}
  }

  expandedItems.value = newState
}

const isRelatedToActive = (itemId: number): boolean => {
  if (!activeNodeId.value) return false
  return getRelatedItems(activeNodeId.value).includes(itemId)
}

const getStatusStyles = (status: TimelineItem['status']): string => {
  switch (status) {
    case 'completed': return 'text-white bg-black border-white dark:text-slate-900 dark:bg-white dark:border-slate-900'
    case 'in-progress': return 'text-black bg-white border-black dark:text-white dark:bg-slate-900 dark:border-slate-900'
    default: return 'text-white bg-black/40 border-white/50 dark:text-slate-900 dark:bg-white/40 dark:border-slate-900/50'
  }
}

const getStatusLabel = (status: TimelineItem['status']): string => {
  const labels = {
    pt: { completed: 'CONCLUÍDO', 'in-progress': 'ATUAL', pending: 'PENDENTE' },
    en: { completed: 'COMPLETED', 'in-progress': 'CURRENT', pending: 'PENDING' }
  }
  return labels[lang.value][status] ?? labels[lang.value].pending
}

const glowBackground = computed(() =>
  isDark.value
    ? 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)'
    : 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)'
)
</script>

<template>
  <div
    ref="containerRef"
    class="w-full h-screen flex flex-col items-center justify-center bg-black dark:bg-white overflow-hidden"
    @click="handleContainerClick"
  >
    <div class="relative w-full max-w-4xl h-full flex items-center justify-center">
      <div
        ref="orbitRef"
        class="absolute w-full h-full flex items-center justify-center"
        :style="{
          perspective: '1000px',
          transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`
        }"
      >
        <!-- Center orb -->
        <div class="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10 pointer-events-none">
          <div class="absolute w-20 h-20 rounded-full border border-white/20 dark:border-slate-900/40 animate-ping opacity-70"></div>
          <div class="absolute w-24 h-24 rounded-full border border-white/10 dark:border-slate-900/20 animate-ping opacity-50" style="animation-delay: 0.5s"></div>
          <div class="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-md"></div>
        </div>

        <!-- Orbit ring -->
        <div class="absolute w-96 h-96 rounded-full border border-white/10 dark:border-slate-900/20 pointer-events-none"></div>

        <!-- Nodes -->
        <div
          v-for="(item, index) in timelineData"
          :key="item.id"
          class="absolute transition-all duration-700 cursor-pointer"
          :style="{
            transform: `translate(${nodePositions[index]?.x ?? 0}px, ${nodePositions[index]?.y ?? 0}px)`,
            zIndex: expandedItems[item.id] ? 200 : (nodePositions[index]?.zIndex ?? 100),
            opacity: expandedItems[item.id] ? 1 : (nodePositions[index]?.opacity ?? 1)
          }"
          @click.stop="toggleItem(item.id)"
        >
          <!-- Glow aura -->
          <div
            class="absolute rounded-full"
            :class="{ 'animate-pulse': pulseEffect[item.id] }"
            :style="{
              background: glowBackground,
              width: `${item.energy * 0.5 + 40}px`,
              height: `${item.energy * 0.5 + 40}px`,
              left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
              top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
            }"
          ></div>

          <!-- Icon circle -->
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300"
            :class="[
              expandedItems[item.id]
                ? 'bg-white text-black border-white shadow-lg scale-150 dark:bg-slate-900 dark:text-white dark:border-slate-900'
                : isRelatedToActive(item.id)
                ? 'bg-white/50 text-black border-white animate-pulse dark:bg-slate-900/50 dark:text-white dark:border-slate-900'
                : 'bg-black text-white border-white/40 dark:bg-white dark:text-slate-900 dark:border-slate-900/60'
            ]"
          >
            <component :is="item.icon" :size="16" />
          </div>

          <!-- Label -->
          <div
            :style="fontInter"
            class="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300"
            :class="expandedItems[item.id] ? 'text-white dark:text-slate-900' : 'text-white/70 dark:text-slate-900/80'"
          >
            {{ item.title }}
          </div>

          <!-- Click hint tooltip (first item only) -->
          <Transition name="fade-up">
            <div
              v-if="showClickHint && index === 0"
              :style="fontInter"
              class="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
            >
              <div class="relative bg-white text-black dark:bg-slate-900 dark:text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg shadow-white/20 dark:shadow-slate-900/20 animate-bounce">
                {{ lang === 'pt' ? 'clique aqui' : 'click here' }}
                <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-slate-900"></div>
              </div>
            </div>
          </Transition>

          <!-- Expanded card -->
          <Transition name="fade-up">
            <div
              v-if="expandedItems[item.id]"
              class="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-black/90 dark:bg-white/90 backdrop-blur-lg border border-white/30 dark:border-slate-900/50 shadow-xl shadow-white/10 dark:shadow-slate-900/10 rounded-lg overflow-visible"
            >
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50 dark:bg-slate-900/50"></div>

              <div class="p-4 pb-2 space-y-2">
                <div class="flex justify-between items-center">
                  <span
                    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    :class="getStatusStyles(item.status)"
                  >
                    {{ getStatusLabel(item.status) }}
                  </span>
                  <span class="text-xs font-mono text-white/50 dark:text-slate-900/70">{{ item.date }}</span>
                </div>
                <h3 :style="fontHeadline" class="text-sm font-semibold text-white dark:text-slate-900 leading-snug">{{ item.title }}</h3>
                <p :style="fontInter" class="text-xs text-white/60 dark:text-slate-900/75 font-medium">{{ item.category }}</p>
              </div>

              <div :style="fontInter" class="px-4 pb-4 text-xs text-white/80 dark:text-slate-900/90 space-y-3">
                <p>{{ item.content }}</p>

                <!-- Energy bar -->
                <div class="pt-3 border-t border-white/10 dark:border-slate-900/20">
                  <div class="flex justify-between items-center mb-1">
                    <span class="flex items-center gap-1 text-white/60 dark:text-slate-900/70">
                      <Zap :size="10" />
                      {{ lang === 'pt' ? 'Nível de Experiência' : 'Experience Level' }}
                    </span>
                    <span class="font-mono text-white/60 dark:text-slate-900/70">{{ item.energy }}%</span>
                  </div>
                  <div class="w-full h-1 bg-white/10 dark:bg-slate-900/20 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                      :style="{ width: `${item.energy}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Related nodes -->
                <div v-if="item.relatedIds.length > 0" class="pt-3 border-t border-white/10 dark:border-slate-900/20">
                  <div class="flex items-center gap-1 mb-2">
                    <LinkIcon :size="10" class="text-white/50 dark:text-slate-900/70" />
                    <span class="text-xs uppercase tracking-wider text-white/50 dark:text-slate-900/70">{{ lang === 'pt' ? 'Próxima etapa' : 'Next step' }}</span>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <button
                      v-for="relatedId in item.relatedIds"
                      :key="relatedId"
                      class="flex items-center gap-1 h-6 px-2 text-xs border border-white/20 dark:border-slate-900/40 bg-transparent hover:bg-white/10 dark:hover:bg-slate-900/10 text-white/70 dark:text-slate-900/80 hover:text-white dark:hover:text-slate-900 transition-all rounded"
                      @click.stop="toggleItem(relatedId)"
                    >
                      {{ timelineData.find(i => i.id === relatedId)?.title }}
                      <ArrowRight :size="8" class="text-white/50 dark:text-slate-900/60" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
.fade-up-enter-to,
.fade-up-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
