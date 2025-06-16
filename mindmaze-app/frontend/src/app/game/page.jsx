'use client'
import { useState, useEffect } from 'react'
import { puzzles } from '../data/puzzles'
import '../styles/game.css'
import { useSearchParams } from 'next/navigation'

export default function Game() {
  const searchParams = useSearchParams()
const level = searchParams.get('level')
const category = searchParams.get('category')

const filteredPuzzles = puzzles.filter(
  (p) => p.level === level && p.category === category
)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)

  const puzzle = puzzles[index]
  const [highScore, setHighScore] = useState(null)

  const getHighScore = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/score/highscore`, {
      headers: { Authorization: token },
    })
    const data = await res.json()
    setHighScore(data.highScore)
  }
  if (filteredPuzzles.length === 0) {
  return (
    <div className="game-container">
      <h2>No puzzles found for this category & level.</h2>
      <button onClick={() => window.location.href = '/start'}>Try Again</button>
    </div>
  )
}

  useEffect(() => {
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
      submitScoreToBackend(score)
    }
  }, [isCompleted])

  const checkAnswer = () => {
    if (result) return // prevent re-submitting
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

  const submitScoreToBackend = async (scoreValue) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await fetch(`${process.env.BASE_URL}/api/score/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ value: scoreValue }),
      })
    } catch (error) {
      console.error('Error submitting score:', error)
    }
  }

  if (isCompleted) {
    return (
      <div className="game-container">
        <h2>🎉 Game Completed!</h2>
        <p>Your score: {score} / {puzzles.length}</p>
        {highScore !== null && (
          <p>🏆 Your high score: {highScore}</p>
        )}
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
            onClick={() => !result && setSelected(opt)} // Disable if answered
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
          {result === 'timeout' && '⏱️ Time\'s up!'}
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