import type { ProjectsCategory } from '@/types/projects.type'

export const projectsPage: ProjectsCategory[][] = [
  [
    {
      title: 'projects.my',
      icon: 'lucide:heart',
      projects: [
        {
          Frontend: {
            icon: 'lucide:panels-top-left',
            projects: [
              {
                name: 'projects.biography.name',
                version: '/ v2',
                description: 'projects.biography.description',
                icon: '/favicon.ico',
                glowColor: 'bg-red-600',
                background: '/img/projects/bio.png',
                shortLink: 'oarer.space',
                link: 'https://github.com/oarer/oarer-site-v2',
                statusText: 'Production',
                stack: ['React v19', 'NextJS 15.2.1', 'Tailwind v4'],
                source: true,
              },
              {
                name: 'projects.biography_old.name',
                version: '/ v1',
                description: 'projects.biography_old.description',
                glowColor: 'bg-red-600',
                background: '/img/projects/bio_old.png',
                statusText: 'Not supported anymore',
                stack: ['React v18', 'NextJS 14.2.11', 'Tailwind v3'],
              },
              {
                name: 'projects.contenttime.name',
                version: '/ v2',
                description: 'projects.contenttime.description',
                icon: '/img/projects/ct2-logo.png',
                glowColor: 'bg-purple-600',
                background: '/img/projects/ct2.png',
                shortLink: 'content-time.pro',
                link: 'https://content-time.pro',
                statusText: 'Not supported anymore',
                stack: ['React v19', 'NextJS 15.2.1', 'Tailwind v4'],
              },
            ],
          },
          Backend: {
            icon: 'lucide:server',
            projects: [
              {
                name: 'projects.weather_api.name',
                description: 'projects.weather_api.description',
                icon: '/favicon.ico',
                glowColor: 'bg-red-400',
                shortLink: 'weather.murchikov.ru/',
                link: 'https://github.com/oarer/weather-api',
                statusText: 'Production',
                stack: ['Bun v1.2', 'ElysiaJS V1.2'],
                source: true,
              },
              {
                name: 'projects.contenttime_api.name',
                version: '/ v1',
                description: 'projects.contenttime_api.description',
                icon: '/img/projects/ct2-logo.png',
                glowColor: 'bg-purple-600',
                statusText: 'Not supported anymore',
                stack: ['Bun v1.2', 'ElysiaJS V1.2'],
              },
            ],
          },
          other: {
            icon: 'lucide:puzzle',
            projects: [],
          },
        },
      ],
    },
  ],
  [
    {
      title: 'projects.order',
      icon: 'lucide:shopping-basket',
      projects: [
        {
          Frontend: {
            icon: 'lucide:panels-top-left',
            projects: [
              {
                name: 'projects.gribmine.name',
                version: '/ v1',
                description: 'projects.gribmine.description',
                icon: '/img/projects/gribmine-logo.ico',
                glowColor: 'bg-emerald-500',
                background: '/img/projects/gribmine-bg.png',
                shortLink: 'gribmine.ru',
                link: 'https://www.gribmine.ru',
                statusText: 'Production',
                stack: ['React v19', 'NextJS 15.2.1', 'Tailwind v4'],
              },
            ],
          },
          Backend: {
            icon: 'lucide:server',
            projects: [
              {
                name: 'projects.gribmine_api.name',
                version: '/ v1',
                description: 'projects.gribmine_api.description',
                icon: '/img/projects/gribmine-logo.ico',
                shortLink: 'api.gribmine.ru',
                glowColor: 'bg-emerald-500',
                statusText: 'Production',
                stack: ['Bun v1.2', 'ElysiaJS V1.2'],
              },
            ],
          },
          other: {
            icon: 'lucide:puzzle',
            projects: [],
          },
        },
      ],
    },
  ],
]
