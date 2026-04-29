import functions from 'firebase-functions'
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

// ─── Middleware ───────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: true,
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
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  validate: { trustProxy: false } 
})
app.set('trust proxy', 1)
app.use('/', limiter)

// DB Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error('DB Connection error:', err)
    res.status(503).json({ error: 'Database service unavailable' })
  }
})

// ─── Health Check ─────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// ─── API Routes ───────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/voters', voterRoutes)
app.use('/api/complaints', complaintRoutes)
app.use('/api/booths', boothRoutes)
app.use('/api/notifications', notificationRoutes)

app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' })
})

app.all('*', (req, res) => {
  res.status(403).json({ error: 'Access forbidden' })
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  })
})

export const api = functions.https.onRequest(app)