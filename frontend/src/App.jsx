import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import System from './pages/System'
import SystemUsers from './pages/SystemUsers'
import Content from './pages/Content'
import ContentArticles from './pages/ContentArticles'
import ContentCategories from './pages/ContentCategories'
import ContentTags from './pages/ContentTags'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/system" element={<System />} />
        <Route path="/system/users" element={<SystemUsers />} />
        <Route path="/content" element={<Content />} />
        <Route path="/content/articles" element={<ContentArticles />} />
        <Route path="/content/categories" element={<ContentCategories />} />
        <Route path="/content/tags" element={<ContentTags />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
