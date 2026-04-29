import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import connectDB from './config/db.js'

// Route imports
import authRoutes from './routes/auth.js'
import voterRoutes from './routes/voters.js'
import complaintRoutes from './routes/complaints.js'
import boothRoutes from './routes/booths.js'
import notificationRoutes from './routes/notifications.js'

const app = express()
const PORT = process.env.PORT || 3001

// ─── Middleware ───────────────────────────────────────
app.use(helmet())

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  process.env.CORS_ORIGIN
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Prevent directory enumeration and block access to dotfiles
app.use((req, res, next) => {
  if (req.url.split('/').some(part => part.startsWith('.'))) {
    return res.status(403).json({ error: 'Access denied' })
  }
  next()
})

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: { error: 'Too many requests, please try again later.' },
})
app.use('/api/', limiter)

// ─── Health Check ─────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// ─── API Routes ───────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/voters', voterRoutes)
app.use('/api/complaints', complaintRoutes)
app.use('/api/booths', boothRoutes)
app.use('/api/notifications', notificationRoutes)

// ─── 404 Handler ──────────────────────────────────────
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' })
})

// Global catch-all to prevent directory listing or information leakage on other paths
app.all('*', (req, res) => {
  res.status(403).json({ error: 'Access forbidden' })
})

// ─── Error Handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  })
})

// ─── Start Server ─────────────────────────────────────
const start = async () => {
  // Connect to MongoDB
  await connectDB()

  app.listen(PORT, () => {
    console.log(`\n🚀 Matdata Mitra API server running on http://localhost:${PORT}`)
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`)
    console.log(`🔗 API base: http://localhost:${PORT}/api\n`)
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
