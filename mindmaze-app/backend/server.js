// server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mindmaze')

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/score', require('./routes/scoreRoutes'))

app.listen(5000, () => console.log('Server started on port 5000'))
