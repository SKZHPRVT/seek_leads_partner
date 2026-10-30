import { ReactNode } from 'react'
import { LayoutDashboard, Search, Trophy, Link2, User } from 'lucide-react'
import clsx from 'clsx'
import { haptic } from '../lib/tg'

export type TabType = 'dashboard' | 'search' | 'achievements' | 'integrations' | 'profile'

interface LayoutProps {
  children: ReactNode
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: LayoutDashboard },
    { id: 'search', label: 'Поиск', icon: Search },
    { id: 'achievements', label: 'Ачивки', icon: Trophy },
    { id: 'integrations', label: 'Связи', icon: Link2 },
    { id: 'profile', label: 'Профиль', icon: User },
  ] as const

  const handleTabChange = (id: TabType) => {
    haptic('light')
    onTabChange(id)
  }

  return (
    <div className="flex flex-col h-full w-full bg-tg-bg relative overflow-hidden text-tg-text">
      {/* Скроллируемый контент с безопасным верхним отступом */}
      <main 
        className="flex-1 overflow-y-auto" 
        style={{ 
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 56px)',
          paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' 
        }}
      >
        {children}
      </main>
      
      {/* Фиксированное нижнее меню */}
      <nav 
        className="absolute bottom-0 w-full bg-tg-secondary border-t border-gray-500/10 z-50" 
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex justify-around items-center h-16 px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={clsx(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors rounded-lg",
                  isActive ? "text-tg-button" : "text-tg-hint hover:text-tg-text"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium truncate w-full text-center">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
