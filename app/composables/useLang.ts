import { ref } from 'vue'

const lang = ref<'pt' | 'en'>('pt')

export function useLang() {
  const toggleLang = () => {
    lang.value = lang.value === 'pt' ? 'en' : 'pt'
  }
  return { lang, toggleLang }
}
