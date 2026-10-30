import { Trophy, Lock, CheckCircle2 } from 'lucide-react'

export function AchievementsScreen() {
  const achievements = [
    { id: 1, title: 'Первый шаг', desc: 'Взять первый лид в работу', progress: 1, max: 1, reward: '+100 ₽', icon: '🚀' },
    { id: 2, title: 'Мастер поиска', desc: 'Найти 10 компаний', progress: 10, max: 10, reward: '+200 ₽', icon: '🔍' },
    { id: 3, title: 'Коммуникатор', desc: 'Привести 5 друзей', progress: 3, max: 5, reward: '+500 ₽', icon: '🤝' },
    { id: 4, title: 'Интегратор', desc: 'Подключить amoCRM или Б24', progress: 0, max: 1, reward: '+300 ₽', icon: '⚙️' },
    { id: 5, title: 'Голосовой ввод', desc: 'Использовать Алису 3 раза', progress: 1, max: 3, reward: '+150 ₽', icon: '🎤' },
    { id: 6, title: 'Профи', desc: 'Заработать 10 000 ₽', progress: 3400, max: 10000, reward: 'Статус PRO', icon: '👑' },
  ]

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Ачивки</h1>
        <div className="flex items-center text-brand bg-brand/10 px-3 py-1.5 rounded-full">
          <Trophy size={16} className="mr-1.5" />
          <span className="text-sm font-semibold">3 / 6</span>
        </div>
      </div>

      <div className="space-y-3">
        {achievements.map((ach) => {
          const isCompleted = ach.progress >= ach.max
          const percent = Math.min((ach.progress / ach.max) * 100, 100)

          return (
            <div 
              key={ach.id} 
              className={`rounded-2xl p-4 border transition-all ${
                isCompleted 
                  ? 'bg-gradient-to-br from-brand/5 to-brand/10 border-brand/20' 
                  : 'bg-tg-secondary border-gray-500/10'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${isCompleted ? 'bg-brand/20' : 'bg-gray-500/10 grayscale'}`}>
                    {ach.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isCompleted ? 'text-brand' : 'text-tg-text'}`}>{ach.title}</h3>
                    <p className="text-xs text-tg-hint mt-0.5">{ach.desc}</p>
                  </div>
                </div>
                {isCompleted ? (
                  <CheckCircle2 size={20} className="text-brand flex-shrink-0" />
                ) : (
                  <Lock size={18} className="text-tg-hint flex-shrink-0" />
                )}
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-tg-hint">
                    {ach.progress} / {ach.max}
                  </span>
                  <span className={isCompleted ? 'text-brand' : 'text-tg-hint'}>
                    {isCompleted ? 'Получено' : `Награда: ${ach.reward}`}
                  </span>
                </div>
                <div className="w-full bg-gray-500/20 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-brand' : 'bg-brand/50'}`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
