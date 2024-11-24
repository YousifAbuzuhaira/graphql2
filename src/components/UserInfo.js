import React from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate for redirecting after logout

function UserInfo ({
  auditRatio,
  auditsAssigned,
  email,
  firstName,
  lastName,
  login,
  XP
}) {
  const navigate = useNavigate() // Hook to programmatically navigate to a different route

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('jwt')
    navigate('/')
  }

  return (
    <>
      <div id='top-item'>
        <h1>
          {firstName} {lastName}
        </h1>
        <div>
          <p className='userInfo infoTitle'>Email:&nbsp;</p>
          <p className='userInfo'>{email}</p>
        </div>
        <div>
          <p className='userInfo infoTitle'>Username:&nbsp;</p>
          <p className='userInfo'>{login}</p>
        </div>
        <div>
          <p className='userInfo infoTitle'>Audit Ratio:&nbsp;</p>
          <p className='userInfo'>{auditRatio}</p>
        </div>
        <div>
          <p className='userInfo infoTitle'>Audits Assigned:&nbsp;</p>
          <p className='userInfo'>{auditsAssigned}</p>
        </div>
        <br />
       
        <div>
          <h1 className='xp infoTitle'>XP:&nbsp;</h1>
          <h1 className='xp'>
            {XP / 1000 > 1000 ? `${XP / 1000000} MB` : `${XP / 1000} KB`}
          </h1>
        </div>
        <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  )
}

export default UserInfo
