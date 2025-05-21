'use client'

import { Icon } from '@iconify/react'
import Tilt from 'react-parallax-tilt'
import { useTranslation } from 'react-i18next'

import BlockLink from './Link'
import { mono } from '@/lib/fonts'

type Skill = {
  name: string
  description: string
  icon: string
  link: string
  statusText?: string
  statusColor?: string
  full?: boolean
}

type SkillSectionProps = {
  title: string
  icon: string
  skills: Skill[]
}

export default function SkillSection({
  title,
  skills,
  icon,
}: SkillSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-2">
        <Icon className="text-2xl" icon={icon} />
        <h1 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200">
          {t(title)}
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {skills.map((skill) => (
          <div
            className={`col-span-1 ${skill.full ? 'lg:col-span-2' : ''}`}
            key={skill.name}
          >
            <Tilt
              perspective={2000}
              scale={1.08}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              tiltReverse
              transitionEasing="cubic-bezier(0.215,0.61,0.355,1)"
              transitionSpeed={2000}
            >
              <BlockLink
                className="flex flex-col items-start gap-3 p-6"
                external={true}
                href={skill.link}
              >
                <div className="flex items-center gap-2">
                  <Icon className="text-2xl" icon={skill.icon} />
                  <h2
                    className={`${mono.className} text-lg text-neutral-800 dark:text-neutral-100`}
                  >
                    {t(skill.name)}
                  </h2>
                </div>
                {skill.statusText && skill.statusColor && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="pointer-events-none"
                      height="15"
                      width="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="7" cy="7" fill={skill.statusColor} r="3" />
                    </svg>
                    <p
                      className={`${mono.className} text-sm`}
                      style={{ color: skill.statusColor }}
                    >
                      {t(skill.statusText)}
                    </p>
                    <div className="absolute">
                      <div
                        className="size-20 rounded-full opacity-25 blur-[50px]"
                        style={{ backgroundColor: skill.statusColor }}
                      />
                    </div>
                  </div>
                )}
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                  {t(skill.description)}
                </p>
              </BlockLink>
            </Tilt>
          </div>
        ))}
      </div>
    </div>
  )
}
