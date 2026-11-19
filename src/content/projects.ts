export const projectCategories = ['All', 'Business Systems', 'IT Management', 'AI Applications', 'Web Applications', 'Games'] as const
export type ProjectCategory = Exclude<typeof projectCategories[number], 'All'>

export type Project = {
  id: string
  name: string
  category: ProjectCategory
  description: string
  technologies: string[]
  features: string[]
  limitation: string
  screenshot?: { src: string; alt: string; caption: string }
} & (
  | { visibility: 'public'; repositoryUrl: string; demoUrl?: string }
  | { visibility: 'private'; repositoryUrl?: never; demoUrl?: never }
)

export const projects: Project[] = [
  {
    id: 'company-erp', name: 'Company Operations ERP', category: 'Business Systems', visibility: 'public',
    description: 'A server-rendered workspace connecting people, inventory, purchasing, finance, and internal IT workflows.',
    technologies: ['Python', 'Flask', 'MySQL', 'Bootstrap', 'JavaScript'],
    features: ['HR, attendance, and payroll workflows', 'Procurement connected to inventory', 'Role-based access and reporting'],
    limitation: 'Portfolio demo with fictional data; not production-certified.',
    repositoryUrl: 'https://github.com/pauljohnsuela64-prog/Company-Operations-ERP',
    screenshot: { src: 'images/projects/company-erp.png', alt: 'Company Operations ERP dashboard', caption: 'Repository demo dashboard with fictional data.' },
  },
  {
    id: 'driver-audit', name: 'Driver Audit Management System', category: 'Business Systems', visibility: 'public',
    description: 'A driver-audit project with Windows and Android clients, including shared online and separate offline editions.',
    technologies: ['Python', 'FastAPI', 'CustomTkinter', 'Dart', 'Flutter', 'MySQL', 'SQLite'],
    features: ['Driver audit records and history', 'Windows and Android interfaces', 'Search, filters, and conflict-aware editing'],
    limitation: 'Capabilities differ between online and offline editions; the screenshot is an online development snapshot.',
    repositoryUrl: 'https://github.com/pauljohnsuela64-prog/Driver-Audit-Management-System',
    screenshot: { src: 'images/projects/driver-audit.png', alt: 'Driver Audit Management System Windows dashboard', caption: 'Windows development snapshot with fictional audit records.' },
  },
  {
    id: 'it-assets', name: 'IT Asset Management System', category: 'IT Management', visibility: 'public',
    description: 'An application for tracking IT assets, employee assignments, returns, maintenance, and lifecycle history.',
    technologies: ['Python', 'Flask', 'MySQL', 'Bootstrap', 'openpyxl'],
    features: ['Asset assignment and return', 'Maintenance and retirement workflows', 'Reports and Excel exports'],
    limitation: 'The documented hosted demo was unavailable when checked; no demo link is included.',
    repositoryUrl: 'https://github.com/pauljohnsuela64-prog/IT-Asset-Management-System',
    screenshot: { src: 'images/projects/it-assets.jpg', alt: 'IT Asset Management System dashboard', caption: 'Repository dashboard screenshot showing aggregate asset counts.' },
  },
  {
    id: 'help-desk', name: 'IT Help Desk Ticketing System', category: 'IT Management', visibility: 'public',
    description: 'A Python desktop application for organizing technical requests and tracking their progress.',
    technologies: ['Python', 'Tkinter', 'MySQL'],
    features: ['Ticket creation, search, and assignment', 'Status updates and ticket notes', 'Dashboard and reports'],
    limitation: 'Repository screenshots contain named records and are omitted pending a privacy-reviewed replacement.',
    repositoryUrl: 'https://github.com/pauljohnsuela64-prog/IT-Helpdesk-Ticketing-System',
  },
  {
    id: 'polpol-ai', name: 'PolPol AI', category: 'AI Applications', visibility: 'private',
    description: 'A local personal assistant using Ollama, with saved conversations, notes, tasks, and reminders.',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLite', 'Ollama'],
    features: ['Local chat and saved conversations', 'Notes, tasks, and one-time reminders', 'User approval for proposed AI actions'],
    limitation: 'Private source. Single-user local app; no cloud sync, and local model responses may be incorrect.',
    screenshot: { src: 'images/projects/polpol-ai.png', alt: 'PolPol AI local chat interface', caption: 'Fictional garden-club demo; the pictured assistant reply is illustrative.' },
  },
  {
    id: 'bitemenu', name: 'BiteMenu', category: 'Web Applications', visibility: 'public',
    description: 'A browser-native restaurant menu and simulated ordering application.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
    features: ['Menu search and category filters', 'Cart quantities and totals', 'Simulated checkout and local order history'],
    limitation: 'Demo only: no backend, payment processing, or real order submission.',
    repositoryUrl: 'https://github.com/pauljohnsuela64-prog/BiteMenu',
    demoUrl: 'https://pauljohnsuela64-prog.github.io/BiteMenu/',
  },
  {
    id: 'fortress-defense', name: 'Fortress Defense', category: 'Games', visibility: 'public',
    description: 'A browser tower-defense game with a woodland battlefield and five mixed enemy waves.',
    technologies: ['TypeScript', 'Phaser', 'Vite'],
    features: ['Archer, cannon, and magic towers', 'Tower upgrades and mixed enemy waves', 'Keyboard and touch controls'],
    limitation: 'Local browser game; no backend or database.',
    repositoryUrl: 'https://github.com/pauljohnsuela64-prog/fortress-defense',
    demoUrl: 'https://fortress-defense-phi.vercel.app',
    screenshot: { src: 'images/projects/fortress-defense.png', alt: 'Fortress Defense woodland battlefield and tower controls', caption: 'Existing browser-check capture from the current woodland game.' },
  },
  {
    id: 'monster-hatchery', name: 'Monster Hatchery', category: 'Games', visibility: 'public',
    description: 'A browser monster-collection game with hatching, training, evolution, and turn-based battles.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
    features: ['Egg hatching and collection filters', 'Training, evolution, and achievements', 'Turn-based battles and local saves'],
    limitation: 'Progress is stored in the current browser; no cloud backup or verified hosted demo.',
    repositoryUrl: 'https://github.com/pauljohnsuela64-prog/Monster-Hatchery',
  },
]
