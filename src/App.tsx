import { ButtonLink } from './components/Button'
import { Container } from './components/Container'
import { Header } from './components/Header'
import { SectionHeading } from './components/SectionHeading'
import { ProfilePortrait } from './components/ProfilePortrait'
import { profile } from './content/profile'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { ResumeDownload } from './components/Resume'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <section id="home" className="hero" aria-labelledby="home-heading" tabIndex={-1}>
          <Container>
            <div className="hero-layout">
              <div className="hero-content">
                <p className="eyebrow"><span aria-hidden="true" />AI &amp; Technology</p>
                <p className="hero-greeting">Hello, I’m</p>
                <h1 id="home-heading">{profile.name}</h1>
                <p className="hero-title">{profile.title}</p>
                <p className="hero-description">{profile.introduction}</p>
                <div className="hero-actions">
                  <ButtonLink href="#projects">View Projects <span aria-hidden="true">↗</span></ButtonLink>
                  <ButtonLink href="#contact" variant="secondary">Contact Me</ButtonLink>
                  <ButtonLink href={profile.github} variant="secondary">GitHub <span aria-hidden="true">↗</span></ButtonLink>
                  <ResumeDownload />
                </div>
              </div>
              <ProfilePortrait />
            </div>
            <div className="hero-footnote" aria-hidden="true"><span>01 / EXPLORATION</span><span>BUILT ON CURIOSITY</span></div>
          </Container>
        </section>
        <Container>
          <section id="about" className="portfolio-section" aria-labelledby="about-heading" tabIndex={-1}>
            <SectionHeading id="about-heading" number="02">About Me</SectionHeading>
            <div className="about-layout">
              <div className="about-copy">
                <p>{profile.background}</p>
                <p>{profile.internshipIntroduction}</p>
                <ul className="internship-list">{profile.internships.map((internship) => <li key={internship}>{internship}</li>)}</ul>
              </div>
              <div className="interest-panel">
                <h3>Career interests</h3>
                <p>{profile.careerInterests}</p>
                <ul className="interest-list">{profile.interests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
              </div>
            </div>
          </section>
          <Skills />
          <Projects />
          <Experience />
          <section id="contact" className="portfolio-section" aria-labelledby="contact-heading" tabIndex={-1}>
            <SectionHeading id="contact-heading" number="06">Contact</SectionHeading>
            <div className="section-placeholder">
              <p>A space for future conversations and connections.</p>
              <span className="placeholder-label">Content coming soon</span>
            </div>
          </section>
        </Container>
      </main>
      <footer className="site-footer"><Container><p>Personal Portfolio <span> / AI &amp; Technology</span></p>
        <a href="#home">Back to top <span aria-hidden="true">↑</span></a></Container></footer>
    </>
  )
}
