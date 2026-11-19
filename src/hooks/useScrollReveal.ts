import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') return
    let observer: IntersectionObserver | undefined
    try {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          observer?.unobserve(entry.target)
        }
      }, { rootMargin: '0px 0px -48px 0px', threshold: 0 })
      document.querySelectorAll('[data-reveal]').forEach((section) => observer?.observe(section))
    } catch {
      observer?.disconnect()
      return
    }
    return () => observer?.disconnect()
  }, [])
}
