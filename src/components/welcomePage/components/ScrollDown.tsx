'use client'

import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

export default function ScrollDown() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 200
      const scrollY = window.scrollY
      const newOpacity = Math.max(0, 1 - scrollY / maxScroll)
      setOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-1 transition-opacity duration-300 md:flex"
      style={{ opacity }}
    >
      <Icon className="text-xl" icon="lucide:chevrons-down" />
      <p className="text-lg font-semibold">Scroll down</p>
    </div>
  )
}
