// routes/scoreRoutes.js
const express = require('express')
const router = express.Router()
const { submitScore, getScores } = require('../controllers/scoreController')
const auth = require('../middleware/auth')

router.post('/submit', auth, submitScore)
router.get('/leaderboard', getScores)

module.exports = router
