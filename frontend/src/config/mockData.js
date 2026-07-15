/**
 * Mock data generators for dashboard
 * Replace with real API calls when backend is ready
 */

export const generateStatsData = () => [
  { title: 'Total Users', value: '12,548', change: '+12%', icon: '👥', color: '#1890ff' },
  { title: 'Total Orders', value: '4,285', change: '+8%', icon: '📦', color: '#13c2c2' },
  { title: 'Revenue', value: '$485,200', change: '+15%', icon: '💰', color: '#faad14' },
  { title: 'Page Views', value: '2.8M', change: '+5%', icon: '👁️', color: '#52c41a' },
]

export const generateChartData = () => [
  { month: 'Jan', value: 4200 },
  { month: 'Feb', value: 3800 },
  { month: 'Mar', value: 2800 },
  { month: 'Apr', value: 2700 },
  { month: 'May', value: 4200 },
  { month: 'Jun', value: 3800 },
  { month: 'Jul', value: 4300 },
]

export const generateActivitiesData = () => [
  { id: 1, action: 'New user registration',  time: '2 hours ago',  status: 'success' },
  { id: 2, action: 'System backup completed', time: '4 hours ago',  status: 'success' },
  { id: 3, action: 'Database optimization',   time: '6 hours ago',  status: 'success' },
  { id: 4, action: 'Security update applied', time: '8 hours ago',  status: 'success' },
  { id: 5, action: 'New feature deployment',  time: '10 hours ago', status: 'success' },
]

export const generateTableData = () => [
  { metric: 'Active Users',     thisMonth: '8,420',  lastMonth: '7,512',  change: '+12.1%', status: 'up' },
  { metric: 'Conversion Rate',  thisMonth: '3.24%',  lastMonth: '2.98%',  change: '+8.7%',  status: 'up' },
  { metric: 'Bounce Rate',      thisMonth: '42.3%',  lastMonth: '45.2%',  change: '-6.4%',  status: 'up' },
  { metric: 'Avg Session Time', thisMonth: '4m 32s', lastMonth: '3m 48s', change: '+19.6%', status: 'up' },
]

// ── User Management ──────────────────────────────────────────────────────────

const ROLES  = ['admin', 'editor', 'viewer']
const STATUS = ['active', 'inactive', 'suspended']

const FIRST = ['Alice','Bob','Carol','David','Eva','Frank','Grace','Henry','Iris','Jack',
               'Karen','Leo','Mia','Nathan','Olivia','Paul','Quinn','Rachel','Sam','Tina']
const LAST  = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis',
               'Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris']

function randomOf(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function pad(n) { return String(n).padStart(3, '0') }

// Stable seed so the list doesn't shuffle on every hot-reload.
// Each user is deterministic based on its index.
function makeUser(i) {
  const first = FIRST[i % FIRST.length]
  const last  = LAST[Math.floor(i / FIRST.length) % LAST.length]
  const role  = ROLES[i % ROLES.length]
  const status = STATUS[i % STATUS.length]
  const month = String((i % 12) + 1).padStart(2, '0')
  const day   = String((i % 28) + 1).padStart(2, '0')
  return {
    id:        i + 1,
    username:  `${first.toLowerCase()}.${last.toLowerCase()}`,
    email:     `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    role,
    status,
    createdAt: `2024-${month}-${day}`,
    avatar:    `${first[0]}${last[0]}`,
  }
}

// Master list — 42 users so pagination and filtering are meaningful.
let _users = Array.from({ length: 42 }, (_, i) => makeUser(i))
let _nextId = _users.length + 1

// ── Mock handlers (mirror real REST endpoints) ────────────────────────────────

export const generateUsersData = () =>
  // Return a shallow copy so mutations don't affect the master.
  _users.map(u => ({ ...u }))

export const createUserMock = (data) => {
  const user = {
    id:        _nextId++,
    username:  data.username,
    email:     data.email,
    role:      data.role   || 'viewer',
    status:    data.status || 'active',
    createdAt: new Date().toISOString().slice(0, 10),
    avatar:    (data.username || '?')[0].toUpperCase(),
  }
  _users = [..._users, user]
  return { ...user }
}

export const updateUserMock = (id, data) => {
  _users = _users.map(u => u.id === id ? { ...u, ...data } : u)
  const updated = _users.find(u => u.id === id)
  if (!updated) throw new Error(`User ${id} not found`)
  return { ...updated }
}

export const deleteUserMock = (id) => {
  const exists = _users.some(u => u.id === id)
  if (!exists) throw new Error(`User ${id} not found`)
  _users = _users.filter(u => u.id !== id)
  return { id }
}

// ── Article Management ────────────────────────────────────────────────────────

const CATEGORIES = ['technology', 'business', 'design', 'tutorial', 'news']
const A_STATUSES = ['draft', 'published', 'archived']

const TITLES = [
  'Getting Started with React Hooks',
  'Building Scalable APIs with Gin',
  'Modern CSS Architecture Patterns',
  'Introduction to TypeScript Generics',
  'Deploying Go Applications to Production',
  'State Management Without Redux',
  'CSS Grid vs Flexbox: When to Use Each',
  'Optimizing React Performance',
  'REST vs GraphQL: A Practical Guide',
  'Writing Clean JavaScript in 2024',
  'Docker for Frontend Developers',
  'Database Indexing Strategies',
  'Authentication Best Practices',
  'Micro-Frontend Architecture',
  'Testing React Components with Vitest',
]

const AUTHORS = ['Alice Smith', 'Bob Johnson', 'Carol Williams', 'David Brown', 'Eva Garcia']

function makeArticle(i) {
  const month = String((i % 12) + 1).padStart(2, '0')
  const day   = String((i % 28) + 1).padStart(2, '0')
  return {
    id:        i + 1,
    title:     TITLES[i % TITLES.length],
    summary:   `A comprehensive guide to ${TITLES[i % TITLES.length].toLowerCase()}.`,
    category:  CATEGORIES[i % CATEGORIES.length],
    author:    AUTHORS[i % AUTHORS.length],
    status:    A_STATUSES[i % A_STATUSES.length],
    content:   `This article covers ${TITLES[i % TITLES.length].toLowerCase()} in detail.\n\nContent goes here.`,
    createdAt: `2024-${month}-${day}`,
  }
}

let _articles = Array.from({ length: 30 }, (_, i) => makeArticle(i))
let _nextArticleId = _articles.length + 1

export const generateArticlesData = () => _articles.map(a => ({ ...a }))

export const createArticleMock = (data) => {
  const article = {
    id:        _nextArticleId++,
    title:     data.title,
    summary:   data.summary   || '',
    category:  data.category  || 'technology',
    author:    data.author    || 'Admin',
    status:    data.status    || 'draft',
    content:   data.content   || '',
    createdAt: new Date().toISOString().slice(0, 10),
  }
  _articles = [..._articles, article]
  return { ...article }
}

export const updateArticleMock = (id, data) => {
  _articles = _articles.map(a => a.id === id ? { ...a, ...data } : a)
  const updated = _articles.find(a => a.id === id)
  if (!updated) throw new Error(`Article ${id} not found`)
  return { ...updated }
}

export const deleteArticleMock = (id) => {
  const exists = _articles.some(a => a.id === id)
  if (!exists) throw new Error(`Article ${id} not found`)
  _articles = _articles.filter(a => a.id !== id)
  return { id }
}

// ── Content Categories ────────────────────────────────────────────────────────

const CATEGORY_NAMES = [
  'Technology', 'Business', 'Design', 'Tutorial', 'News',
  'Science', 'Health', 'Finance', 'Travel', 'Culture',
]

let _categories = CATEGORY_NAMES.map((name, i) => ({
  id:          i + 1,
  name,
  slug:        name.toLowerCase(),
  description: `${name} related articles and posts.`,
  status:      i % 5 === 0 ? 'inactive' : 'active',
  articleCount: Math.floor(Math.random() * 20 + 1),
  createdAt:   `2024-0${(i % 9) + 1}-01`,
}))
let _nextCategoryId = _categories.length + 1

export const generateCategoriesData = () => _categories.map(c => ({ ...c }))

export const createCategoryMock = (data) => {
  const cat = {
    id:          _nextCategoryId++,
    name:        data.name,
    slug:        (data.name || '').toLowerCase().replace(/\s+/g, '-'),
    description: data.description || '',
    status:      data.status || 'active',
    articleCount: 0,
    createdAt:   new Date().toISOString().slice(0, 10),
  }
  _categories = [..._categories, cat]
  return { ...cat }
}

export const updateCategoryMock = (id, data) => {
  _categories = _categories.map(c => c.id === id ? { ...c, ...data } : c)
  const updated = _categories.find(c => c.id === id)
  if (!updated) throw new Error(`Category ${id} not found`)
  return { ...updated }
}

export const deleteCategoryMock = (id) => {
  const exists = _categories.some(c => c.id === id)
  if (!exists) throw new Error(`Category ${id} not found`)
  _categories = _categories.filter(c => c.id !== id)
  return { id }
}

// ── Content Tags ──────────────────────────────────────────────────────────────

const TAG_NAMES = [
  'react', 'golang', 'javascript', 'css', 'api', 'devops',
  'database', 'security', 'performance', 'testing', 'typescript', 'docker',
]

let _tags = TAG_NAMES.map((name, i) => ({
  id:          i + 1,
  name,
  slug:        name,
  articleCount: Math.floor(Math.random() * 15 + 1),
  createdAt:   `2024-0${(i % 9) + 1}-01`,
}))
let _nextTagId = _tags.length + 1

export const generateTagsData = () => _tags.map(t => ({ ...t }))

export const createTagMock = (data) => {
  const tag = {
    id:          _nextTagId++,
    name:        data.name,
    slug:        (data.name || '').toLowerCase().replace(/\s+/g, '-'),
    articleCount: 0,
    createdAt:   new Date().toISOString().slice(0, 10),
  }
  _tags = [..._tags, tag]
  return { ...tag }
}

export const updateTagMock = (id, data) => {
  _tags = _tags.map(t => t.id === id ? { ...t, ...data } : t)
  const updated = _tags.find(t => t.id === id)
  if (!updated) throw new Error(`Tag ${id} not found`)
  return { ...updated }
}

export const deleteTagMock = (id) => {
  const exists = _tags.some(t => t.id === id)
  if (!exists) throw new Error(`Tag ${id} not found`)
  _tags = _tags.filter(t => t.id !== id)
  return { id }
}

// ── Roles ─────────────────────────────────────────────────────────────────────

const ROLE_PERMS = {
  'Super Admin':    ['user:*', 'content:*', 'system:*'],
  'Admin':          ['user:read', 'user:write', 'content:*'],
  'Editor':         ['content:read', 'content:write'],
  'Viewer':         ['content:read'],
  'Support':        ['user:read', 'content:read'],
}

let _roles = [
  { id: 1, name: 'Super Admin', description: 'Full system access',           userCount: 2,  permissions: ROLE_PERMS['Super Admin'],  createdAt: '2024-01-01' },
  { id: 2, name: 'Admin',       description: 'Administrative access',        userCount: 5,  permissions: ROLE_PERMS['Admin'],         createdAt: '2024-01-01' },
  { id: 3, name: 'Editor',      description: 'Content creation and editing', userCount: 12, permissions: ROLE_PERMS['Editor'],        createdAt: '2024-02-15' },
  { id: 4, name: 'Viewer',      description: 'Read-only access',             userCount: 34, permissions: ROLE_PERMS['Viewer'],        createdAt: '2024-03-01' },
  { id: 5, name: 'Support',     description: 'Customer support access',      userCount: 8,  permissions: ROLE_PERMS['Support'],       createdAt: '2024-04-10' },
]
let _nextRoleId = _roles.length + 1

export const generateRolesData  = () => _roles.map(r => ({ ...r }))

export const createRoleMock = (data) => {
  const role = { id: _nextRoleId++, name: data.name, description: data.description || '', userCount: 0, permissions: data.permissions || [], createdAt: new Date().toISOString().slice(0, 10) }
  _roles = [..._roles, role]
  return { ...role }
}

export const updateRoleMock = (id, data) => {
  _roles = _roles.map(r => r.id === id ? { ...r, ...data } : r)
  const updated = _roles.find(r => r.id === id)
  if (!updated) throw new Error(`Role ${id} not found`)
  return { ...updated }
}

export const deleteRoleMock = (id) => {
  const role = _roles.find(r => r.id === id)
  if (!role) throw new Error(`Role ${id} not found`)
  if (role.name === 'Super Admin') throw new Error('Cannot delete Super Admin role')
  _roles = _roles.filter(r => r.id !== id)
  return { id }
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export const generateAnalyticsOverview = () => [
  { title: 'Total Visits',     value: '128,450', change: '+18%', icon: '🌐', color: '#1890ff' },
  { title: 'Unique Visitors',  value: '84,230',  change: '+12%', icon: '👤', color: '#13c2c2' },
  { title: 'Avg. Session',     value: '3m 47s',  change: '+8%',  icon: '⏱️', color: '#faad14' },
  { title: 'Bounce Rate',      value: '38.2%',   change: '-5%',  icon: '↩️', color: '#52c41a' },
]

export const generateTrafficData = () => [
  { week: 'W1',  visits: 18200, unique: 12400 },
  { week: 'W2',  visits: 21500, unique: 14300 },
  { week: 'W3',  visits: 19800, unique: 13100 },
  { week: 'W4',  visits: 24600, unique: 16200 },
  { week: 'W5',  visits: 22100, unique: 14900 },
  { week: 'W6',  visits: 28400, unique: 18700 },
  { week: 'W7',  visits: 26300, unique: 17500 },
  { week: 'W8',  visits: 31200, unique: 20600 },
]

export const generateDeviceData = () => [
  { device: 'Desktop', pct: 52, color: '#1890ff' },
  { device: 'Mobile',  pct: 35, color: '#13c2c2' },
  { device: 'Tablet',  pct: 13, color: '#faad14' },
]

export const generateTopPages = () => [
  { path: '/home',         views: 34200, bounce: '28%', avgTime: '4m 12s' },
  { path: '/products',     views: 21800, bounce: '34%', avgTime: '3m 08s' },
  { path: '/blog',         views: 18400, bounce: '41%', avgTime: '5m 22s' },
  { path: '/pricing',      views: 14600, bounce: '22%', avgTime: '2m 47s' },
  { path: '/contact',      views:  9200, bounce: '55%', avgTime: '1m 35s' },
]

