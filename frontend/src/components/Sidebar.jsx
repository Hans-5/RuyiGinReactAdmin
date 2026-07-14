import { useState } from 'react'
import './Sidebar.css'

export default function Sidebar() {
  const [expandedMenu, setExpandedMenu] = useState('dashboard')

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      submenu: []
    },
    {
      id: 'system',
      label: 'System Management',
      icon: '⚙️',
      submenu: [
        { id: 'users', label: 'User Management' },
        { id: 'roles', label: 'Role Management' },
        { id: 'permissions', label: 'Permissions' }
      ]
    },
    {
      id: 'content',
      label: 'Content Management',
      icon: '📝',
      submenu: [
        { id: 'articles', label: 'Articles' },
        { id: 'categories', label: 'Categories' },
        { id: 'tags', label: 'Tags' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
      submenu: []
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '🔧',
      submenu: []
    }
  ]

  const toggleMenu = (id) => {
    setExpandedMenu(expandedMenu === id ? null : id)
  }

  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item-wrapper">
            <div
              className={`menu-item ${expandedMenu === item.id ? 'active' : ''}`}
              onClick={() => toggleMenu(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
              {item.submenu.length > 0 && (
                <span className={`menu-arrow ${expandedMenu === item.id ? 'expanded' : ''}`}>›</span>
              )}
            </div>
            {item.submenu.length > 0 && expandedMenu === item.id && (
              <div className="submenu">
                {item.submenu.map(sub => (
                  <div key={sub.id} className="submenu-item">
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
