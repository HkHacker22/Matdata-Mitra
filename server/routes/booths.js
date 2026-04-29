import { Router } from 'express'
import Booth from '../models/Booth.js'
import Voter from '../models/Voter.js'

const router = Router()

/**
 * GET /api/booths/search?q=query
 * Search booths by name, address, or constituency
 */
router.get('/search', async (req, res) => {
  try {
    const { q, constituency, page = 1, limit = 20 } = req.query

    const filter = {}

    if (q && q.length >= 2) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { address: { $regex: q, $options: 'i' } },
        { constituency: { $regex: q, $options: 'i' } },
      ]
    }

    if (constituency) {
      filter.constituency = constituency
    }

    filter.isActive = true

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [booths, total] = await Promise.all([
      Booth.find(filter).skip(skip).limit(parseInt(limit)).lean(),
      Booth.countDocuments(filter),
    ])

    res.json({
      booths,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    })
  } catch (error) {
    console.error('Booth search error:', error)
    res.status(500).json({ error: 'Search failed' })
  }
})

/**
 * GET /api/booths/nearest?lat=&lng=&maxDistance=5000
 * Find nearest polling booths using geospatial query
 */
router.get('/nearest', async (req, res) => {
  try {
    const { lat, lng, maxDistance = 5000 } = req.query

    if (!lat || !lng) {
      return res.status(400).json({ error: 'lat and lng are required' })
    }

    const booths = await Booth.find({
      isActive: true,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(maxDistance), // meters
        },
      },
    }).limit(10).lean()

    res.json({ booths })
  } catch (error) {
    console.error('Nearest booth error:', error)
    res.status(500).json({ error: 'Failed to find nearest booths' })
  }
})

// Alias for nearest
router.get('/nearby', (req, res) => {
  res.redirect(301, `/api/booths/nearest?${new URLSearchParams(req.query).toString()}`)
})

/**
 * GET /api/booths/map-data
 * Get all booths with verification stats for map plotting
 */
router.get('/map-data', async (req, res) => {
  try {
    const stats = await Voter.aggregate([
      {
        $group: {
          _id: "$pollingStation",
          totalVoters: { $sum: 1 },
          verifiedVoters: { $sum: { $cond: ["$verified", 1, 0] } }
        }
      }
    ])

    const booths = await Booth.find({ isActive: true }).lean()
    
    const mapData = booths.map(booth => {
      const stat = stats.find(s => s._id === booth.name) || { totalVoters: 0, verifiedVoters: 0 }
      return {
        ...booth,
        totalVoters: stat.totalVoters,
        verifiedVoters: stat.verifiedVoters
      }
    })

    res.json(mapData)
  } catch (error) {
    console.error('Map data fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch map data' })
  }
})

/**
 * GET /api/booths/:id
 * Get booth by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const booth = await Booth.findById(req.params.id).lean()
    if (!booth) {
      return res.status(404).json({ error: 'Booth not found' })
    }
    res.json(booth)
  } catch (error) {
    console.error('Booth fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch booth' })
  }
})

export default router
