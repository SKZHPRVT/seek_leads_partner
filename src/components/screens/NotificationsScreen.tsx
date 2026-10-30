import { useState, useEffect } from 'react'
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { haptic } from '../../lib/tg'
import { ScreenWrapper } from '../ui/ScreenWrapper'

interface NotificationsScreenProps {
  onClose: () => void
}

interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  time: string
}

export function NotificationsScreen({ onClose }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('trinity_notifications')
    if (saved) {
      setNotifications(JSON.parse(saved))
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

        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-tg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={40} className="text-tg-hint" />
            </div>
            <p className="text-tg-hint text-sm">У вас пока нет уведомлений</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <div key={n.id} className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">{icons[n.type]}</div>
                <div className="flex-1">
                  <p className="text-sm text-tg-text">{n.message}</p>
                  <p className="text-xs text-tg-hint mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScreenWrapper>
  )
}
