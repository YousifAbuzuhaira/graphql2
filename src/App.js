import './App.css'
import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom' // Use HashRouter
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'

function App () {
  return (
    <div id='motherContainer'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
