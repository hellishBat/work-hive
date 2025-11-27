// DeleteUserDialog
'use client'

import React, { useTransition } from 'react'
import { UserMinus } from 'lucide-react'
import { Button } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DeleteUserDialogProps {
  userId: string
  userName: string
  open: boolean
  onClose: () => void
  onConfirm: (id: string) => Promise<void> | void
  t: (key: string, values?: Record<string, string>) => string
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  userId,
  userName,
  open,
  onClose,
  onConfirm,
  t,
}) => {
  const [isPending, startTransition] = useTransition()

  const handleConfirm = () => {
    startTransition(async () => {
      await onConfirm(userId)
    })
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('userActions.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('userActions.delete.confirm', { name: userName })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            {t('form.cancel')}
          </Button>

          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            <UserMinus />
            {isPending
              ? t('userActions.delete.deleting')
              : t('userActions.delete.button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
