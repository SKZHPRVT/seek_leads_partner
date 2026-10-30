import { useState, useEffect } from 'react'
import { ArrowLeft, Download, FileText, TrendingUp, TrendingDown, Calendar } from 'lucide-react'
import { haptic } from '../../lib/tg'
import { ScreenWrapper } from '../ui/ScreenWrapper'
import WebApp from '@twa-dev/sdk'

interface IncomeScreenProps {
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

export function IncomeScreen({ onClose }: IncomeScreenProps) {
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

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalPayout = transactions.filter(t => t.type === 'payout').reduce((sum, t) => sum + Math.abs(t.amount), 0)

  // Скачать чек (CSV для одной транзакции)
  const downloadCheck = (t: Transaction) => {
    haptic('success')
    const csvContent = `Чек\nДата;Описание;Сумма\n${t.time};${t.title};${t.amount} ₽`
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `chek_${t.id}.csv`
    link.click()
    WebApp.showAlert('Чек скачан! Откройте его в Excel или Google Таблицах.')
  }

  // Экспорт всех доходов
  const exportAll = () => {
    haptic('success')
    const csvRows = [['Дата', 'Описание', 'Сумма', 'Тип']]
    transactions.forEach((h: any) => {
      csvRows.push([h.time, h.title, h.amount, h.type === 'income' ? 'Доход' : 'Выплата'])
    })
    const csvContent = csvRows.map(r => r.join(';')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `trinity_income_${Date.now()}.csv`
    link.click()
    WebApp.showAlert('Все доходы экспортированы! Откройте CSV в Excel или Google Таблицах.')
  }

  return (
    <ScreenWrapper>
      <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Доходы</h1>
        </div>

        {/* Сводка */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-brand to-brand-dark rounded-2xl p-4 text-white shadow-lg">
            <div className="flex items-center text-blue-100 text-xs mb-1">
              <TrendingUp size={14} className="mr-1" /> Доход
            </div>
            <p className="text-2xl font-bold">{totalIncome.toLocaleString('ru-RU')} ₽</p>
          </div>
          <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <div className="flex items-center text-tg-hint text-xs mb-1">
              <TrendingDown size={14} className="mr-1" /> Выплачено
            </div>
            <p className="text-2xl font-bold text-tg-text">{totalPayout.toLocaleString('ru-RU')} ₽</p>
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Все' },
            { id: 'income', label: 'Доходы' },
            { id: 'payout', label: 'Выплаты' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => { haptic('light'); setFilter(f.id as any); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.id ? 'bg-brand text-white' : 'bg-tg-secondary text-tg-hint'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Список транзакций */}
        <div className="bg-tg-secondary rounded-2xl border border-gray-500/10 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-tg-hint text-sm">Нет транзакций</div>
          ) : (
            filtered.map((item, i) => (
              <div key={item.id} className={`p-4 flex items-center justify-between ${i !== filtered.length - 1 ? 'border-b border-gray-500/10' : ''}`}>
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-tg-bg flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-tg-hint">{item.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className={`text-sm font-semibold ${item.amount > 0 ? 'text-green-500' : 'text-tg-text'}`}>
                    {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString('ru-RU')} ₽
                  </span>
                  {item.type === 'income' && (
                    <button 
                      onClick={() => downloadCheck(item)}
                      className="p-2 bg-brand/10 text-brand rounded-lg active:bg-brand/20"
                      title="Скачать чек"
                    >
                      <FileText size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Кнопка экспорта всех */}
        <button 
          onClick={exportAll}
          className="w-full bg-tg-secondary text-tg-text font-medium py-3 rounded-xl border border-gray-500/10 active:bg-gray-500/5 flex items-center justify-center space-x-2"
        >
          <Download size={18} />
          <span>Экспорт всех доходов (CSV)</span>
        </button>

        {/* Инфо для самозанятых */}
        <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10 flex items-start space-x-3">
          <Calendar size={20} className="text-brand flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm text-brand mb-1">Для самозанятых</p>
            <p className="text-xs text-tg-hint">Скачайте чек по каждой транзакции, чтобы приложить его к налоговой отчетности. Все чеки формируются автоматически.</p>
          </div>
        </div>
      </div>
    </ScreenWrapper>
  )
}
