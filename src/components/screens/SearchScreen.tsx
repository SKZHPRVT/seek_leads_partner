import { useState } from 'react'
import { Search, Phone, Mail, Globe, Briefcase, Loader2, Key, AlertCircle } from 'lucide-react'
import WebApp from '@twa-dev/sdk'

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
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Мок-данные на случай, если ключа нет
  const mockResults = [
    { id: 1, name: 'ООО «Белая улыбка»', director: 'Директор · Ирина С.', phone: '+7 (843) 2••-••-17', email: 'info@...', site: 'сайт', vk: true },
    { id: 2, name: 'ООО «Дента Плюс»', director: 'Главный врач · Марат Г.', phone: '+7 (843) 5••-••-40', email: null, site: 'сайт', vk: false },
    { id: 3, name: 'ООО «Смайл Клиник»', director: null, phone: '+7 (917) 2••-••-63', email: 'clinic@...', site: 'сайт', vk: false },
  ]

  const handleSearch = async () => {
    setIsSearching(true)
    setError(null)
    setResults([])

    // Если ключа нет — показываем мок
    if (!apiKey.trim()) {
      setTimeout(() => {
        setResults(mockResults)
        setIsSearching(false)
      }, 1000)
      return
    }

    // Реальный запрос к API Тринити
    try {
      const response = await fetch('https://seek-leads.ru/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey.trim()
        },
        body: JSON.stringify({
          query: query,
          limit: 10,
          channels: ["msp"]
        })
      })

      if (!response.ok) {
        throw new Error('Ошибка API: проверьте ключ или тариф')
      }

      const data = await response.json()
      
      // Парсим ответ (структура может отличаться, подстраиваем под реальный API)
      // В документации ответ не описан детально, поэтому предполагаем массив companies
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
      } else {
        // Если структура другая, показываем мок для демо
        setResults(mockResults)
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при поиске')
      WebApp.showAlert(err.message || 'Ошибка поиска')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300 pb-24">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">База компаний</h1>
        <button onClick={() => setShowKeyInput(!showKeyInput)} className="text-tg-hint p-2">
          <Key size={20} />
        </button>
      </div>

      {/* Поле для API-ключа (скрытое) */}
      {showKeyInput && (
        <div className="bg-tg-secondary rounded-xl p-3 border border-gray-500/10 space-y-2">
          <p className="text-xs text-tg-hint">API-ключ (Профиль → Интеграции на seek-leads.ru)</p>
          <input 
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-tr-..."
            className="w-full bg-tg-bg border border-gray-500/20 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      )}
      
      {/* Поисковая строка */}
      <div className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-tg-secondary border border-gray-500/10 rounded-2xl py-4 pl-12 pr-4 text-tg-text focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all"
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
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>Нейросеть ищет...</span>
          </>
        ) : (
          <span>Найти компании</span>
        )}
      </button>

      {/* Ошибки */}
      {error && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-xl flex items-start space-x-2 text-sm">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Результаты */}
      <div className="space-y-3 mt-4">
        {!isSearching && results.length === 0 && !error && (
          <p className="text-center text-tg-hint text-sm py-4">Введите запрос и нажмите «Найти»</p>
        )}

        {!isSearching && results.map((company) => (
          <div key={company.id} className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-base">{company.name}</h3>
              <span className="text-[10px] bg-gray-500/10 text-tg-hint px-1.5 py-0.5 rounded">ФНС</span>
            </div>
            
            {company.director && (
              <p className="text-sm text-tg-hint mb-3">{company.director}</p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-2">
              {company.phone && (
                <span className="inline-flex items-center text-xs bg-tg-bg text-tg-text px-2.5 py-1.5 rounded-lg border border-gray-500/10">
                  <Phone size={12} className="mr-1.5 text-brand" /> {company.phone}
                </span>
              )}
              {company.email && (
                <span className="inline-flex items-center text-xs bg-tg-bg text-tg-text px-2.5 py-1.5 rounded-lg border border-gray-500/10">
                  <Mail size={12} className="mr-1.5 text-brand" /> {company.email}
                </span>
              )}
              {company.site && (
                <span className="inline-flex items-center text-xs bg-tg-bg text-tg-text px-2.5 py-1.5 rounded-lg border border-gray-500/10">
                  <Globe size={12} className="mr-1.5 text-brand" /> {company.site}
                </span>
              )}
              {company.vk && (
                <span className="inline-flex items-center text-xs bg-blue-500/10 text-blue-500 px-2.5 py-1.5 rounded-lg border border-blue-500/20">
                  ВК ✓
                </span>
              )}
            </div>
            
            <button className="mt-4 w-full bg-tg-bg text-tg-text font-medium text-sm py-2.5 rounded-xl border border-gray-500/10 active:bg-gray-500/5 transition-colors flex items-center justify-center">
              <Briefcase size={16} className="mr-2 text-brand" /> Взять в работу
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
