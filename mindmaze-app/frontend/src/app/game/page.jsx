'use client'
import { useState, useEffect } from 'react'
import { puzzles } from '../data/puzzles'
import '../styles/game.css'
export default function Game() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const puzzle = puzzles[index]

  useEffect(() => {
    if (isCompleted) {
      submitScoreToBackend(score)
    }
  }, [isCompleted])

  const checkAnswer = () => {
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
    }
  }

  const submitScoreToBackend = async (scoreValue) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await fetch('http://localhost:5000/api/score/submit', {
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
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    )
  }

  return (
    <div className="game-container">
      <h2 className="question">🧩 {puzzle.question}</h2>
      <div className="options">
        {puzzle.options.map((opt) => (
          <button
            key={opt}
            className={`option ${selected === opt ? 'selected' : ''}`}
            onClick={() => setSelected(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <button className="submit-btn" onClick={checkAnswer}>
        Submit
      </button>

      {result && (
        <div className="result">
          {result === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
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
