// controllers/scoreController.js
const Score = require('../models/Score')

exports.submitScore = async (req, res) => {
  const { value, level, category } = req.body
  const userId = req.user.id
  try {
    const score = new Score({ user: userId, value, level, category})
    await score.save()
    res.json({ msg: 'Score submitted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getUserScores = async (req, res) => {
  try {
    const userId = req.params.userId
    const scores = await Score.find({ user: userId }).sort({ createdAt: -1 })
    res.json(scores) // not wrapped, frontend handles it with Array.isArray
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
