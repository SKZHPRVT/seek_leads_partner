import { useState } from 'react'
import { CheckCircle2, User, CreditCard, Shield, LogOut, Copy, Share2, Key, Link2, ChevronRight, Settings, Users, Trophy } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'

interface ProfileScreenProps {
  onNavigateToTariffs: () => void
  onNavigateToApiKey: () => void
  onNavigateToSettings: () => void
  onNavigateToNetwork: () => void
  onNavigateToAchievements: () => void
  onNavigateToPayments: () => void
  onNavigateToSecurity: () => void
  onNavigateToIntegrations: () => void
}

export function ProfileScreen({ 
  onNavigateToTariffs, 
  onNavigateToApiKey, 
  onNavigateToSettings, 
  onNavigateToNetwork, 
  onNavigateToAchievements, 
  onNavigateToPayments, 
  onNavigateToSecurity,
  onNavigateToIntegrations 
}: ProfileScreenProps) {
  const user = WebApp.initDataUnsafe?.user
  const [copied, setCopied] = useState(false)
  const refLink = 'https://t.me/seek_leads_partner_bot?start=ref_12345'

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink)
    haptic('success')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    haptic('light')
    WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=Попробуй Тринити — ИИ для поиска контактов!`)
  }

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-300 pb-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center border border-brand/20">
            {user?.photo_url ? (
              <img src={user.photo_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User size={32} className="text-brand" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold">{user?.first_name || 'Партнер'} {user?.last_name || ''}</h1>
            <p className="text-sm text-tg-hint">ID: {user?.id || '000000'}</p>
          </div>
        </div>
        <button onClick={onNavigateToSettings} className="p-2 bg-tg-secondary rounded-full">
          <Settings size={20} className="text-tg-hint" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden border border-gray-700">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Shield size={80} />
        </div>
        <p className="text-gray-400 text-sm mb-1">Ваш тариф</p>
        <h2 className="text-2xl font-bold mb-4">Партнёр PRO</h2>
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-300">
            <CheckCircle2 size={16} className="mr-2 text-green-400" /> 300 контактов / мес
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <CheckCircle2 size={16} className="mr-2 text-green-400" /> Выгрузка в Excel/CSV
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <CheckCircle2 size={16} className="mr-2 text-green-400" /> Приоритетная поддержка
          </div>
        </div>
        <button 
          onClick={onNavigateToTariffs}
          className="w-full bg-white text-gray-900 font-semibold py-3 rounded-xl active:scale-[0.98] transition-transform"
        >
          Сменить тариф
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Мои инструменты</h3>
        
        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center"><Share2 size={14} className="mr-2 text-brand" /> Реферальная ссылка</span>
            {copied && <span className="text-xs text-green-500">Скопировано!</span>}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-tg-bg rounded-xl px-3 py-2 text-xs text-tg-hint overflow-hidden text-ellipsis whitespace-nowrap border border-gray-500/10">
              {refLink}
            </div>
            <button onClick={handleCopy} className="p-2.5 bg-brand/10 text-brand rounded-xl active:bg-brand/20">
              <Copy size={16} />
            </button>
            <button onClick={handleShare} className="p-2.5 bg-brand/10 text-brand rounded-xl active:bg-brand/20">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        <button onClick={onNavigateToNetwork} className="w-full bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 mb-3 flex items-center justify-between active:bg-gray-500/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <Users size={18} className="text-green-500" />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">Моя сеть</p>
              <p className="text-xs text-tg-hint">Рефералы и менеджеры</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-tg-hint" />
        </button>

        <button onClick={onNavigateToAchievements} className="w-full bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 mb-3 flex items-center justify-between active:bg-gray-500/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Trophy size={18} className="text-yellow-500" />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">Ачивки</p>
              <p className="text-xs text-tg-hint">Достижения и награды</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-tg-hint" />
        </button>

        <button onClick={onNavigateToApiKey} className="w-full bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 mb-3 flex items-center justify-between active:bg-gray-500/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Key size={18} className="text-purple-500" />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">API-ключ</p>
              <p className="text-xs text-tg-hint">Для интеграций и скриптов</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-tg-hint" />
        </button>

        <button onClick={onNavigateToIntegrations} className="w-full bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 mb-3 flex items-center justify-between active:bg-gray-500/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Link2 size={18} className="text-blue-500" />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">Интеграции</p>
              <p className="text-xs text-tg-hint">CRM, Алиса, MCP</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-tg-hint" />
        </button>
      </div>

      <div className="bg-tg-secondary rounded-2xl border border-gray-500/10 overflow-hidden">
        <button onClick={onNavigateToPayments} className="w-full p-4 flex items-center justify-between border-b border-gray-500/10 active:bg-gray-500/5">
          <div className="flex items-center space-x-3">
            <CreditCard size={20} className="text-tg-hint" />
            <span className="font-medium">История платежей</span>
          </div>
        </button>
        <button onClick={onNavigateToSecurity} className="w-full p-4 flex items-center justify-between border-b border-gray-500/10 active:bg-gray-500/5">
          <div className="flex items-center space-x-3">
            <Shield size={20} className="text-tg-hint" />
            <span className="font-medium">Безопасность</span>
          </div>
        </button>
        <button onClick={() => WebApp.close()} className="w-full p-4 flex items-center justify-between active:bg-red-500/5 text-red-500">
          <div className="flex items-center space-x-3">
            <LogOut size={20} />
            <span className="font-medium">Закрыть приложение</span>
          </div>
        </button>
      </div>
    </div>
  )
}
