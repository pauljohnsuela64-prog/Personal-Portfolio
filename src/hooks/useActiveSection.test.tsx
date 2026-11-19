import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import App from '../App'

let queued: FrameRequestCallback[]
let tops: Record<string, number>

beforeEach(() => {
  queued = []
  tops = { home: 0, about: 900, skills: 1800, projects: 2700, experience: 3600, contact: 4500 }
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => { queued.push(callback); return queued.length })
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    return new DOMRect(0, tops[this.id] ?? 0, 1000, this.tagName === 'HEADER' ? 88 : 800)
  })
})
afterEach(() => {
  document.documentElement.style.removeProperty('scroll-padding-top')
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
const flush = () => act(() => { queued.splice(0).forEach((callback) => callback(0)) })

it('updates accessible desktop and mobile active links when the visible section changes', () => {
  render(<App />)
  flush()
  const primary = screen.getByRole('navigation', { name: 'Primary' })
  expect(within(primary).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'location')
  tops.home = -800
  tops.about = 100
  fireEvent.scroll(window)
  flush()
  expect(within(primary).getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'location')
  expect(within(primary).getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
  fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
  expect(within(screen.getByRole('navigation', { name: 'Mobile' })).getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'location')
})

it('refreshes active state for direct hash navigation and viewport changes', () => {
  render(<App />)
  flush()
  tops = { home: -4000, about: -3000, skills: -2000, projects: -1000, experience: -500, contact: 95 }
  fireEvent(window, new HashChangeEvent('hashchange'))
  flush()
  const primary = screen.getByRole('navigation', { name: 'Primary' })
  expect(within(primary).getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'location')
  tops.contact = 900
  tops.experience = 90
  fireEvent.resize(window)
  flush()
  expect(within(primary).getByRole('link', { name: 'Experience' })).toHaveAttribute('aria-current', 'location')
})

it('marks Contact at the page bottom even when the final section is short', () => {
  vi.stubGlobal('scrollY', 5200)
  vi.stubGlobal('innerHeight', 800)
  vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(6000)
  render(<App />)
  flush()
  expect(within(screen.getByRole('navigation', { name: 'Primary' })).getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'location')
})

it('uses the actual anchor padding when identifying a hash destination', () => {
  document.documentElement.style.scrollPaddingTop = '140px'
  tops = { home: -4000, about: -3000, skills: -2000, projects: -1000, experience: -500, contact: 140 }
  render(<App />)
  flush()
  expect(within(screen.getByRole('navigation', { name: 'Primary' })).getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'location')
})
