// EditUserDialog
'use client'

import React, { useState } from 'react'
import { Info, UserCheck } from 'lucide-react'
import { toast } from 'sonner'
import { updateUserProfile } from '@/app/actions/profiles/update-user-profile'
import { RoleSelect } from '@/components/shared/role'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
  Label,
} from '@/components/ui'

interface Props {
  user: {
    id: string
    name: string
    email: string | null
    role: string
    has_timetracker?: boolean
    email_locked?: boolean
  }
  open: boolean
  onClose: () => void
  onSuccess: () => void
  onError: (error: string) => void // NEW: Error callback
  t: any
}

export const EditUserDialog: React.FC<Props> = ({
  user,
  open,
  onClose,
  onSuccess,
  onError, // Destructured
  t,
}) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email ?? '',
    role: user.role,
  })

  const [submitting, setSubmitting] = useState(false)

  // Email cannot be changed (NOTE: This flag seems redundant with the alert logic,
  // but keeping it as is for now)
  const emailDisabled = true

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.role) {
      // Keep client-side validation toast here
      return toast.error(t('form.fillAllFields'))
    }

    // Ensure email is not changed if locked by timetracker or external service
    if (user.has_timetracker || user.email_locked) {
      formData.email = user.email ?? ''
    }

    setSubmitting(true)
    try {
      await updateUserProfile(user.id, formData)

      // Call success callback
      onSuccess()

      onClose()
    } catch (err: unknown) {
      console.error(err)

      // Call error callback with specific message if available
      if (err instanceof Error) {
        onError(err.message || t('userActions.edit.error'))
      } else {
        onError(t('userActions.edit.error'))
      }
    } finally {
      setSubmitting(false)
    }
  }

  // Determine which alert message to show
  let alertKey = 'emailLocked'
  if (user.has_timetracker) {
    alertKey = 'emailTimetracker'
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('userActions.edit.title')}</DialogTitle>{' '}
          {/* Use .title for consistency */}
          <DialogDescription>
            {t('userActions.edit.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* NAME */}
          <div className="space-y-2">
            <Label htmlFor="name">{t('table.name')}</Label>
            <Input
              id="name"
              value={formData.name}
              disabled={submitting}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label htmlFor="email">{t('table.email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              disabled={emailDisabled}
            />

            {/* ALERT: always show if email is locked */}
            <Alert className="mt-2" variant="informative">
              <Info className="h-4 w-4" />
              <AlertTitle>
                {t(`userActions.edit.alerts.${alertKey}.title`)}
              </AlertTitle>
              <AlertDescription>
                {t(`userActions.edit.alerts.${alertKey}.description`)}
              </AlertDescription>
            </Alert>
          </div>

          {/* ROLE */}
          <div className="space-y-2">
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>{t('table.role')}</ItemTitle>
                <ItemDescription>
                  {t('userActions.edit.roleDescription')}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <RoleSelect
                  t={t}
                  value={formData.role}
                  onChange={(role) =>
                    setFormData((prev) => ({ ...prev, role }))
                  }
                  disabled={submitting}
                />
              </ItemActions>
            </Item>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            {t('form.cancel')}
          </Button>
          <Button onClick={handleSave} disabled={submitting}>
            <UserCheck />
            {t('userActions.edit.saveButton')}{' '}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
