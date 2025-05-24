'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'

import Block from '@/components/UI/block/Block'
import { unbounded } from '@/lib/fonts'
import LanguageSwitcher from './components/LanguageSwitcher'
import ThemeToggle from '@/features/ChangeTheme'
import BlockLink from '@/components/UI/block/Link'

export default function AboutBlock() {
  const { t } = useTranslation()

  return (
    <Block heading="about.md" icon="lucide:book-text">
      <div className="relative flex flex-col items-center gap-4 md:flex-row">
        <Image
          alt="avatar"
          className="rounded-full"
          height={128}
          quality={100}
          src="/img/avatar.png"
          width={128}
        />
        <p
          className={`${unbounded.className} relative text-xl sm:text-3xl dark:text-neutral-100`}
        >
          {t('bio.title')}{' '}
          <span className="relative inline-block text-red-500/70">
            @oarer
            <span className="absolute -inset-1 -top-4 -z-10">
              <span className="block size-24 rounded-full bg-red-400 opacity-30 blur-[50px]" />
            </span>
          </span>
        </p>
      </div>
      <p
        className="text-sm font-semibold text-neutral-700 sm:text-lg dark:text-neutral-200/90"
        dangerouslySetInnerHTML={{ __html: t('bio.description') }}
      />
      <div className="flex flex-wrap gap-4">
        <BlockLink
          className="flex items-center gap-2 px-4 py-2 hover:scale-98 hover:opacity-80 active:scale-94 active:opacity-90"
          external
          href="https://github.com/oarer"
        >
          <Icon className="text-xl" icon="lucide:github" />
          <p className="font-semibold">GitHub</p>
        </BlockLink>
        <BlockLink
          className="flex items-center gap-2 px-4 py-2 hover:scale-98 hover:opacity-80 active:scale-94 active:opacity-90"
          external
          href="https://t.me/oarer_yml"
        >
          <Icon className="text-xl" icon="gravity-ui:logo-telegram" />
          <p className="font-semibold">Telegram</p>
        </BlockLink>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </Block>
  )
}
