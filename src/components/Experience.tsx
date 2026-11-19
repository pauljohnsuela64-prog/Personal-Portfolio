import { education, internships } from '../content/career'
import { Resume } from './Resume'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="portfolio-section" aria-labelledby="experience-heading" tabIndex={-1}>
      <SectionHeading id="experience-heading" number="05">Experience &amp; Education</SectionHeading>
      <p className="section-intro">Internship experience alongside my ongoing studies in information technology.</p>
      <div className="career-layout">
        <div>
          <h3 className="career-subheading">Internships</h3>
          <ol className="experience-timeline" role="list" aria-label="Internship timeline">
            {internships.map((entry) => (
              <li className="timeline-entry" key={entry.id}>
                <div className="timeline-card">
                  <p className="timeline-timing">{entry.completed ? <time dateTime={entry.completed}>{entry.timing}</time> : entry.timing}</p>
                  <h4>{entry.organization}</h4>
                  <p className="timeline-role">{entry.role}{entry.department && <span> · {entry.department}</span>}</p>
                  <ul>{entry.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="career-sidebar">
          <section className="education-card" aria-labelledby="education-heading">
            <h3 id="education-heading">Education</h3>
            <p className="education-degree">{education.degree}</p>
            <p>{education.institution}</p>
            <p className="education-status">{education.status}</p>
            <p>Expected graduation: <time dateTime={education.expectedGraduation.dateTime}>{education.expectedGraduation.label}</time></p>
          </section>
          <Resume />
        </div>
      </div>
    </section>
  )
}
