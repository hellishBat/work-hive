// Dashboard Layout (Server)
import { getUserProfile } from '@/app/actions/get-user-profile'
import DashboardLayoutClient from './layout-client'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getUserProfile()

  return (
    <DashboardLayoutClient profile={profile}>{children}</DashboardLayoutClient>
  )
}

export default DashboardLayout
