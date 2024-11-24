import { bearer_token } from './token.js'

export async function GetRatioInfo () {
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
query Transaction {
    transaction(distinct_on: null, where: { type: { _in: ["up", "down"] } }) {
        amount
        type
    }
}

        `

  const token = localStorage.getItem('jwt');
  // const token = bearer_token

  let data = await fetchGraphQL(query, {}, token)
  data = data.transaction
  let up = 0
  let down = 0
  console.log(typeof data)

  data.forEach(element => {
    if (element.type === 'up') {
      up += element.amount
    } else {
      down += element.amount
    }
  })

  up = up.toFixed(0)
  down = down.toFixed(0)
  // console.log('UP', up)
  // console.log('DOWN', down)

  return [up, down]
}

// GetRatioInfo()
