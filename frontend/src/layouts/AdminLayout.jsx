/**
 * AdminLayout - Reusable layout wrapper for admin pages
 * Provides fixed header + sidebar + adaptive content area
 * Use this wrapper for all admin pages to maintain consistent layout
 */

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'
import './AdminLayout.css'

export default function AdminLayout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  )
}
