// Dashboard Layout
import { Sidebar } from '@/components/layout'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background flex flex-1 p-3">
    <Sidebar />
    <main className="flex-1">{children}</main>
  </div>
)

export default DashboardLayout
