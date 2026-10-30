import { Database, Link2, Bot, Sparkles, Code2, CheckCircle2 } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'

export function IntegrationsScreen() {
  const handleConnect = (name: string) => {
    haptic('medium')
    WebApp.showAlert(`Подключение ${name} будет доступно в ближайшем обновлении!`)
  }

  const integrations = [
    { 
      id: 'bitrix', 
      name: 'Битрикс24', 
      desc: 'Поиск и добавление компаний в CRM, автозаполнение карточек из ФНС', 
      icon: Database, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10',
      status: 'Подключить'
    },
    { 
      id: 'amo', 
      name: 'amoCRM', 
      desc: 'Отправка найденных компаний сделками с тегом «Тринити»', 
      icon: Link2, 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10',
      status: 'Подключить'
    },
    { 
      id: 'alice', 
      name: 'Алиса', 
      desc: 'Голосовой поиск: «Алиса, найди стоматологии в Казани»', 
      icon: Bot, 
      color: 'text-yellow-500', 
      bg: 'bg-yellow-500/10',
      status: 'Подключить'
    },
    { 
      id: 'mcp', 
      name: 'MCP / BitrixGPT', 
      desc: 'Работа с ИИ-ассистентами и Claude через Model Context Protocol', 
      icon: Sparkles, 
      color: 'text-green-500', 
      bg: 'bg-green-500/10',
      status: 'Подключить'
    },
    { 
      id: 'api', 
      name: 'REST API', 
      desc: 'Для ваших скриптов, n8n и Make. 60 запросов в минуту', 
      icon: Code2, 
      color: 'text-gray-500', 
      bg: 'bg-gray-500/10',
      status: 'API-ключ'
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
            <div 
              key={item.id}
              className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={24} className={item.color} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base mb-1">{item.name}</h3>
                  <p className="text-xs text-tg-hint mb-3">{item.desc}</p>
                  <button 
                    onClick={() => handleConnect(item.name)}
                    className="text-sm font-medium text-brand bg-brand/10 px-3 py-1.5 rounded-lg active:bg-brand/20 transition-colors"
                  >
                    {item.status}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10 flex items-start space-x-3">
        <CheckCircle2 size={20} className="text-brand flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-brand mb-1">Безопасно и просто</p>
          <p className="text-xs text-tg-hint">Для CRM API-ключ не нужен — аккаунт привязывается в один клик. Все данные передаются по HTTPS.</p>
        </div>
      </div>
    </div>
  )
}
