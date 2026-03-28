<template>
  <div class="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black dark:bg-white">
    <!-- Three.js canvas mount point -->
    <div ref="mountRef" class="absolute inset-0 z-0" />

    <!-- Navigation -->
    <Motion
      tag="nav"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ delay: 1, duration: 1 }"
      class="fixed top-0 left-0 right-0 z-50 p-6 bg-black/10 backdrop-blur-md border-b border-white/10 dark:bg-white/10 dark:border-slate-800/10"
    >
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img
            :src="isDark ? '/logo.svg' : '/logo_light.svg'"
            alt="Gustavo Andrade"
            class="h-6 w-6"
          />
        </div>

        <div class="flex items-center gap-3">
          <!-- Language toggle -->
          <button
            @click="toggleLang"
            class="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 dark:border-slate-800/30 dark:bg-slate-800/10 dark:text-slate-800 dark:hover:bg-slate-800/20"
            :style="fontInter"
          >
            {{ lang === 'pt' ? 'EN' : 'PT' }}
          </button>

          <!-- Theme toggle -->
          <button
            @click="toggleDark()"
            class="rounded-full border border-white/30 bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20 dark:border-slate-800/30 dark:bg-slate-800/10 dark:text-slate-800 dark:hover:bg-slate-800/20"
            :title="isDark ? t.lightMode : t.darkMode"
          >
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71m12.73 0-.71-.71M6.34 6.34l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </Motion>

    <!-- Hero content -->
    <div class="relative z-10 text-center px-4">
      <h1
        class="text-6xl md:text-8xl text-white dark:text-slate-900"
        :style="fontHeadline"
      >
        <template v-for="(word, wi) in headlineWords" :key="wi">
          <span class="inline-block">
            <Motion
              v-for="(char, ci) in word"
              :key="ci"
              tag="span"
              :initial="{ opacity: 0, y: 50 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: wi * 5 * 0.1 + ci * 0.1 + 1.5, duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }"
              style="display: inline-block"
            >{{ char }}</Motion>
          </span>
          <span v-if="wi < headlineWords.length - 1">&nbsp;</span>
        </template>
      </h1>

      <Motion
        tag="p"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 2.2, duration: 1.2 }"
        class="mx-auto mt-6 max-w-xl text-lg text-slate-300 dark:text-slate-600"
        :style="fontInter"
      >
        {{ t.subtitle }}
      </Motion>

      <Motion
        tag="div"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 2.5, duration: 1 }"
        class="mt-10"
      >
        <button
          class="rounded-full border-2 border-white/20 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 dark:border-slate-800/20 dark:bg-slate-800/5 dark:text-slate-800 dark:hover:bg-slate-800/10"
          :style="fontInter"
          @click="scrollToServices"
        >
          {{ t.cta }}
        </button>
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLang } from '~/composables/useLang'
import { Motion } from 'motion-v'
import * as THREE from 'three'

// Theme
// isDark = true → classe 'dark' ativa → visual claro (branco) neste design
// isDark = false → sem classe 'dark' → visual escuro (preto) — estado inicial desejado
const { isDark, toggleDark } = useTheme()

const scrollToServices = () => {
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
}

useHead({
  htmlAttrs: computed(() => ({ class: isDark.value ? 'dark' : '' }))
})

// Language
const { lang, toggleLang } = useLang()

const translations = {
  pt: {
    subtitle: 'Engenheiro de software — Especialista front-end',
    cta: 'Explorar portfólio',
    darkMode: 'Modo escuro',
    lightMode: 'Modo claro',
  },
  en: {
    subtitle: 'Software Engineer — Front-end Specialist',
    cta: 'Explore portfolio',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
  },
}

const t = computed(() => translations[lang.value])

const headline = 'Gustavo Andrade'
const headlineWords = computed(() => headline.split(' ').map(w => w.split('')))

const fontInter = { fontFamily: "'Inter', sans-serif" }
const fontHeadline = { fontFamily: "'Playfair Display', serif", textShadow: '0 0 50px rgba(255, 255, 255, 0.3)' }

const mountRef = ref<HTMLDivElement | null>(null)

let animationId = 0
let disposeScene: (() => void) | null = null

onMounted(() => {
  // Load Google Fonts
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  if (!mountRef.value) return

  // Scene setup
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  mountRef.value.appendChild(renderer.domElement)

  const mouse = new THREE.Vector2(0, 0)
  const clock = new THREE.Clock()
  const isDarkMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false

  // Particle system
  const particleCount = 50000
  const positions = new Float32Array(particleCount * 3)
  const originalPositions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const velocities = new Float32Array(particleCount * 3)

  const geometry = new THREE.BufferGeometry()
  const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32)
  const torusPos = torusKnot.attributes.position as THREE.BufferAttribute

  for (let i = 0; i < particleCount; i++) {
    const vertexIndex = i % torusPos.count
    const x = torusPos.getX(vertexIndex)
    const y = torusPos.getY(vertexIndex)
    const z = torusPos.getZ(vertexIndex)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    originalPositions[i * 3] = x
    originalPositions[i * 3 + 1] = y
    originalPositions[i * 3 + 2] = z

    const color = new THREE.Color()
    color.setHSL(Math.random(), 0.8, isDarkMode ? 0.5 : 0.7)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    blending: isDarkMode ? THREE.NormalBlending : THREE.AdditiveBlending,
    transparent: true,
    opacity: isDarkMode ? 1.0 : 0.8,
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  const handleMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', handleMouseMove)

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const elapsedTime = clock.getElapsedTime()
    const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0)

    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      const currentPos = new THREE.Vector3(positions[ix], positions[iy], positions[iz])
      const originalPos = new THREE.Vector3(originalPositions[ix], originalPositions[iy], originalPositions[iz])
      const velocity = new THREE.Vector3(velocities[ix], velocities[iy], velocities[iz])

      const dist = currentPos.distanceTo(mouseWorld)
      if (dist < 1.5) {
        const force = (1.5 - dist) * 0.01
        const direction = new THREE.Vector3().subVectors(currentPos, mouseWorld).normalize()
        velocity.add(direction.multiplyScalar(force))
      }

      const returnForce = new THREE.Vector3().subVectors(originalPos, currentPos).multiplyScalar(0.001)
      velocity.add(returnForce)
      velocity.multiplyScalar(0.95)

      positions[ix] = (positions[ix] ?? 0) + velocity.x
      positions[iy] = (positions[iy] ?? 0) + velocity.y
      positions[iz] = (positions[iz] ?? 0) + velocity.z
      velocities[ix] = velocity.x
      velocities[iy] = velocity.y
      velocities[iz] = velocity.z
    }

    const posAttr = geometry.attributes.position as THREE.BufferAttribute
    posAttr.needsUpdate = true
    points.rotation.y = elapsedTime * 0.05
    renderer.render(scene, camera)
  }
  animate()

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', handleResize)

  disposeScene = () => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    if (mountRef.value?.contains(renderer.domElement)) {
      mountRef.value.removeChild(renderer.domElement)
    }
    renderer.dispose()
    geometry.dispose()
    material.dispose()
    torusKnot.dispose()
    document.head.removeChild(link)
  }
})

onUnmounted(() => {
  disposeScene?.()
})
</script>
