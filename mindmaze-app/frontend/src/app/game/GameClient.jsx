'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { puzzles as staticPuzzles } from '../data/puzzles'
import '../styles/game.css'

export default function GameClient() {
  const searchParams = useSearchParams()
  const level = searchParams.get('level')
  const category = searchParams.get('category')

  const [puzzles, setPuzzles] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [highScore, setHighScore] = useState(null)
  const [loading, setLoading] = useState(true)

  const getHighScore = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/highscore/`, {
      headers: { Authorization: token },
    })
    const data = await res.json()
    setHighScore(data.highScore)
  }

  const loadPuzzles = async () => {
    if (!level || !category) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/generate-puzzle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, category }),
      })

      if (!res.ok) throw new Error('AI puzzle fetch failed')
      const data = await res.json()
      setPuzzles([data]) // AI returns 1 puzzle
    } catch (err) {
      console.warn('AI failed, falling back to static puzzles.')
      const fallback = staticPuzzles.filter(
        (p) => p.level === level && p.category === category
      )
      setPuzzles(fallback)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPuzzles()
    getHighScore()
  }, [])

  useEffect(() => {
    if (isCompleted || result) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer)
          setResult('timeout')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [index, result, isCompleted])

  useEffect(() => {
    if (isCompleted) {
      submitScoreToBackend(score, level, category)
    }
  }, [isCompleted])

  const checkAnswer = () => {
    if (result) return
    const puzzle = puzzles[index]
    if (selected === puzzle.answer) {
      setResult('correct')
      setScore((prev) => prev + 1)
    } else {
      setResult('wrong')
    }
  }

  const nextPuzzle = () => {
    const next = index + 1
    if (next >= puzzles.length) {
      setIsCompleted(true)
    } else {
      setResult(null)
      setSelected(null)
      setIndex(next)
      setTimeLeft(15)
    }
  }

  const submitScoreToBackend = async (scoreValue, level, category) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/highscore/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ value: scoreValue, level, category }),
      })
    } catch (error) {
      console.error('Error submitting score:', error)
    }
  }

  if (!category || !level) {
    return (
      <div className="game-container">
        <h2>Please select a category and level to start the game.</h2>
        <button onClick={() => window.location.href = '/start'}>Go to Start</button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="game-container">
        <h2>Loading puzzle...</h2>
      </div>
    )
  }

  if (puzzles.length === 0) {
    return (
      <div className="game-container">
        <h2>No puzzles available for this category and level.</h2>
        <button onClick={() => window.location.href = '/start'}>Try Again</button>
      </div>
    )
  }

  const puzzle = puzzles[index]

  if (isCompleted) {
    return (
      <div className="game-container">
        <h2>🎉 Game Completed!</h2>
        <p>Your score: {score} / {puzzles.length}</p>
        {highScore !== null && <p>🏆 Your high score: {highScore}</p>}
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    )
  }

  return (
    <div className="game-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        ></div>
      </div>

      <div className="timer">⏳ Time Left: {timeLeft}s</div>

      <h2 className="question">🧩 {puzzle.question}</h2>

      <div className="options">
        {puzzle.options.map((opt) => (
          <button
            key={opt}
            className={`option ${selected === opt ? 'selected' : ''}`}
            onClick={() => !result && setSelected(opt)}
            disabled={!!result}
          >
            {opt}
          </button>
        ))}
      </div>

      {!result && (
        <button className="submit-btn" onClick={checkAnswer}>
          Submit
        </button>
      )}

      {result && (
        <div className="result">
          {result === 'correct' && '✅ Correct!'}
          {result === 'wrong' && '❌ Wrong!'}
          {result === 'timeout' && "⏱️ Time's up!"}
        </div>
      )}

      {result && (
        <button className="next-btn" onClick={nextPuzzle}>
          Next Puzzle
        </button>
      )}
    </div>
  )
}
