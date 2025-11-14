import mongoose from 'mongoose'

const scoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  value: { type: Number, required: true },
  level: { type: String, required: true },     
  category: { type: String, required: true },   
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Score', scoreSchema)