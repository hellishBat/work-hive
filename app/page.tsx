'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'

const HomePage = () => (
  <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-gray-950 px-4 text-gray-200">
    <h1 className="mb-4 text-center text-4xl font-bold text-teal-400">
      Welcome to WorkHive 🚀
    </h1>
    <p className="mb-8 max-w-xl text-center text-gray-400">
      Your team productivity dashboard. Track hours, absences, projects and
      settings all in one place.
    </p>

    <div className="flex flex-col gap-4 sm:flex-row">
      <Link href="/dashboard">
        <Button variant="primary">Go to Dashboard</Button>
      </Link>
      <Link href="/dashboard/projects">
        <Button variant="default">View Projects</Button>
      </Link>
      <Link href="/dashboard/settings">
        <Button variant="ghost">Settings</Button>
      </Link>
    </div>
  </div>
)

export default HomePage
