// controllers/authController.js
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || 'mindmaze_secret'

exports.register = async (req, res) => {
  const { username, password } = req.body
  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) return res.status(400).json({ msg: 'User already exists' })

    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashed })
    await user.save()

    res.json({ msg: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ msg: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' })

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '2h' })
    res.json({ token, userId: user._id, username: user.username })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
