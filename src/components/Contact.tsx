import { profile } from '../content/profile'
import { ButtonLink } from './Button'
import { SectionHeading } from './SectionHeading'

export function Contact() {
  return (
    <section id="contact" className="portfolio-section contact-section" data-reveal aria-labelledby="contact-heading" tabIndex={-1}>
      <SectionHeading id="contact-heading" number="06">Contact</SectionHeading>
      <div className="contact-card">
        <div>
          <p className="contact-eyebrow">Looking ahead</p>
          <h3>Let’s build what comes next.</h3>
          <p>{profile.contactMessage}</p>
          <p className="contact-note">Explore my projects and development journey on GitHub.</p>
        </div>
        <ButtonLink href={profile.github} aria-label={`Visit ${profile.name} on GitHub`}>Visit GitHub <span aria-hidden="true">↗</span></ButtonLink>
      </div>
    </section>
  )
}
