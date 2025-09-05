import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WorkHive',
  description: 'Your team productivity dashboard',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-950 text-gray-200">
        {/* Global Header */}
        <header className="flex w-full items-center justify-between border-b border-gray-800 p-4">
          <div className="text-xl font-bold text-teal-400">WorkHive</div>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Optional Footer */}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
