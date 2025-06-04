'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import "../styles/login.css"
export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      router.push('/home')
    } else {
      alert(data.msg || 'Login failed')
    }
  }

  return (
    <div className="login-container">
      <h2>Login to MindMaze</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
