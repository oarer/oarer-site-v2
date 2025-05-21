import Link from 'next/link'
import { Icon } from '@iconify/react'

import Block from '@/components/UI/block/Block'
import SkillSection from '@/components/UI/block/SkillSection'
import { skillsPage } from '@/constants/skillsPage.const'

export default function SkillsPage() {
  return (
    <div className="mx-auto flex max-w-[90rem] flex-col px-6 py-12 md:pt-30">
      <div className="grid gap-6">
        <Link
          className="flex w-fit items-center transition-transform duration-600 ease-in-out hover:scale-102 hover:opacity-90 active:scale-96"
          href="/"
        >
          <div className="flex items-center gap-2">
            <Icon
              className="dark:neutral-300 text-2xl text-neutral-600"
              icon="lucide:house"
            />
            <p className="dark:neutral-300 font-semibold text-neutral-600">
              Вернуться обратно
            </p>
          </div>
        </Link>

        <Block heading="skills.md" icon="lucide:list-minus">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            {skillsPage.map((column, colIdx) => (
              <div className="grid gap-8" key={colIdx}>
                {column.map((section) => (
                  <SkillSection
                    icon={section.icon || ''}
                    key={section.title}
                    skills={section.skills}
                    title={section.title}
                  />
                ))}
              </div>
            ))}
          </div>
        </Block>
      </div>
    </div>
  )
}
