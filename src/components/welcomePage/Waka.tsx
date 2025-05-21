'use client'

import Link from 'next/link'

import Block from '@/components/UI/block/Block'
import { useWaka } from '@/hooks/useWaka'
import { mono } from '@/lib/fonts'

export default function WakaBlock() {
  const { data, isLoading } = useWaka()

  return (
    <Block
      className="flex w-full flex-col gap-4"
      heading="waka.json"
      icon="simple-icons:wakatime"
    >
      {isLoading ? (
        <div className="h-6 w-3/5 animate-pulse rounded bg-neutral-500/40" />
      ) : (
        <Link
          className={`${mono.className} h-fit w-fit`}
          href="https://wakatime.com/@oarer"
          rel="noopener noreferrer"
          target="_blank"
        >
          {
            data?.data?.grand_total
              ?.human_readable_total_including_other_language
          }
        </Link>
      )}
    </Block>
  )
}
