import { education, internships } from './career.ts'

export const profile = {
  name: 'Paul John A. Suela',
  initials: 'PJS',
  title: 'Aspiring Software Developer | AI & Technology Enthusiast',
  github: 'https://github.com/pauljohnsuela64-prog',
  photo: 'images/profile.jpg',
  introduction: 'Exploring software development and AI through AI-assisted projects, with AI automation and cloud computing as learning interests.',
  background: `I am a ${education.status.toLowerCase()} pursuing a ${education.degree} at ${education.institution}, with expected graduation in ${education.expectedGraduation.label}.`,
  internshipIntroduction: 'My internship experience includes the following organizations:',
  internships: [...internships].reverse().map((entry) => `${entry.organization}${entry.department ? ` – ${entry.department}` : ''}`),
  careerInterests: 'I am an aspiring software developer exploring technology through AI-assisted project development. AI automation and cloud computing are areas I want to learn more about. My interests include:',
  interests: ['Software development', 'AI', 'AI automation', 'Cloud computing'],
  description: `Paul John A. Suela — Aspiring Software Developer | AI & Technology Enthusiast. Explore AI-assisted projects and learning interests. ${education.status} at ${education.institution}, pursuing a ${education.degree}.`,
}
