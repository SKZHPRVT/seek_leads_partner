import { useState, useEffect } from 'react'
import { Search, Phone, Mail, Globe, Briefcase, Loader2, Key, AlertCircle, CheckCircle2 } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'

interface Company {
  id: number;
  name: string;
  director?: string | null;
  phone?: string | null;
  email?: string | null;
  site?: string | null;
  vk?: boolean;
}

export function SearchScreen() {
  const [query, setQuery] = useState('стоматологии в Казани')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<Company[]>([])
  const [showKeyInput, setShowKeyInput] = useState(false)
  const [apiKey, setApiKey] = useState(localStorage.getItem('trinity_api_key') || '')
  const [error, setError] = useState<string | null>(null)
  const [takenLeads, setTakenLeads] = useState<number[]>(JSON.parse(localStorage.getItem('taken_leads') || '[]'))

  const mockResults = [
    { id: 1, name: 'ООО «Белая улыбка»', director: 'Директор · Ирина С.', phone: '+7 (843) 2••-••-17', email: 'info@...', site: 'сайт', vk: true },
    { id: 2, name: 'ООО «Дента Плюс»', director: 'Главный врач · Марат Г.', phone: '+7 (843) 5••-••-40', email: null, site: 'сайт', vk: false },
    { id: 3, name: 'ООО «Смайл Клиник»', director: null, phone: '+7 (917) 2••-••-63', email: 'clinic@...', site: 'сайт', vk: false },
  ]

  const handleSearch = async () => {
    haptic('medium')
    setIsSearching(true)
    setError(null)
    setResults([])

    if (!apiKey.trim()) {
      setTimeout(() => {
        setResults(mockResults)
        setIsSearching(false)
        haptic('success')
      }, 1000)
      return
    }

    try {
      const response = await fetch('https://seek-leads.ru/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey.trim()
        },
        body: JSON.stringify({ query, limit: 10, channels: ["msp"] })
      })

      if (!response.ok) throw new Error('Ошибка API: проверьте ключ')

      const data = await response.json()
      if (data.companies && Array.isArray(data.companies)) {
        setResults(data.companies.map((c: any) => ({
          id: c.id || Math.random(),
          name: c.name || c.company_name || 'Без названия',
          director: c.director || c.ceo || null,
          phone: c.phone || null,
          email: c.email || null,
          site: c.site || c.website || null,
          vk: !!c.vk
        })))
        haptic('success')
      } else {
        setResults(mockResults)
      }
    } catch (err: any) {
      haptic('error')
      setError(err.message || 'Ошибка поиска')
      WebApp.showAlert(err.message || 'Ошибка поиска')
    } finally {
      setIsSearching(false)
    }
  }

  const handleTakeLead = (company: Company) => {
    if (takenLeads.includes(company.id)) {
      WebApp.showAlert('Этот лид уже взят в работу!')
      return
    }

    haptic('success')
    const newTaken = [...takenLeads, company.id]
    setTakenLeads(newTaken)
    localStorage.setItem('taken_leads', JSON.stringify(newTaken))

    // Сохраняем историю действия
    const history = JSON.parse(localStorage.getItem('trinity_history') || '[]')
    history.unshift({
      id: Date.now(),
      title: `Взят лид «${company.name}»`,
      time: new Date().toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      amount: 150,
      type: 'income',
      icon: '🎯',
    })
    localStorage.setItem('trinity_history', JSON.stringify(history))

    WebApp.showAlert(`Лид «${company.name}» взят в работу! +150 ₽ начислено.`)
  }

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300 pb-24">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">База компаний</h1>
        <button onClick={() => setShowKeyInput(!showKeyInput)} className="text-tg-hint p-2">
          <Key size={20} />
        </button>
      </div>

      {showKeyInput && (
        <div className="bg-tg-secondary rounded-xl p-3 border border-gray-500/10 space-y-2">
          <p className="text-xs text-tg-hint">API-ключ (Профиль → API-ключ)</p>
          <input 
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-tr-..."
            className="w-full bg-tg-bg border border-gray-500/20 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      )}
      
      <div className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-tg-secondary border border-gray-500/10 rounded-2xl py-4 pl-12 pr-4 text-tg-text focus:outline-none focus:ring-2 focus:ring-brand/50"
          placeholder="Кого ищем?"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-tg-hint" size={20} />
      </div>

      <button 
        onClick={handleSearch}
        disabled={isSearching}
        className="w-full bg-tg-button text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.98] transition-transform flex items-center justify-center space-x-2 disabled:opacity-70"
      >
        {isSearching ? (
          <><Loader2 className="animate-spin" size={18} /><span>Нейросеть ищет...</span></>
        ) : (
          <span>Найти компании</span>
        )}
      </button>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-xl flex items-start space-x-2 text-sm">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-3 mt-4">
        {!isSearching && results.map((company) => {
          const isTaken = takenLeads.includes(company.id)
          return (
            <div key={company.id} className={`rounded-2xl p-4 border animate-in fade-in zoom-in-95 duration-300 ${isTaken ? 'bg-brand/5 border-brand/20' : 'bg-tg-secondary border-gray-500/10'}`}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-base">{company.name}</h3>
                {isTaken ? (
                  <span className="text-[10px] bg-brand/20 text-brand px-1.5 py-0.5 rounded flex items-center">
                    <CheckCircle2 size={10} className="mr-1" /> В работе
                  </span>
                ) : (
                  <span className="text-[10px] bg-gray-500/10 text-tg-hint px-1.5 py-0.5 rounded">ФНС</span>
                )}
              </div>
              {company.director && <p className="text-sm text-tg-hint mb-3">{company.director}</p>}
              <div className="flex flex-wrap gap-2 mt-2">
                {company.phone && <span className="inline-flex items-center text-xs bg-tg-bg text-tg-text px-2.5 py-1.5 rounded-lg border border-gray-500/10"><Phone size={12} className="mr-1.5 text-brand" /> {company.phone}</span>}
                {company.email && <span className="inline-flex items-center text-xs bg-tg-bg text-tg-text px-2.5 py-1.5 rounded-lg border border-gray-500/10"><Mail size={12} className="mr-1.5 text-brand" /> {company.email}</span>}
                {company.site && <span className="inline-flex items-center text-xs bg-tg-bg text-tg-text px-2.5 py-1.5 rounded-lg border border-gray-500/10"><Globe size={12} className="mr-1.5 text-brand" /> {company.site}</span>}
                {company.vk && <span className="inline-flex items-center text-xs bg-blue-500/10 text-blue-500 px-2.5 py-1.5 rounded-lg border border-blue-500/20">ВК ✓</span>}
              </div>
              <button 
                onClick={() => handleTakeLead(company)}
                disabled={isTaken}
                className={`mt-4 w-full font-medium text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center ${
                  isTaken 
                    ? 'bg-brand/10 text-brand cursor-default' 
                    : 'bg-tg-bg text-tg-text border border-gray-500/10 active:bg-gray-500/5'
                }`}
              >
                <Briefcase size={16} className="mr-2" /> {isTaken ? 'Уже в работе' : 'Взять в работу (+150 ₽)'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
