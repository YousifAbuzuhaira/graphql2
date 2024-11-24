import { useEffect, useState } from 'react'
import { GetUserInfo } from '../GraphQL_Requests/GetUserInfo'
import ColumnChart from './ColumnChart'
import ProjectPieChart from './PieChart'
import Ratio from './Ratio'
import UserInfo from './UserInfo'
import TopFlex from './TopFlex'

export function Dashboard () {
  const [user, userSet] = useState('')
  useEffect(() => {
    async function getData () {
      userSet(await GetUserInfo())
    }
    getData()
  }, [])

  return (
    <div id='mother'>
      <TopFlex>
        <div id='content'>
          <UserInfo
            auditRatio={parseFloat(user[0]).toFixed(3)}
            auditsAssigned={user[1]}
            email={user[2]}
            firstName={user[3]}
            lastName={user[4]}
            login={user[5]}
            XP={user[6]}
          ></UserInfo>
        </div>
        <div id='content'>
          <ColumnChart></ColumnChart>
        </div>
      </TopFlex>
      <TopFlex>
        <div id='content'>
          <div id='audit-flex'>
            <br></br>
            <h1>Audit Ratio:</h1>
            <br></br>
            <h1>{parseFloat(user[0]).toFixed(3)}</h1>
            <Ratio></Ratio>
          </div>
        </div>
        <div id='content'>
          <ProjectPieChart></ProjectPieChart>
        </div>
      </TopFlex>
    </div>
  )
}
