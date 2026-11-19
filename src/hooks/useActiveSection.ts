import { useEffect, useState } from 'react'
import { sectionNames } from '../content/navigation'

export function useActiveSection() {
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const sections = sectionNames.map((name) => document.getElementById(name.toLowerCase()))
    let frame = 0
    function update() {
      const headerOffset = (document.querySelector('header')?.getBoundingClientRect().height ?? 88) + 24
      const anchorOffset = Number.parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      const offset = Math.max(headerOffset, anchorOffset) + 2
      let current = 'home'
      for (const section of sections) {
        const rect = section?.getBoundingClientRect()
        if (section && rect && rect.height > 0 && rect.top <= offset) current = section.id
      }
      const height = document.documentElement.scrollHeight
      if (window.scrollY > 0 && height > window.innerHeight && window.scrollY + window.innerHeight >= height - 2) current = 'contact'
      setActiveId(current)
    }
    function schedule() {
      if (frame) return
      frame = window.requestAnimationFrame(() => { frame = 0; update() })
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
    }
  }, [])

  return activeId
}
