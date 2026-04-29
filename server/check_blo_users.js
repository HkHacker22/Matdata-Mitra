import 'dotenv/config'
import mongoose from 'mongoose'
import User from './models/User.js'
import connectDB from './config/db.js'

async function check() {
  await connectDB()
  const users = await User.find({ role: 'blo' })
  console.log('BLO Users in DB:')
  users.forEach(u => console.log(`- ${u.name} (${u.email}) [UID: ${u.uid}]`))
  await mongoose.connection.close()
}

check()
