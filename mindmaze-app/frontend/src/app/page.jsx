'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import '../app/styles/home.css'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <div className="home-container">
      <h1>🧠 MindMaze</h1>
      <p className="tagline">Challenge your brain with fun puzzles and riddles!</p>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={() => router.push('/start')}>🕹️ Start Game</button>
        <button className="btn btn-secondary" onClick={() => router.push('/leaderboard')}>🏆 Leaderboard</button>
        <button className="btn btn-danger" onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  )
}
