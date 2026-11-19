export interface Internship {
  id: string
  organization: string
  department?: string
  role: string
  timing: string
  completed?: string
  responsibilities: string[]
}

export interface Education {
  degree: string
  institution: string
  status: string
  expectedGraduation: { label: string; dateTime: string }
}

export interface PublicResume {
  path: string
  downloadName: string
}

export const internships: Internship[] = [
  {
    id: 'bhli', organization: 'Basic Hauling & Logistic Inc.', department: 'IT Department',
    role: 'IT Intern', timing: 'Completed October 2026', completed: '2026-10',
    responsibilities: ['Assisted with CCTV replacement on company trucks.', 'Completed assigned departmental tasks.'],
  },
  {
    id: 'peso', organization: 'Antipolo City Government – PESO',
    role: 'Internship', timing: 'First internship',
    responsibilities: ['Performed data encoding and administrative tasks.'],
  },
]

export const education: Education = {
  degree: 'Bachelor of Science in Information Technology (BSIT)',
  institution: 'ICCT Colleges Foundation Inc., Cainta Campus',
  status: 'Fourth-year student',
  expectedGraduation: { label: 'March 2027', dateTime: '2027-03' },
}

// Only set after a sanitized PDF has been approved and placed under public/documents.
export const publicResume: PublicResume | null = null
