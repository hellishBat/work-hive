// Analytics Page
'use client'

import { useTranslations } from 'next-intl'
import { Section } from '@/components/layout'
import { AbsenceTable, TeamChart } from '@/components/shared'
import { Card } from '@/components/ui'

const absences = [
  { name: 'Alice', type: 'Vacation', days: 3 },
  { name: 'Bob', type: 'Sick', days: 1 },
]

const workedHours = [
  { name: 'Alice', hours: 160 },
  { name: 'Bob', hours: 152 },
]

const AnalyticsPage = () => {
  const t = useTranslations('Analytics')
  return (
    <Section title={t('title')}>
      <div className="space-y-6">
        {/* Absences Table */}
        <Card size="lg" title={t('teamAbsences')}>
          <AbsenceTable absences={absences} />
        </Card>

        {/* Worked Hours */}
        <Card size="lg" title={t('workedHours')}>
          <ul>
            {workedHours.map((w) => (
              <li key={w.name} className="p-1">
                {w.name}: <span className="font-bold">{w.hours}h</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Team Chart */}
        <Card size="lg" title={t('productivityChart')}>
          <TeamChart />
        </Card>
      </div>
    </Section>
  )
}

export default AnalyticsPage
