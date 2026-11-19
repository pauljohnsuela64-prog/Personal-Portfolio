import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Button } from './Button'
import { Container } from './Container'
import { sectionNames } from '../content/navigation'
import { useActiveSection } from '../hooks/useActiveSection'

export function Header() {
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const { preference, changeTheme } = useTheme()
  const activeId = useActiveSection()

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)')
    const close = () => {
      if (!desktop.matches) return
      const active = document.activeElement
      if (active === toggle.current || header.current?.querySelector('.mobile-navigation')?.contains(active)) {
        const href = active instanceof HTMLAnchorElement ? active.getAttribute('href') : '#home'
        header.current?.querySelector<HTMLAnchorElement>(`.desktop-navigation a[href="${href}"]`)?.focus()
      }
      setOpen(false)
    }
    desktop.addEventListener('change', close)
    return () => desktop.removeEventListener('change', close)
  }, [])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  function navigate(id: string) {
    setOpen(false)
    document.getElementById(id)?.focus({ preventScroll: true })
  }

  const links = sectionNames.map((name) => (
    <li key={name}>
      <a href={`#${name.toLowerCase()}`} aria-current={activeId === name.toLowerCase() ? 'location' : undefined}
        onClick={() => navigate(name.toLowerCase())}>{name}</a>
    </li>
  ))

  return (
    <header className="site-header" ref={header} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}>
      <Container className="header-inner">
        <a className="brand" href="#home" onClick={() => navigate('home')} aria-label="Portfolio home">
          <span className="brand-mark" aria-hidden="true">/</span>
          <span>PORTFOLIO<span className="brand-dot">.</span></span>
        </a>
        <nav className="desktop-navigation" aria-label="Primary"><ul>{links}</ul></nav>
        <div className="header-controls">
          <label className="theme-control">
            <span className="sr-only">Color theme</span>
            <select value={preference} onChange={(event) => {
              const value = event.target.value
              if (value === 'system' || value === 'light' || value === 'dark') changeTheme(value)
            }}>
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <Button variant="secondary" className="menu-toggle" ref={toggle}
            aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            Menu <span aria-hidden="true">{open ? '−' : '+'}</span>
          </Button>
        </div>
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile" hidden={!open}>
          <ul>{links}</ul>
        </nav>
      </Container>
    </header>
  )
}
