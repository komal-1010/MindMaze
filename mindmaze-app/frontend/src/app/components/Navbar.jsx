'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import '../styles/navbar.css'

export default function Navbar() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.body.className = dark ? 'dark' : ''
  }, [dark])

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/game">Game</Link>
        <Link href="/login">Login</Link>
      </div>
      <button className="dark-toggle" onClick={() => setDark(!dark)}>
        {dark ? '🌞 Light' : '🌙 Dark'}
      </button>
    </nav>
  )
}
