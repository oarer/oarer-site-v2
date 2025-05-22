'use client'

import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useContext, useRef } from 'react'

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? null)
  const frozen = useRef(context).current

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

const TransitionEffect = ({ children }: { children: React.ReactNode }) => {
  const key = usePathname()

  if (!children) return null

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <m.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          initial={{ opacity: 0, y: -25 }}
          key={key}
          transition={{
            opacity: { duration: 1, delay: 0.2 },
            y: { duration: 1, delay: 0.2 },
          }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  )
}

export default TransitionEffect
