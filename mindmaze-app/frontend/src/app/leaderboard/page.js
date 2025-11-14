'use client'
import { useEffect, useState } from 'react'

export default function Leaderboard() {
  const [scores, setScores] = useState([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/score/leaderboard`)
      const data = await res.json()
      setScores(data)
    }
    fetchLeaderboard()
  }, [])

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      <ul>
        {scores.map((entry, index) => (
          <li key={entry.userId}>
            {index + 1}. {entry.username} — {entry.totalScore} points ({entry.gamesPlayed} games)
          </li>
        ))}
      </ul>
    </div>
  )
}
