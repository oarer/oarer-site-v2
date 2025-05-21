import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'

import Button from '@/components/UI/button/Button'

export default function LanguageSwitcher() {
  const { i18n: i18nInstance } = useTranslation()

  const changeLang = () => {
    const newLang = i18nInstance.language === 'ru' ? 'en' : 'ru'
    i18nInstance.changeLanguage(newLang)
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`
  }

  return (
    <Button className="w-fit px-3 py-2" onClick={changeLang}>
      <div className="flex items-center gap-2">
        <Icon className="text-xl" icon="lucide:languages" />
        <p className="font-semibold">
          {i18nInstance.language === 'ru' ? 'Русский' : 'English'}
        </p>
      </div>
    </Button>
  )
}
