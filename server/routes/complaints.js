import { Router } from 'express'
import Complaint from '../models/Complaint.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = Router()

/**
 * POST /api/complaints
 * Create a new complaint (authenticated users)
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { type, description, location } = req.body

    if (!type || !description) {
      return res.status(400).json({ error: 'Type and description are required' })
    }

    const complaint = await Complaint.create({
      userId: req.user.uid,
      type,
      description,
      location: location || {},
    })

    res.status(201).json(complaint)
  } catch (error) {
    console.error('Complaint creation error:', error)
    res.status(500).json({ error: `Failed to create complaint: ${error.message}` })
  }
})

/**
 * GET /api/complaints
 * List complaints - citizens see their own, BLO/admin see assigned/all
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const filter = {}

    // Citizens see only their complaints
    if (req.user.role === 'citizen') {
      filter.userId = req.user.uid
    }

    // BLOs see assigned complaints (Temporarily allowing all complaints for demo purposes)
    if (req.user.role === 'blo') {
      // filter.assignedBlo = req.user.uid
    }

    // Admin sees all (no filter needed)

    if (status) {
      filter.status = status
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [complaints, total] = await Promise.all([
      Complaint.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      Complaint.countDocuments(filter),
    ])

    res.json({
      complaints,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    })
  } catch (error) {
    console.error('Complaints list error:', error)
    res.status(500).json({ error: 'Failed to fetch complaints' })
  }
})

/**
 * PATCH /api/complaints/:id
 * Update complaint status (BLO/admin only)
 */
router.patch('/:id', authenticate, authorize('blo', 'admin'), async (req, res) => {
  try {
    const { status, resolution, assignedBlo } = req.body
    const update = {}

    if (status) update.status = status
    if (resolution) update.resolution = resolution
    if (assignedBlo) update.assignedBlo = assignedBlo

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    )

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' })
    }

    res.json(complaint)
  } catch (error) {
    console.error('Complaint update error:', error)
    res.status(500).json({ error: 'Failed to update complaint' })
  }
})

export default router
