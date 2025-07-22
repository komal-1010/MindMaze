import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';
import router from './autoRoutes.js';
import Score from '../models/Score.js';

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json({ highScore: user?.highScore || 0 });
  } catch (err) {
    console.error('Error fetching high score:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { value, level, category } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (typeof value !== 'number' || value < 0) {
      return res.status(400).json({ error: 'Invalid score' });
    }
    const score = new Score({
      user: user._id,
      value,
      level,
      category,
    });

    await score.save();
    if (value > (user.highScore || 0)) {
      user.highScore = value;
      await user.save();
    }

    res.status(200).json({ message: 'Score updated', highScore: user.highScore });
  } catch (err) {
    console.error('Error submitting score:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router
