import { GetRatioInfo } from '../GraphQL_Requests/getRatioInfo'
import { useState, useEffect } from 'react'
function Ratio () {
  const [ratioInfo, setRatio] = useState([])
  const [upRatio, setUp] = useState(0)
  const [downRatio, setDown] = useState(0)

  useEffect(() => {
    async function fetchData () {
      try {
        const data = await GetRatioInfo()
        setRatio(data)
      } catch (error) {
        console.error('Error fetching levels data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let up = ratioInfo[0]
    let down = ratioInfo[1]
    console.log(up, 'u')
    console.log(down, 'd')

    if (up >= down) {
      setDown(100)
      let calc = (up * 100) / down
      setUp(calc.toFixed(0))
    } else {
      setUp(100)
      let calc = (down * 100) / up
      setDown(calc.toFixed(0))
    }

    console.log(upRatio, 'ur')
    console.log(downRatio, 'dr')
  })

  return (
    <>
      <div class='audit-container'>
        <div id='audit-box'>
          <div class='ratio' id='ratioUp'></div>
        </div>
        <p>
          &nbsp;Done{' '}
          {ratioInfo[0] / 1000 > 1000
            ? `${(ratioInfo[0] / 1000000).toFixed(2)} MB`
            : `${(ratioInfo[0] / 1000).toFixed(0)} KB`}
        </p>
      </div>
      <br />
      <div class='audit-container'>
        <div id='audit-box'>
          <div class='ratio' id='ratioDown'></div>
        </div>
        <p>
          &nbsp;Recieved{' '}
          {ratioInfo[1] / 1000 > 1000
            ? `${(ratioInfo[1] / 1000000).toFixed(2)} MB`
            : `${(ratioInfo[1] / 1000).toFixed(0)} KB`}
        </p>
      </div>
      <style>{`#ratioUp{width: ${upRatio}%} `}</style>
      <style>{`#ratioDown{width: ${downRatio}%`}</style>

      {/* <style>{`#ratio {width: ${user[0] * 100 >= 100? 100 : user[0] * 100}%}`}</style> */}
    </>
  )
}

export default Ratio
