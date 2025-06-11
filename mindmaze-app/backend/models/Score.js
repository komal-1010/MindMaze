import mongoose from 'mongoose'

const scoreSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  value: { type: Number, required: true },
  level: { type: String, required: true },     
  category: { type: String, required: true },   
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Score', scoreSchema)