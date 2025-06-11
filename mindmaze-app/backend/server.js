// server.js
import scoreRoutes from './routes/scoreRoutes.js'
import authRoutes from './routes/autoRoutes.js'
import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
dotenv.config()
connectDB()
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mindmaze')

app.use('/api/auth', authRoutes)
app.use('/api/score', scoreRoutes)
app.listen(5000, () => console.log('Server started on port 5000'))
