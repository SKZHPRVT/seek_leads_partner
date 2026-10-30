import { useState } from 'react'
import { Layout, TabType } from './components/Layout'
import { DashboardScreen } from './components/screens/DashboardScreen'
import { SearchScreen } from './components/screens/SearchScreen'
import { AchievementsScreen } from './components/screens/AchievementsScreen'
import { IntegrationsScreen } from './components/screens/IntegrationsScreen'
import { ProfileScreen } from './components/screens/ProfileScreen'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <DashboardScreen onNavigateToSearch={() => setActiveTab('search')} />}
      {activeTab === 'search' && <SearchScreen />}
      {activeTab === 'achievements' && <AchievementsScreen />}
      {activeTab === 'integrations' && <IntegrationsScreen />}
      {activeTab === 'profile' && <ProfileScreen />}
    </Layout>
  )
}

export default App
