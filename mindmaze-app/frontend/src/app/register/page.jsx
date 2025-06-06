'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()

    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (res.ok) {
      alert('Registration successful! Please log in.')
      router.push('/login')
    } else {
      alert(data.msg || 'Registration failed.')
    }
  }

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
