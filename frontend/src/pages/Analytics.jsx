import PageHeader from '../components/Common/PageHeader'
import Card from '../components/Common/Card'
import StatCard from '../components/Common/StatCard'
import { useApiData } from '../hooks/useApiData'
import './Analytics.css'

export default function Analytics() {
  const { data: overview }  = useApiData('/analytics/overview',  [])
  const { data: traffic }   = useApiData('/analytics/traffic',   [])
  const { data: devices }   = useApiData('/analytics/devices',   [])
  const { data: topPages }  = useApiData('/analytics/top-pages', [])

  const maxVisits = Math.max(1, ...traffic.map(d => d.visits))

  return (
    <div className="analytics">
      <PageHeader title="Analytics" subtitle="Traffic, engagement, and performance metrics." />

      {/* Overview KPIs */}
      <div className="stats-grid">
        {overview.map((stat, i) => (
          <StatCard key={i} icon={stat.icon} title={stat.title} value={stat.value} change={stat.change} color={stat.color} />
        ))}
      </div>

      {/* Charts row */}
      <div className="analytics-charts">
        {/* Weekly traffic — dual bars */}
        <Card title="Weekly Traffic" className="analytics-card-wide">
          <div className="dual-bar-chart">
            {traffic.map((d, i) => (
              <div key={i} className="dual-bar-item">
                <div className="dual-bar-labels">
                  <span className="bar-week">{d.week}</span>
                </div>
                <div className="dual-bar-tracks">
                  <div className="dual-bar-row">
                    <span className="dual-bar-legend visits-legend">Visits</span>
                    <div className="dual-bar-bg">
                      <div className="dual-bar visits-bar" style={{ width: `${(d.visits / maxVisits) * 100}%` }} />
                    </div>
                    <span className="dual-bar-val">{(d.visits / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="dual-bar-row">
                    <span className="dual-bar-legend unique-legend">Unique</span>
                    <div className="dual-bar-bg">
                      <div className="dual-bar unique-bar" style={{ width: `${(d.unique / maxVisits) * 100}%` }} />
                    </div>
                    <span className="dual-bar-val">{(d.unique / 1000).toFixed(1)}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Device breakdown */}
        <Card title="Device Breakdown">
          <div className="device-chart">
            {devices.map((d, i) => (
              <div key={i} className="device-row">
                <div className="device-label">
                  <span className="device-dot" style={{ background: d.color }} />
                  <span>{d.device}</span>
                </div>
                <div className="device-track">
                  <div className="device-bar" style={{ width: `${d.pct}%`, background: d.color }} />
                </div>
                <span className="device-pct">{d.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top pages table */}
      <Card title="Top Pages">
        <table className="simple-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>Bounce Rate</th>
              <th>Avg. Time</th>
            </tr>
          </thead>
          <tbody>
            {topPages.map((row, i) => (
              <tr key={i}>
                <td><code className="page-path">{row.path}</code></td>
                <td>{row.views.toLocaleString()}</td>
                <td>{row.bounce}</td>
                <td>{row.avgTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
