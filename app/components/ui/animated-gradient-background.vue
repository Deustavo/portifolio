<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  startingGap?: number
  breathing?: boolean
  gradientColors?: string[]
  gradientStops?: number[]
  animationSpeed?: number
  breathingRange?: number
  containerStyle?: Record<string, string>
  containerClassName?: string
  topOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  startingGap: 125,
  breathing: false,
  gradientColors: () => [
    '#0A0A0A',
    '#2979FF',
    '#FF80AB',
    '#FF6D00',
    '#FFD600',
    '#00E676',
    '#3D5AFE',
  ],
  gradientStops: () => [35, 50, 60, 70, 80, 90, 100],
  animationSpeed: 0.02,
  breathingRange: 5,
  containerStyle: () => ({}),
  containerClassName: '',
  topOffset: 0,
})

const containerRef = ref<HTMLDivElement | null>(null)
let animationFrame: number

const startAnimation = () => {
  let width = props.startingGap
  let directionWidth = 1

  const animate = () => {
    if (width >= props.startingGap + props.breathingRange) directionWidth = -1
    if (width <= props.startingGap - props.breathingRange) directionWidth = 1

    if (!props.breathing) directionWidth = 0
    width += directionWidth * props.animationSpeed

    const gradientStopsString = props.gradientStops
      .map((stop, index) => `${props.gradientColors[index]} ${stop}%`)
      .join(', ')

    const gradient = `radial-gradient(${width}% ${width + props.topOffset}% at 50% 20%, ${gradientStopsString})`

    if (containerRef.value) {
      containerRef.value.style.background = gradient
    }

    animationFrame = requestAnimationFrame(animate)
  }

  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => startAnimation())
onUnmounted(() => cancelAnimationFrame(animationFrame))

watch(
  () => [props.startingGap, props.breathing, props.gradientColors, props.gradientStops, props.animationSpeed, props.breathingRange, props.topOffset],
  () => {
    cancelAnimationFrame(animationFrame)
    startAnimation()
  },
)
</script>

<template>
  <Motion
    :initial="{ opacity: 0, scale: 1.5 }"
    :animate="{
      opacity: 1,
      scale: 1,
      transition: { duration: 2, ease: [0.25, 0.1, 0.25, 1] },
    }"
    :class="`absolute inset-0 overflow-hidden ${containerClassName}`"
  >
    <div
      ref="containerRef"
      :style="containerStyle"
      class="absolute inset-0 transition-transform"
    />
  </Motion>
</template>
