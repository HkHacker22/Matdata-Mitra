import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Voter from './models/Voter.js'
import Booth from './models/Booth.js'

dotenv.config({ path: '../.env' })

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to DB')

    const stats = await Voter.aggregate([
      {
        $group: {
          _id: "$pollingStation",
          totalVoters: { $sum: 1 },
          verifiedVoters: { $sum: { $cond: ["$verified", 1, 0] } }
        }
      }
    ])
    console.log('Stats:', stats)

    const booths = await Booth.find({ isActive: true }).lean()
    console.log('Booths count:', booths.length)

    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

test()
