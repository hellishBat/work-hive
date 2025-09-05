// Projects Page
'use client'

import { Button, Card } from '@/components/ui'

const projects = [
  { name: 'Website Redesign', status: 'In Progress', deadline: '2025-09-10' },
  { name: 'Mobile App', status: 'Completed', deadline: '2025-08-15' },
  { name: 'Marketing Campaign', status: 'Pending', deadline: '2025-09-20' },
]

const ProjectsPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-teal-400">Projects</h2>

    <Card variant="outlined" size="md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-teal-400">Team Projects</h3>
        <Button variant="primary" size="sm">
          Add Project
        </Button>
      </div>

      <table className="w-full text-gray-200">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="p-2 text-left">Project</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Deadline</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.name} className="border-b border-gray-800">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.status}</td>
              <td className="p-2">{p.deadline}</td>
              <td className="p-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
)

export default ProjectsPage
