import { skillGroups } from '../content/skills'
import { SectionHeading } from './SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="portfolio-section" data-reveal aria-labelledby="skills-heading" tabIndex={-1}>
      <SectionHeading id="skills-heading" number="03">Technical Skills</SectionHeading>
      <p className="section-intro">Project-based exposure through AI-assisted development, not proficiency ratings.
        These technologies reflect the projects I am learning from.</p>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-card" key={group.name}>
            <h3>{group.name}</h3>
            <p>{group.context}</p>
            <ul className="technology-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}
