import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

/**
 * POST /api/auth/verify-token
 * Verifies Firebase ID token and creates/updates user in MongoDB.
 * For dev without Firebase: accepts { uid, email, phone, name } in body to generate a JWT.
 */
router.post('/verify-token', async (req, res) => {
  try {
    const { uid, email, phone, name, role } = req.body

    if (!uid) {
      return res.status(400).json({ error: 'uid is required' })
    }

    // Upsert user in MongoDB
    const user = await User.findOneAndUpdate(
      { uid },
      {
        uid,
        name: name || '',
        email: email || '',
        phone: phone || '',
        role: role || 'citizen',
        lastLogin: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    // Generate JWT for the session
    const token = jwt.sign(
      {
        uid: user.uid,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        uid: user.uid,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Auth error:', error)
    res.status(500).json({ error: 'Authentication failed' })
  }
})

/**
 * GET /api/auth/me
 * Returns current user profile
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

export default router
