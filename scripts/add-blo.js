import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../server/config/db.js'
import User from '../server/models/User.js'

/**
 * Helper script to pre-authorize a BLO user in the database.
 * Run: node scripts/add-blo.js <email> <uid> <name>
 */

const addBLO = async () => {
  const [email, uid, name] = process.argv.slice(2)

  if (!email || !uid || !name) {
    console.error('Usage: node scripts/add-blo.js <email> <uid> <name>')
    process.exit(1)
  }

  try {
    await connectDB()
    
    const user = await User.findOneAndUpdate(
      { uid },
      {
        uid,
        email,
        name,
        role: 'blo',
      },
      { upsert: true, new: true }
    )

    console.log(`✅ BLO authorized successfully:`)
    console.log(`   Name:  ${user.name}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   UID:   ${user.uid}`)
    
    await mongoose.connection.close()
  } catch (err) {
    console.error('❌ Error adding BLO:', err)
    process.exit(1)
  }
}

addBLO()
