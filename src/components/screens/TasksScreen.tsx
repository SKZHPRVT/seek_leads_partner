import { useState } from 'react'
import { Briefcase, MapPin, DollarSign, Clock, ChevronRight, CheckCircle2 } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'

interface Task {
  id: number
  title: string
  desc: string
  budget: number
  city: string
  count: number
  deadline: string
  author: string
  status: 'open' | 'in_progress' | 'done'
}

export function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Найти стоматологии в Казани', desc: 'Нужны клиники с контактами главврача. Приоритет — с сайтом.', budget: 1500, city: 'Казань', count: 10, deadline: '2 дня', author: 'Dental Group', status: 'open' },
    { id: 2, title: 'Поставщики стройматериалов в Москве', desc: 'Собрать 20 компаний с почтой и телефоном. Желательно с ВК.', budget: 3000, city: 'Москва', count: 20, deadline: '5 дней', author: 'StroyPlus', status: 'open' },
    { id: 3, title: 'IT-аутсорсинг в Санкт-Петербурге', desc: 'Небольшие IT-компании (до 50 человек) с контактами директора.', budget: 2000, city: 'СПб', count: 15, deadline: '3 дня', author: 'TechLink', status: 'open' },
  ])

  const handleTakeTask = (taskId: number) => {
    haptic('success')
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'in_progress' } : t))
    
    // Добавляем в историю
    const history = JSON.parse(localStorage.getItem('trinity_history') || '[]')
    history.unshift({
      id: Date.now(),
      title: `Взял задачу #${taskId}`,
      time: new Date().toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      amount: 0,
      type: 'income',
      icon: '💼',
    })
    localStorage.setItem('trinity_history', JSON.stringify(history))
    
    WebApp.showAlert('Задача взята в работу! Перейдите в поиск, чтобы найти лиды.')
  }

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300 pb-24">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Биржа задач</h1>
        <span className="text-xs bg-brand/10 text-brand px-2 py-1 rounded-md font-medium">Бета</span>
      </div>
      <p className="text-sm text-tg-hint mb-4">Здесь работодатели публикуют задачи. Берите в работу и получайте деньги за результат.</p>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className={`rounded-2xl p-4 border transition-all ${
            task.status === 'in_progress' 
              ? 'bg-brand/5 border-brand/20' 
              : 'bg-tg-secondary border-gray-500/10'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-base">{task.title}</h3>
              <span className="text-xs font-bold text-brand bg-brand/10 px-2 py-1 rounded-md">
                {task.budget.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <p className="text-xs text-tg-hint mb-3">{task.desc}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center text-xs bg-tg-bg text-tg-text px-2 py-1 rounded-lg border border-gray-500/10">
                <MapPin size={12} className="mr-1 text-brand" /> {task.city}
              </span>
              <span className="inline-flex items-center text-xs bg-tg-bg text-tg-text px-2 py-1 rounded-lg border border-gray-500/10">
                <Briefcase size={12} className="mr-1 text-brand" /> {task.count} лидов
              </span>
              <span className="inline-flex items-center text-xs bg-tg-bg text-tg-text px-2 py-1 rounded-lg border border-gray-500/10">
                <Clock size={12} className="mr-1 text-brand" /> {task.deadline}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-tg-hint">от {task.author}</span>
              {task.status === 'open' ? (
                <button 
                  onClick={() => handleTakeTask(task.id)}
                  className="bg-tg-button text-white text-sm font-medium px-4 py-2 rounded-xl active:scale-[0.98] transition-transform"
                >
                  Взять в работу
                </button>
              ) : (
                <span className="flex items-center text-xs text-brand font-medium">
                  <CheckCircle2 size={14} className="mr-1" /> В работе
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
