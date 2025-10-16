// Team Chart
'use client'

import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { cn } from '@/lib'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['Alice', 'Bob', 'Charlie'],
  datasets: [
    {
      label: 'Hours Worked',
      data: [160, 152, 168],
      backgroundColor: [], // Will be set dynamically
    },
  ],
}

export const TeamChart = () => {
  const [chartColors, setChartColors] = useState<{
    backgroundColor: string[]
    legendColor: string
  }>({
    backgroundColor: [],
    legendColor: 'oklch(0.13 0.028 261.692)', // Fallback color
  })

  useEffect(() => {
    // Access CSS variables
    const rootStyles = getComputedStyle(document.documentElement)
    const primaryColor = rootStyles.getPropertyValue('--primary').trim()
    const foregroundColor = rootStyles.getPropertyValue('--foreground').trim()

    // Update chart colors
    setChartColors({
      backgroundColor: [primaryColor], // Use --primary for bars
      legendColor: foregroundColor, // Use --foreground for legend text
    })
  }, [])

  return (
    <div className={cn('h-64 w-full')}>
      <Bar
        data={{
          ...data,
          datasets: [
            {
              ...data.datasets[0],
              backgroundColor: chartColors.backgroundColor,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: chartColors.legendColor,
              },
            },
          },
        }}
      />
    </div>
  )
}
