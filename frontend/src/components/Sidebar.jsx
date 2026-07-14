import { useMenu } from '../hooks/useCommon'
import { navigationConfig } from '../config/navigation'
import './Sidebar.css'

export default function Sidebar() {
  const { expandedMenu, toggleMenu } = useMenu('dashboard')
  const menuItems = navigationConfig

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
