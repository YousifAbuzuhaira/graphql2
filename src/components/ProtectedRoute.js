import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true) 
  const [isAuthenticated, setIsAuthenticated] = useState(false) 

  useEffect(() => {
    const token = localStorage.getItem('jwt') // Get token from localStorage
    if (!token) {
      navigate('/') // Redirect to login if no token
    } else {
      setIsAuthenticated(true) // Set authentication state if token exists
    }
    setIsLoading(false) // Stop loading once token check is done
  }, [navigate])

  if (isLoading) {
    return <div>Loading...</div> // Show a loading message while checking the token
  }

  if (!isAuthenticated) {
    return null // Do not render anything if not authenticated (redirect will happen)
  }

  return children // Render the children (Dashboard) if authenticated
}

export default ProtectedRoute
