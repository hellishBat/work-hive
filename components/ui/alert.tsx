// Alert
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/index'

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'bg-red-800/10 text-red-700 border-red-600/40 [&>svg]:text-current *:data-[slot=alert-description]:text-red-600 dark:bg-red-300/10 dark:border-red-300/40 dark:text-red-300 dark:*:data-[slot=alert-description]:text-red-400',
        informative:
          'bg-blue-800/10 text-blue-700 border-blue-600/40 [&>svg]:text-current *:data-[slot=alert-description]:text-blue-600 dark:bg-blue-300/10 dark:border-blue-300/40 dark:text-blue-300 dark:*:data-[slot=alert-description]:text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert: React.FC<
  React.ComponentProps<'div'> & VariantProps<typeof alertVariants>
> = ({ className, variant, ...props }) => (
  <div
    data-slot="alert"
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
)

const AlertTitle: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => (
  <div
    data-slot="alert-title"
    className={cn(
      'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
      className
    )}
    {...props}
  />
)

const AlertDescription: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => (
  <div
    data-slot="alert-description"
    className={cn(
      'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
      className
    )}
    {...props}
  />
)

export { Alert, AlertTitle, AlertDescription }
