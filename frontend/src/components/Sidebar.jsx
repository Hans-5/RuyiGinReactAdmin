import { useLocation, useNavigate } from 'react-router-dom'
import { useMenu } from '../hooks/useCommon'
import { navigationConfig } from '../config/navigation'
import './Sidebar.css'

// Derive which top-level menu id matches the current URL path.
function getActiveId(pathname) {
  // Match the first path segment: /dashboard -> 'dashboard', /system/users -> 'system'
  const segment = pathname.split('/')[1] || 'dashboard'
  return segment
}

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeId = getActiveId(location.pathname)

  // useMenu still controls submenu expand/collapse;
  // initialise to whichever top-level item is currently active.
  const { expandedMenu, toggleMenu } = useMenu(activeId)

  const handleItemClick = (item) => {
    toggleMenu(item.id)
    // Navigate immediately for leaf items (no submenu).
    if (item.submenu.length === 0) {
      navigate(item.path)
    }
  }

  const handleSubItemClick = (e, sub) => {
    e.stopPropagation()
    navigate(sub.path)
  }

  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        {navigationConfig.map(item => (
          <div key={item.id} className="menu-item-wrapper">
            <div
              className={`menu-item ${activeId === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item)}
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
                  <div
                    key={sub.id}
                    className={`submenu-item ${location.pathname === sub.path ? 'active' : ''}`}
                    onClick={(e) => handleSubItemClick(e, sub)}
                  >
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
