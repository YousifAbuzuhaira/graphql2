import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login () {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const API_SIGNIN_URL = 'https://learn.reboot01.com/api/auth/signin'

  const handleLogin = async e => {
    e.preventDefault()
    const credentials = btoa(`${identifier}:${password}`)

    try {
      const response = await fetch(API_SIGNIN_URL, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`
        }
      })

      if (!response.ok) {
        throw new Error('Invalid credentials. Please try again.')
      }

      const jwt = await response.json()
      localStorage.setItem('jwt', jwt)
      setErrorMessage('')
      navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div id='signContainer'>
      <h1>Login</h1>
      <br />
      <form onSubmit={handleLogin}>
        <label class='inputs'>
          Username or Email:&nbsp;
          <br />
          <input
            class='inputBox'
            type='text'
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label class='inputs'>
          Password:&nbsp;
          <br />
          <input
            class='inputBox'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <button id='loginSubmit' type='submit'>
          Login
        </button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}
