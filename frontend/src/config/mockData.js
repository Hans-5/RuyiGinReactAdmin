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
