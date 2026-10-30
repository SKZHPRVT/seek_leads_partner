import { useState, useEffect } from 'react'
import { ArrowLeft, Download, FileText, TrendingUp, TrendingDown, Calendar, X, ExternalLink, Copy, CheckCircle2 } from 'lucide-react'
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
  const [selectedCheck, setSelectedCheck] = useState<Transaction | null>(null)
  const [copied, setCopied] = useState(false)

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

  // Генерация CSV-контента для одной транзакции
  const generateCheckCSV = (t: Transaction) => {
    return `Чек по операции\nДата;Описание;Сумма\n${t.time};${t.title};${t.amount} ₽\n\nСформировано в приложении Тринити Партнёр`
  }

  // Скачать чек (обычное скачивание файла)
  const downloadCheck = (t: Transaction) => {
    haptic('success')
    const csvContent = generateCheckCSV(t)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `chek_${t.id}.csv`
    link.click()
  }

  // Открыть чек в браузере (Data URL через Telegram.WebApp.openLink)
  const openCheckInBrowser = (t: Transaction) => {
    haptic('light')
    const csvContent = generateCheckCSV(t)
    const dataUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`
    
    if (WebApp.openLink) {
      WebApp.openLink(dataUrl)
    } else {
      window.open(dataUrl, '_blank')
    }
  }

  // Копировать текст чека в буфер обмена (для заметок)
  const copyCheckToClipboard = (t: Transaction) => {
    haptic('success')
    const text = `Чек по операции\nДата: ${t.time}\nОписание: ${t.title}\nСумма: ${t.amount} ₽\nСформировано в приложении Тринити Партнёр`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
                      onClick={() => { haptic('light'); setSelectedCheck(item); }}
                      className="p-2 bg-brand/10 text-brand rounded-lg active:bg-brand/20"
                      title="Посмотреть чек"
                    >
                      <FileText size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          onClick={exportAll}
          className="w-full bg-tg-secondary text-tg-text font-medium py-3 rounded-xl border border-gray-500/10 active:bg-gray-500/5 flex items-center justify-center space-x-2"
        >
          <Download size={18} />
          <span>Экспорт всех доходов (CSV)</span>
        </button>

        <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10 flex items-start space-x-3">
          <Calendar size={20} className="text-brand flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm text-brand mb-1">Для самозанятых</p>
            <p className="text-xs text-tg-hint">Скачайте чек по каждой транзакции, чтобы приложить его к налоговой отчетности. Все чеки формируются автоматически.</p>
          </div>
        </div>
      </div>

      {/* Модалка с чеком */}
      {selectedCheck && (
        <div 
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in" 
          onClick={() => setSelectedCheck(null)}
        >
          <div 
            className="bg-tg-bg w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto" 
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-500/30 rounded-full mx-auto mb-4"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center text-3xl">
                {selectedCheck.icon}
              </div>
              <button onClick={() => setSelectedCheck(null)} className="p-2 bg-tg-secondary rounded-full">
                <X size={18} />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold mb-1">Чек по операции</h2>
            <p className="text-sm text-tg-hint mb-6">{selectedCheck.time}</p>

            <div className="bg-tg-secondary rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-tg-hint">Описание</span>
                <span className="font-medium text-right">{selectedCheck.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-tg-hint">Сумма</span>
                <span className="font-bold text-brand">{selectedCheck.amount} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-tg-hint">Дата</span>
                <span className="font-medium">{selectedCheck.time}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => openCheckInBrowser(selectedCheck)}
                className="w-full bg-tg-button text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.98] transition-transform flex items-center justify-center space-x-2"
              >
                <ExternalLink size={18} />
                <span>Открыть в браузере</span>
              </button>
              
              <button 
                onClick={() => downloadCheck(selectedCheck)}
                className="w-full bg-tg-secondary text-tg-text font-medium py-3 rounded-xl border border-gray-500/10 active:bg-gray-500/5 flex items-center justify-center space-x-2"
              >
                <Download size={18} />
                <span>Скачать файл (CSV)</span>
              </button>

              <button 
                onClick={() => copyCheckToClipboard(selectedCheck)}
                className="w-full bg-tg-secondary text-tg-text font-medium py-3 rounded-xl border border-gray-500/10 active:bg-gray-500/5 flex items-center justify-center space-x-2"
              >
                {copied ? (
                  <><CheckCircle2 size={18} className="text-green-500" /><span>Скопировано!</span></>
                ) : (
                  <><Copy size={18} /><span>Копировать в заметки</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </ScreenWrapper>
  )
}
