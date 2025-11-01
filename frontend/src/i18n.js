import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationFR from './locales/fr/translation.json'
import translationAR from './locales/ar/translation.json'

const resources = {
  fr: {
    translation: translationFR,
  },
  ar: {
    translation: translationAR,
  },
}

i18n
  .use(initReactI18next) // ✅ nouvelle façon
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',

    interpolation: {
      escapeValue: false, // React protège déjà du XSS
    },
  })

export default i18n
