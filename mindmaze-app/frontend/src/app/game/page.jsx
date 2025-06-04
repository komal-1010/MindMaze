'use client'
import { useState } from 'react'
import { puzzles } from '../data/puzzles'

export default function Game() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)

  const puzzle = puzzles[index]

  const checkAnswer = () => {
    if (selected === puzzle.answer) {
      setResult('correct')
    } else {
      setResult('wrong')
    }
  }

  const nextPuzzle = () => {
    setResult(null)
    setSelected(null)
    setIndex((prev) => (prev + 1) % puzzles.length)
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🧩 {puzzle.question}</h2>
      <div className="space-y-2">
        {puzzle.options.map((opt) => (
          <button
            key={opt}
            className={`block w-full p-2 border rounded ${selected === opt ? 'bg-blue-300' : 'bg-white'}`}
            onClick={() => setSelected(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={checkAnswer}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      {result && (
        <div className="mt-4 text-lg font-semibold">
          {result === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
        </div>
      )}

      {result && (
        <button
          onClick={nextPuzzle}
          className="mt-4 block bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next Puzzle
        </button>
      )}
    </div>
  )
}
