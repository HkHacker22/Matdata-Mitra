import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Voter from '../models/Voter.js'
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

    // 1. Check if user already exists
    let user = await User.findOne({ uid })

    // 2. Role Security Check
    if (role === 'blo' || (user && user.role === 'blo')) {
      // If user doesn't exist yet, they cannot register as a BLO via this endpoint
      if (!user) {
        return res.status(403).json({ error: 'Unauthorized. BLO accounts must be pre-registered.' })
      }
      // If they exist but aren't a BLO in the DB, reject the request to change role to BLO
      if (user.role !== 'blo') {
         return res.status(403).json({ error: 'Access denied. You do not have BLO privileges.' })
      }
    }

    // 3. Upsert for Citizens, Update for existing BLOs
    if (!user) {
      // Create new Citizen
      user = await User.create({
        uid,
        name: name || '',
        email: email || '',
        phone: phone || '',
        role: 'citizen', // Force citizen role for new registrations
        lastLogin: new Date(),
      })
    } else {
      // Update existing user (Citizen or BLO)
      user.name = name || user.name
      user.email = email || user.email
      user.phone = phone || user.phone
      user.lastLogin = new Date()
      await user.save()
    }

    // 4. Generate JWT
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
        epicId: user.epicId,
      },
    })
  } catch (error) {
    console.error('Auth error:', error)
    res.status(500).json({ error: 'Authentication failed' })
  }
})

/**
 * PATCH /api/auth/profile
 * Link EPIC ID to the user profile
 */
router.patch('/profile', authenticate, async (req, res) => {
  try {
    const { epicId } = req.body
    const user = await User.findOne({ uid: req.user.uid })
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (epicId) {
      // Verify epicId exists in Voter database (case-insensitive)
      const voter = await Voter.findOne({ 
        voterId: { $regex: new RegExp(`^${epicId}$`, 'i') } 
      })
      if (!voter) {
        return res.status(400).json({ error: 'Invalid EPIC ID. Voter not found in electoral rolls.' })
      }
      user.epicId = voter.voterId // Use the canonical uppercase version from DB
    }

    await user.save()

    res.json({
      uid: user.uid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      epicId: user.epicId,
    })
  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({ error: 'Failed to update profile' })
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
