import { profile } from '../content/profile'
import { publicResume, type PublicResume } from '../content/career'
import { ButtonLink } from './Button'

export function ResumeDownload({ resume = publicResume }: { resume?: PublicResume | null }) {
  if (!resume) return null
  return <ButtonLink href={`${import.meta.env.BASE_URL}${resume.path}`} download={resume.downloadName}
    variant="secondary">Download Resume <span aria-hidden="true">↓</span></ButtonLink>
}

export function Resume() {
  return (
    <section className="resume-card" aria-labelledby="resume-heading">
      <h3 id="resume-heading">Resume</h3>
      <p>{profile.title}</p>
      {publicResume ? <ResumeDownload /> : <p className="resume-availability">A downloadable resume is not currently available.</p>}
    </section>
  )
}
