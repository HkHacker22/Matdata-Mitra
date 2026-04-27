import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['election_update', 'reminder', 'complaint_update', 'general', 'emergency'],
    default: 'general',
  },
  targetAudience: {
    type: String,
    enum: ['all', 'citizens', 'blo', 'admin'],
    default: 'all',
  },
  targetConstituency: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
})

notificationSchema.index({ createdAt: -1 })
notificationSchema.index({ type: 1, isActive: 1 })

export default mongoose.model('Notification', notificationSchema)
