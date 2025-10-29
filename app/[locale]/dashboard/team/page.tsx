// Team Page
'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { getTeamProfiles } from '@/app/actions/team'
import { SectionWrapper } from '@/components/layout'
import { RoleChip, StatusChip } from '@/components/shared'
import {
  Card,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { RoleKey } from '@/lib/constants'

interface Profile {
  id: string
  name: string
  email: string | null
  role: RoleKey
  has_timetracker: boolean
  created_at: string
  updated_at: string
}

const MyTeamPage: React.FC = () => {
  const t = useTranslations('Team')
  const router = useRouter()
  const { locale } = useParams() as { locale: string }
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const loadProfiles = async () => {
  //     try {
  //       const data = await getTeamProfiles()
  //       setProfiles(data)
  //     } catch (e) {
  //       console.error('Failed to load team profiles', e)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   loadProfiles()
  // }, [])
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await getTeamProfiles()
        console.log('Fetched team profiles:', data) // ← debug log
        setProfiles(data)
      } catch (e) {
        console.error('Failed to load team profiles', e)
      } finally {
        setLoading(false)
      }
    }
    loadProfiles()
  }, [])

  return (
    <SectionWrapper title={t('title')}>
      <Card size="lg" title={t('employeesList')}>
        {loading ? (
          <p>Loading team...</p>
        ) : (
          <Table>
            <TableCaption>{t('tableCaption')}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Timetracker</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() =>
                    router.push(`/${locale}/dashboard/team/${user.id}`)
                  }
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email || '-'}</TableCell>
                  <TableCell>
                    <RoleChip
                      role={user.role}
                      // label={t(`Role.${ROLE_MAP[user.role]}`)}
                    />
                  </TableCell>
                  <TableCell>
                    {' '}
                    <StatusChip
                      status={user.has_timetracker ? 'active' : 'inactive'}
                      label="Timetracker"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updated_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </SectionWrapper>
  )
}

export default MyTeamPage
