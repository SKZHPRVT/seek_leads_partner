import { ArrowLeft, CreditCard, CheckCircle2, Clock } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'
import { ScreenWrapper } from '../ui/ScreenWrapper'

interface PaymentsScreenProps {
  onClose: () => void
}

export function PaymentsScreen({ onClose }: PaymentsScreenProps) {
  const payments = [
    { id: 1, date: '25.10.2026', amount: '2 990 ₽', status: 'Оплачено', icon: '✅' },
    { id: 2, date: '25.09.2026', amount: '2 990 ₽', status: 'Оплачено', icon: '✅' },
    { id: 3, date: '25.08.2026', amount: '2 990 ₽', status: 'Оплачено', icon: '✅' },
  ]

  return (
    <ScreenWrapper>
      <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">История платежей</h1>
        </div>

        <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10 flex items-start space-x-3 mb-4">
          <CreditCard size={20} className="text-brand flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm text-brand mb-1">Ваша подписка</p>
            <p className="text-xs text-tg-hint">Тариф «Партнёр PRO» активен до 25.11.2026. Автопродление включено.</p>
          </div>
        </div>

        <div className="bg-tg-secondary rounded-2xl border border-gray-500/10 overflow-hidden">
          {payments.map((item, i) => (
            <div key={item.id} className={`p-4 flex items-center justify-between ${i !== payments.length - 1 ? 'border-b border-gray-500/10' : ''}`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-tg-bg flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.date}</p>
                  <p className="text-xs text-tg-hint">{item.status}</p>
                </div>
              </div>
              <span className="text-sm font-semibold">{item.amount}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => WebApp.showAlert('Автопродление отключено')}
          className="w-full bg-tg-secondary text-tg-text font-medium py-3 rounded-xl border border-gray-500/10 active:bg-gray-500/5"
        >
          Отключить автопродление
        </button>
      </div>
    </ScreenWrapper>
  )
}
