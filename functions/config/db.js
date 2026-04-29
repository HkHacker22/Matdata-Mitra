import mongoose from 'mongoose'

let cachedConnection = null

const connectDB = async () => {
  if (cachedConnection) {
    console.log('✅ Using cached MongoDB connection')
    return cachedConnection
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
    cachedConnection = conn
    return conn
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`)
    // Do not exit process in serverless
    throw error
  }
}

export default connectDB
