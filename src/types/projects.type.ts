export type StatusText = 'In dev' | 'Production' | 'Not supported anymore'

export const STATUS_COLORS: Record<StatusText, string> = {
  'In dev': 'oklch(82.8% 0.189 84.429)',
  Production: 'oklch(79.2% 0.209 151.711)',
  'Not supported anymore': 'oklch(57.7% 0.245 27.325)',
}

export function getStatusColor(status: StatusText): string {
  return STATUS_COLORS[status]
}

export const STACK_ICONS: Record<string, string> = {
  React: 'mdi:react',
  NextJS: 'akar-icons:nextjs-fill',
  TypeScript: 'simple-icons:typescript',
  Tailwind: 'teenyicons:tailwind-solid',
  Bun: 'devicon:bun',
  ElysiaJS: 'skill-icons:elysia-light',
  PrismaORM: 'simple-icons:prisma',
  PHP: 'akar-icons:php-fill',
}

export function getStackIcons(stack: string[]): string[] {
  return stack.map((item) => {
    const tech = item.split(' ')[0]
    return STACK_ICONS[tech] ?? 'lucide:help'
  })
}

type Project = {
  name: string
  version?: string
  description: string
  icon?: string
  glowColor: string
  background?: string
  shortLink?: string
  link?: string
  statusText: StatusText
  stack: string[]
  source?: boolean
}

type ProjectCategoryDetail = {
  icon: string
  projects: Project[]
}

export type ProjectsSubCategory = {
  Frontend?: ProjectCategoryDetail
  Backend?: ProjectCategoryDetail
  other?: ProjectCategoryDetail
}

export type ProjectsCategory = {
  title: string
  icon: string
  projects: ProjectsSubCategory[]
}

export type ProjectsPage = ProjectsCategory[][]
