import html from '../index.html?raw'
import { fireEvent, render, screen, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

let systemDark = false
let onSystemChange: (() => void) | undefined

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  systemDark = false
  vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
    get matches() { return query.includes('prefers-color-scheme') && systemDark },
    addEventListener: (_: string, callback: () => void) => {
      if (query.includes('prefers-color-scheme')) onSystemChange = callback
    },
    removeEventListener: vi.fn(),
  })))
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  onSystemChange = undefined
})

describe('theme preference', () => {
  it('follows system preference until the user chooses a theme', () => {
    systemDark = true
    render(<App />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(screen.getByLabelText('Color theme')).toHaveValue('system')
    systemDark = false
    act(() => onSystemChange?.())
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })

  it('persists an explicit choice across remounts and allows returning to system', () => {
    systemDark = true
    const { unmount } = render(<App />)
    fireEvent.change(screen.getByLabelText('Color theme'), { target: { value: 'light' } })
    expect(localStorage.getItem('portfolio-theme')).toBe('light')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    unmount()
    render(<App />)
    expect(screen.getByLabelText('Color theme')).toHaveValue('light')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    fireEvent.change(screen.getByLabelText('Color theme'), { target: { value: 'dark' } })
    expect(localStorage.getItem('portfolio-theme')).toBe('dark')
    fireEvent.change(screen.getByLabelText('Color theme'), { target: { value: 'system' } })
    expect(localStorage.getItem('portfolio-theme')).toBeNull()
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('ignores invalid saved values and works when storage is blocked', () => {
    localStorage.setItem('portfolio-theme', 'invalid')
    const { unmount } = render(<App />)
    expect(screen.getByLabelText('Color theme')).toHaveValue('system')
    unmount()
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    render(<App />)
    fireEvent.change(screen.getByLabelText('Color theme'), { target: { value: 'dark' } })
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('keeps an explicit theme when the system preference changes', () => {
    localStorage.setItem('portfolio-theme', 'light')
    render(<App />)
    systemDark = true
    act(() => onSystemChange?.())
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(screen.getByLabelText('Color theme')).toHaveValue('light')
  })
})

describe('pre-paint theme script', () => {
  const script = html.match(/<script id="theme-init">([\s\S]*?)<\/script>/)?.[1] ?? ''

  it.each([
    ['dark', false, 'dark'],
    ['light', true, 'light'],
    ['invalid', true, 'dark'],
    [null, false, 'light'],
  ])('applies saved %s / system dark %s before React starts', (saved, dark, expected) => {
    if (saved) localStorage.setItem('portfolio-theme', saved)
    systemDark = dark
    new Function(script)()
    expect(document.documentElement).toHaveAttribute('data-theme', expected)
  })

  it('falls back to system when storage throws', () => {
    systemDark = true
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    new Function(script)()
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })
})
