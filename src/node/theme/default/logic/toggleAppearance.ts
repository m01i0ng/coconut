const KEY = 'coconut:appearance'

const classList = document.documentElement.classList

const setClassList = (isDark = false) => {
  isDark ? classList.add('dark') : classList.remove('dark')
}

const updateAppearance = () => {
  const userPreference = localStorage.getItem(KEY)
  setClassList(userPreference === 'dark')
}

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  updateAppearance()
  window.addEventListener('storage', updateAppearance)
}

export function toggle() {
  if (classList.contains('dark')) {
    setClassList(false)
    localStorage.setItem(KEY, 'light')
  } else {
    setClassList(true)
    localStorage.setItem(KEY, 'dark')
  }
}
