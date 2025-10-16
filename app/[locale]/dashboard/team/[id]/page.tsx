// EmployeePage
'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { SectionWrapper } from '@/components/layout'
import { Card, RoleChip } from '@/components/ui'
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

const EmployeePage = () => {
  const t = useTranslations('Employee')
  const { id } = useParams()
  const [employee, setEmployee] = React.useState<Employee | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from<Employee>('employees')
        .select('*')
        .eq('id', id)
        .single()

      if (error) console.error(error)
      else setEmployee(data)
      setLoading(false)
    }

    fetchEmployee()
  }, [id])

  if (loading) return <p>Loading employee details...</p>
  if (!employee) return <p className="text-red-500">{t('employeeNotFound')}</p>

  return (
    <SectionWrapper title={t('employeeDetails')}>
      <Card size="lg">
        <div className="space-y-2 p-4">
          <p>
            <strong>{t('id')}:</strong> {employee.id}
          </p>
          <p>
            <strong>{t('name')}:</strong> {employee.name}
          </p>
          <p>
            <strong>{t('email')}:</strong> {employee.email || '-'}
          </p>
          <p>
            <strong>{t('role')}:</strong>{' '}
            <RoleChip
              role={ROLE_MAP[employee.role] || 'User'}
              label={t(`Role.${ROLE_MAP[employee.role] || 'User'}`)}
            />
          </p>
          <p>
            <strong>{t('status')}:</strong> {employee.status}
          </p>
          <p>
            <strong>{t('company')}:</strong> {employee.company || '-'}
          </p>
          <p>
            <strong>{t('lastActive')}:</strong>{' '}
            {employee.last_active
              ? new Date(employee.last_active).toLocaleString()
              : '-'}
          </p>
          <p>
            <strong>{t('lastSynced')}:</strong>{' '}
            {new Date(employee.synced_at).toLocaleString()}
          </p>
        </div>
      </Card>
    </SectionWrapper>
  )
}

export default EmployeePage
