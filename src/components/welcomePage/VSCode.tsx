'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Block from '@/components/UI/block/Block'
import { useActivity } from '@/hooks/useActivity'
import { useFileIcon } from '@/hooks/useFileIcon'
import { mono } from '@/lib/fonts'

export default function VSCodeBlock() {
  const { data } = useActivity()
  const fileIcon = useFileIcon(data?.file)

  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function formatElapsedTime(startTime: string | Date, now: number): string {
    const start = new Date(startTime)
    let diffMs = now - start.getTime()

    if (diffMs < 0) diffMs = 0

    const diffSec = Math.floor(diffMs / 1000)
    const hours = Math.floor(diffSec / 3600)
    const minutes = Math.floor((diffSec % 3600) / 60)
    const seconds = diffSec % 60

    const hh = String(hours).padStart(2, '0')
    const mm = String(minutes).padStart(2, '0')
    const ss = String(seconds).padStart(2, '0')

    return `${hh}:${mm}:${ss}`
  }

  return (
    <Block
      className="flex w-full flex-col gap-4"
      heading="vscode.json"
      icon="codicon:vscode"
    >
      {!data?.id ? (
        <div className="flex items-center gap-4">
          <div className="h-[80px] w-[80px] animate-pulse rounded-xl bg-neutral-400/30 dark:bg-neutral-800/50" />
          <div>
            <h1 className="text-lg font-semibold dark:text-neutral-200">
              Nothing
            </h1>
            <p
              className={`${mono.className} text-sm font-semibold text-neutral-600`}
            >
              Not start
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Image
            alt={data?.file}
            className="rounded-xl"
            height={80}
            quality={100}
            src={fileIcon}
            width={80}
          />
          <div>
            <h1 className="text-md font-semibold sm:text-lg dark:text-neutral-200">
              {data?.workplace}{' '}
              <span className="text-xs opacity-70">/ {data?.file}</span>
            </h1>
            <p className={`${mono.className} text-sm dark:text-neutral-300`}>
              {formatElapsedTime(data.start_time, now)}
            </p>
          </div>
        </div>
      )}
    </Block>
  )
}
