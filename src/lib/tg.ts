import WebApp from '@twa-dev/sdk'

// Проверяем, запущены ли мы в Telegram
export const isTelegram = typeof window !== 'undefined' && window.Telegram?.WebApp?.initData !== undefined

export const tg = isTelegram ? WebApp : undefined

export function initTelegram() {
  if (!isTelegram) {
    console.log('[TMA] Running in web mode')
    return
  }

  console.log('[TMA] Initializing Telegram WebApp', {
    version: tg?.version,
    platform: tg?.platform,
  })

  // 1. Сообщаем, что приложение готово
  tg?.ready()

  // 2. Разворачиваем на весь WebView
  tg?.expand()

  // 3. Bot API 8.0+: полный экран без шапки Telegram
  if (tg && typeof tg.requestFullscreen === 'function') {
    try {
      tg.requestFullscreen()
      console.log('[TMA] requestFullscreen called')
    } catch (e) {
      console.log('[TMA] requestFullscreen failed:', e)
    }
  }

  // 4. Отключаем закрытие TMA свайпом вниз (Bot API 7.7+)
  if (tg && typeof tg.disableVerticalSwipes === 'function') {
    try {
      tg.disableVerticalSwipes()
    } catch (e) {
      console.log('[TMA] disableVerticalSwipes failed:', e)
    }
  }

  // 5. Устанавливаем цвета шапки и фона под тему (можно заменить на свои)
  try {
    tg?.setHeaderColor('#ffffff') // или var(--tg-theme-bg-color)
    tg?.setBackgroundColor('#ffffff')
  } catch (e) {
    console.log('[TMA] color setup failed:', e)
  }

  // 6. Синхронизация высоты viewport
  const applyViewportHeight = () => {
    const h = tg?.viewportStableHeight || tg?.viewportHeight || window.innerHeight
    document.documentElement.style.setProperty('--tg-viewport-height', `${h}px`)
    document.documentElement.style.setProperty('--real-vh', `${h}px`)
  }

  applyViewportHeight()
  tg?.onEvent('viewportChanged', applyViewportHeight)

  window.addEventListener('resize', applyViewportHeight)
  window.addEventListener('orientationchange', () => setTimeout(applyViewportHeight, 300))
  
  // Принудительный пересчет через таймеры
  setTimeout(applyViewportHeight, 200)
  setTimeout(applyViewportHeight, 1000)
}

// Функция для вибрации (Haptic Feedback)
export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning'

export function haptic(type: HapticType) {
  if (!tg?.HapticFeedback) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(type === 'error' ? [40, 40, 40] : 20) } catch {}
    }
    return
  }

  try {
    if (type === 'light' || type === 'medium' || type === 'heavy') {
      tg.HapticFeedback.impactOccurred(type)
    } else {
      tg.HapticFeedback.notificationOccurred(type)
    }
  } catch (e) {
    console.warn('[TMA] Haptic failed:', e)
  }
}

// Получить данные пользователя
export function getUserId(): string {
  return String(tg?.initDataUnsafe?.user?.id ?? 'local')
}

export function getInitData(): string {
  return tg?.initData ?? ''
}

export function getUserFirstName(): string {
  return tg?.initDataUnsafe?.user?.first_name ?? 'Партнер'
}
