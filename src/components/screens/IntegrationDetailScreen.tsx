import { useState } from 'react'
import { ArrowLeft, Copy, CheckCircle2, ExternalLink, Database, Link2, Bot, Sparkles, Code2 } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'
import { ScreenWrapper } from '../ui/ScreenWrapper'

interface IntegrationDetailScreenProps {
  integrationId: string
  onClose: () => void
}

const integrationsData: Record<string, any> = {
  bitrix: {
    name: 'Битрикс24',
    icon: Database,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    description: 'Приложение «Тринити — поиск контактов компаний с ИИ» работает прямо внутри портала: поиск, добавление в CRM и дополнение карточек данными ФНС.',
    steps: [
      'Установи приложение из Маркетплейса Битрикс24 и разреши доступ к CRM',
      'Нажми «Привязать аккаунт Тринити» — войди или зарегистрируйся на seek-leads.ru',
      'Выбери воронку и стадию, введи запрос → отметь компании → «Добавить в CRM»',
    ],
    features: [
      'Добавить в CRM: компания, контакт, сделка и ИНН в реквизитах',
      'Вкладка Тринити в карточке: Дополнить из ФНС (ИНН, отрасль, ОКВЭД, численность, доходы)',
      'Найти похожие: компании той же отрасли и региона',
    ],
    link: 'https://www.bitrix24.ru/apps/',
    linkText: 'Установить из Маркетплейса',
    codeExample: null,
  },
  amo: {
    name: 'amoCRM',
    icon: Link2,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    description: 'Отправляй найденные компании в amoCRM сделками — с компанией, контактом, тегом «Тринити» и примечанием.',
    steps: [
      'Открой Профиль → Интеграции → Подключить amoCRM и разреши доступ',
      'Выбери воронку и этап для новых сделок',
      'В разделе Контакты отметь компании → В amoCRM (без отметок — вся страница, до 500)',
    ],
    features: [
      'Сделка «Компания — Тринити» с сайтом и адресом',
      'Рабочие почта и телефон, примечание с ИНН, отраслью, категорией МСП',
      'Дубли по ИНН не создаются',
    ],
    link: 'https://www.amocrm.ru/',
    linkText: 'Установить из amoМаркета',
    codeExample: null,
  },
  alice: {
    name: 'Алиса (Яндекс Диалоги)',
    icon: Bot,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    description: 'Навык Тринити в Алисе: скажи «Алиса, запусти навык Тринити поиск контактов» и ищи контакты компаний голосом.',
    steps: [
      'Открой Яндекс или умную колонку → скажи: «Алиса, запусти навык Тринити поиск контактов»',
      'Или открой страницу навыка в каталоге Алисы',
      'Скажи: «Найди рекламные агентства в Казани»',
    ],
    features: [
      'Пробный режим: 3 бесплатных поиска по 5 контактов',
      'Для полного доступа: подключи тариф (от 990₽/мес) и привяжи аккаунт',
      'Голосом — быстрее, чем вводить текст',
    ],
    link: 'https://dialogs.yandex.ru/',
    linkText: 'Открыть каталог навыков Алисы',
    codeExample: null,
  },
  mcp: {
    name: 'MCP / BitrixGPT / Claude',
    icon: Sparkles,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    description: 'Подключи Тринити к Claude Desktop, Cursor, VS Code или BitrixGPT через Model Context Protocol (MCP).',
    steps: [
      'Получи API-ключ в Профиль → API-ключ',
      'Для Claude Code: claude mcp add --transport http trinity https://mcp.seek-leads.ru/ --header "Authorization: Bearer YOUR_API_KEY"',
      'Для Cursor: добавь в .cursor/mcp.json конфиг (см. ниже)',
    ],
    features: [
      '4 инструмента: search_leads, list_leads, chat, get_profile',
      'Работает с Claude.ai, Claude Desktop, Claude Code, Cursor, VS Code',
      'BitrixGPT: установи Тринити MCP из Маркетплейса и вставь API-ключ',
    ],
    link: 'https://mcp.seek-leads.ru/',
    linkText: 'Открыть MCP-сервер',
    codeExample: `{
  "mcpServers": {
    "trinity": {
      "url": "https://mcp.seek-leads.ru/",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}`,
  },
  api: {
    name: 'REST API',
    icon: Code2,
    color: 'text-gray-500',
    bg: 'bg-gray-500/10',
    description: 'Прямой HTTP-доступ к Тринити для скриптов, n8n, Make или своего бэкенда. 60 запросов в минуту.',
    steps: [
      'Получи API-ключ в Профиль → API-ключ',
      'Передавай ключ в заголовке X-API-Key',
      'Используй POST /api/search для поиска компаний',
    ],
    features: [
      'Полная спецификация: seek-leads.ru/api/openapi.json',
      'Swagger UI: seek-leads.ru/api/docs',
      'Каналы поиска: msp (реестр МСП)',
    ],
    link: 'https://seek-leads.ru/api/docs',
    linkText: 'Открыть Swagger UI',
    codeExample: `curl -X POST https://seek-leads.ru/api/search \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "рекламные агентства Казань",
    "limit": 10,
    "channels": ["msp"]
  }'`,
  },
}

export function IntegrationDetailScreen({ integrationId, onClose }: IntegrationDetailScreenProps) {
  const [copied, setCopied] = useState(false)
  const data = integrationsData[integrationId]

  if (!data) {
    return <div className="p-4 text-center">Интеграция не найдена</div>
  }

  const Icon = data.icon

  const copyToClipboard = (text: string) => {
    haptic('success')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openLink = () => {
    haptic('light')
    WebApp.openLink(data.link)
  }

  return (
    <ScreenWrapper>
      <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">{data.name}</h1>
        </div>

        <div className={`w-16 h-16 rounded-2xl ${data.bg} flex items-center justify-center mx-auto mb-4`}>
          <Icon size={32} className={data.color} />
        </div>

        <p className="text-sm text-tg-hint text-center mb-6">{data.description}</p>

        {/* Шаги */}
        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
          <h3 className="font-semibold text-sm mb-3">Как подключить</h3>
          <div className="space-y-3">
            {data.steps.map((step: string, i: number) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand/20 text-brand flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-tg-text">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Что получаете */}
        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
          <h3 className="font-semibold text-sm mb-3">Что вы получаете</h3>
          <div className="space-y-2">
            {data.features.map((f: string, i: number) => (
              <div key={i} className="flex items-start space-x-2">
                <CheckCircle2 size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-tg-text">{f}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Код-пример (если есть) */}
        {data.codeExample && (
          <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Пример конфига</h3>
              <button 
                onClick={() => copyToClipboard(data.codeExample)}
                className="p-1.5 bg-brand/10 text-brand rounded-lg active:bg-brand/20"
              >
                {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
            <pre className="bg-tg-bg p-3 rounded-lg overflow-x-auto text-[10px] font-mono text-tg-text whitespace-pre-wrap">
              {data.codeExample}
            </pre>
          </div>
        )}

        {/* Кнопка перехода */}
        <button 
          onClick={openLink}
          className="w-full bg-tg-button text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.98] transition-transform flex items-center justify-center space-x-2"
        >
          <ExternalLink size={18} />
          <span>{data.linkText}</span>
        </button>

        <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10 flex items-start space-x-3">
          <CheckCircle2 size={20} className="text-brand flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm text-brand mb-1">Безопасно</p>
            <p className="text-xs text-tg-hint">Все данные передаются по HTTPS. API-ключ можно отозвать в любой момент в разделе «API-ключ».</p>
          </div>
        </div>
      </div>
    </ScreenWrapper>
  )
}
