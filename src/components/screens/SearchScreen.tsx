import { useState } from 'react'
import { Search, Phone, Mail, Globe, Briefcase, Loader2 } from 'lucide-react'

export function SearchScreen() {
  const [query, setQuery] = useState('стоматологии в Казани')
  const [isSearching, setIsSearching] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  const mockResults = [
    { id: 1, name: 'ООО «Белая улыбка»', director: 'Директор · Ирина С.', phone: '+7 (843) 2••-••-17', email: 'info@...', site: 'сайт', vk: true },
    { id: 2, name: 'ООО «Дента Плюс»', director: 'Главный врач · Марат Г.', phone: '+7 (843) 5••-••-40', email: null, site: 'сайт', vk: false },
    { id: 3, name: 'ООО «Смайл Клиник»', director: null, phone: '+7 (917) 2••-••-63', email: 'clinic@...', site: 'сайт', vk: false },
  ]

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 1500) // Имитация работы нейросети
  }

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300 pb-24">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">База компаний</h1>
        <span className="text-xs bg-brand/10 text-brand px-2 py-1 rounded-md font-medium">ИИ-поиск</span>
      </div>
      
      {/* Поисковая строка */}
      <div className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-tg-secondary border border-gray-500/10 rounded-2xl py-4 pl-12 pr-4 text-tg-text focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all"
          placeholder="Кого ищем? (например, стоматологии)"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-tg-hint" size={20} />
      </div>

      {/* Фильтры */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'all', label: 'Все' },
          { id: 'phone', label: 'С телефоном' },
          { id: 'email', label: 'С почтой' },
          { id: 'site', label: 'С сайтом' },
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              activeFilter === filter.id 
                ? 'bg-brand text-white border-brand' 
                : 'bg-tg-secondary text-tg-hint border-gray-500/10'
            }`}
          >
            {filter.label}
          </button>
        ))}
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

      {/* Результаты */}
      <div className="space-y-3 mt-4">
        {!isSearching && mockResults.map((company) => (
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
