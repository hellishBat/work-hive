// Settings Page
'use client'

import { useState } from 'react'
import { Button, Card } from '@/components/ui'

const SettingsPage = () => {
  const [username, setUsername] = useState('WorkHive User')
  const [email, setEmail] = useState('user@workhive.com')
  const [theme, setTheme] = useState('dark')

  const handleSave = () => alert('Settings saved!')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-teal-400">Settings</h2>

      <Card variant="outlined" size="md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-400">Username</label>
            <input
              className="rounded-md bg-gray-800 p-2 text-gray-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-400">Email</label>
            <input
              className="rounded-md bg-gray-800 p-2 text-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-400">Theme</label>
            <select
              className="rounded-md bg-gray-800 p-2 text-gray-200"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <Button variant="primary" onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPage
