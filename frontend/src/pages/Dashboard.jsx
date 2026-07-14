import './Dashboard.css'
import Card from '../components/Common/Card'
import StatCard from '../components/Common/StatCard'
import Badge from '../components/Common/Badge'
import { useApiData } from '../hooks/useCommon'

export default function Dashboard() {
  // All data flows through the API client (mock now, real backend later).
  const { data: stats } = useApiData('/dashboard/stats')
  const { data: chartData } = useApiData('/dashboard/chart')
  const { data: recentActivities } = useApiData('/dashboard/activities')
  const { data: tableData } = useApiData('/dashboard/table')

  const maxValue = Math.max(1, ...chartData.map((d) => d.value))

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's what's happening with your system today.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            color={stat.color}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="charts-section">
        <Card title="Monthly Revenue">
          <div className="simple-bar-chart">
            {chartData.map((data, index) => (
              <div key={index} className="bar-item">
                <div className="bar-value">${(data.value / 1000).toFixed(1)}k</div>
                <div className="bar" style={{ height: `${(data.value / maxValue) * 100}%` }}></div>
                <div className="bar-label">{data.month}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Activities">
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
                <Badge variant={activity.status === 'success' ? 'success' : 'warning'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats Table */}
      <Card title="Quick Stats">
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
            {tableData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.metric}</td>
                <td>{row.thisMonth}</td>
                <td>{row.lastMonth}</td>
                <td>{row.change}</td>
                <td>
                  <Badge variant={row.status === 'up' ? 'success' : 'error'}>
                    {row.status === 'up' ? '↑ Up' : '↓ Down'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
