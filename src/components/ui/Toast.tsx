import { useEffect, useState } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { haptic } from '../../lib/tg'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    haptic(type === 'error' ? 'error' : type === 'success' ? 'success' : 'light')
    const timer = setTimeout(onClose, 6000)
    return () => clearTimeout(timer)
  }, [onClose, type])

  const icons = {
    success: <CheckCircle2 size={22} className="text-green-500" />,
    error: <AlertCircle size={22} className="text-red-500" />,
    info: <Info size={22} className="text-brand" />,
  }

  const bgColors = {
    success: 'bg-tg-bg border-green-500 shadow-green-500/20',
    error: 'bg-tg-bg border-red-500 shadow-red-500/20',
    info: 'bg-tg-bg border-brand shadow-brand/20',
  }

  return (
    <div 
      className={`fixed top-4 left-4 right-4 z-[999] p-4 rounded-2xl border-2 shadow-2xl animate-in slide-in-from-top-4 duration-500 flex items-start space-x-3 ${bgColors[type]}`}
      style={{ marginTop: 'calc(env(safe-area-inset-top, 0px) + 56px)' }}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <p className="text-sm font-medium text-tg-text flex-1">{message}</p>
      <button onClick={onClose} className="flex-shrink-0 p-1 rounded-full active:bg-gray-500/10">
        <X size={16} className="text-tg-hint" />
      </button>
    </div>
  )
}

export interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  time: string
  read: boolean
  category: 'system' | 'task' | 'payment'
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const showToast = (message: string, type: ToastType = 'info', category: 'system' | 'task' | 'payment' = 'system') => {
    setToast({ message, type })
    const history: Notification[] = JSON.parse(localStorage.getItem('trinity_notifications') || '[]')
    history.unshift({
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      category,
    })
    localStorage.setItem('trinity_notifications', JSON.stringify(history.slice(0, 50)))
  }

  const ToastComponent = toast ? (
    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
  ) : null

  return { showToast, ToastComponent }
}

// Хелпер для подсчета непрочитанных
export function getUnreadCount(): number {
  const notifications: Notification[] = JSON.parse(localStorage.getItem('trinity_notifications') || '[]')
  return notifications.filter(n => !n.read).length
}
