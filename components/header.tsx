// Header
'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui'

const Header = () => (
  <header className="flex items-center justify-between border-b border-gray-800 bg-gray-950 p-4">
    <h1 className="text-lg font-semibold text-gray-200">Dashboard</h1>
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="sm">
        <Bell className="h-5 w-5 text-gray-200" />
      </Button>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 font-bold text-black">
        W
      </div>
    </div>
  </header>
)

export default Header
