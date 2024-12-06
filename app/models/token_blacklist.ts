import mongoose from 'mongoose'

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: '1h', default: Date.now },
})

const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema)

export default TokenBlacklist
