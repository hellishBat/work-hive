// Summary Chart
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
  const chartData = {
    labels,
    datasets: [
      {
        label: title || 'Summary',
        data,
        backgroundColor: '#14B8A6',
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
            legend: { labels: { color: '#14B8A6' } },
            title: { display: !!title, text: title, color: '#14B8A6' },
          },
          scales: {
            y: { ticks: { color: '#14B8A6' }, beginAtZero: true },
            x: { ticks: { color: '#14B8A6' } },
          },
        }}
      />
    </div>
  )
}
