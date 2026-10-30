import { Database, Link2, Bot, Sparkles, Code2, ChevronRight } from 'lucide-react'
import { haptic } from '../../lib/tg'

interface IntegrationsScreenProps {
  onNavigateToDetail: (integrationId: string) => void
}

export function IntegrationsScreen({ onNavigateToDetail }: IntegrationsScreenProps) {
  const integrations = [
    { 
      id: 'bitrix', 
      name: 'Битрикс24', 
      desc: 'Поиск и добавление компаний в CRM, автозаполнение карточек из ФНС', 
      icon: Database, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10',
    },
    { 
      id: 'amo', 
      name: 'amoCRM', 
      desc: 'Отправка найденных компаний сделками с тегом «Тринити»', 
      icon: Link2, 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10',
    },
    { 
      id: 'alice', 
      name: 'Алиса', 
      desc: 'Голосовой поиск: «Алиса, найди стоматологии в Казани»', 
      icon: Bot, 
      color: 'text-yellow-500', 
      bg: 'bg-yellow-500/10',
    },
    { 
      id: 'mcp', 
      name: 'MCP / BitrixGPT', 
      desc: 'Работа с ИИ-ассистентами и Claude через Model Context Protocol', 
      icon: Sparkles, 
      color: 'text-green-500', 
      bg: 'bg-green-500/10',
    },
    { 
      id: 'api', 
      name: 'REST API', 
      desc: 'Для ваших скриптов, n8n и Make. 60 запросов в минуту', 
      icon: Code2, 
      color: 'text-gray-500', 
      bg: 'bg-gray-500/10',
    },
  ]

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300 pb-24">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Интеграции</h1>
        <p className="text-sm text-tg-hint">Подключите Тринити к своим рабочим инструментам</p>
      </div>

      <div className="space-y-3">
        {integrations.map((item) => {
          const Icon = item.icon
          return (
            <button 
              key={item.id}
              onClick={() => { haptic('light'); onNavigateToDetail(item.id); }}
              className="w-full bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 flex items-center justify-between active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={24} className={item.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-1">{item.name}</h3>
                  <p className="text-xs text-tg-hint">{item.desc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-tg-hint flex-shrink-0" />
            </button>
          )
        })}
      </div>

      <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10 flex items-start space-x-3">
        <Sparkles size={20} className="text-brand flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-brand mb-1">Безопасно и просто</p>
          <p className="text-xs text-tg-hint">Для CRM API-ключ не нужен — аккаунт привязывается в один клик. Все данные передаются по HTTPS.</p>
        </div>
      </div>
    </div>
  )
}
