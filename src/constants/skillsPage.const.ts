import type { SkillPage } from '@/types/skills.type'

export const skillsPage: SkillPage = [
  [
    {
      title: 'skills.languages',
      icon: 'lucide:code',
      skills: [
        {
          name: 'skills.typescript.name',
          description: 'skills.typescript.description',
          icon: 'simple-icons:typescript',
          link: 'https://www.typescriptlang.org/',
          statusText: 'skills.status.in_active_use',
          statusColor: '#07b97a',
        },
        {
          name: 'skills.csharp.name',
          description: 'skills.csharp.description',
          icon: 'nonicons:c-sharp-16',
          link: 'https://learn.microsoft.com/dotnet/csharp/',
          statusText: 'skills.status.in_use',
          statusColor: '#07b97a',
        },
        {
          name: 'skills.rust.name',
          description: 'skills.rust.description',
          icon: 'simple-icons:rust',
          link: 'https://www.rust-lang.org/',
          statusText: 'skills.status.learning',
          statusColor: '#db7c29',
        },
        {
          name: 'skills.kotlin.name',
          description: 'skills.kotlin.description',
          icon: 'picon:kotlin',
          link: 'https://kotlinlang.org/',
          statusText: 'skills.status.learning',
          statusColor: '#db7c29',
        },
      ],
    },
    {
      title: 'skills.backend',
      icon: 'lucide:server',
      skills: [
        {
          name: 'skills.bun.name',
          description: 'skills.bun.description',
          icon: 'devicon:bun',
          link: 'https://bun.sh/',
          statusText: 'skills.status.in_active_use',
          statusColor: '#07b97a',
          full: true,
        },
        {
          name: 'skills.elysia.name',
          description: 'skills.elysia.description',
          icon: 'skill-icons:elysia-light',
          link: 'https://elysiajs.com/',
          statusText: 'skills.status.in_active_use',
          statusColor: '#07b97a',
        },
        {
          name: 'skills.prisma.name',
          description: 'skills.prisma.description',
          icon: 'simple-icons:prisma',
          link: 'https://www.prisma.io/',
          statusText: 'skills.status.in_active_use',
          statusColor: '#07b97a',
        },
      ],
    },
  ],
  [
    {
      title: 'skills.frontend',
      icon: 'lucide:panels-top-left',
      skills: [
        {
          name: 'skills.nextjs.name',
          description: 'skills.nextjs.description',
          icon: 'akar-icons:nextjs-fill',
          link: 'https://nextjs.org/',
          statusText: 'skills.status.in_active_use',
          statusColor: '#07b97a',
        },
        {
          name: 'skills.react.name',
          description: 'skills.react.description',
          icon: 'mdi:react',
          link: 'https://reactjs.org/',
          statusText: 'skills.status.in_active_use',
          statusColor: '#07b97a',
        },
        {
          name: 'skills.tailwind.name',
          description: 'skills.tailwind.description',
          icon: 'teenyicons:tailwind-solid',
          link: 'https://tailwindcss.com/',
          statusText: 'skills.status.in_active_use',
          statusColor: '#07b97a',
          full: true,
        },
      ],
    },
    {
      title: 'skills.other',
      icon: 'lucide:puzzle',
      skills: [
        {
          name: 'skills.discordjs.name',
          description: 'skills.discordjs.description',
          icon: 'devicon-plain:discordjs',
          link: 'https://discord.js.org/',
          statusText: 'skills.status.in_use',
          statusColor: '#07b97a',
        },
      ],
    },
  ],
]
