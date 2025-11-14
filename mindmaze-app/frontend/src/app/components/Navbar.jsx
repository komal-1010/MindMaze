'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '../styles/navbar.css'

export default function Navbar() {
  const [dark, setDark] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
        <button onClick={() => router.push('/')}>Home</button>
        <button onClick={() => router.push('/start')}>Start</button>
        <button onClick={() => router.push('/game')}>Game</button>

        {isLoggedIn ? (
          <>
            <button onClick={() => router.push('/profile')}>Profile</button>
            <button onClick={handleLogout} className="logout-button">Log Out</button>
          </>
        ) : (
          <button onClick={() => router.push('/login')}>Login</button>
        )}
      </div>

      <button className="dark-toggle" onClick={() => setDark(!dark)}>
        {dark ? '🌞 Light' : '🌙 Dark'}
      </button>
    </nav>
  )
}
