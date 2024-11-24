import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (!token) {
      navigate('/graphql2')
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [navigate])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}

export default ProtectedRoute
