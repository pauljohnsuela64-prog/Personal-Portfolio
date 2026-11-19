import { useState } from 'react'
import { projects, projectCategories, type Project } from '../content/projects'
import { Button, ButtonLink } from './Button'
import { SectionHeading } from './SectionHeading'

function ProjectCard({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false)
  const headingId = `project-${project.id}`

  return (
    <article className="project-card" aria-labelledby={headingId}>
      <figure className="project-preview">
        {project.screenshot && !imageFailed ? (
          <>
            <img src={`${import.meta.env.BASE_URL}${project.screenshot.src}`} alt={project.screenshot.alt}
              loading="lazy" width={640} height={400} onError={() => setImageFailed(true)} />
            <figcaption>{project.screenshot.caption}</figcaption>
          </>
        ) : (
          <div className="project-fallback"><span aria-hidden="true">{project.category}</span>
            <p>Preview unavailable</p><span>{project.name}</span></div>
        )}
      </figure>
      <div className="project-body">
        <p className="project-category">{project.category}</p>
        <h3 id={headingId}>{project.name}</h3>
        <p>{project.description}</p>
        <ul className="technology-list" aria-label={`${project.name} technologies`}>
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <ul className="project-features">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <p className="project-limitation">{project.limitation}</p>
        <div className="project-actions">
          {project.visibility === 'public' ? (
            <ButtonLink variant="secondary" href={project.repositoryUrl} aria-label={`View ${project.name} source on GitHub`}>GitHub</ButtonLink>
          ) : <span className="private-label">Private repository</span>}
          {project.demoUrl && <ButtonLink href={project.demoUrl} aria-label={`View ${project.name} demo`}>Live demo <span aria-hidden="true">↗</span></ButtonLink>}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [category, setCategory] = useState<typeof projectCategories[number]>('All')
  const visible = projects.filter((project) => category === 'All' || project.category === category)

  return (
    <section id="projects" className="portfolio-section" aria-labelledby="projects-heading" tabIndex={-1}>
      <SectionHeading id="projects-heading" number="04">Projects</SectionHeading>
      <p className="section-intro">Projects developed with AI assistance while exploring software development.
        Technologies describe project use, not independent proficiency. Features and screenshots reflect inspected source and documentation.</p>
      <div className="project-filters" role="group" aria-label="Filter projects by category">
        {projectCategories.map((item) => (
          <Button key={item} variant={item === category ? 'primary' : 'secondary'} aria-pressed={item === category}
            aria-controls="project-results" onClick={() => setCategory(item)}>
            {item} ({item === 'All' ? projects.length : projects.filter((project) => project.category === item).length})
          </Button>
        ))}
      </div>
      <p className="project-count" role="status" aria-atomic="true">Showing {visible.length} of {projects.length} projects</p>
      <div id="project-results" className="projects-grid">
        {visible.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  )
}
