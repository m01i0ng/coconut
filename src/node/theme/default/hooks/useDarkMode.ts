import { useEffect, useState } from 'react'

const APPEARANCE_KEY = 'coconut:appearance'

const getUserPreference = (): 'light' | 'dark' => {
  const theme = localStorage.getItem(APPEARANCE_KEY)
  if (theme) return theme === 'dark' ? 'dark' : 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setClass = (isDark: boolean): void => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement
    isDark ? root.classList.add('dark') : root.classList.remove('dark')
    localStorage.setItem(APPEARANCE_KEY, isDark ? 'dark' : 'light')
  }
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const userPreference = getUserPreference()
    setIsDark(userPreference === 'dark')
    setClass(userPreference === 'dark')
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    setClass(!isDark)
  }

  return { isDark, toggleDarkMode }
}

export default useDarkMode
