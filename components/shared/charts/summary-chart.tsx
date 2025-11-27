// SummaryChart
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
import { useTheme } from 'next-themes'
import { cn } from '@/lib'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface SummaryChartProps {
  data: number[]
  labels: string[]
  title?: string
}

export const SummaryChart: React.FC<SummaryChartProps> = ({
  data,
  labels,
  title,
}) => {
  const { theme } = useTheme()
  const [chartColors, setChartColors] = useState({
    backgroundColor: '#ffffff', // Fallback
    textColor: '#ffffff', // Fallback
  })

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement)
    const chartColor = rootStyles.getPropertyValue('--primary').trim()
    const foregroundColor = rootStyles.getPropertyValue('--foreground').trim()

    setChartColors({
      backgroundColor: chartColor, // Use --primary for bars
      textColor: foregroundColor, // Use --foreground for legend and title
    })
  }, [theme])

  const chartData = {
    labels,
    datasets: [
      {
        label: title || 'Summary',
        data,
        backgroundColor: chartColors.backgroundColor,
      },
    ],
  }

  return (
    <div className={cn('h-48 w-full')}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: chartColors.textColor,
              },
            },
            title: {
              display: !!title,
              text: title,
              color: chartColors.textColor,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  )
}
