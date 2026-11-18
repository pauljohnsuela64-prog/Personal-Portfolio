import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })))
})

afterEach(() => vi.unstubAllGlobals())

describe('portfolio navigation', () => {
  it('renders an accessible main landmark with the portfolio heading', () => {
    render(<App />)

    expect(
      within(screen.getByRole('main')).getByRole('heading', {
        level: 1,
        name: 'Personal Portfolio',
      }),
    ).toBeInTheDocument()
  })

  it('explains that the portfolio is under development', () => {
    render(<App />)

    expect(screen.getByText(/under development/i)).toBeVisible()
  })

  it('links all six desktop navigation items to labeled sections', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    for (const name of ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']) {
      const link = within(nav).getByRole('link', { name })
      expect(link).toHaveAttribute('href', `#${name.toLowerCase()}`)
      expect(document.getElementById(name.toLowerCase())).toHaveAttribute('aria-labelledby')
    }
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
  })

  it('opens and closes the mobile menu and closes on Escape with focus restored', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument()
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const mobile = screen.getByRole('navigation', { name: 'Mobile' })
    expect(toggle).toHaveAttribute('aria-controls', mobile.id)
    within(mobile).getByRole('link', { name: 'About' }).focus()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
    fireEvent.click(toggle)
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes on mobile navigation and focuses the section destination', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Menu' })
    fireEvent.click(toggle)
    fireEvent.click(within(screen.getByRole('navigation', { name: 'Mobile' })).getByRole('link', { name: 'Projects' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('projects')).toHaveFocus()
  })

  it('dismisses the mobile menu on outside interaction or when focus leaves the header', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Menu' })
    fireEvent.click(toggle)
    fireEvent.pointerDown(screen.getByRole('main'))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(toggle)
    fireEvent.blur(toggle, { relatedTarget: screen.getByRole('main') })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it.each(['link', 'toggle'])('resets the mobile menu and preserves %s focus at the desktop breakpoint', (focused) => {
    let desktop = false
    let resize: (() => void) | undefined
    vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
      get matches() { return query.includes('min-width') && desktop },
      addEventListener: (_: string, listener: () => void) => {
        if (query.includes('min-width')) resize = listener
      },
      removeEventListener: vi.fn(),
    })))
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Menu' })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const destination = focused === 'link' ? 'About' : 'Home'
    if (focused === 'link') within(screen.getByRole('navigation', { name: 'Mobile' })).getByRole('link', { name: destination }).focus()
    else toggle.focus()
    desktop = true
    act(() => resize?.())
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(within(screen.getByRole('navigation', { name: 'Primary' })).getByRole('link', { name: destination })).toHaveFocus()
  })
})
