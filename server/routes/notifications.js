import { Router } from 'express'
import Notification from '../models/Notification.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = Router()

/**
 * GET /api/notifications
 * List active notifications (public, no auth required)
 */
router.get('/', async (req, res) => {
  try {
    const { type, page = 1, limit = 20 } = req.query

    const filter = { isActive: true }

    // Filter expired notifications
    filter.$or = [
      { expiresAt: null },
      { expiresAt: { $gt: new Date() } },
    ]

    if (type) {
      filter.type = type
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [notifications, total] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      Notification.countDocuments(filter),
    ])

    res.json({
      notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    })
  } catch (error) {
    console.error('Notifications error:', error)
    res.status(500).json({ error: 'Failed to fetch notifications' })
  }
})

/**
 * POST /api/notifications
 * Create notification (admin only)
 */
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { title, body, type, targetAudience, targetConstituency, expiresAt } = req.body

    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' })
    }

    const notification = await Notification.create({
      title,
      body,
      type: type || 'general',
      targetAudience: targetAudience || 'all',
      targetConstituency: targetConstituency || '',
      expiresAt: expiresAt || null,
    })

    res.status(201).json(notification)
  } catch (error) {
    console.error('Notification creation error:', error)
    res.status(500).json({ error: 'Failed to create notification' })
  }
})

export default router
