const User = require("../models/User");

router.get('/highscore', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  return res.json({ highScore: user.highScore || 0 });
});

router.post('/submit', authMiddleware, async (req, res) => {
  const { value } = req.body;
  const user = await User.findById(req.user.id);

  if (value > (user.highScore || 0)) {
    user.highScore = value;
    await user.save();
  }

  res.status(200).json({ message: 'Score updated', highScore: user.highScore });
});
