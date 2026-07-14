import './Dashboard.css'

export default function Dashboard() {
  // Mock data
  const stats = [
    { title: 'Total Users', value: '12,548', change: '+12%', icon: '👥', color: '#1890ff' },
    { title: 'Total Orders', value: '4,285', change: '+8%', icon: '📦', color: '#13c2c2' },
    { title: 'Revenue', value: '$485,200', change: '+15%', icon: '💰', color: '#faad14' },
    { title: 'Page Views', value: '2.8M', change: '+5%', icon: '👁️', color: '#52c41a' }
  ]

  const recentActivities = [
    { id: 1, action: 'New user registration', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'System backup completed', time: '4 hours ago', status: 'success' },
    { id: 3, action: 'Database optimization', time: '6 hours ago', status: 'success' },
    { id: 4, action: 'Security update applied', time: '8 hours ago', status: 'success' },
    { id: 5, action: 'New feature deployment', time: '10 hours ago', status: 'success' }
  ]

  const chartData = [
    { month: 'Jan', value: 4200 },
    { month: 'Feb', value: 3800 },
    { month: 'Mar', value: 2800 },
    { month: 'Apr', value: 2700 },
    { month: 'May', value: 4200 },
    { month: 'Jun', value: 3800 },
    { month: 'Jul', value: 4300 }
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's what's happening with your system today.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <div className="stat-title">{stat.title}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change">
                <span style={{ color: '#52c41a' }}>↑ {stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <div className="card-header">
            <h3>Monthly Revenue</h3>
          </div>
          <div className="chart-container">
            <div className="simple-bar-chart">
              {chartData.map((data, index) => {
                const maxValue = Math.max(...chartData.map(d => d.value))
                const percentage = (data.value / maxValue) * 100
                return (
                  <div key={index} className="bar-item">
                    <div className="bar-value">${(data.value / 1000).toFixed(1)}k</div>
                    <div className="bar" style={{ height: `${percentage}%` }}></div>
                    <div className="bar-label">{data.month}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="card-header">
            <h3>Recent Activities</h3>
          </div>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
                <div className="activity-badge">Success</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Table */}
      <div className="table-card">
        <div className="card-header">
          <h3>Quick Stats</h3>
        </div>
        <table className="simple-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>This Month</th>
              <th>Last Month</th>
              <th>Change</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Active Users</td>
              <td>8,420</td>
              <td>7,512</td>
              <td>+12.1%</td>
              <td><span className="status-badge success">↑ Up</span></td>
            </tr>
            <tr>
              <td>Conversion Rate</td>
              <td>3.24%</td>
              <td>2.98%</td>
              <td>+8.7%</td>
              <td><span className="status-badge success">↑ Up</span></td>
            </tr>
            <tr>
              <td>Bounce Rate</td>
              <td>42.3%</td>
              <td>45.2%</td>
              <td>-6.4%</td>
              <td><span className="status-badge success">↓ Down</span></td>
            </tr>
            <tr>
              <td>Avg Session Time</td>
              <td>4m 32s</td>
              <td>3m 48s</td>
              <td>+19.6%</td>
              <td><span className="status-badge success">↑ Up</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
