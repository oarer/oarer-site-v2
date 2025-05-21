'use client'

import { motion, AnimatePresence } from 'framer-motion'

const TransitionProjects = ({
  children,
  uniqueKey,
}: {
  children: React.ReactNode
  uniqueKey: string | number
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        initial={{ opacity: 0, y: -25 }}
        key={uniqueKey}
        style={{ position: 'relative', width: '100%', height: '100%' }}
        transition={{
          opacity: { duration: 0.6, delay: 0.2 },
          y: { duration: 0.8, delay: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default TransitionProjects
