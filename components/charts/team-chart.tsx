// Team Chart
'use client'

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
      backgroundColor: '#14B8A6',
    },
  ],
}

export const TeamChart = () => (
  <div className={cn('h-64 w-full')}>
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: { legend: { labels: { color: '#14B8A6' } } },
      }}
    />
  </div>
)
