import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'

let initialized = false

export async function initI18n(lang: string = 'en') {
  if (initialized) return i18n
  initialized = true

  await i18n
    .use(LocalStorageBackend)
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: lang,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      backend: {
        backends: [LocalStorageBackend, HttpBackend],
        backendOptions: [
          {
            expirationTime: 24 * 60 * 60 * 1000,
            prefix: 'i18next_res_',
          },
          {
            loadPath: '/locales/{{lng}}/translation.json',
          },
        ],
      },
    })

  return i18n
}
