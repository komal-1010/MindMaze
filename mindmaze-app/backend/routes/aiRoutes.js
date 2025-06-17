import express from 'express'
import { generatePuzzle } from '../controllers/aiController.js'
const router = express.Router()
router.get('/generate', generatePuzzle)
export default router
