<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Project } from '~/composables/useProjects'

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{ close: [] }>()

const { lang } = useLang()

const i18n = {
  pt: { close: 'Fechar', visit: 'Ver projeto' },
  en: { close: 'Close', visit: 'Visit project' },
}

const fontHeadline = { fontFamily: "'Playfair Display', serif" }
const fontInter = { fontFamily: "'Inter', sans-serif" }

const visible = ref(true)

function handleClose() {
  visible.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') handleClose()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade" appear @after-leave="emit('close')">
      <div
        v-if="visible"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 md:p-6"
        @click.self="handleClose"
      >
        <div
          class="modal-panel relative w-full h-full max-w-6xl overflow-y-auto rounded-xl border-2 border-white/40 bg-black shadow-2xl"
        >
          <button
            type="button"
            :aria-label="i18n[lang].close"
            class="fixed md:absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-black/80 text-white shadow-lg backdrop-blur-sm hover:bg-black hover:border-white transition-colors"
            @click="handleClose"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div class="relative w-full aspect-[16/9] md:aspect-[21/9] bg-black">
            <img
              :src="props.project.modalImage"
              :alt="props.project.title"
              class="absolute inset-0 h-full w-full object-cover"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          </div>

          <div class="mx-auto max-w-3xl px-6 py-10 md:px-10">
            <h3
              :style="fontHeadline"
              class="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-2"
            >
              {{ props.project.title }}
            </h3>

            <p :style="fontInter" class="text-sm text-white/40 mb-6">
              {{ props.project.company }} · {{ props.project.tech }}
            </p>

            <p :style="fontInter" class="text-base md:text-lg leading-relaxed text-white/80 mb-8">
              {{ props.project.summary[lang] }}
            </p>

            <a
              v-if="props.project.link"
              :href="props.project.link"
              target="_blank"
              rel="noopener noreferrer"
              :style="fontInter"
              class="inline-flex items-center gap-2 text-sm text-white underline underline-offset-4"
            >
              {{ i18n[lang].visit }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-panel,
.modal-fade-leave-active .modal-panel {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-fade-enter-from .modal-panel,
.modal-fade-leave-to .modal-panel {
  opacity: 0;
  transform: scale(0.97) translateY(8px);
}
</style>
