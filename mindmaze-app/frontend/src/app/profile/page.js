'use client'
import { useEffect, useState } from 'react'

export default function Profile() {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/me', {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(data => setProfile(data))
  }, [])

  return (
    <div className="form-container">
      <h2>👤 Your Profile</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Highest Score:</strong> {profile.highScore}</p>
      <p><strong>Games Played:</strong> {profile.gamesPlayed}</p>
    </div>
  )
}
