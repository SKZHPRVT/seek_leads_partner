import { Award, Zap, TrendingUp, Sparkles, ChevronRight } from 'lucide-react'
import WebApp from '@twa-dev/sdk'

interface DashboardScreenProps {
  onNavigateToSearch: () => void
}

export function DashboardScreen({ onNavigateToSearch }: DashboardScreenProps) {
  const user = WebApp.initDataUnsafe?.user
  const firstName = user?.first_name || 'Партнер'

  return (
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      {/* Шапка */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-tg-hint text-sm">С возвращением,</p>
          <h1 className="text-2xl font-bold">{firstName} 👋</h1>
        </div>
        <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center border border-brand/20">
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

      {/* Умная кнопка-промпт */}
      <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 space-y-3">
        <div className="flex items-center space-x-2 text-brand">
          <Sparkles size={18} />
          <h3 className="font-semibold">Быстрый поиск</h3>
        </div>
        <p className="text-sm text-tg-hint">Скажите Алисе: «Найди стоматологии в Казани через Тринити»</p>
        <button 
          onClick={onNavigateToSearch}
          className="w-full bg-tg-bg text-tg-text font-medium py-3 rounded-xl border border-gray-500/10 active:bg-gray-500/5 transition-colors flex items-center justify-between px-4"
        >
          <span>Перейти к поиску</span>
          <ChevronRight size={18} className="text-tg-hint" />
        </button>
      </div>

      {/* Ачивки */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Ваш прогресс</h3>
          <span className="text-sm text-brand font-medium cursor-pointer">Все ачивки</span>
        </div>
        <div className="space-y-3">
          <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Award className="text-green-500" size={20} />
                <span className="font-semibold text-sm">Первый лид</span>
              </div>
              <span className="text-xs text-green-500 font-medium">Получено</span>
            </div>
            <div className="w-full bg-gray-500/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full w-full rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Award className="text-gray-400" size={20} />
                <span className="font-semibold text-sm">10 лидов</span>
              </div>
              <span className="text-xs text-tg-hint font-medium">4 / 10</span>
            </div>
            <div className="w-full bg-gray-500/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-brand h-full w-[40%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
