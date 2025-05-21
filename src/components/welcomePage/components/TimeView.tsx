'use client'

import { useEffect, useState } from 'react'

import { mono } from '@/lib/fonts'

type ClockProps = {
  timeZone: string
}

export default function TimeView({ timeZone }: ClockProps) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('ru-RU', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })

      setTime(formatter.format(now))
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [timeZone])

  return <p className={`${mono.className}`}>{time}</p>
}
