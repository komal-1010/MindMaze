'use client'
import { useEffect, useState } from 'react'

export default function Leaderboard() {
  const [scores, setScores] = useState([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch('http://localhost:5000/api/score/leaderboard')
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
          <li key={entry._id}>
            {index + 1}. {entry.user.username} — {entry.value}
          </li>
        ))}
      </ul>
    </div>
  )
}
