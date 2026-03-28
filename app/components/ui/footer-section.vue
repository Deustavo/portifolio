<script setup lang="ts">
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-vue-next'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const { lang } = useLang()
const { isDark } = useTheme()

const contact = {
  email: 'gustavorandrade.dev@gmail.com',
  github: 'https://github.com/deustavo',
  linkedin: 'https://linkedin.com/in/gustavoandrade00',
}

const fontInter = { fontFamily: "'Inter', sans-serif" }
const fontHeadline = { fontFamily: "'Playfair Display', serif" }

const copy = computed(() => ({
  headline: lang.value === 'pt' ? 'Vamos construir algo juntos.' : "Let's build something together.",
  sub: lang.value === 'pt'
    ? 'Aberto a novas oportunidades e colaborações.'
    : 'Open to new opportunities and collaborations.',
  cta: lang.value === 'pt' ? 'Entrar em contato' : 'Get in touch',
  rights: lang.value === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.',
}))

const gradientColors = computed(() =>
  isDark.value
    ? ['#ffffff', '#f5f5ff', '#f0f4ff', '#f5f0ff', '#f0f5ff', '#fafafa', '#ffffff']
    : ['#000000', '#0d0d1a', '#111827', '#1a0a2e', '#0f172a', '#050510', '#000000']
)

const topFadeStyle = computed(() => ({
  background: isDark.value
    ? 'linear-gradient(to bottom, #ffffff 0%, #ffffff 20%, transparent 100%)'
    : 'linear-gradient(to bottom, #000000 0%, #000000 20%, transparent 100%)',
}))

const gridOverlayStyle = computed(() => ({
  backgroundImage: isDark.value
    ? 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)'
    : 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
  backgroundSize: '60px 60px',
}))
</script>

<template>
  <footer class="relative overflow-hidden bg-black dark:bg-white" style="min-height: 60vh;">
    <!-- Animated gradient background -->
    <UiAnimatedGradientBackground
      :starting-gap="110"
      :breathing="true"
      :breathing-range="4"
      :animation-speed="0.015"
      :gradient-colors="gradientColors"
      :gradient-stops="[30, 45, 58, 70, 82, 92, 100]"
      :top-offset="10"
    />

    <!-- Top fade gradient -->
    <div class="absolute inset-x-0 top-0 h-48 z-10 pointer-events-none" :style="topFadeStyle" />

    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 opacity-[0.04]" :style="gridOverlayStyle" />

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full px-6 py-24 text-center" style="min-height: 60vh;">
      <!-- Cat lottie -->
      <DotLottieVue
        src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
        loop
        autoplay
        class="w-48 h-48 mb-2"
      />

      <!-- Headline -->
      <h2
        :style="{ ...fontHeadline, textShadow: '0 0 80px rgba(100,120,255,0.4)' }"
        class="text-4xl md:text-6xl font-semibold text-white dark:text-slate-900 tracking-tight mb-4 max-w-2xl"
      >
        {{ copy.headline }}
      </h2>

      <!-- Sub -->
      <p :style="fontInter" class="text-base text-white/40 dark:text-slate-900/40 mb-10">
        {{ copy.sub }}
      </p>

      <!-- CTA -->
      <a
        :href="`mailto:${contact.email}`"
        :style="fontInter"
        class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 dark:border-slate-900/20 text-white/80 dark:text-slate-900/80 text-sm font-medium hover:bg-white/10 dark:hover:bg-slate-900/10 hover:border-white/40 dark:hover:border-slate-900/40 hover:text-white dark:hover:text-slate-900 transition-all duration-300 backdrop-blur-sm"
      >
        {{ copy.cta }}
        <ArrowUpRight :size="16" />
      </a>

      <!-- Divider -->
      <div class="mt-16 mb-8 w-px h-12 bg-gradient-to-b from-transparent via-white/20 dark:via-slate-900/20 to-transparent" />

      <!-- Social links -->
      <div class="flex items-center gap-6 mb-12">
        <a
          :href="contact.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white/30 dark:text-slate-900/30 hover:text-white/80 dark:hover:text-slate-900/80 transition-colors duration-300"
          aria-label="GitHub"
        >
          <Github :size="20" />
        </a>
        <a
          :href="contact.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white/30 dark:text-slate-900/30 hover:text-white/80 dark:hover:text-slate-900/80 transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin :size="20" />
        </a>
        <a
          :href="`mailto:${contact.email}`"
          class="text-white/30 dark:text-slate-900/30 hover:text-white/80 dark:hover:text-slate-900/80 transition-colors duration-300"
          aria-label="Email"
        >
          <Mail :size="20" />
        </a>
      </div>

      <!-- Copyright -->
      <p :style="fontInter" class="text-xs text-white/20 dark:text-slate-900/20 tracking-wide">
        © {{ new Date().getFullYear() }} Gustavo Andrade — {{ copy.rights }}
      </p>
    </div>
  </footer>
</template>
