import React, { useEffect, useState, useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import { GetUserLevels } from '../GraphQL_Requests/GetUserLevels'

const ColumnChart = () => {
  const [levelsData, setLevelsData] = useState([])

  useEffect(() => {
    async function fetchData () {
      try {
        const data = await GetUserLevels()
        setLevelsData(data)
      } catch (error) {
        console.error('Error fetching levels data:', error)
      }
    }
    fetchData()
  }, [])

  const options = useMemo(
    () => ({
      chart: {
        type: 'bar',
        height: 400,
        width: 1000
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: Array.from({ length: 50 }, (_, i) => i + 1)
      },
      yaxis: {
        title: {
          text: 'People'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `Count: ${val} People`
          }
        }
      }
    }),
    []
  )

  return (
    <div>
      <ReactApexChart
        options={options}
        series={levelsData}
        type='bar'
        height={400}
        width={1000}
      />
    </div>
  )
}

export default ColumnChart
