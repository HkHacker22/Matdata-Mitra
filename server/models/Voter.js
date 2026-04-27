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
}, {
  timestamps: true,
})

// Text index for search
voterSchema.index({ name: 'text', voterId: 'text', address: 'text' })

export default mongoose.model('Voter', voterSchema)
