import { ArrowLeft, Users, TrendingUp, Copy, Share2 } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'
import { useState } from 'react'
import { ScreenWrapper } from '../ui/ScreenWrapper'

interface NetworkScreenProps {
  onClose: () => void
}

export function NetworkScreen({ onClose }: NetworkScreenProps) {
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

  const referrals = [
    { id: 1, name: 'Иван Петров', status: 'Активен', earned: 1200, joined: '25.10' },
    { id: 2, name: 'Анна Сидорова', status: 'Активен', earned: 800, joined: '24.10' },
    { id: 3, name: 'Максим Козлов', status: 'Новичок', earned: 0, joined: 'Сегодня' },
  ]

  return (
    <ScreenWrapper>
      <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Моя сеть</h1>
        </div>

        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center"><Share2 size={14} className="mr-2 text-brand" /> Ваша ссылка</span>
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

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <div className="flex items-center text-tg-hint text-xs mb-1">
              <Users size={12} className="mr-1" /> Всего друзей
            </div>
            <p className="text-2xl font-bold text-tg-text">{referrals.length}</p>
          </div>
          <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <div className="flex items-center text-tg-hint text-xs mb-1">
              <TrendingUp size={12} className="mr-1" /> Их доход
            </div>
            <p className="text-2xl font-bold text-brand">2 000 ₽</p>
          </div>
        </div>

        <div className="bg-tg-secondary rounded-2xl border border-gray-500/10 overflow-hidden">
          {referrals.map((ref, i) => (
            <div key={ref.id} className={`p-4 flex items-center justify-between ${i !== referrals.length - 1 ? 'border-b border-gray-500/10' : ''}`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold">
                  {ref.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{ref.name}</p>
                  <p className="text-xs text-tg-hint">{ref.joined} · {ref.status}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${ref.earned > 0 ? 'text-green-500' : 'text-tg-hint'}`}>
                +{ref.earned.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScreenWrapper>
  )
}
