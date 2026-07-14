/**
 * Navigation configuration for the admin sidebar
 * Centralized menu structure for easy customization
 */

export const navigationConfig = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: '/dashboard',
    submenu: []
  },
  {
    id: 'system',
    label: 'System Management',
    icon: '⚙️',
    path: '/system',
    submenu: [
      { id: 'users', label: 'User Management', path: '/system/users' },
      { id: 'roles', label: 'Role Management', path: '/system/roles' },
      { id: 'permissions', label: 'Permissions', path: '/system/permissions' }
    ]
  },
  {
    id: 'content',
    label: 'Content Management',
    icon: '📝',
    path: '/content',
    submenu: [
      { id: 'articles', label: 'Articles', path: '/content/articles' },
      { id: 'categories', label: 'Categories', path: '/content/categories' },
      { id: 'tags', label: 'Tags', path: '/content/tags' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    path: '/analytics',
    submenu: []
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '🔧',
    path: '/settings',
    submenu: []
  }
]
