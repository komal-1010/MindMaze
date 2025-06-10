'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import '../styles/navbar.css'

export default function Navbar() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/start">Start</Link>
        <Link href="/game">Game</Link>
        <Link href="/login">Login</Link>
      </div>
      <button className="dark-toggle" onClick={() => setDark(!dark)}>
        {dark ? '🌞 Light' : '🌙 Dark'}
      </button>
    </nav>
  )
}