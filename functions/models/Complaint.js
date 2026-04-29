import mongoose from 'mongoose'

const complaintSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['booth_issue', 'voter_intimidation', 'evm_malfunction', 'accessibility', 'other'],
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    constituency: { type: String, default: '' },
    boothNo: { type: String, default: '' },
    address: { type: String, default: '' },
    lat: { type: Number },
    lng: { type: Number },
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved', 'rejected'],
    default: 'pending',
    index: true,
  },
  assignedBlo: {
    type: String,
    default: null,
  },
  attachments: [{
    url: String,
    type: String,
  }],
  resolution: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
})

export default mongoose.model('Complaint', complaintSchema)
