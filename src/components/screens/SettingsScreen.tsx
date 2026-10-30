import { useState } from 'react'
import { ArrowLeft, User, Building2, MapPin, Save } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'

interface SettingsScreenProps {
  onClose: () => void
}

export function SettingsScreen({ onClose }: SettingsScreenProps) {
  const user = WebApp.initDataUnsafe?.user
  const [name, setName] = useState(user?.first_name || 'Партнер')
  const [company, setCompany] = useState(localStorage.getItem('trinity_company') || '')
  const [region, setRegion] = useState(localStorage.getItem('trinity_region') || '')

  const handleSave = () => {
    haptic('success')
    localStorage.setItem('trinity_company', company)
    localStorage.setItem('trinity_region', region)
    WebApp.showAlert('Настройки сохранены!')
    onClose()
  }

  return (
    <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300 pb-24 min-h-screen bg-tg-bg">
      <div className="flex items-center space-x-3 mb-4">
        <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Настройки профиля</h1>
      </div>

      <div className="space-y-4">
        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 space-y-3">
          <label className="text-sm font-medium flex items-center"><User size={16} className="mr-2 text-brand" /> Имя</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-tg-bg border border-gray-500/20 rounded-xl px-4 py-3 text-tg-text focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
        </div>

        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 space-y-3">
          <label className="text-sm font-medium flex items-center"><Building2 size={16} className="mr-2 text-brand" /> Компания</label>
          <input 
            type="text" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Название вашей компании"
            className="w-full bg-tg-bg border border-gray-500/20 rounded-xl px-4 py-3 text-tg-text focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
        </div>

        <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 space-y-3">
          <label className="text-sm font-medium flex items-center"><MapPin size={16} className="mr-2 text-brand" /> Регион</label>
          <input 
            type="text" 
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Город, в котором вы работаете"
            className="w-full bg-tg-bg border border-gray-500/20 rounded-xl px-4 py-3 text-tg-text focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-tg-button text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.98] transition-transform flex items-center justify-center space-x-2"
        >
          <Save size={18} />
          <span>Сохранить</span>
        </button>
      </div>
    </div>
  )
}
