import { useEffect, useState } from 'react'

type ThemePreference = 'system' | 'light' | 'dark'
const storageKey = 'portfolio-theme'

function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Storage can be blocked; system preference still works.
  }
  return 'system'
}

export function useTheme() {
  const [preference, setPreference] = useState(readPreference)

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      document.documentElement.dataset.theme = preference === 'system'
        ? (system.matches ? 'dark' : 'light')
        : preference
    }
    apply()
    if (preference !== 'system') return
    system.addEventListener('change', apply)
    return () => system.removeEventListener('change', apply)
  }, [preference])

  function changeTheme(value: ThemePreference) {
    setPreference(value)
    try {
      if (value === 'system') localStorage.removeItem(storageKey)
      else localStorage.setItem(storageKey, value)
    } catch {
      // Keep the selected theme for this visit when storage is unavailable.
    }
  }

  return { preference, changeTheme }
}
