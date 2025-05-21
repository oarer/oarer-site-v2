import type { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Icon } from '@iconify/react'

import { zed } from '@/lib/fonts'

export interface IBlockProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string
  heading?: ReactNode
}

export default function Block({
  children,
  className,
  heading,
  icon = 'lucide:circle-help',
  ...rest
}: IBlockProps) {
  return (
    <div
      {...rest}
      className={twMerge(
        `easy-in-out grid grid-rows-[auto_1fr] gap-4 rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 dark:bg-neutral-900/10 dark:ring-neutral-300/10`,
        className
      )}
    >
      {heading && (
        <div className="flex items-center gap-2">
          <Icon
            className="text-lg text-neutral-800 dark:text-neutral-100/70"
            icon={icon}
          />
          <h1
            className={`${zed.className} text-sm text-neutral-800 dark:text-neutral-100/70`}
          >
            {heading}
          </h1>
        </div>
      )}

      {children}
    </div>
  )
}
