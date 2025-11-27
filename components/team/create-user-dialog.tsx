// CreateUserDialog
'use client'

import React, { useState } from 'react'
import { Copy, RefreshCw, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import { createUserProfile } from '@/app/actions/profiles/create-user-profile'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/components/ui'

interface CreateUserDialogProps {
  onSuccess: (email: string) => void // Callback receives created email (or user data)
  onError: (error: string) => void // Callback receives error message
  t: (key: string) => string
}

export const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  onSuccess,
  onError,
  t,
}) => {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const generatePassword = () => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < 16; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setFormData((prev) => ({ ...prev, password }))
  }

  const copyPassword = async () => {
    if (!formData.password) return
    await navigator.clipboard.writeText(formData.password)
    toast.success(t('form.passwordCopied'))
  }

  const handleCreate = async () => {
    if (!formData.email || !formData.password) {
      return toast.error(t('form.fillAllFields'))
    }

    setSubmitting(true)
    try {
      await createUserProfile(formData)

      onSuccess(formData.email)

      setFormData({ email: '', password: '' })
      setOpen(false)
    } catch (err: unknown) {
      console.error(err)

      if (err instanceof Error) {
        onError(err.message || t('userActions.create.error'))
      } else {
        onError(t('userActions.create.error'))
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <UserPlus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('userActions.create.title')}</DialogTitle>
          <DialogDescription>
            {t('userActions.create.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* EMAIL FIELD */}
          <div className="space-y-2">
            <Label htmlFor="email">{t('form.email')}</Label>

            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              disabled={submitting}
            />
          </div>

          {/* PASSWORD FIELD */}
          <div className="space-y-2">
            <Label htmlFor="password">{t('form.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type="text"
                className="pr-20"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                disabled={submitting}
              />

              {/* RIGHT ACTION BUTTONS */}
              <span className="absolute top-1/2 right-1 flex -translate-y-1/2 gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={generatePassword}
                  disabled={submitting}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={copyPassword}
                  disabled={!formData.password || submitting}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={submitting}
          >
            {t('form.cancel')}
          </Button>

          <Button
            onClick={handleCreate}
            disabled={!formData.email || !formData.password || submitting}
          >
            <UserPlus />
            {t('userActions.create.button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
