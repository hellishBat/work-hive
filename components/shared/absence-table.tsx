// AbsenceTable
'use client'

import { useTranslations } from 'next-intl'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { AbsenceChip } from './'

// Define absence type
type Absence = {
  name: string
  type: 'Sick' | 'Vacation'
  days: number
}

interface AbsenceTableProps {
  absences: Absence[]
}

const AbsenceTable = ({ absences }: AbsenceTableProps) => {
  const t = useTranslations('Analytics')

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('name')}</TableHead>
          <TableHead>{t('type')}</TableHead>
          <TableHead>{t('days')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {absences.map((a) => (
          <TableRow key={a.name}>
            <TableCell>{a.name}</TableCell>
            <TableCell>
              <AbsenceChip type={a.type} />
            </TableCell>
            <TableCell>{a.days}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AbsenceTable
