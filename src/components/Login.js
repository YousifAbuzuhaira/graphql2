import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login () {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const API_SIGNIN_URL = 'https://learn.reboot01.com/api/auth/signin'

  useEffect(() => {
    if (localStorage.getItem('jwt') !== '') {
      localStorage.removeItem('jwt')
    }
  })

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
      navigate('/graphql2/dashboard/')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div id='signContainer'>
      <h1>Login</h1>
      <br />
      <form onSubmit={handleLogin}>
        <label className='inputs'>
          Username or Email:&nbsp;
          <br />
          <input
            className='inputBox'
            type='text'
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label className='inputs'>
          Password:&nbsp;
          <br />
          <input
            className='inputBox'
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
