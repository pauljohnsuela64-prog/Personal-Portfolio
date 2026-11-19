import { sectionNames } from '../content/navigation'
import { profile } from '../content/profile'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-top">
          <div className="footer-branding">
            <a className="footer-brand" href="#home">{profile.name}</a>
            <p>{profile.title}</p>
          </div>
          <nav aria-label="Footer"><ul className="footer-navigation">{sectionNames.map((name) => (
            <li key={name}><a href={`#${name.toLowerCase()}`}>{name}</a></li>
          ))}</ul></nav>
        </div>
        <div className="footer-bottom">
          <p>{profile.developmentAcknowledgment}</p>
          <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </Container>
    </footer>
  )
}
