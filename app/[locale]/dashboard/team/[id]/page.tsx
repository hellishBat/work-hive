// User Page (Team Member Detail)
'use client'

import React, { useEffect, useState } from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import { CalendarClock, CalendarPlus, Mail, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { deleteUser, getUserById } from '@/app/actions/team'
import { SectionWrapper } from '@/components/layout'
import { RoleChip, StatusChip } from '@/components/shared'
import { Button, Card } from '@/components/ui'

interface Profile {
  id: string
  name: string
  email: string | null
  role: string
  has_timetracker: boolean
  created_at: string
  updated_at: string
}

const UserPage: React.FC = () => {
  const t = useTranslations('Team')
  const router = useRouter()
  const { locale, id } = useParams() as { locale: string; id: string }
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserById(id)
        setProfile(data)
      } catch (err) {
        console.error('Failed to load user', err)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) return
    setDeleting(true)
    try {
      await deleteUser(id)
      router.push(`/${locale}/dashboard/team`)
    } catch (err) {
      console.error('Failed to delete user', err)
      setDeleting(false)
    }
  }

  if (loading) return <p>Loading user...</p>
  if (!profile) return <p>User not found.</p>

  // Extract initials
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <SectionWrapper title="Profile Details">
      <div className="grid grid-cols-1 pt-8 md:grid-cols-2 xl:grid-cols-3">
        <Card size="lg">
          <div className="flex flex-col gap-4">
            {/* Avatar */}
            <Avatar.Root className="ring-border/40 -mt-16 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-200 shadow-md ring-1 dark:bg-gray-800">
              <Avatar.Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile.name
                )}&background=random&size=128`}
                alt={profile.name}
                className="h-full w-full rounded-2xl object-cover"
              />
              <Avatar.Fallback className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {initials}
              </Avatar.Fallback>
            </Avatar.Root>

            {/* Name + chips */}
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <div className="flex gap-2">
              <RoleChip role={profile.role.toLowerCase()} />
              <StatusChip
                status={profile.has_timetracker ? 'active' : 'inactive'}
                label="Timetracker"
              />
            </div>

            {/* Email */}
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              <span>{profile.email || '-'}</span>
            </div>

            {/* Created + Updated */}
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CalendarPlus className="h-4 w-4" />
                <span>
                  Created: {new Date(profile.created_at).toLocaleString()}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                <span>
                  Updated: {new Date(profile.updated_at).toLocaleString()}
                </span>
              </li>
            </ul>

            {/* Delete Button */}
            <div className="flex space-x-2">
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2"
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
                {deleting ? 'Deleting...' : 'Delete User'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </SectionWrapper>
  )
}

export default UserPage
