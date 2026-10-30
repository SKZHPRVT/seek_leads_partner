import { ReactNode } from 'react'

interface ScreenWrapperProps {
  children: ReactNode
  className?: string
}

export function ScreenWrapper({ children, className = '' }: ScreenWrapperProps) {
  return (
    <div
      className={`h-[100dvh] overflow-y-auto bg-tg-bg ${className}`}
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 56px)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
      }}
    >
      {children}
    </div>
  )
}
