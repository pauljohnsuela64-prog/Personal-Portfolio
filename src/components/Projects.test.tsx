import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Projects } from './Projects'
import { Skills } from './Skills'

describe('project showcase', () => {
  it('shows all eight projects with honest context and accessible filters', () => {
    render(<Projects />)
    expect(screen.getAllByRole('article')).toHaveLength(8)
    expect(screen.getByRole('status')).toHaveTextContent('Showing 8 of 8 projects')
    expect(screen.getByRole('button', { name: 'All (8)' })).toHaveAttribute('aria-pressed', 'true')
    for (const name of ['Company Operations ERP', 'Driver Audit Management System', 'IT Asset Management System', 'IT Help Desk Ticketing System', 'PolPol AI', 'BiteMenu', 'Fortress Defense', 'Monster Hatchery']) {
      expect(screen.getByRole('heading', { name, level: 3 })).toBeVisible()
    }
    expect(screen.getByText(/developed with AI assistance/i)).toBeVisible()
    expect(screen.queryByRole('button', { name: /IT Support/ })).not.toBeInTheDocument()
  })

  it('filters cards, updates counts and selected state, and resets to all', () => {
    render(<Projects />)
    const filter = screen.getByRole('button', { name: 'IT Management (2)' })
    filter.focus()
    fireEvent.click(filter)
    expect(filter).toHaveAttribute('aria-pressed', 'true')
    expect(filter).toHaveFocus()
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByRole('status')).toHaveTextContent('Showing 2 of 8 projects')
    expect(screen.queryByRole('heading', { name: 'BiteMenu' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Games (2)' }))
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'Fortress Defense' })).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'All (8)' }))
    expect(screen.getAllByRole('article')).toHaveLength(8)
  })

  it.each([
    ['Business Systems (2)', 2, 'Company Operations ERP'],
    ['AI Applications (1)', 1, 'PolPol AI'],
    ['Web Applications (1)', 1, 'BiteMenu'],
  ])('keeps category counts and membership consistent for %s', (name, count, project) => {
    render(<Projects />)
    fireEvent.click(screen.getByRole('button', { name }))
    expect(screen.getAllByRole('article')).toHaveLength(count)
    expect(screen.getByRole('status')).toHaveTextContent(`Showing ${count} of 8 projects`)
    expect(screen.getByRole('heading', { name: project })).toBeVisible()
  })

  it('omits private source links and exposes only verified public destinations', () => {
    render(<Projects />)
    const card = screen.getByRole('article', { name: 'PolPol AI' })
    expect(within(card).getByText('Private repository')).toBeVisible()
    expect(within(card).queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /PolPol AI/ })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View BiteMenu demo' })).toHaveAttribute('href', 'https://pauljohnsuela64-prog.github.io/BiteMenu/')
    expect(screen.getByRole('link', { name: 'View Fortress Defense demo' })).toHaveAttribute('href', 'https://fortress-defense-phi.vercel.app')
    expect(screen.getAllByRole('link', { name: /source on GitHub/ })).toHaveLength(7)
  })

  it('uses labeled visual fallbacks for absent and failed screenshots', () => {
    render(<Projects />)
    const missing = screen.getByRole('article', { name: 'BiteMenu' })
    expect(within(missing).getByText('Preview unavailable')).toBeVisible()
    const image = screen.getByRole('img', { name: 'Company Operations ERP dashboard' })
    expect(image).toHaveAttribute('loading', 'lazy')
    fireEvent.error(image)
    expect(within(screen.getByRole('article', { name: 'Company Operations ERP' })).getByText('Preview unavailable')).toBeVisible()
  })
})

it('groups project-based technology exposure without proficiency ratings', () => {
  render(<Skills />)
  for (const name of ['Programming', 'Databases', 'Frameworks', 'Development Tools', 'AI-Assisted Development', 'Currently Learning']) {
    expect(screen.getByRole('heading', { name, level: 3 })).toBeVisible()
  }
  expect(screen.getByText('AI automation')).toBeVisible()
  expect(screen.getByText('Cloud computing')).toBeVisible()
  expect(screen.getByText(/not proficiency ratings/i)).toBeVisible()
  expect(screen.queryByRole('heading', { name: 'IT Support' })).not.toBeInTheDocument()
})
