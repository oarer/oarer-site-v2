import Link from 'next/link'
import type { AnchorHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean
}

export default function BlockLink({
  className,
  children,
  external = false,
  href = '/',
  ...rest
}: ILinkProps) {
  return (
    <Link
      href={href}
      {...rest}
      className={twMerge(
        `easy-in-out gap-4 rounded-xl shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 active:scale-98 active:opacity-80 dark:bg-neutral-950 dark:ring-neutral-300/10`,
        className
      )}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </Link>
  )
}
