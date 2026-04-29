import mongoose from 'mongoose'

const voterSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  assemblyConstituency: {
    type: String,
    required: true,
    index: true,
  },
  pollingStation: {
    type: String,
    required: true,
  },
  partNo: {
    type: String,
    required: true,
  },
  sectionNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
  photo: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: {
    type: Date,
    default: null,
  },
  verifiedBy: {
    type: String,
    default: null,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0],
    },
  },
}, {
  timestamps: true,
})

// Text index for search
voterSchema.index({ name: 'text', voterId: 'text', address: 'text' })
// Geospatial index
voterSchema.index({ location: '2dsphere' })

export default mongoose.model('Voter', voterSchema)
