'use client'

import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import Tilt from 'react-parallax-tilt'

import Block from '@/components/UI/block/Block'
import BlockLink from '@/components/UI/block/Link'
import { mono, unbounded } from '@/lib/fonts'
import { projects } from '@/constants/projects.const'

export default function ProjectsBlock() {
  const { t } = useTranslation()

  return (
    <Block
      className="z-1 flex h-full flex-col gap-6"
      heading="projects.md"
      icon="lucide:folder-git-2"
    >
      <div className="grid gap-4">
        <h1
          className={`${unbounded.className} text-xl font-semibold text-neutral-800 sm:text-2xl dark:text-neutral-200`}
        >
          {t('projects.title')}
        </h1>
        <div className="grid gap-4">
          {projects.map((item, index) => (
            <Tilt
              key={index}
              perspective={2000}
              scale={1.03}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              tiltReverse
              transitionEasing="cubic-bezier(0.215,0.61,0.355,1)"
              transitionSpeed={2000}
            >
              <BlockLink className="grid gap-2 p-5" external href={item.href}>
                <div className="flex items-center gap-2">
                  <p className="text-md font-semibold">{item.title}</p>
                  <p className={`${mono.className} text-sm`}>{item.version}</p>
                </div>
                <div className="relative flex items-center gap-2">
                  <svg
                    className="pointer-events-none"
                    height="15"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="7" cy="7" fill={item.statusColor} r="3" />
                  </svg>
                  <p
                    className={`${mono.className} text-sm`}
                    style={{ color: item.statusColor }}
                  >
                    {item.statusText}
                  </p>
                  <div className="absolute inset-0 -left-8 flex items-center">
                    <div
                      className="size-20 rounded-full opacity-25 blur-2xl"
                      style={{ backgroundColor: item.statusColor }}
                    />
                  </div>
                </div>
              </BlockLink>
            </Tilt>
          ))}
        </div>
      </div>

      <div className="grid items-start">
        <h1
          className={`${unbounded.className} text-xl font-semibold text-neutral-800 sm:text-2xl dark:text-neutral-200`}
        >
          {t('bio.list.all')}
        </h1>
      </div>

      <div className="flex flex-row gap-4">
        <BlockLink className="grid gap-3 p-5" href="/projects">
          <div className="flex items-center gap-3">
            <Icon className="text-lg" icon="lucide:list-checks" />
            <p className="font-semibold">{t('projects.subtitle')}</p>
          </div>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-400">
            {t('projects.content')}
          </p>
        </BlockLink>
      </div>
    </Block>
  )
}
