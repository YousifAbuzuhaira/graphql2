import { totalXP } from './GetProjectXP'
import { bearer_token } from './token'

export async function GetUserInfo () {
  const fetchGraphQL = async (query, variables = {}, token) => {
    try {
      const response = await fetch(
        'https://learn.reboot01.com/api/graphql-engine/v1/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            query,
            variables
          })
        }
      )

      const data = await response.json()
      if (data.errors) {
        console.error('GraphQL Errors:', data.errors)
        throw new Error('Error in GraphQL query')
      }
      return data.data
    } catch (error) {
      console.error('Fetch GraphQL Error:', error)
      throw error
    }
  }

  const query = `
          query User {
            user {
              auditRatio
              auditsAssigned
              email
              firstName
              lastName
              login
            }
          }
        `
  const token = localStorage.getItem('jwt');
  // const token = bearer_token

  let data = await fetchGraphQL(query, {}, token)
  data = data.user[0]
  let XP = await totalXP()
  let dataArr = []
  dataArr.push(data.auditRatio)
  dataArr.push(data.auditsAssigned)
  dataArr.push(data.email)
  dataArr.push(data.firstName)
  dataArr.push(data.lastName)
  dataArr.push(data.login)
  dataArr.push(XP)
  // console.log('FETCHED USER INFP')

  return dataArr
}

// console.log(await GetUserInfo())
// export { GetUserInfo }
