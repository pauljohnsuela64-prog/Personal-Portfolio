import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { ResumeDownload } from './Resume'

it('renders no hero download for an unapproved resume', () => {
  render(<ResumeDownload />)
  expect(screen.queryByRole('link')).not.toBeInTheDocument()
})

it('uses a local base-aware download link when an approved resume is supplied', () => {
  render(<ResumeDownload resume={{ path: 'documents/resume.pdf', downloadName: 'Paul-John-Suela-Resume.pdf' }} />)
  const download = screen.getByRole('link', { name: 'Download Resume' })
  expect(download).toHaveAttribute('href', '/documents/resume.pdf')
  expect(download).toHaveAttribute('download', 'Paul-John-Suela-Resume.pdf')
})
