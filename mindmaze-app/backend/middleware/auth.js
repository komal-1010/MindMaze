// middleware/auth.js
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET || 'mindmaze_secret'

module.exports = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' })

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(400).json({ msg: 'Token is not valid' })
  }
}
