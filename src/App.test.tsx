import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('portfolio placeholder', () => {
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
})
