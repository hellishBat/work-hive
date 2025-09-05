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
      <body className="bg-gray-950 text-gray-200">
        {/* Global Header */}

        {/* Main content */}
        <main className="global-main">{children}</main>

        {/* Optional Footer */}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
