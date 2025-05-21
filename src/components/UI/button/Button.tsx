import type { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Button({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={twMerge(
        `cursor-pointer rounded-xl bg-neutral-100/20 ring-2 ring-neutral-400/30 duration-500 ease-in-out hover:scale-98 hover:opacity-80 active:scale-94 active:opacity-90 dark:bg-neutral-900/20 dark:ring-neutral-600/30`,
        className
      )}
    >
      {children}
    </button>
  )
}
