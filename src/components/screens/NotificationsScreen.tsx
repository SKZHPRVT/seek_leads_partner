import { useState, useEffect } from 'react'
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Info, Megaphone, Briefcase, Wallet } from 'lucide-react'
import { haptic } from '../../lib/tg'
import { ScreenWrapper } from '../ui/ScreenWrapper'
import { Notification } from '../ui/Toast'

interface NotificationsScreenProps {
  onClose: () => void
}

export function NotificationsScreen({ onClose }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'system' | 'task' | 'payment'>('all')

  useEffect(() => {
    const saved = localStorage.getItem('trinity_notifications')
    if (saved) {
      const parsed: Notification[] = JSON.parse(saved)
      setNotifications(parsed)
      
      // Помечаем все как прочитанные при открытии
      const updated = parsed.map(n => ({ ...n, read: true }))
      localStorage.setItem('trinity_notifications', JSON.stringify(updated))
    }
  }, [])

  const clearAll = () => {
    haptic('light')
    localStorage.removeItem('trinity_notifications')
    setNotifications([])
  }

  const icons = {
    success: <CheckCircle2 size={18} className="text-green-500" />,
    error: <AlertCircle size={18} className="text-red-500" />,
    info: <Info size={18} className="text-brand" />,
  }

  const categoryIcons = {
    system: <Megaphone size={14} className="text-tg-hint" />,
    task: <Briefcase size={14} className="text-tg-hint" />,
    payment: <Wallet size={14} className="text-tg-hint" />,
  }

  const categoryLabels = {
    system: 'Система',
    task: 'Биржа',
    payment: 'Выплаты',
  }

  const filtered = notifications.filter(n => {
    if (filter === 'all') return true
    return n.category === filter
  })

  return (
    <ScreenWrapper>
      <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Уведомления</h1>
          </div>
          {notifications.length > 0 && (
            <button onClick={clearAll} className="text-xs text-red-500 font-medium">
              Очистить
            </button>
          )}
        </div>

        {/* Фильтры по категориям */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Все' },
            { id: 'system', label: 'Анонсы' },
            { id: 'task', label: 'Биржа' },
            { id: 'payment', label: 'Выплаты' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => { haptic('light'); setFilter(f.id as any); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.id ? 'bg-brand text-white' : 'bg-tg-secondary text-tg-hint'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-tg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={40} className="text-tg-hint" />
            </div>
            <p className="text-tg-hint text-sm">У вас пока нет уведомлений в этой категории</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((n) => (
              <div key={n.id} className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">{icons[n.type]}</div>
                <div className="flex-1">
                  <p className="text-sm text-tg-text">{n.message}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="flex items-center text-xs text-tg-hint">
                      {categoryIcons[n.category]}
                      <span className="ml-1">{categoryLabels[n.category]}</span>
                    </span>
                    <span className="text-xs text-tg-hint">·</span>
                    <span className="text-xs text-tg-hint">{n.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScreenWrapper>
  )
}
