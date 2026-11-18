import { ButtonLink } from './components/Button'
import { Container } from './components/Container'
import { Header } from './components/Header'
import { SectionHeading } from './components/SectionHeading'

const sections = [
  { id: 'about', title: 'About', description: 'Background, perspective, and the ideas behind the work.' },
  { id: 'skills', title: 'Skills', description: 'Tools, technologies, and areas of technical focus.' },
  { id: 'projects', title: 'Projects', description: 'Selected work and the thinking behind each solution.' },
  { id: 'experience', title: 'Experience', description: 'Professional milestones and lessons from practice.' },
  { id: 'contact', title: 'Contact', description: 'A space for future conversations and connections.' },
]

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <section id="home" className="hero" aria-labelledby="home-heading" tabIndex={-1}>
          <Container>
            <div className="hero-content">
              <p className="eyebrow"><span aria-hidden="true" />AI &amp; Technology</p>
              <h1 id="home-heading">Personal Portfolio</h1>
              <p className="hero-subtitle">Curiosity meets<br /><span>possibility.</span></p>
              <p className="hero-description">A space for technology, thoughtful solutions, and what comes next.
                This portfolio is under development.</p>
              <div className="hero-actions">
                <ButtonLink href="#about">Explore the portfolio <span aria-hidden="true">↗</span></ButtonLink>
                <ButtonLink href="#contact" variant="secondary">Contact</ButtonLink>
              </div>
            </div>
            <div className="orbital" aria-hidden="true"><span /><span /><span /><i /></div>
            <div className="hero-footnote" aria-hidden="true"><span>01 / EXPLORATION</span><span>BUILT ON CURIOSITY</span></div>
          </Container>
        </section>
        <Container>
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="portfolio-section"
              aria-labelledby={`${section.id}-heading`} tabIndex={-1}>
              <SectionHeading id={`${section.id}-heading`} number={`0${index + 2}`}>{section.title}</SectionHeading>
              <div className="section-placeholder">
                <p>{section.description}</p>
                <span className="placeholder-label">Content coming soon</span>
              </div>
            </section>
          ))}
        </Container>
      </main>
      <footer className="site-footer"><Container><p>Personal Portfolio <span> / AI &amp; Technology</span></p>
        <a href="#home">Back to top <span aria-hidden="true">↑</span></a></Container></footer>
    </>
  )
}
