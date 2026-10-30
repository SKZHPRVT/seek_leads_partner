import { useState } from 'react'
import { ChevronRight, Zap, ArrowUpRight, Target, Award, Wallet, BarChart3, Clock } from 'lucide-react'
import { haptic } from '../../lib/tg'

interface DashboardScreenProps {
  onNavigateToSearch: () => void
  onNavigateToHistory: () => void
}

export function DashboardScreen({ onNavigateToSearch, onNavigateToHistory }: DashboardScreenProps) {
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('month')
  const firstName = 'Партнер'

  const chartData = period === 'week' 
    ? [20, 35, 30, 50, 45, 70, 85]
    : period === 'month'
    ? [10, 25, 20, 40, 35, 60, 85, 70, 95, 80, 90, 100]
    : [5, 15, 30, 45, 60, 80, 95, 120, 150, 180, 200, 240]
  
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

  const totalIncome = period === 'week' ? '4 200' : period === 'month' ? '14 250' : '86 400'

  return (
    <div className="p-4 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
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
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div>
            <p className="text-blue-100 text-sm mb-1">Общий доход</p>
            <h2 className="text-3xl font-bold tracking-tight">{totalIncome} ₽</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs flex items-center font-medium">
            <ArrowUpRight size={14} className="mr-1" />
            +{period === 'week' ? '12%' : period === 'month' ? '24%' : '156%'}
          </div>
        </div>

        <div className="flex space-x-1 mb-3 relative z-10">
          {[
            { id: 'week', label: 'Неделя' },
            { id: 'month', label: 'Месяц' },
            { id: 'all', label: 'Все' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => { haptic('light'); setPeriod(p.id as any); }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                period === p.id ? 'bg-white/30' : 'bg-white/10 text-white/70'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="h-20 w-full mt-2 relative z-10">
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
      </div>

      <button 
        onClick={onNavigateToSearch}
        className="w-full bg-gradient-to-r from-brand to-brand-dark text-white font-bold py-5 rounded-2xl shadow-xl shadow-brand/30 active:scale-[0.98] transition-all flex items-center justify-center space-x-3 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <Zap size={24} className="animate-pulse" />
        <span className="text-lg">Найти новые лиды</span>
        <ChevronRight size={20} />
      </button>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center"><BarChart3 size={18} className="mr-2 text-brand" />Моя статистика</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <div className="flex items-center text-tg-hint text-xs mb-1">
              <Target size={12} className="mr-1" /> Конверсия
            </div>
            <p className="text-2xl font-bold text-tg-text">18.5%</p>
            <p className="text-xs text-green-500 mt-1">↑ 2.3% за месяц</p>
          </div>
          <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <div className="flex items-center text-tg-hint text-xs mb-1">
              <Wallet size={12} className="mr-1" /> Средний чек
            </div>
            <p className="text-2xl font-bold text-tg-text">1 240 ₽</p>
            <p className="text-xs text-green-500 mt-1">↑ 140 ₽ за месяц</p>
          </div>
          <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <div className="flex items-center text-tg-hint text-xs mb-1">
              <Award size={12} className="mr-1" /> Рейтинг
            </div>
            <p className="text-2xl font-bold text-tg-text">4.8</p>
            <p className="text-xs text-tg-hint mt-1">из 5.0</p>
          </div>
          <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <div className="flex items-center text-tg-hint text-xs mb-1">
              <Clock size={12} className="mr-1" /> В работе
            </div>
            <p className="text-2xl font-bold text-tg-text">5</p>
            <p className="text-xs text-tg-hint mt-1">активных лидов</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Последние действия</h3>
          <button onClick={onNavigateToHistory} className="text-sm text-brand font-medium">Вся история</button>
        </div>
        <div className="bg-tg-secondary rounded-2xl border border-gray-500/10 overflow-hidden">
          {[
            { title: 'Взят лид «Дента Плюс»', time: 'Сегодня, 14:30', amount: '+150 ₽', icon: '🎯', positive: true },
            { title: 'Ачивка «Первый лид»', time: 'Сегодня, 12:15', amount: '+100 ₽', icon: '🏆', positive: true },
            { title: 'Выплата на карту', time: 'Вчера, 18:00', amount: '-2 000 ₽', icon: '💸', positive: false },
          ].map((item, i) => (
            <button key={i} className={`w-full p-4 flex items-center justify-between text-left active:bg-gray-500/5 ${i !== 2 ? 'border-b border-gray-500/10' : ''}`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-tg-bg flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-tg-hint">{item.time}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${item.positive ? 'text-green-500' : 'text-tg-text'}`}>
                {item.amount}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
