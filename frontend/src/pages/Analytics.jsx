import Card from '../components/Common/Card'
import './StubPage.css'

export default function Analytics() {
  return (
    <div className="stub-page">
      <div className="stub-page-header">
        <h1>Analytics</h1>
        <p className="stub-page-subtitle">Traffic, engagement, and performance metrics.</p>
      </div>
      <div className="stub-sections">
        <Card title="Overview">
          <p className="stub-placeholder">Analytics module — coming soon.</p>
        </Card>
      </div>
    </div>
  )
}
