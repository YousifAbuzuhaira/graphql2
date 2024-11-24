import { bearer_token } from './token.js'

export async function GetUserLevels () {
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

  let query = `
              query Event_user {
    event_user(where: { eventId: { _in: [72, 20, 250] } }) {
        eventId
        level
        userLogin
    }
}
            `
  const token = localStorage.getItem('jwt');
  // const token = bearer_token

  let cohortMap = {
    20: 1,
    72: 2,
    250: 3
  }

  let peeps = []

  let data = await fetchGraphQL(query, {}, token)
  query = `
query User_public_view {
    user_public_view {
        firstName
        lastName
        login
    }
}

`
  let data2 = await fetchGraphQL(query, {}, token)
  data2 = data2.user_public_view
  const nameMap = new Map()

  Object.entries(data2).forEach(entry => {
    const [key, value] = entry

    if (value.firstName !== null && value.lastName !== null)
      nameMap.set(
        value.login,
        value.firstName.trim() + ' ' + value.lastName.trim()
      )
  })

  data = data.event_user
  Object.entries(data).forEach(entry => {
    let peep = {}
    const [key, value] = entry
    peep.cohort = cohortMap[value.eventId]
    peep.level = value.level
    peep.name = nameMap.get(value.userLogin)
    peeps.push(peep)
  })

  const result = splitAndSortByCohort(peeps)

  let trackCohort = []
  for (let i = 1; i <= 3; i++) {
    let tempObj = {}
    let data = []
    tempObj.name = `Cohort ${i}`
    let mapping = getLevelMap()
    console.log(
      result[i].forEach(thing => {
        let level = thing.level
        if (level !== undefined) {
          mapping[level]++
        }
      })
    )

    for (const value of Object.values(mapping)) {
      data.push(value)
    }
    tempObj['data'] = data
    trackCohort.push(tempObj)
  }
  console.log(trackCohort)
  return trackCohort
}

function splitAndSortByCohort (data) {
  const cohorts = data.reduce((acc, item) => {
    if (!acc[item.cohort]) {
      acc[item.cohort] = []
    }
    acc[item.cohort].push(item)
    return acc
  }, {})
  for (const cohort in cohorts) {
    cohorts[cohort].sort((a, b) => a.level - b.level)
  }

  return cohorts
}


function getLevelMap () {
  let tempObj = {}
  for (let i = 0; i <= 50; i++) {
    tempObj[i] = 0
  }
  return tempObj
}


// console.log(GetUserLevels());
