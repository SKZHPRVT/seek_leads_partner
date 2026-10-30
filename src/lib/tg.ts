import WebApp from '@twa-dev/sdk'

declare global {
  interface Window {
    Telegram?: {
      WebApp: any
    }
  }
}

export const isTelegram = typeof window !== 'undefined' && window.Telegram?.WebApp?.initData !== undefined
export const tg = isTelegram ? WebApp : undefined

export function initTelegram() {
  // Основная инициализация уже сделана в index.html (inline script)
  // Здесь только haptic и user data
}

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning'

export function haptic(type: HapticType) {
  const wa = window.Telegram?.WebApp || tg
  if (!wa?.HapticFeedback) return
  try {
    if (type === 'light' || type === 'medium' || type === 'heavy') {
      wa.HapticFeedback.impactOccurred(type)
    } else {
      wa.HapticFeedback.notificationOccurred(type)
    }
  } catch (e) {}
}

export function getUserId(): string {
  const wa = window.Telegram?.WebApp || tg
  return String(wa?.initDataUnsafe?.user?.id ?? 'local')
}

export function getInitData(): string {
  const wa = window.Telegram?.WebApp || tg
  return wa?.initData ?? ''
}

export function getUserFirstName(): string {
  const wa = window.Telegram?.WebApp || tg
  return wa?.initDataUnsafe?.user?.first_name ?? 'Партнер'
}
