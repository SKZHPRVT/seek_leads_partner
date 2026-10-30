import { Award, Zap, TrendingUp } from 'lucide-react'
import WebApp from '@twa-dev/sdk'

interface DashboardScreenProps {
  onNavigateToSearch: () => void
}

export function DashboardScreen({ onNavigateToSearch }: DashboardScreenProps) {
  const user = WebApp.initDataUnsafe?.user
  const firstName = user?.first_name || 'Партнер'

  return (
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Шапка */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-tg-hint text-sm">С возвращением,</p>
          <h1 className="text-2xl font-bold">{firstName} 👋</h1>
        </div>
        <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
          <span className="text-2xl">👓</span>
        </div>
      </div>

      {/* Карточка баланса */}
      <div className="bg-gradient-to-br from-brand to-brand-dark rounded-3xl p-6 text-white shadow-xl shadow-brand/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <TrendingUp size={100} />
        </div>
        <p className="text-blue-100 text-sm mb-1">Ваш баланс</p>
        <div className="flex items-end space-x-2 mb-4">
          <h2 className="text-4xl font-bold tracking-tight">3 400 ₽</h2>
          <span className="text-blue-200 mb-1 text-sm">доступно к выводу</span>
        </div>
        <div className="flex space-x-2">
          <div className="bg-white/20 rounded-lg px-3 py-1.5 text-xs backdrop-blur-sm">
            Лидов в работе: <b>5</b>
          </div>
          <div className="bg-white/20 rounded-lg px-3 py-1.5 text-xs backdrop-blur-sm">
            Всего приведено: <b>12</b>
          </div>
        </div>
      </div>

      {/* Кнопка действия */}
      <button 
        onClick={onNavigateToSearch}
        className="w-full bg-tg-button text-white font-semibold py-4 rounded-2xl shadow-lg shadow-brand/20 active:scale-[0.98] transition-transform flex items-center justify-center space-x-2"
      >
        <Zap size={20} />
        <span>Найти новые лиды</span>
      </button>

      {/* Ачивки */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Ачивки</h3>
          <span className="text-sm text-brand font-medium cursor-pointer">Все</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-tg-secondary rounded-2xl p-4 flex flex-col items-center text-center border border-gray-500/10">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
              <Award className="text-green-500" size={24} />
            </div>
            <h4 className="font-semibold text-sm">Первый лид</h4>
            <p className="text-xs text-tg-hint mt-1">Получено</p>
          </div>
          <div className="bg-tg-secondary rounded-2xl p-4 flex flex-col items-center text-center border border-gray-500/10 opacity-60">
            <div className="w-12 h-12 rounded-full bg-gray-500/20 flex items-center justify-center mb-2">
              <Award className="text-gray-500" size={24} />
            </div>
            <h4 className="font-semibold text-sm">10 лидов</h4>
            <p className="text-xs text-tg-hint mt-1">4 / 10</p>
          </div>
        </div>
      </div>
    </div>
  )
}
