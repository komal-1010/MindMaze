'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import "../styles/login.css"
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      router.push('/home')
    } else {
      setError('Something went wrong')
      alert(data.msg || 'Login failed')
    }
  }

  return (
    <div className="login-container">
      <h2>Login to MindMaze</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"  
          placeholder="Email"
          value={username}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}

      <p style={{ marginTop: '1rem' }}>
        Don't have an account?{' '}
        <a href="/register" style={{ color: 'blue' }}>
          Register
        </a>
      </p>
    </div>
  )
}
