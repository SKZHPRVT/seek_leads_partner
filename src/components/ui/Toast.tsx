import { useEffect, useState } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: <CheckCircle2 size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    info: <Info size={20} className="text-brand" />,
  }

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/30',
    error: 'bg-red-500/10 border-red-500/30',
    info: 'bg-brand/10 border-brand/30',
  }

  return (
    <div className={`fixed top-4 left-4 right-4 z-[999] p-4 rounded-2xl border backdrop-blur-md shadow-lg animate-in slide-in-from-top duration-300 flex items-start space-x-3 ${bgColors[type]}`}
      style={{ marginTop: 'calc(env(safe-area-inset-top, 0px) + 56px)' }}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <p className="text-sm text-tg-text flex-1">{message}</p>
      <button onClick={onClose} className="flex-shrink-0 p-1 rounded-full active:bg-gray-500/10">
        <X size={16} className="text-tg-hint" />
      </button>
    </div>
  )
}

// Хук для управления уведомлениями
export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type })
  }

  const ToastComponent = toast ? (
    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
  ) : null

  return { showToast, ToastComponent }
}
