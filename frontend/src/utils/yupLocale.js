import { setLocale } from 'yup'
import * as yupLocales from 'yup-locales'

// Fonction pour définir la langue de Yup selon le code
export const setYupLanguage = (lang) => {
  switch (lang) {
    case 'fr':
      setLocale(yupLocales.fr)
      break
    case 'ar':
      setLocale(yupLocales.ar)
      break
    case 'en':
      setLocale(yupLocales.en)
      break
    default:
      setLocale(yupLocales.fr)
  }
}
