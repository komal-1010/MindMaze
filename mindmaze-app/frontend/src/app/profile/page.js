'use client'
import { useEffect, useState } from 'react'

export default function Profile() {
  const [results, setResults] = useState([])

  const username = localStorage.getItem('username')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`, {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(data => {
        setResults(data.results || [])
      })
  }, [])

  // 🧮 Compute high score and games played from results
  const highScore = results.length > 0 ? Math.max(...results.map(r => r.value)) : 0
  const gamesPlayed = results.length

  return (
    <div className="form-container">
      <h2>👤 Your Profile</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Highest Score:</strong> {highScore}</p>
      <p><strong>Games Played:</strong> {gamesPlayed}</p>

      <h3>📊 Game History</h3>
      {results.length > 0 ? (
        <ul>
          {results.map((res, index) => (
            <li key={index}>
              <p><strong>Score:</strong> {res.value}</p>
              <p><strong>Level:</strong> {res.level}</p>
              <p><strong>Category:</strong> {res.category}</p>
              <p><strong>Date:</strong> {new Date(res.createdAt).toLocaleString()}</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No game results found.</p>
      )}
    </div>
  )
}
