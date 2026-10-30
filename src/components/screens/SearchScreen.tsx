import { useState } from 'react'
import { Search, MapPin, Phone, Mail, Globe, Briefcase } from 'lucide-react'

export function SearchScreen() {
  const [query, setQuery] = useState('стоматологии в Казани')
  const [isSearching, setIsSearching] = useState(false)

  const mockResults = [
    { id: 1, name: 'ООО «Белая улыбка»', director: 'Директор · Ирина С.', phone: '+7 (843) 2••-••-17', email: 'info@...', site: 'сайт', vk: true },
    { id: 2, name: 'ООО «Дента Плюс»', director: 'Главный врач · Марат Г.', phone: '+7 (843) 5••-••-40', email: null, site: 'сайт', vk: false },
    { id: 3, name: 'ООО «Смайл Клиник»', director: null, phone: '+7 (917) 2••-••-63', email: 'clinic@...', site: 'сайт', vk: false },
  ]

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 800)
  }

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      <h1 className="text-2xl font-bold mb-4">База компаний</h1>
      
      {/* Поисковая строка */}
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
        className="w-full bg-tg-button text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.98] transition-transform"
      >
        {isSearching ? 'Ищу...' : 'Найти'}
      </button>

      {/* Результаты */}
      <div className="space-y-3 mt-6">
        {mockResults.map((company) => (
          <div key={company.id} className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
            <h3 className="font-semibold text-base mb-1">{company.name}</h3>
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
            
            <button className="mt-4 w-full bg-brand/10 text-brand font-medium text-sm py-2 rounded-xl active:bg-brand/20 transition-colors flex items-center justify-center">
              <Briefcase size={16} className="mr-2" /> Взять в работу
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
