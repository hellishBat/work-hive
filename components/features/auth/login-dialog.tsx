// LoginDialog
'use client'

import { useTransition } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Lock, LogIn, Mail, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { loginAction } from '@/app/actions/auth/login'
import { Button, Input, Label } from '@/components/ui'
import { cn } from '@/lib'

export const LoginDialog = () => {
  const t = useTranslations('Home')
  const { locale } = useParams()
  const [pending, startTransition] = useTransition()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="default" size="lg" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          {t('login')}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-background/50 fixed inset-0 backdrop-blur-md" />
        <Dialog.Content
          className={cn(
            'bg-card text-card-foreground border-border fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius)] border p-8 shadow-xl'
          )}
        >
          <Dialog.Title className="text-primary mb-6 text-center text-2xl font-bold">
            {t('loginTitle')}
          </Dialog.Title>

          <form
            action={loginAction}
            className="space-y-4"
            onSubmit={() => startTransition(() => {})}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t('email')}</Label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('email')}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t('password')}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="flex w-full items-center gap-2"
              disabled={pending}
            >
              <LogIn className="h-4 w-4" />
              {pending ? t('loggingIn') : t('login')}
            </Button>
          </form>

          <Dialog.Close asChild>
            <Button
              variant="ghost"
              className="mt-4 flex w-full items-center gap-2"
            >
              <X className="h-4 w-4" />
              {t('cancel')}
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
