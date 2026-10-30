import { ChevronRight, Zap, ArrowUpRight } from 'lucide-react'
import WebApp from '@twa-dev/sdk'

interface DashboardScreenProps {
  onNavigateToSearch: () => void
}

export function DashboardScreen({ onNavigateToSearch }: DashboardScreenProps) {
  const user = WebApp.initDataUnsafe?.user
  const firstName = user?.first_name || 'Партнер'

  const chartData = [10, 25, 20, 40, 35, 60, 85, 70, 95]
  const maxVal = Math.max(...chartData)
  
  const generatePath = () => {
    const width = 300
    const height = 80
    const stepX = width / (chartData.length - 1)
    let path = `M 0 ${height - (chartData[0] / maxVal) * height}`
    for (let i = 1; i < chartData.length; i++) {
      const x = i * stepX
      const y = height - (chartData[i] / maxVal) * height
      path += ` L ${x} ${y}`
    }
    return path
  }

  return (
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-tg-hint text-sm">С возвращением,</p>
          <h1 className="text-2xl font-bold">{firstName} 👋</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center border border-brand/20">
          <span className="text-xl">👓</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-brand to-brand-dark rounded-3xl p-5 text-white shadow-xl shadow-brand/20 relative overflow-hidden">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-blue-100 text-sm mb-1">Общий доход</p>
            <h2 className="text-3xl font-bold tracking-tight">14 250 ₽</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs flex items-center font-medium">
            <ArrowUpRight size={14} className="mr-1" />
            +24%
          </div>
        </div>

        <div className="h-20 w-full mt-4 relative">
          <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <path d={`${generatePath()} L 300 80 L 0 80 Z`} fill="url(#chartGradient)" />
            <path d={generatePath()} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="flex space-x-2 mt-4">
          <div className="bg-white/15 rounded-lg px-2.5 py-1.5 text-xs flex-1 text-center backdrop-blur-sm">
            Лидов в работе: <b>5</b>
          </div>
          <div className="bg-white/15 rounded-lg px-2.5 py-1.5 text-xs flex-1 text-center backdrop-blur-sm">
            Заработано: <b>3 400 ₽</b>
          </div>
        </div>
      </div>

      <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
        <div className="flex items-center space-x-2 text-brand mb-2">
          <Zap size={18} />
          <h3 className="font-semibold text-sm">Найти лиды</h3>
        </div>
        <button 
          onClick={onNavigateToSearch}
          className="w-full bg-tg-bg text-tg-text font-medium py-3 rounded-xl border border-gray-500/10 active:scale-[0.98] transition-all flex items-center justify-between px-4"
        >
          <span>Перейти к поиску компаний</span>
          <ChevronRight size={18} className="text-tg-hint" />
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Последние действия</h3>
        <div className="bg-tg-secondary rounded-2xl border border-gray-500/10 overflow-hidden">
          {[
            { title: 'Взят лид «Дента Плюс»', time: 'Сегодня, 14:30', amount: '+150 ₽' },
            { title: 'Ачивка «Первый лид»', time: 'Сегодня, 12:15', amount: '+100 ₽' },
            { title: 'Выплата на карту', time: 'Вчера, 18:00', amount: '-2 000 ₽' },
          ].map((item, i) => (
            <div key={i} className={`p-4 flex items-center justify-between ${i !== 2 ? 'border-b border-gray-500/10' : ''}`}>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-tg-hint">{item.time}</p>
              </div>
              <span className={`text-sm font-semibold ${item.amount.startsWith('+') ? 'text-green-500' : 'text-tg-text'}`}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
