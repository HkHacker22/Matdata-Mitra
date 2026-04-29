import mongoose from 'mongoose'

const boothSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  constituency: {
    type: String,
    required: true,
    index: true,
  },
  partNo: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  facilities: {
    ramp: { type: Boolean, default: false },
    drinkingWater: { type: Boolean, default: false },
    toilet: { type: Boolean, default: false },
    electricity: { type: Boolean, default: true },
    shade: { type: Boolean, default: false },
  },
  bloName: {
    type: String,
    default: '',
  },
  bloPhone: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})

// Geospatial index for nearest booth queries
boothSchema.index({ location: '2dsphere' })
boothSchema.index({ name: 'text', address: 'text' })

export default mongoose.model('Booth', boothSchema)
