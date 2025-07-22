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

exports.getScores = async (req, res) => {
  try {
    const scores = await Score.find().populate('user', 'username').sort({ value: -1 }).limit(10)
    res.json(scores)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
