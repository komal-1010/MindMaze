'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
      <h1>🎮 Welcome to MindMaze</h1>
      <button onClick={() => router.push('/game')}>Start Game</button>
      <button onClick={() => router.push('/leaderboard')}>Leaderboard</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
