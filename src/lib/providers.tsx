'use client'

import { useEffect, useState, useRef } from 'react'
import { I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import type { i18n as I18nType } from 'i18next'

import { initI18n } from '@/lib/i18n'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [i18nInstance, setI18nInstance] = useState<I18nType | null>(null)
  const queryClient = useRef(new QueryClient())

  useEffect(() => {
    setMounted(true)

    const lang =
      typeof document !== 'undefined'
        ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1] || 'en'
        : 'en'

    initI18n(lang).then((i18n) => {
      setI18nInstance(i18n)
    })
  }, [])

  if (!mounted || !i18nInstance) return null

  return (
    <ThemeProvider attribute="class" enableSystem>
      <QueryClientProvider client={queryClient.current}>
        <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
