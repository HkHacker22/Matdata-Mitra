import 'dotenv/config'
import mongoose from 'mongoose'
import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import connectDB from './config/db.js'
import User from './models/User.js'

// Initialize Firebase Admin
const serviceAccount = JSON.parse(readFileSync('./config/serviceAccountKey.json', 'utf8'))
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const createBLO = async () => {
  const [email, password, name] = process.argv.slice(2)

  if (!email || !password || !name) {
    console.error('Usage: node scripts/create-blo.js <email> <password> <name>')
    process.exit(1)
  }

  try {
    // 1. Create user in Firebase Auth
    console.log(`⏳ Creating user in Firebase Auth...`)
    const fbUser = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    })
    console.log(`✅ Firebase user created: ${fbUser.uid}`)

    // 2. Connect to MongoDB
    await connectDB()
    
    // 3. Create/Update user in MongoDB
    const user = await User.findOneAndUpdate(
      { uid: fbUser.uid },
      {
        uid: fbUser.uid,
        email,
        name,
        role: 'blo',
      },
      { upsert: true, new: true }
    )

    console.log(`✅ BLO authorized in MongoDB successfully:`)
    console.log(`   Name:  ${user.name}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Role:  ${user.role}`)
    
    await mongoose.connection.close()
    process.exit(0)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

createBLO()
