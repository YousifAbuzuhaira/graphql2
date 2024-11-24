import React, { useEffect, useState, useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import { GetProjectXP } from '../GraphQL_Requests/GetProjectXP'

const ProjectPieChart = () => {
  const [projectData, setProject] = useState([])

  useEffect(() => {
    async function getData () {
      try {
        const data = await GetProjectXP()
        console.log(data, 'works')

        setProject(data)
      } catch (error) {
        console.error('Error fetching levels data:', error)
      }
    }
    getData()
  }, [])

  // Define default state for the chart
  const state = useMemo(() => {
    if (!projectData) return null // Return null while waiting for data

    return {
      series: projectData[0] || [],
      options: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: projectData[1] || [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    }
  }, [projectData])

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='pie'
        height={500}
        width={1000}
      />
    </div>
  )
}

export default ProjectPieChart
