import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getMessaging, isSupported } from 'firebase/messaging'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null

// Auth instance
export const auth = app ? getAuth(app) : null

// Analytics instance
export const analytics = app ? getAnalytics(app) : null

// Messaging instance (only in supported browsers)
export const messaging = app
  ? isSupported().then((supported) => (supported ? getMessaging(app) : null)).catch(() => null)
  : Promise.resolve(null)


export default app
