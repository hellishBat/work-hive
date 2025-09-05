// Dashboard Layout
import Header from '@/components/header'
import { Sidebar } from '@/components/nav/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-1 bg-gray-950 text-gray-200">
    <Sidebar />

    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1 p-6">{children}</main>
    </div>
  </div>
)

export default DashboardLayout
