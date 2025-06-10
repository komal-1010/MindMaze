'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../styles/game.css'

export default function StartPage() {
  const [category, setCategory] = useState('math')
  const [level, setLevel] = useState('easy')
  const router = useRouter()

  const startGame = () => {
    router.push(`/game?category=${category}&level=${level}`)
  }

  return (
    <div className="game-container">
      <h2>Select Category & Level</h2>

      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="math">Math</option>
          <option value="logic">Logic</option>
          <option value="word">Word</option>
          <option value="general">General</option>
        </select>
      </label>

      <label>
        Level:
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <button onClick={startGame}>Start Game</button>
    </div>
  )
}
