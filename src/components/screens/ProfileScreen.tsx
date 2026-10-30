import { CheckCircle2, User, CreditCard, Shield, LogOut } from 'lucide-react'
import WebApp from '@twa-dev/sdk'

export function ProfileScreen() {
  const user = WebApp.initDataUnsafe?.user

  const handleAction = (action: string) => {
    WebApp.showAlert(`Раздел "${action}" в разработке`)
  }

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-300 pb-24">
      {/* Профиль */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center border border-brand/20">
          {user?.photo_url ? (
            <img src={user.photo_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            <User size={32} className="text-brand" />
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold">{user?.first_name || 'Партнер'} {user?.last_name || ''}</h1>
          <p className="text-sm text-tg-hint">ID: {user?.id || '000000'}</p>
        </div>
      </div>

      {/* Текущий тариф */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden border border-gray-700">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Shield size={80} />
        </div>
        <p className="text-gray-400 text-sm mb-1">Ваш тариф</p>
        <h2 className="text-2xl font-bold mb-4">Партнёр PRO</h2>
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-300">
            <CheckCircle2 size={16} className="mr-2 text-green-400" /> 300 контактов / мес
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <CheckCircle2 size={16} className="mr-2 text-green-400" /> Выгрузка в Excel/CSV
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <CheckCircle2 size={16} className="mr-2 text-green-400" /> Приоритетная поддержка
          </div>
        </div>
        <button 
          onClick={() => handleAction('Смена тарифа')}
          className="w-full bg-white text-gray-900 font-semibold py-3 rounded-xl active:scale-[0.98] transition-transform"
        >
          Сменить тариф
        </button>
      </div>

      {/* Меню настроек */}
      <div className="bg-tg-secondary rounded-2xl border border-gray-500/10 overflow-hidden">
        <button onClick={() => handleAction('Платежи')} className="w-full p-4 flex items-center justify-between border-b border-gray-500/10 active:bg-gray-500/5">
          <div className="flex items-center space-x-3">
            <CreditCard size={20} className="text-tg-hint" />
            <span className="font-medium">История платежей</span>
          </div>
        </button>
        <button onClick={() => handleAction('Безопасность')} className="w-full p-4 flex items-center justify-between border-b border-gray-500/10 active:bg-gray-500/5">
          <div className="flex items-center space-x-3">
            <Shield size={20} className="text-tg-hint" />
            <span className="font-medium">Безопасность</span>
          </div>
        </button>
        <button onClick={() => WebApp.close()} className="w-full p-4 flex items-center justify-between active:bg-red-500/5 text-red-500">
          <div className="flex items-center space-x-3">
            <LogOut size={20} />
            <span className="font-medium">Закрыть приложение</span>
          </div>
        </button>
      </div>
    </div>
  )
}
