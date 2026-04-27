import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import i18n from '../i18n'

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(i18n.getLocale())
  const [t, setT] = useState(i18n.t)

  useEffect(() => {
    i18n.init()
    setLocaleState(i18n.getLocale())
    setT(i18n.t)
  }, [])

  const setLocale = useCallback((newLocale) => {
    const success = i18n.setLocale(newLocale)
    if (success) {
      setLocaleState(newLocale)
      setT(i18n.t)
      document.documentElement.lang = newLocale
    }
    return success
  }, [])

  const value = {
    locale,
    setLocale,
    t,
    availableLocales: i18n.getAvailableLocales(),
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(I18nContext)
  
  if (!context) {
    return {
      t: (key, values) => key,
      locale: 'en',
      setLocale: () => false,
      availableLocales: [{ code: 'en', name: 'English', nativeName: 'English' }],
    }
  }
  
  return context
}

export default useTranslation