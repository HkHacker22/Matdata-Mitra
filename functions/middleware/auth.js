import admin from 'firebase-admin'
import { readFileSync, existsSync } from 'fs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Initialize Firebase Admin SDK
let firebaseInitialized = false

const initFirebaseAdmin = () => {
  if (firebaseInitialized) return

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './config/serviceAccountKey.json'
  
  if (existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'))
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    firebaseInitialized = true
    console.log('✅ Firebase Admin initialized')
  } else {
    console.warn('⚠️  Firebase service account key not found. Auth middleware will use JWT fallback.')
  }
}

// Try to initialize on import
try { initFirebaseAdmin() } catch (e) { /* will use JWT fallback */ }

/**
 * Auth middleware - verifies Firebase ID token or falls back to JWT
 * Attaches user info to req.user
 */
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No authentication token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    // Try Firebase Admin verification first
    if (firebaseInitialized) {
      const decoded = await admin.auth().verifyIdToken(token)
      // Fetch user from DB to get the correct role (since Firebase tokens lack custom claims by default)
      const dbUser = await User.findOne({ uid: decoded.uid })
      
      req.user = {
        uid: decoded.uid,
        email: decoded.email,
        phone: decoded.phone_number,
        role: dbUser ? dbUser.role : (decoded.role || 'citizen'),
      }
      return next()
    }

    // Fallback: JWT verification (for dev/testing without Firebase)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const dbUserFallback = await User.findOne({ uid: decoded.uid || decoded.sub })
    
    req.user = {
      uid: decoded.uid || decoded.sub,
      email: decoded.email,
      phone: decoded.phone,
      role: dbUserFallback ? dbUserFallback.role : (decoded.role || 'citizen'),
    }
    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

/**
 * Role-based authorization middleware
 * Usage: authorize('admin', 'blo')
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    next()
  }
}

export default { authenticate, authorize }
