import { useState, useEffect } from 'react'
import { ArrowLeft, Filter, TrendingUp, TrendingDown } from 'lucide-react'
import { haptic } from '../../lib/tg'
import { ScreenWrapper } from '../ui/ScreenWrapper'

interface HistoryScreenProps {
  onClose: () => void
}

interface Transaction {
  id: number
  title: string
  time: string
  amount: number
  type: 'income' | 'payout'
  icon: string
}

export function HistoryScreen({ onClose }: HistoryScreenProps) {
  const [filter, setFilter] = useState<'all' | 'income' | 'payout'>('all')
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('trinity_history')
    if (saved) {
      setTransactions(JSON.parse(saved))
    } else {
      const defaultHistory: Transaction[] = [
        { id: 1, title: 'Взят лид «Дента Плюс»', time: 'Сегодня, 14:30', amount: 150, type: 'income', icon: '🎯' },
        { id: 2, title: 'Ачивка «Первый лид»', time: 'Сегодня, 12:15', amount: 100, type: 'income', icon: '🏆' },
        { id: 3, title: 'Выплата на карту', time: 'Вчера, 18:00', amount: -2000, type: 'payout', icon: '💸' },
      ]
      setTransactions(defaultHistory)
      localStorage.setItem('trinity_history', JSON.stringify(defaultHistory))
    }
  }, [])

  const filtered = transactions.filter(t => {
    if (filter === 'all') return true
    return t.type === filter
  })

  return (
    <ScreenWrapper>
      <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">История</h1>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Все', icon: Filter },
            { id: 'income', label: 'Доходы', icon: TrendingUp },
            { id: 'payout', label: 'Выплаты', icon: TrendingDown },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => { haptic('light'); setFilter(f.id as any); }}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.id ? 'bg-brand text-white' : 'bg-tg-secondary text-tg-hint'
              }`}
            >
              <f.icon size={14} />
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-tg-secondary rounded-2xl border border-gray-500/10 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-tg-hint text-sm">Нет транзакций</div>
          ) : (
            filtered.map((item, i) => (
              <div key={item.id} className={`p-4 flex items-center justify-between ${i !== filtered.length - 1 ? 'border-b border-gray-500/10' : ''}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-tg-bg flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-tg-hint">{item.time}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${item.amount > 0 ? 'text-green-500' : 'text-tg-text'}`}>
                  {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </ScreenWrapper>
  )
}
