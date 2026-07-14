/**
 * Mock data generators for dashboard
 * Replace with real API calls when backend is ready
 */

export const generateStatsData = () => [
  { title: 'Total Users', value: '12,548', change: '+12%', icon: '👥', color: '#1890ff' },
  { title: 'Total Orders', value: '4,285', change: '+8%', icon: '📦', color: '#13c2c2' },
  { title: 'Revenue', value: '$485,200', change: '+15%', icon: '💰', color: '#faad14' },
  { title: 'Page Views', value: '2.8M', change: '+5%', icon: '👁️', color: '#52c41a' }
]

export const generateChartData = () => [
  { month: 'Jan', value: 4200 },
  { month: 'Feb', value: 3800 },
  { month: 'Mar', value: 2800 },
  { month: 'Apr', value: 2700 },
  { month: 'May', value: 4200 },
  { month: 'Jun', value: 3800 },
  { month: 'Jul', value: 4300 }
]

export const generateActivitiesData = () => [
  { id: 1, action: 'New user registration', time: '2 hours ago', status: 'success' },
  { id: 2, action: 'System backup completed', time: '4 hours ago', status: 'success' },
  { id: 3, action: 'Database optimization', time: '6 hours ago', status: 'success' },
  { id: 4, action: 'Security update applied', time: '8 hours ago', status: 'success' },
  { id: 5, action: 'New feature deployment', time: '10 hours ago', status: 'success' }
]

export const generateTableData = () => [
  { metric: 'Active Users', thisMonth: '8,420', lastMonth: '7,512', change: '+12.1%', status: 'up' },
  { metric: 'Conversion Rate', thisMonth: '3.24%', lastMonth: '2.98%', change: '+8.7%', status: 'up' },
  { metric: 'Bounce Rate', thisMonth: '42.3%', lastMonth: '45.2%', change: '-6.4%', status: 'up' },
  { metric: 'Avg Session Time', thisMonth: '4m 32s', lastMonth: '3m 48s', change: '+19.6%', status: 'up' }
]
