function UserInfo ({
  auditRatio,
  auditsAssigned,
  email,
  firstName,
  lastName,
  login,
  XP
}) {
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
        <br></br>
        <br></br>
        <br></br>
        <div>
          <h1 className='xp infoTitle'>XP:&nbsp;</h1>
          <h1 className='xp'>
            {XP / 1000 > 1000 ? `${XP / 1000000} MB` : `${XP / 1000} KB`}
          </h1>
        </div>
        {/* <h1 >Total XP: {XP/1000 > 1000? `${XP/1000000} MB`: `${XP/1000} KB`}</h1> */}
      </div>
    </>
  )
}

export default UserInfo
