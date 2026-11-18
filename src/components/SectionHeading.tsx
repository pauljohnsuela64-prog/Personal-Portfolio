import type { ReactNode } from 'react'

export function SectionHeading({ id, number, children }:
  { id: string; number: string; children: ReactNode }) {
  return (
    <div className="section-heading">
      <span className="section-number" aria-hidden="true">{number}</span>
      <h2 id={id}>{children}</h2>
    </div>
  )
}
