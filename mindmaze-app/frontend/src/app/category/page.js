'use client'
import { useRouter } from 'next/navigation'

export default function Category() {
  const router = useRouter()

  const levels = ['easy', 'medium', 'hard']

  return (
    <div className="home-container">
      <h2>Select Difficulty Level</h2>
      {levels.map((lvl) => (
        <button key={lvl} onClick={() => router.push(`/game?level=${lvl}`)}>
          {lvl.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
