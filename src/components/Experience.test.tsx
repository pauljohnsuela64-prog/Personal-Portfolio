import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Experience } from './Experience'

describe('internship experience and education', () => {
  it('presents both internships as an accessible timeline using only supplied duties and dates', () => {
    render(<Experience />)
    const timeline = screen.getByRole('list', { name: 'Internship timeline' })
    const entries = within(timeline).getAllByRole('listitem').filter((item) => item.parentElement === timeline)
    expect(entries).toHaveLength(2)
    const bhli = entries[0]
    expect(within(bhli).getByRole('heading', { name: 'Basic Hauling & Logistic Inc.' })).toBeVisible()
    expect(within(bhli).getByText('IT Intern')).toBeVisible()
    expect(within(bhli).getByText('Completed October 2026')).toHaveAttribute('datetime', '2026-10')
    expect(within(bhli).getByText('Assisted with CCTV replacement on company trucks.')).toBeVisible()
    expect(within(bhli).getByText('Completed assigned departmental tasks.')).toBeVisible()
    const peso = entries[1]
    expect(within(peso).getByRole('heading', { name: 'Antipolo City Government – PESO' })).toBeVisible()
    expect(within(peso).getByText('First internship')).toBeVisible()
    expect(within(peso).getByText('Performed data encoding and administrative tasks.')).toBeVisible()
    expect(peso.querySelector('time')).toBeNull()
    expect(timeline).not.toHaveTextContent(/proficient|expert|IT Support/)
  })

  it('labels education as ongoing with an expected graduation, not a completed degree', () => {
    render(<Experience />)
    const education = screen.getByRole('region', { name: 'Education' })
    expect(within(education).getByText('Bachelor of Science in Information Technology (BSIT)')).toBeVisible()
    expect(within(education).getByText('ICCT Colleges Foundation Inc., Cainta Campus')).toBeVisible()
    expect(within(education).getByText('Fourth-year student')).toBeVisible()
    expect(within(education).getByText('March 2027')).toHaveAttribute('datetime', '2027-03')
    expect(education).toHaveTextContent('Expected graduation')
  })

  it('shows resume availability honestly without exposing an unapproved PDF', () => {
    render(<Experience />)
    expect(screen.getByRole('heading', { name: 'Resume' })).toBeVisible()
    expect(screen.getByText('A downloadable resume is not currently available.')).toBeVisible()
    expect(screen.queryByRole('link', { name: /download.*resume/i })).not.toBeInTheDocument()
  })
})
