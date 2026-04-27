import en from './locales/en.json'
import hi from './locales/hi.json'

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
]

export const defaultLanguage = 'en'

const translations = { en, hi }

export const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

export const interpolate = (str, values = {}) => {
  if (!str || typeof str !== 'string') return str
  
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return values[key] !== undefined ? values[key] : match
  })
}

export const createTranslator = (locale) => {
  const localeData = translations[locale] || translations[defaultLanguage]
  
  return (key, values = {}) => {
    const translation = getNestedValue(localeData, key) || getNestedValue(translations[defaultLanguage], key) || key
    return interpolate(translation, values)
  }
}

export const i18n = {
  currentLocale: defaultLanguage,
  t: createTranslator(defaultLanguage),
  
  setLocale(locale) {
    if (translations[locale]) {
      this.currentLocale = locale
      this.t = createTranslator(locale)
      localStorage.setItem('matdata-locale', locale)
      return true
    }
    return false
  },
  
  getLocale() {
    return this.currentLocale
  },
  
  init() {
    const savedLocale = localStorage.getItem('matdata-locale')
    if (savedLocale && translations[savedLocale]) {
      this.setLocale(savedLocale)
    } else {
      const browserLang = navigator.language.split('-')[0]
      if (translations[browserLang]) {
        this.setLocale(browserLang)
      }
    }
    return this.currentLocale
  },
  
  getAvailableLocales() {
    return languages
  }
}

export default i18n