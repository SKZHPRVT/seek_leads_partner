import { useState } from 'react'
import { Layout, TabType } from './components/Layout'
import { DashboardScreen } from './components/screens/DashboardScreen'
import { SearchScreen } from './components/screens/SearchScreen'
import { AchievementsScreen } from './components/screens/AchievementsScreen'
import { IntegrationsScreen } from './components/screens/IntegrationsScreen'
import { ProfileScreen } from './components/screens/ProfileScreen'
import { HistoryScreen } from './components/screens/HistoryScreen'
import { TariffsScreen } from './components/screens/TariffsScreen'
import { ApiKeyScreen } from './components/screens/ApiKeyScreen'
import { SettingsScreen } from './components/screens/SettingsScreen'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [showHistory, setShowHistory] = useState(false)
  const [showTariffs, setShowTariffs] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  if (showHistory) return <HistoryScreen onClose={() => setShowHistory(false)} />
  if (showTariffs) return <TariffsScreen onClose={() => setShowTariffs(false)} />
  if (showApiKey) return <ApiKeyScreen onClose={() => setShowApiKey(false)} />
  if (showSettings) return <SettingsScreen onClose={() => setShowSettings(false)} />

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && (
        <DashboardScreen 
          onNavigateToSearch={() => setActiveTab('search')} 
          onNavigateToHistory={() => setShowHistory(true)}
        />
      )}
      {activeTab === 'search' && <SearchScreen />}
      {activeTab === 'achievements' && <AchievementsScreen />}
      {activeTab === 'integrations' && <IntegrationsScreen />}
      {activeTab === 'profile' && (
        <ProfileScreen 
          onNavigateToTariffs={() => setShowTariffs(true)} 
          onNavigateToApiKey={() => setShowApiKey(true)}
          onNavigateToSettings={() => setShowSettings(true)}
        />
      )}
    </Layout>
  )
}

export default App
