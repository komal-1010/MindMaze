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

// Leaderboard: Top users by total score and games played
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      {
        $group: {
          _id: '$userx',
          totalScore: { $sum: '$value' },
          gamesPlayed: { $sum: 1 }
        }
      },
      {
        $sort: { totalScore: -1, gamesPlayed: -1 }
      },
      {
        $limit: 10 
      },
      {
        $lookup: {
          from: 'users',       
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          userId: '$_id',
          username: '$user.username',
          totalScore: 1,
          gamesPlayed: 1,
          _id: 0
        }
      }
    ])

    res.json(leaderboard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})
export default router
