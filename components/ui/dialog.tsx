// Dialog
'use client'

import { ReactNode, useState } from 'react'
import { cn } from '@/lib'

interface DialogProps {
  trigger: ReactNode
  children: ReactNode
  className?: string
}

export const Dialog: React.FC<DialogProps> = ({
  trigger,
  children,
  className,
}) => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  return (
    <>
      <div onClick={toggle} className="inline-block cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          className={cn(
            'fixed inset-0 flex items-center justify-center bg-black/50',
            className
          )}
        >
          <div className="rounded-md bg-gray-900 p-6 shadow-lg">
            {children}
            <button
              className="mt-4 rounded bg-teal-500 px-3 py-1 text-black hover:bg-teal-400"
              onClick={toggle}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
