// Dashboard Page
'use client'

import { useTranslations } from 'next-intl'
import { SummaryChart, TeamChart } from '@/components/charts'
import { SectionWrapper } from '@/components/layout'
import { AbsenceTable } from '@/components/shared'
import { Button, Card } from '@/components/ui'

const absences = [
  { name: 'Alice', type: 'Vacation', days: 3 },
  { name: 'Bob', type: 'Sick', days: 1 },
]

const workedHours = [
  { name: 'Alice', hours: 160 },
  { name: 'Bob', hours: 152 },
]

const DashboardPage = () => {
  // Load translations for the 'Dashboard' namespace
  const t = useTranslations('Dashboard')

  // Use translated daysAbbreviation for chart labels
  const weeklyHoursLabels = t.raw('daysAbbreviation') as string[]

  return (
    <SectionWrapper title={t('welcome')} description={t('description')}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Worked Hours Card */}
        <Card size="lg" title={t('workedHours')}>
          <ul className="text-secondary mb-4 space-y-1">
            {workedHours.map((w) => (
              <li key={w.name} className="text-xs">
                {w.name}: <span className="font-semibold">{w.hours}h</span>
              </li>
            ))}
          </ul>
          <SummaryChart
            title={t('weeklyHours')}
            labels={weeklyHoursLabels}
            data={[8, 7, 9, 8, 6]} // Hardcoded for now, replace with dynamic data if needed
          />
        </Card>

        {/* Productivity Chart */}
        <Card size="lg" title={t('productivityChart')}>
          <TeamChart />
        </Card>

        {/* Absences Card */}
        <Card size="lg" className="flex flex-col" title={t('teamAbsences')}>
          <AbsenceTable absences={absences} />
        </Card>
        {/* Quick Actions */}
        <Card size="lg" title={t('quickActions')}>
          <div className="flex flex-col gap-2">
            <Button variant="default">{t('addAbsence')}</Button>
            <Button variant="secondary">{t('generateReport')}</Button>
            <Button variant="ghost">{t('teamSettings')}</Button>
          </div>
        </Card>
      </div>
    </SectionWrapper>
  )
}

export default DashboardPage
