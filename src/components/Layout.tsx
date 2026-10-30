import { ReactNode } from 'react'
import { LayoutDashboard, Search, Users } from 'lucide-react'
import clsx from 'clsx'

interface LayoutProps {
  children: ReactNode
  activeTab: 'dashboard' | 'search' | 'partner'
  onTabChange: (tab: 'dashboard' | 'search' | 'partner') => void
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: LayoutDashboard },
    { id: 'search', label: 'Поиск', icon: Search },
    { id: 'partner', label: 'Партнер', icon: Users },
  ] as const

  return (
    <div className="flex flex-col h-[100dvh] bg-tg-bg">
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full bg-tg-secondary border-t border-gray-200/20 pb-safe">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={clsx(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                  isActive ? "text-tg-button" : "text-tg-hint hover:text-tg-text"
                )}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
