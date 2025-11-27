// Dashboard Layout (Server)
import { getSessionUserProfile } from '@/app/actions/profiles/get-session-user-profile'
import DashboardLayoutClient from './layout-client'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getSessionUserProfile()

  return (
    <DashboardLayoutClient profile={profile}>{children}</DashboardLayoutClient>
  )
}

export default DashboardLayout
