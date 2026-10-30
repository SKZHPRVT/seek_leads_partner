import { useState } from 'react'
import { ArrowLeft, Key, Copy, Trash2, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'
import WebApp from '@twa-dev/sdk'
import { haptic } from '../../lib/tg'
import { ScreenWrapper } from '../ui/ScreenWrapper'

interface ApiKeyScreenProps {
  onClose: () => void
}

export function ApiKeyScreen({ onClose }: ApiKeyScreenProps) {
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('trinity_api_key'))
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const handleGenerate = () => {
    haptic('medium')
    setIsGenerating(true)
    setTimeout(() => {
      const newKey = `sk-tr-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      localStorage.setItem('trinity_api_key', newKey)
      setApiKey(newKey)
      setIsGenerating(false)
      haptic('success')
      WebApp.showAlert('API-ключ создан! Сохраните его — он показывается только один раз.')
    }, 1000)
  }

  const handleCopy = () => {
    if (!apiKey) return
    navigator.clipboard.writeText(apiKey)
    haptic('success')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = () => {
    haptic('warning')
    localStorage.removeItem('trinity_api_key')
    setApiKey(null)
    setShowConfirmDelete(false)
    WebApp.showAlert('API-ключ удален. Все интеграции, использующие его, перестанут работать.')
  }

  return (
    <ScreenWrapper>
      <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => { haptic('light'); onClose(); }} className="p-2 bg-tg-secondary rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">API-ключ</h1>
        </div>

        <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10 flex items-start space-x-3 mb-4">
          <AlertCircle size={20} className="text-brand flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm text-brand mb-1">Зачем это нужно?</p>
            <p className="text-xs text-tg-hint">API-ключ нужен для интеграций с CRM, AI-агентами (Claude, GigaChat), а также для скриптов и n8n. Без ключа они не смогут обращаться к Тринити.</p>
          </div>
        </div>

        {apiKey ? (
          <div className="space-y-4">
            <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Ваш ключ</span>
                {copied && <span className="text-xs text-green-500 flex items-center"><CheckCircle2 size={12} className="mr-1" /> Скопировано!</span>}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-tg-bg rounded-xl px-3 py-2 text-xs font-mono text-tg-text overflow-hidden text-ellipsis whitespace-nowrap border border-gray-500/10">
                  {apiKey}
                </div>
                <button onClick={handleCopy} className="p-2.5 bg-brand/10 text-brand rounded-xl active:bg-brand/20">
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="bg-tg-secondary rounded-2xl p-4 border border-gray-500/10 space-y-3">
              <h3 className="font-semibold text-sm">Как использовать?</h3>
              <div className="text-xs text-tg-hint space-y-2">
                <p>Добавьте заголовок <code className="bg-tg-bg px-1 py-0.5 rounded">X-API-Key</code> к запросам:</p>
                <pre className="bg-tg-bg p-2 rounded-lg overflow-x-auto text-[10px]">curl -X POST https://seek-leads.ru/api/search \ -H "X-API-Key: {apiKey.slice(0, 10)}..." \ -d '&#123;"query": "стоматологии Казань"&#125;'</pre>
              </div>
            </div>

            <button 
              onClick={() => setShowConfirmDelete(true)}
              className="w-full bg-red-500/10 text-red-500 font-medium py-3 rounded-xl active:bg-red-500/20 transition-colors flex items-center justify-center space-x-2"
            >
              <Trash2 size={18} />
              <span>Удалить ключ</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key size={40} className="text-brand" />
            </div>
            <h2 className="text-lg font-semibold mb-2">У вас нет API-ключа</h2>
            <p className="text-sm text-tg-hint mb-6 px-4">Создайте ключ, чтобы подключить Тринити к CRM, AI-агентам или своим скриптам.</p>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-tg-button text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.98] transition-transform flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isGenerating ? (
                <><RefreshCw className="animate-spin" size={18} /><span>Генерация...</span></>
              ) : (
                <><Key size={18} /><span>Создать API-ключ</span></>
              )}
            </button>
          </div>
        )}

        {showConfirmDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowConfirmDelete(false)}>
            <div className="bg-tg-bg rounded-2xl p-6 w-full max-w-sm animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold mb-2 text-center">Удалить ключ?</h3>
              <p className="text-sm text-tg-hint text-center mb-6">Все интеграции, использующие этот ключ, перестанут работать. Это действие нельзя отменить.</p>
              <div className="flex space-x-3">
                <button onClick={() => setShowConfirmDelete(false)} className="flex-1 bg-tg-secondary font-medium py-3 rounded-xl">Отмена</button>
                <button onClick={handleDelete} className="flex-1 bg-red-500 text-white font-medium py-3 rounded-xl">Удалить</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScreenWrapper>
  )
}
