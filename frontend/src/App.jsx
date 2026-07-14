import './App.css'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'

// The layout shell (header + sidebar + content) lives in AdminLayout, so every
// page renders the same way: <AdminLayout><SomePage /></AdminLayout>.
function App() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  )
}

export default App
