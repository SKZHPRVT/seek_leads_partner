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
  if (!isTelegram) {
    console.log('[TMA] Running in web mode')
    return
  }

  const wa = window.Telegram?.WebApp || tg
  if (!wa) return

  console.log('[TMA] Initializing Telegram WebApp', {
    version: wa.version,
    platform: wa.platform,
  })

  // 1. Сообщаем, что приложение готово
  wa.ready()

  // 2. Разворачиваем на весь WebView (без шапки Telegram)
  wa.expand()

  // 3. Агрессивный запуск Fullscreen (Bot API 8.0+)
  const tryFullscreen = () => {
    if (typeof wa.requestFullscreen === 'function') {
      try {
        wa.requestFullscreen()
        wa.expand() // Иногда помогает вызвать expand после requestFullscreen
        console.log('[TMA] requestFullscreen called')
      } catch (e) {
        console.log('[TMA] requestFullscreen failed:', e)
      }
    }
  }

  // Вызываем сразу
  tryFullscreen()
  // И через 300 мс (когда Telegram прогрузит интерфейс)
  setTimeout(tryFullscreen, 300)

  // 4. Отключаем закрытие TMA свайпом вниз (Bot API 7.7+)
  if (typeof wa.disableVerticalSwipes === 'function') {
    try {
      wa.disableVerticalSwipes()
    } catch (e) {
      console.log('[TMA] disableVerticalSwipes failed:', e)
    }
  }

  // 5. Синхронизация высоты viewport
  const applyViewportHeight = () => {
    const h = wa.viewportStableHeight || wa.viewportHeight || window.innerHeight
    document.documentElement.style.setProperty('--tg-viewport-height', `${h}px`)
    document.documentElement.style.setProperty('--real-vh', `${h}px`)
  }

  applyViewportHeight()
  wa.onEvent('viewportChanged', applyViewportHeight)

  window.addEventListener('resize', applyViewportHeight)
  window.addEventListener('orientationchange', () => setTimeout(applyViewportHeight, 300))
  
  setTimeout(applyViewportHeight, 200)
  setTimeout(applyViewportHeight, 1000)
}

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning'

export function haptic(type: HapticType) {
  const wa = window.Telegram?.WebApp || tg
  if (!wa?.HapticFeedback) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(type === 'error' ? [40, 40, 40] : 20) } catch {}
    }
    return
  }

  try {
    if (type === 'light' || type === 'medium' || type === 'heavy') {
      wa.HapticFeedback.impactOccurred(type)
    } else {
      wa.HapticFeedback.notificationOccurred(type)
    }
  } catch (e) {
    console.warn('[TMA] Haptic failed:', e)
  }
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
