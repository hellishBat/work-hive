// MyTeamPage
'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { SectionWrapper } from '@/components/layout'
import {
  Card,
  RoleChip,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { supabase } from '@/lib'
import { ROLE_MAP, RoleKey } from '@/lib/constants'

interface Employee {
  id: string
  name: string
  email: string | null
  role: RoleKey
  status: string
  company: string | null
  last_active: string | null
  synced_at: string
}

const MyTeamPage: React.FC = () => {
  const t = useTranslations('Team')
  const router = useRouter()
  const { locale } = useParams() as { locale: string }
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from<Employee>('employees')
          .select('*')
          .order('name', { ascending: true })

        if (error) console.error('Supabase error:', error)
        else if (data) setEmployees(data)
      } catch (err) {
        console.error('Unexpected error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [locale])

  return (
    <SectionWrapper title={t('title')}>
      <Card size="lg" title={t('employeesList')}>
        {loading ? (
          <p>Loading employees...</p>
        ) : (
          <Table>
            <TableCaption>{t('tableCaption')}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Last Synced</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow
                  key={emp.id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() =>
                    router.push(`/${locale}/dashboard/team/${emp.id}`)
                  }
                >
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.email || '-'}</TableCell>
                  <TableCell>
                    <RoleChip
                      role={ROLE_MAP[emp.role] || 'User'}
                      label={t(`Role.${ROLE_MAP[emp.role] || 'User'}`)}
                    />
                  </TableCell>
                  <TableCell>{emp.status}</TableCell>
                  <TableCell>{emp.company || '-'}</TableCell>
                  <TableCell>
                    {emp.last_active
                      ? new Date(emp.last_active).toLocaleString()
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {new Date(emp.synced_at).toLocaleString()}
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
