'use client'

import { useEffect, useRef, useState } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function LazySection({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isVisible && (
            <m.div
              animate={{ opacity: 1, y: 0 }}
              className={className}
              exit={{ opacity: 0, y: 40 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {children}
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  )
}
