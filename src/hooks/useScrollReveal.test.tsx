import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import App from '../App'

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
})
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals() })

it('adds a one-time reveal only after intersection and cleans up the observer', () => {
  let notify: (entries: { isIntersecting: boolean; target: Element }[]) => void = () => {}
  const unobserve = vi.fn()
  const disconnect = vi.fn()
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: typeof notify) { notify = callback }
    observe = vi.fn()
    unobserve = unobserve
    disconnect = disconnect
  })
  const { unmount } = render(<App />)
  const about = screen.getByRole('region', { name: 'About Me' })
  expect(about).toBeVisible()
  act(() => notify([{ isIntersecting: false, target: about }]))
  expect(about).not.toHaveClass('is-revealed')
  act(() => notify([{ isIntersecting: true, target: about }]))
  expect(about).toHaveClass('is-revealed')
  expect(unobserve).toHaveBeenCalledWith(about)
  unmount()
  expect(disconnect).toHaveBeenCalled()
})

it('leaves content visible and disconnects when observing throws during setup', () => {
  const disconnect = vi.fn()
  vi.stubGlobal('IntersectionObserver', class {
    observe() { throw new Error('observe unavailable') }
    disconnect = disconnect
  })
  render(<App />)
  expect(screen.getByRole('region', { name: 'About Me' })).toBeVisible()
  expect(screen.getByRole('region', { name: 'About Me' })).not.toHaveClass('is-revealed')
  expect(disconnect).toHaveBeenCalled()
})

it.each(['missing', 'throws', 'reduced'])('keeps all content visible when reveal initialization is %s', (mode) => {
  vi.stubGlobal('IntersectionObserver', mode === 'missing' ? undefined : class { constructor() { throw new Error('unavailable') } })
  if (mode === 'reduced') vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
  render(<App />)
  for (const name of ['About Me', 'Technical Skills', 'Projects', 'Experience & Education', 'Contact']) {
    const region = screen.getByRole('region', { name })
    expect(region).toBeVisible()
    expect(region).not.toHaveClass('is-revealed')
  }
})
