/**
 * AdminLayout — layout route for the admin shell.
 *
 * Renders the fixed header + sidebar + content area.
 * Child routes are injected via <Outlet /> (React Router v6 nested layout pattern).
 * To add a page: declare a <Route> nested under the AdminLayout route in App.jsx.
 */
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'
import './AdminLayout.css'

export default function AdminLayout() {
  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <Sidebar />
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  )
}
