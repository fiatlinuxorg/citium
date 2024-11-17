import mongoose from 'mongoose'
import env from '#start/env'

const connectDB = async () => {
  try {
    await mongoose.connect(env.get('MONGO_URI'))
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1) // Exit process with failure
  }
}

export default connectDB
