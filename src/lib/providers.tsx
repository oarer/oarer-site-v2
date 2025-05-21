'use client'

import { useRef, useState, useEffect, type ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import en from '@/locales/en/translation.json'
import ru from '@/locales/ru/translation.json'

interface Props {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  const [mounted, setMounted] = useState(false)
  const [i18nReady, setI18nReady] = useState(false)
  const queryClient = useRef<QueryClient>(new QueryClient())

  useEffect(() => {
    setMounted(true)

    if (!i18n.isInitialized) {
      const lang =
        typeof document !== 'undefined'
          ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1] || 'en'
          : 'en'

      i18n
        .use(initReactI18next)
        .init({
          resources: {
            en: { translation: en },
            ru: { translation: ru },
          },
          lng: lang,
          fallbackLng: 'en',
          interpolation: {
            escapeValue: false,
          },
        })
        .then(() => setI18nReady(true))
    } else {
      setI18nReady(true)
    }
  }, [])

  if (!mounted || !i18nReady) return null

  return (
    <ThemeProvider attribute="class" enableSystem>
      <QueryClientProvider client={queryClient.current}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
