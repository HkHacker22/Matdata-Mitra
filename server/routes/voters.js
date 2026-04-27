import { Router } from 'express'
import Voter from '../models/Voter.js'

const router = Router()

/**
 * GET /api/voters/search?q=query
 * Search voters by name, voterId, or address
 */
router.get('/search', async (req, res) => {
  try {
    const { q, constituency, page = 1, limit = 20 } = req.query

    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' })
    }

    const filter = {
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { voterId: { $regex: q, $options: 'i' } },
        { address: { $regex: q, $options: 'i' } },
      ],
    }

    if (constituency) {
      filter.assemblyConstituency = constituency
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [voters, total] = await Promise.all([
      Voter.find(filter).skip(skip).limit(parseInt(limit)).lean(),
      Voter.countDocuments(filter),
    ])

    res.json({
      voters,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    })
  } catch (error) {
    console.error('Voter search error:', error)
    res.status(500).json({ error: 'Search failed' })
  }
})

/**
 * GET /api/voters/:id
 * Get voter by MongoDB _id or voterId
 */
router.get('/:id', async (req, res) => {
  try {
    const voter = await Voter.findOne({
      $or: [
        { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : undefined },
        { voterId: req.params.id },
      ].filter(Boolean),
    }).lean()

    if (!voter) {
      return res.status(404).json({ error: 'Voter not found' })
    }

    res.json(voter)
  } catch (error) {
    console.error('Voter fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch voter' })
  }
})

export default router
