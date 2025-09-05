// Dashboard
'use client'

import { SummaryChart, TeamChart } from '@/components/charts'
import { Button, Card } from '@/components/ui'

const absences = [
  { name: 'Alice', type: 'Vacation', days: 3 },
  { name: 'Bob', type: 'Sick', days: 1 },
]

const workedHours = [
  { name: 'Alice', hours: 160 },
  { name: 'Bob', hours: 152 },
]

const weeklyHours = [8, 7, 9, 8, 6] // Example for SummaryChart

const DashboardPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-teal-400">Welcome to WorkHive 🚀</h2>
    <p className="text-gray-400">
      Here’s a quick overview of your team and productivity.
    </p>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Worked Hours Card */}
      <Card variant="outlined" size="md">
        <h3 className="mb-2 font-semibold text-teal-400">Worked Hours</h3>
        <ul>
          {workedHours.map((w) => (
            <li key={w.name} className="p-1">
              {w.name}: <span className="font-bold">{w.hours}h</span>
            </li>
          ))}
        </ul>
        <SummaryChart
          title="Weekly Hours"
          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
          data={weeklyHours}
        />
      </Card>

      {/* Absences Card */}
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

      {/* Productivity Chart */}
      <Card variant="outlined" size="md">
        <h3 className="mb-2 font-semibold text-teal-400">Productivity Chart</h3>
        <TeamChart />
      </Card>

      {/* Quick Actions */}
      <Card variant="outlined" size="md">
        <h3 className="mb-2 font-semibold text-teal-400">Quick Actions</h3>
        <div className="flex flex-col gap-2">
          <Button variant="primary">Add Absence</Button>
          <Button variant="ghost">Generate Report</Button>
          <Button variant="default">Team Settings</Button>
        </div>
      </Card>
    </div>
  </div>
)

export default DashboardPage
