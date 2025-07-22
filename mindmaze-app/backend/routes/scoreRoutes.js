// routes/scoreRoutes.js
import express from 'express'
import Score from '../models/Score.js'

const router = express.Router()

router.post('/submit', async (req, res) => {
  try {
    const { userId, value, level, category } = req.body
    const newScore = new Score({ userId, value, level, category })
    await newScore.save()
    res.status(201).json({ message: 'Score saved successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save score' })
  }
})

// Get scores by user
router.get('/user/:userId', async (req, res) => {
  try {
    const scores = await Score.find({ user: req.params.userId })
  .populate('user', 'username') 
  .sort({ createdAt: -1 })
    res.json(scores)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scores' })
  }
})

export default router
