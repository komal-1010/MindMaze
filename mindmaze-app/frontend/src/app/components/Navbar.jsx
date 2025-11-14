'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '../styles/navbar.css'
import Link from 'next/link'

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
      <div className="navbar-left">
        <Link href="/" className="logo">
          MindMaze
        </Link>
      </div>
      <div className="navbar-right">
        <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/game">Game</Link>
            {isLoggedIn ? (
              <>
                <Link href="/profile">Profile</Link>
                <button onClick={handleLogout} className="logout-button">
                  Log Out
                </button>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
        </div>
        <button className="dark-toggle" onClick={() => setDark(!dark)}>
          {dark ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  )
}
