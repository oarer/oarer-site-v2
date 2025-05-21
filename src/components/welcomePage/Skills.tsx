import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import Tilt from 'react-parallax-tilt'

import Block from '@/components/UI/block/Block'
import { mono, unbounded } from '@/lib/fonts'
import BlockLink from '@/components/UI/block/Link'
import { skills } from '@/constants/skills.const'

export default function SkillsBlock() {
  const { t } = useTranslation()

  return (
    <Block heading="skills.md" icon="lucide:list-minus">
      <h1
        className={`${unbounded.className} text-xl font-semibold text-neutral-800 sm:text-2xl dark:text-neutral-200`}
      >
        {t('skills.title')}
      </h1>

      <div className="grid gap-4">
        {skills.map((item, index) => (
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
            <BlockLink
              className="grid gap-2 p-5"
              external={true}
              href={item.href}
            >
              <div className="flex items-center gap-2">
                <Icon className="text-lg" icon={item.icon} />
                <p className="text-md font-semibold">{item.title}</p>
              </div>
              <div className="relative flex items-center gap-2">
                <svg
                  className="glowing-circle pointer-events-none"
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="size-20 rounded-full opacity-25 blur-[50px]"
                    style={{ backgroundColor: item.statusColor }}
                  />
                </div>
              </div>
            </BlockLink>
          </Tilt>
        ))}
      </div>

      <div className="grid items-start">
        <h1
          className={`${unbounded.className} text-xl font-semibold text-neutral-800 sm:text-2xl dark:text-neutral-200`}
        >
          {t('bio.list.all')}
        </h1>
      </div>
      <div className="flex flex-row gap-4">
        <BlockLink className="grid gap-3 p-5" href="/skills">
          <div className="flex items-center gap-3">
            <Icon className="text-lg" icon="lucide:list-check" />
            <p className="font-semibold">{t('skills.subtitle')}</p>
          </div>
          <p
            className="text-sm font-semibold text-neutral-700 dark:text-neutral-400"
            dangerouslySetInnerHTML={{ __html: t('skills.content') }}
          />
        </BlockLink>
      </div>
    </Block>
  )
}
