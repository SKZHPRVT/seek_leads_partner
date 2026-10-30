import { ArrowLeft, Shield, Lock, Smartphone, Key } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'
import { ScreenWrapper } from '../ui/ScreenWrapper'

interface SecurityScreenProps {
  onClose: () => void
}

export function SecurityScreen({ onClose }: SecurityScreenProps) {
  const handleAction = (name: string) => {
    haptic('light')
    WebApp.showAlert(`Раздел "${name}" будет доступен в ближайшем обновлении`)
  }

  return (
    <ScreenWrapper>
      <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Безопасность</h1>
        </div>

        <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10 flex items-start space-x-3 mb-4">
          <Shield size={20} className="text-brand flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm text-brand mb-1">Ваши данные защищены</p>
            <p className="text-xs text-tg-hint">Все данные передаются по HTTPS. Мы не храним пароли в открытом виде.</p>
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={() => handleAction('Смена пароля')} className="w-full bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 flex items-center justify-between active:bg-gray-500/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                <Lock size={18} className="text-brand" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">Смена пароля</p>
                <p className="text-xs text-tg-hint">Обновите пароль от аккаунта</p>
              </div>
            </div>
          </button>

          <button onClick={() => handleAction('Двухфакторная аутентификация')} className="w-full bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 flex items-center justify-between active:bg-gray-500/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                <Smartphone size={18} className="text-brand" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">Двухфакторная аутентификация</p>
                <p className="text-xs text-tg-hint">Дополнительная защита входа</p>
              </div>
            </div>
          </button>

          <button onClick={() => handleAction('Активные сессии')} className="w-full bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 flex items-center justify-between active:bg-gray-500/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                <Key size={18} className="text-brand" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">Активные сессии</p>
                <p className="text-xs text-tg-hint">Устройства, где выполнен вход</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </ScreenWrapper>
  )
}
