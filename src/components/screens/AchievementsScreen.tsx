import { useState } from 'react'
import { ArrowLeft, Trophy, Lock, CheckCircle2, X, Target } from 'lucide-react'
import { haptic } from '../../lib/tg'

interface Achievement {
  id: number
  title: string
  desc: string
  progress: number
  max: number
  reward: string
  icon: string
  date?: string
  category: string
}

interface AchievementsScreenProps {
  onClose: () => void
}

export function AchievementsScreen({ onClose }: AchievementsScreenProps) {
  const [selected, setSelected] = useState<Achievement | null>(null)

  const achievements: Achievement[] = [
    { id: 1, title: 'Первый шаг', desc: 'Взять первый лид в работу. Это открывает путь к первым выплатам.', progress: 1, max: 1, reward: '+100 ₽', icon: '🚀', date: '25.10.2026', category: 'Начало' },
    { id: 2, title: 'Мастер поиска', desc: 'Найти 10 компаний через ИИ-поиск. Ты учишься пользоваться главным инструментом.', progress: 10, max: 10, reward: '+200 ₽', icon: '🔍', date: '27.10.2026', category: 'Поиск' },
    { id: 3, title: 'Коммуникатор', desc: 'Привести 5 друзей в Тринити. Помоги им заработать — и получишь бонус.', progress: 3, max: 5, reward: '+500 ₽', icon: '🤝', category: 'Партнерка' },
    { id: 4, title: 'Интегратор', desc: 'Подключить amoCRM или Битрикс24. Автоматизируй работу с лидами.', progress: 0, max: 1, reward: '+300 ₽', icon: '⚙️', category: 'Интеграции' },
    { id: 5, title: 'Голосовой ввод', desc: 'Использовать Алису 3 раза для поиска. Голосом — быстрее.', progress: 1, max: 3, reward: '+150 ₽', icon: '🎤', category: 'Инновации' },
    { id: 6, title: 'Профи', desc: 'Заработать 10 000 ₽. Серьезная заявка на успех.', progress: 3400, max: 10000, reward: 'Статус PRO', icon: '👑', category: 'Достижения' },
    { id: 7, title: 'Ночной охотник', desc: 'Сделать поиск после 22:00. Мы знаем, ты работаешь даже ночью.', progress: 0, max: 1, reward: '+50 ₽', icon: '🌙', category: 'Особые' },
    { id: 8, title: 'Эксперт', desc: 'Написать пост о Тринити в соцсетях. Расскажи миру о нас.', progress: 0, max: 1, reward: '+200 ₽', icon: '✍️', category: 'Контент' },
  ]

  return (
    <div 
      className="p-4 space-y-4 animate-in slide-in-from-right duration-300 pb-24 min-h-screen bg-tg-bg"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 56px)' }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Ачивки</h1>
        <div className="flex items-center text-brand bg-brand/10 px-3 py-1.5 rounded-full ml-auto">
          <Trophy size={16} className="mr-1.5" />
          <span className="text-sm font-semibold">2 / 8</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {achievements.map((ach) => {
          const isCompleted = ach.progress >= ach.max
          const percent = Math.min((ach.progress / ach.max) * 100, 100)

          return (
            <button
              key={ach.id}
              onClick={() => { haptic('light'); setSelected(ach); }}
              className={`rounded-2xl p-4 border text-left transition-all active:scale-[0.98] ${
                isCompleted 
                  ? 'bg-gradient-to-br from-brand/5 to-brand/10 border-brand/20' 
                  : 'bg-tg-secondary border-gray-500/10'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${isCompleted ? 'bg-brand/20' : 'bg-gray-500/10 grayscale'}`}>
                  {ach.icon}
                </div>
                {isCompleted ? (
                  <CheckCircle2 size={16} className="text-brand" />
                ) : (
                  <Lock size={14} className="text-tg-hint" />
                )}
              </div>
              <h3 className={`font-semibold text-sm mb-1 ${isCompleted ? 'text-brand' : 'text-tg-text'}`}>{ach.title}</h3>
              <p className="text-[10px] text-tg-hint mb-2 line-clamp-1">{ach.category}</p>
              <div className="w-full bg-gray-500/20 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isCompleted ? 'bg-brand' : 'bg-brand/50'}`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-tg-hint mt-1.5">{ach.progress} / {ach.max}</p>
            </button>
          )
        })}
      </div>

      {selected && (
        <div 
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in" 
          onClick={() => setSelected(null)}
        >
          <div 
            className="bg-tg-bg w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto" 
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-500/30 rounded-full mx-auto mb-4"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${selected.progress >= selected.max ? 'bg-brand/20' : 'bg-gray-500/10 grayscale'}`}>
                {selected.icon}
              </div>
              <button onClick={() => setSelected(null)} className="p-2 bg-tg-secondary rounded-full">
                <X size={18} />
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-1">{selected.title}</h2>
            <span className="inline-block text-xs bg-brand/10 text-brand px-2 py-1 rounded-md font-medium mb-3">{selected.category}</span>
            <p className="text-sm text-tg-hint mb-6">{selected.desc}</p>
            
            <div className="bg-tg-secondary rounded-xl p-4 mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-tg-hint">Прогресс</span>
                <span className="font-medium">{selected.progress} / {selected.max}</span>
              </div>
              <div className="w-full bg-gray-500/20 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((selected.progress / selected.max) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-brand/5 rounded-xl border border-brand/10">
              <div className="flex items-center text-brand">
                <Target size={20} className="mr-2" />
                <span className="font-semibold">Награда</span>
              </div>
              <span className="font-bold text-brand">{selected.reward}</span>
            </div>

            {selected.date && (
              <p className="text-xs text-center text-tg-hint mt-4">Получено {selected.date}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
