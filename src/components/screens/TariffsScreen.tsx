import { ArrowLeft, Check, Zap } from 'lucide-react'
import { haptic } from '../../lib/tg'
import WebApp from '@twa-dev/sdk'

interface TariffsScreenProps {
  onClose: () => void
}

export function TariffsScreen({ onClose }: TariffsScreenProps) {
  const tariffs = [
    {
      id: 'trial',
      name: 'Пробный',
      price: '0 ₽',
      period: '3 поиска по 5 контактов',
      features: ['Тот же ИИ-поиск, что в тарифах', 'Без привязки карты'],
      highlighted: false,
      badge: null,
    },
    {
      id: 'light',
      name: 'Лайт',
      price: '990 ₽',
      period: 'в месяц · 50 контактов',
      features: ['ИИ-поиск по реестру и сайтам', 'Выгрузка в Excel и CSV', 'Поиск по расписанию', 'Отмена в любой момент'],
      highlighted: false,
      badge: null,
    },
    {
      id: 'standard',
      name: 'Стандарт',
      price: '2 990 ₽',
      period: 'в месяц · 300 контактов',
      features: ['ИИ-поиск по реестру и сайтам', 'Выгрузка в Excel и CSV', 'Поиск по расписанию', 'Отмена в любой момент', 'Приоритетная поддержка'],
      highlighted: true,
      badge: 'Выгоднее',
    },
  ]

  const handlePay = (tariffId: string) => {
    haptic('medium')
    WebApp.showAlert(`Оплата тарифа "${tariffId}" будет доступна в ближайшем обновлении. Пока вы можете оформить подписку на seek-leads.ru`)
  }

  return (
    <div 
      className="p-4 space-y-4 animate-in slide-in-from-bottom duration-300 pb-24 min-h-screen bg-tg-bg"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 56px)' }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Тарифы</h1>
      </div>

      <p className="text-sm text-tg-hint mb-4">Возможности одинаковые — тарифы отличаются количеством контактов.</p>

      <div className="space-y-4">
        {tariffs.map((tariff) => (
          <div 
            key={tariff.id} 
            className={`rounded-3xl p-5 border relative ${
              tariff.highlighted 
                ? 'bg-gradient-to-br from-brand/5 to-brand/10 border-brand/30 shadow-lg' 
                : 'bg-tg-secondary border-gray-500/10'
            }`}
          >
            {tariff.badge && (
              <span className="absolute top-4 right-4 bg-brand text-white text-[10px] font-bold px-2 py-1 rounded-full">
                {tariff.badge}
              </span>
            )}
            <h3 className="font-bold text-lg mb-1">{tariff.name}</h3>
            <div className="flex items-end space-x-2 mb-4">
              <h2 className="text-3xl font-bold">{tariff.price}</h2>
              <span className="text-sm text-tg-hint mb-1">/ {tariff.period}</span>
            </div>
            <div className="space-y-2 mb-6">
              {tariff.features.map((f, i) => (
                <div key={i} className="flex items-center text-sm">
                  <Check size={16} className="mr-2 text-green-500 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => handlePay(tariff.id)}
              className={`w-full font-semibold py-3 rounded-xl active:scale-[0.98] transition-transform ${
                tariff.highlighted 
                  ? 'bg-brand text-white shadow-lg shadow-brand/30' 
                  : 'bg-tg-bg text-tg-text border border-gray-500/10'
              }`}
            >
              {tariff.id === 'trial' ? 'Начать бесплатно' : 'Выбрать тариф'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
          <Zap size={20} className="text-brand" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">Нужно больше?</p>
          <p className="text-xs text-tg-hint">Свяжитесь с нами для индивидуального тарифа</p>
        </div>
      </div>
    </div>
  )
}
