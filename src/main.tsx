import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initTelegram } from './lib/tg'

// Инициализация Telegram (вызов ready, expand, requestFullscreen)
initTelegram()

// === ЖЕСТКИЙ ФОРС-РЕСАЙЗ (как в Data Scientist) ===
let _maxH = window.innerHeight
const forceResize = () => {
  _maxH = Math.max(_maxH, window.innerHeight)
  const h = _maxH
  document.documentElement.style.height = h + 'px'
  document.body.style.height = h + 'px'
  const root = document.getElementById('root')
  if (root) root.style.height = h + 'px'
}

window.addEventListener('resize', forceResize)
window.addEventListener('orientationchange', () => {
  setTimeout(forceResize, 100)
  setTimeout(forceResize, 500)
})
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', forceResize)
}
forceResize()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
