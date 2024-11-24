import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { ErrorPage } from './components/ErrorPage'
import ProtectedRoute from './components/ProtectedRoute'

function App () {
  console.log('CHECK: ', localStorage.getItem('jwt')) // Check for JWT token
  return (
    <div id='motherContainer'>
      <Router>
        <Routes>
          <Route path='/graphql2' element={<Login />} />
          {/* Protected route for Dashboard */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
