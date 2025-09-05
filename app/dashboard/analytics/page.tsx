// Analytics
'use client'

import { TeamChart } from '@/components/charts'
import { Card } from '@/components/ui'

const absences = [
  { name: 'Alice', type: 'Vacation', days: 3 },
  { name: 'Bob', type: 'Sick', days: 1 },
]

const workedHours = [
  { name: 'Alice', hours: 160 },
  { name: 'Bob', hours: 152 },
]

const AnalyticsPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-teal-400">Analytics</h2>

    {/* Absences Table */}
    <Card variant="outlined" size="md">
      <h3 className="mb-2 font-semibold text-teal-400">Team Absences</h3>
      <table className="w-full text-gray-200">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Days</th>
          </tr>
        </thead>
        <tbody>
          {absences.map((a) => (
            <tr key={a.name} className="border-b border-gray-800">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.type}</td>
              <td className="p-2">{a.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>

    {/* Worked Hours */}
    <Card variant="outlined" size="md">
      <h3 className="mb-2 font-semibold text-teal-400">Worked Hours</h3>
      <ul>
        {workedHours.map((w) => (
          <li key={w.name} className="p-1">
            {w.name}: <span className="font-bold">{w.hours}h</span>
          </li>
        ))}
      </ul>
    </Card>

    {/* Team Chart */}
    <Card variant="outlined" size="md">
      <h3 className="mb-2 font-semibold text-teal-400">Productivity Chart</h3>
      <TeamChart />
    </Card>
  </div>
)

export default AnalyticsPage
