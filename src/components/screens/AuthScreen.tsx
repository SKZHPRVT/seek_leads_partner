import { useState } from 'react'
import { ArrowLeft, Mail, Lock, LogIn, Loader2 } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'

interface AuthScreenProps {
  onClose: () => void
  onAuthSuccess: (token: string) => void
}

export function AuthScreen({ onClose, onAuthSuccess }: AuthScreenProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Введите email и пароль')
      haptic('error')
      return
    }

    haptic('medium')
    setIsLoading(true)
    setError(null)

    try {
      // Реальный запрос к API Тринити
      const response = await fetch('https://seek-leads.ru/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Неверный email или пароль')
      }

      const data = await response.json()
      // Предполагаем, что API возвращает { token: "..." } или { access_token: "..." }
      const token = data.token || data.access_token || data.jwt
      
      if (token) {
        localStorage.setItem('trinity_jwt', token)
        haptic('success')
        WebApp.showAlert('Вы успешно вошли!')
        onAuthSuccess(token)
        onClose()
      } else {
        throw new Error('Сервер не вернул токен')
      }
    } catch (err: any) {
      haptic('error')
      setError(err.message || 'Ошибка авторизации')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300 pb-24 min-h-screen bg-tg-bg">
      <div className="flex items-center space-x-3 mb-4">
        <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Вход в Тринити</h1>
      </div>

      <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10 flex items-start space-x-3 mb-4">
        <LogIn size={20} className="text-brand flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-brand mb-1">Зачем это нужно?</p>
          <p className="text-xs text-tg-hint">Войдите в свой аккаунт Тринити, чтобы приложение могло делать реальные поиски и сохранять историю в вашем личном кабинете.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 space-y-3">
          <label className="text-sm font-medium flex items-center"><Mail size={16} className="mr-2 text-brand" /> Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-tg-bg border border-gray-500/20 rounded-xl px-4 py-3 text-tg-text focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
        </div>

        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 space-y-3">
          <label className="text-sm font-medium flex items-center"><Lock size={16} className="mr-2 text-brand" /> Пароль</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-tg-bg border border-gray-500/20 rounded-xl px-4 py-3 text-tg-text focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-tg-button text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.98] transition-transform flex items-center justify-center space-x-2 disabled:opacity-70"
        >
          {isLoading ? (
            <><Loader2 className="animate-spin" size={18} /><span>Вход...</span></>
          ) : (
            <><LogIn size={18} /><span>Войти</span></>
          )}
        </button>

        <p className="text-xs text-center text-tg-hint">
          Нет аккаунта? <span className="text-brand font-medium" onClick={() => WebApp.openLink('https://seek-leads.ru/register')}>Зарегистрируйтесь на сайте</span>
        </p>
      </div>
    </div>
  )
}
