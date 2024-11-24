import { bearer_token } from './token.js'

export async function GetProjectXP () {
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

  //   const query = `
  //             query Xp_view {
  //     xp_view(where: { originEventId: { _eq: 72 } }) {
  //         amount
  //         path

  //     }
  // }
  //           `

  const query = `
query Xp_view {
    xp_view(distinct_on: null, where: { originEventId: { _in: [72,178, 187] } }) {
        amount
        originEventId
        path
        userId
    }
}


`

  // const token = bearer_token
  const token = localStorage.getItem('jwt');
  let data = await fetchGraphQL(query, {}, token)

  let xps = []
  let projectNames = []
  data = data.xp_view
  Object.entries(data).forEach(entry => {
    const [key, value] = entry
    if (value.originEventId === 187) {
      if (value.path === '/bahrain/bh-module/piscine-js') {
        xps.push(value.amount)
        projectNames.push(value.path)
      }
    } else {
      xps.push(value.amount)
      projectNames.push(value.path)
    }
  })

  projectNames = projectNames.map(path => path.match(/[^/]+$/)[0])

  console.log('WAW')
  return [xps, projectNames]
}

export async function totalXP () {
  let data = await GetProjectXP()
  let total = 0

  data[0].forEach(element => {
    total += element
  })

  return Math.round(total)
}

//  console.log(await totalXP());

// let x = await GetProjectXP()
// console.log(x)
