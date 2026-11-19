export type SkillGroup = {
  name: 'Programming' | 'Databases' | 'Frameworks' | 'Development Tools' | 'AI-Assisted Development' | 'Currently Learning'
  context: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { name: 'Programming', context: 'Languages used across the portfolio and project source.', items: ['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL', 'Dart'] },
  { name: 'Databases', context: 'Data stores used in the business and local AI projects.', items: ['MySQL', 'SQLite'] },
  { name: 'Frameworks', context: 'Frameworks and UI toolkits used in project implementations.', items: ['React', 'Flask', 'FastAPI', 'Flutter', 'Phaser', 'Bootstrap', 'Tkinter', 'CustomTkinter'] },
  { name: 'Development Tools', context: 'Repository, build, and verification tools present in the projects.', items: ['Git', 'GitHub', 'npm', 'Vite', 'Vitest', 'pytest', 'Playwright'] },
  { name: 'AI-Assisted Development', context: 'Projects are developed with AI assistance; this is not a claim of independent mastery.', items: ['AI-assisted project development', 'Local AI integration with Ollama'] },
  { name: 'Currently Learning', context: 'Learning interests, not established technical proficiency.', items: ['AI automation', 'Cloud computing'] },
]
