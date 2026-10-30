import { useState } from 'react'
import { Layout } from './components/Layout'
import { DashboardScreen } from './components/screens/DashboardScreen'
import { SearchScreen } from './components/screens/SearchScreen'
import { PartnerScreen } from './components/screens/PartnerScreen'

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'search' | 'partner'>('dashboard')

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <DashboardScreen onNavigateToSearch={() => setActiveTab('search')} />}
      {activeTab === 'search' && <SearchScreen />}
      {activeTab === 'partner' && <PartnerScreen />}
    </Layout>
  )
}

export default App
