import { Copy, Share2, Users, Gift } from 'lucide-react'
import WebApp from '@twa-dev/sdk'

export function PartnerScreen() {
  const refLink = 'https://t.me/seek_leads_partner_bot?start=ref_12345'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refLink)
    WebApp.showAlert('Ссылка скопирована!')
  }

  const shareLink = () => {
    WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=Попробуй Тринити — ИИ для поиска контактов!`)
  }

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-300">
      <div className="text-center py-4">
        <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users size={40} className="text-brand" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Приведи друга</h1>
        <p className="text-tg-hint text-sm px-4">
          Получай +5 бесплатных поисков за каждого друга, который зарегистрируется по твоей ссылке.
        </p>
      </div>

      {/* Реферальная ссылка */}
      <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 space-y-3">
        <p className="text-sm font-medium">Ваша ссылка</p>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-tg-bg rounded-xl px-3 py-2.5 text-sm text-tg-hint overflow-hidden text-ellipsis whitespace-nowrap border border-gray-500/10">
            {refLink}
          </div>
          <button onClick={copyToClipboard} className="p-3 bg-brand/10 text-brand rounded-xl active:bg-brand/20">
            <Copy size={18} />
          </button>
        </div>
        <button 
          onClick={shareLink}
          className="w-full bg-tg-button text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.98] transition-transform flex items-center justify-center space-x-2"
        >
          <Share2 size={18} />
          <span>Поделиться ссылкой</span>
        </button>
      </div>

      {/* Статистика */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Статистика</h3>
        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
              <Gift className="text-green-500" size={20} />
            </div>
            <div>
              <p className="font-semibold">Приведено друзей</p>
              <p className="text-xs text-tg-hint">За все время</p>
            </div>
          </div>
          <span className="text-xl font-bold">3</span>
        </div>
        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Gift className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="font-semibold">Получено бонусов</p>
              <p className="text-xs text-tg-hint">+5 поисков за друга</p>
            </div>
          </div>
          <span className="text-xl font-bold text-brand">+15</span>
        </div>
      </div>
    </div>
  )
}
