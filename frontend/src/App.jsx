import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import System from './pages/System'
import Content from './pages/Content'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

// Every page renders inside the same AdminLayout shell.
// Add new routes here as the template grows.
function App() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/system/*" element={<System />} />
        <Route path="/content/*" element={<Content />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AdminLayout>
  )
}

export default App
