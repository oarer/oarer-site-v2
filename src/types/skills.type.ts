interface Skill {
  name: string
  description: string
  icon: string
  link: string
  statusText: string
  statusColor: string
  full?: boolean
}

interface SkillCategory {
  title: string
  icon: string
  skills: Skill[]
}

export type SkillPage = SkillCategory[][]
