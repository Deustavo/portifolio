import { ref } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const toggleDark = () => {
    isDark.value = !isDark.value
  }
  return { isDark, toggleDark }
}
