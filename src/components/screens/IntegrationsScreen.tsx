import { Database, Link2, Bot, Sparkles, Code2, ChevronRight } from 'lucide-react'
import WebApp from '@twa-dev/sdk'

export function IntegrationsScreen() {
  const handleConnect = (name: string) => {
    WebApp.showAlert(`Подключение ${name} будет доступно в ближайшем обновлении!`)
  }

  const integrations = [
    { id: 'bitrix', name: 'Битрикс24', desc: 'Поиск и добавление в CRM', icon: Database, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'amo', name: 'amoCRM', desc: 'Сделки и контакты', icon: Link2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'alice', name: 'Алиса', desc: 'Голосовой поиск контактов', icon: Bot, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { id: 'mcp', name: 'MCP / BitrixGPT', desc: 'Работа с ИИ-ассистентами', icon: Sparkles, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'api', name: 'REST API', desc: 'Для ваших скриптов и n8n', icon: Code2, color: 'text-gray-500', bg: 'bg-gray-500/10' },
  ]

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300 pb-24">
      <h1 className="text-2xl font-bold mb-2">Интеграции</h1>
      <p className="text-sm text-tg-hint mb-4">Подключите Тринити к своим рабочим инструментам</p>

      <div className="space-y-3">
        {integrations.map((item) => {
          const Icon = item.icon
          return (
            <button 
              key={item.id}
              onClick={() => handleConnect(item.name)}
              className="w-full bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 flex items-center justify-between active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={24} className={item.color} />
                </div>
                <div>
                  <h3 className="font-semibold text-base">{item.name}</h3>
                  <p className="text-xs text-tg-hint">{item.desc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-tg-hint" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
