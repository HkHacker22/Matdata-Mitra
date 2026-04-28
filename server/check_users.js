import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config({ path: '../.env' })

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    const users = await User.find({}).lean()
    console.log('Users:', users.map(u => ({ email: u.email, role: u.role, uid: u.uid })))
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
check()
