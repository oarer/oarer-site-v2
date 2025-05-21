'use client'

import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'

import Button from '@/components/UI/button/Button'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      className={`flex items-center gap-2 px-4 py-2`}
      onClick={toggleTheme}
    >
      <div className="relative flex items-center justify-center px-2">
        <Icon
          className={`absolute text-xl transition-opacity duration-500 ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
          icon="lucide:sun"
        />
        <Icon
          className={`absolute text-xl transition-opacity duration-500 ${
            theme === 'dark' ? 'opacity-0' : 'opacity-100'
          }`}
          icon="lucide:moon-star"
        />
      </div>
      <p className="font-semibold">
        {theme === 'dark' ? `${t('theme.light')}` : `${t('theme.dark')}`}
      </p>
    </Button>
  )
}
