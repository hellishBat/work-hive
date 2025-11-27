// User Item
'use client'

import { useState } from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import { UserCheck, UserPen } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
  Label,
  Skeleton,
} from '@/components/ui'

type UserProfile = {
  name?: string | null
  email?: string | null
  avatar_url?: string | null
}

interface UserItemProps {
  user: UserProfile
  name: string
  setName: (name: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  isPending: boolean
  loading: boolean
  onSave: () => void
}

export const UserItem = ({
  user,
  name,
  setName,
  open,
  setOpen,
  isPending,
  loading,
  onSave,
}: UserItemProps) => {
  const t = useTranslations('Settings')

  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const initialName = user.name ?? ''
  const isLoading = isPending || loading
  const isFormDirty = name !== initialName

  const initials =
    user.name?.trim().charAt(0).toUpperCase() ??
    user.email?.charAt(0).toUpperCase() ??
    'U'

  const handleDialogClose = (openStatus: boolean) => {
    if (!openStatus && isFormDirty && !isLoading) {
      setIsAlertOpen(true)
    } else {
      setOpen(openStatus)
    }
  }

  const handleConfirmCancel = () => {
    setName(initialName)
    setIsAlertOpen(false)
    setOpen(false)
  }

  const handleSaveWrapper = () => {
    if (!isFormDirty) {
      setOpen(false)
      return
    }
    onSave()
  }

  if (loading) {
    return (
      <Item variant="outline">
        <ItemContent>
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-60" />
            </div>
          </div>
        </ItemContent>
        <ItemActions>
          <Skeleton className="h-10 w-24" />
        </ItemActions>
      </Item>
    )
  }

  return (
    <>
      <Item variant="outline">
        <ItemContent>
          <div className="flex items-center gap-4">
            <Avatar.Root className="bg-muted flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
              <Avatar.Image
                src={user.avatar_url ?? undefined}
                alt={user.name ?? 'User avatar'}
                className="h-full w-full object-cover opacity-0 transition-opacity duration-300 data-[state=loaded]:opacity-100"
              />
              <Avatar.Fallback
                delayMs={500}
                className="bg-muted flex h-full w-full items-center justify-center text-lg font-semibold"
              >
                {initials}
              </Avatar.Fallback>
            </Avatar.Root>

            <div className="flex flex-col">
              <ItemTitle>{user.name ?? t('profile.noName')}</ItemTitle>
              <ItemDescription>
                {user.email ?? t('profile.noEmail')}
              </ItemDescription>
            </div>
          </div>
        </ItemContent>

        <ItemActions>
          <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={isLoading}>
                <UserPen />
                {t('profile.editButton')}
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>{t('profile.editTitle')}</DialogTitle>
              </DialogHeader>

              <form
                id="edit-profile-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSaveWrapper()
                }}
                className="space-y-4 pt-2"
              >
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {t('profile.nameLabel')}
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Email Field (Disabled) */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t('profile.emailLabel')}
                  </Label>
                  <Input id="email" disabled value={user.email ?? ''} />
                </div>
              </form>

              <DialogFooter>
                {/* Cancel Button */}
                <Button
                  variant="outline"
                  onClick={() => handleDialogClose(false)}
                  disabled={isLoading}
                >
                  {t('profile.cancel')}
                </Button>

                {/* Save Button */}
                <Button
                  type="submit"
                  form="edit-profile-form"
                  disabled={isLoading || !name.trim() || !isFormDirty}
                >
                  <UserCheck />
                  {isLoading ? t('profile.saving') : t('profile.save')}{' '}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ItemActions>
      </Item>

      {/* AlertDialog for unsaved changes */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('profile.alerts.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('profile.alerts.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('profile.alerts.stay')}</AlertDialogCancel>{' '}
            <Button onClick={handleConfirmCancel} variant="destructive">
              {t('profile.alerts.leaveAnyway')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
