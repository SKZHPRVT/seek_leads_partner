import { useState } from 'react'
import { Layout, TabType } from './components/Layout'
import { DashboardScreen } from './components/screens/DashboardScreen'
import { SearchScreen } from './components/screens/SearchScreen'
import { IntegrationsScreen } from './components/screens/IntegrationsScreen'
import { IntegrationDetailScreen } from './components/screens/IntegrationDetailScreen'
import { ProfileScreen } from './components/screens/ProfileScreen'
import { HistoryScreen } from './components/screens/HistoryScreen'
import { TariffsScreen } from './components/screens/TariffsScreen'
import { ApiKeyScreen } from './components/screens/ApiKeyScreen'
import { SettingsScreen } from './components/screens/SettingsScreen'
import { TasksScreen } from './components/screens/TasksScreen'
import { NetworkScreen } from './components/screens/NetworkScreen'
import { AchievementsScreen } from './components/screens/AchievementsScreen'
import { AuthScreen } from './components/screens/AuthScreen'
import { PaymentsScreen } from './components/screens/PaymentsScreen'
import { SecurityScreen } from './components/screens/SecurityScreen'
import { IncomeScreen } from './components/screens/IncomeScreen'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [showHistory, setShowHistory] = useState(false)
  const [showTariffs, setShowTariffs] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showNetwork, setShowNetwork] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showPayments, setShowPayments] = useState(false)
  const [showSecurity, setShowSecurity] = useState(false)
  const [showIncome, setShowIncome] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)

  if (showHistory) return <HistoryScreen onClose={() => setShowHistory(false)} />
  if (showTariffs) return <TariffsScreen onClose={() => setShowTariffs(false)} />
  if (showApiKey) return <ApiKeyScreen onClose={() => setShowApiKey(false)} />
  if (showSettings) return <SettingsScreen onClose={() => setShowSettings(false)} />
  if (showNetwork) return <NetworkScreen onClose={() => setShowNetwork(false)} />
  if (showAchievements) return <AchievementsScreen onClose={() => setShowAchievements(false)} />
  if (showAuth) return <AuthScreen onClose={() => setShowAuth(false)} onAuthSuccess={() => setShowAuth(false)} />
  if (showPayments) return <PaymentsScreen onClose={() => setShowPayments(false)} />
  if (showSecurity) return <SecurityScreen onClose={() => setShowSecurity(false)} />
  if (showIncome) return <IncomeScreen onClose={() => setShowIncome(false)} />
  if (selectedIntegration) return <IntegrationDetailScreen integrationId={selectedIntegration} onClose={() => setSelectedIntegration(null)} />

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && (
        <DashboardScreen 
          onNavigateToSearch={() => setActiveTab('search')} 
          onNavigateToHistory={() => setShowHistory(true)}
          onNavigateToIncome={() => setShowIncome(true)}
        />
      )}
      {activeTab === 'search' && <SearchScreen onNavigateToAuth={() => setShowAuth(true)} />}
      {activeTab === 'tasks' && <TasksScreen />}
      {activeTab === 'integrations' && (
        <IntegrationsScreen onNavigateToDetail={(id) => setSelectedIntegration(id)} />
      )}
      {activeTab === 'profile' && (
        <ProfileScreen 
          onNavigateToTariffs={() => setShowTariffs(true)} 
          onNavigateToApiKey={() => setShowApiKey(true)}
          onNavigateToSettings={() => setShowSettings(true)}
          onNavigateToNetwork={() => setShowNetwork(true)}
          onNavigateToAchievements={() => setShowAchievements(true)}
          onNavigateToPayments={() => setShowPayments(true)}
          onNavigateToSecurity={() => setShowSecurity(true)}
          onNavigateToIntegrations={() => setActiveTab('integrations')}
        />
      )}
    </Layout>
  )
}

export default App
