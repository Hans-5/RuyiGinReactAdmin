import Card from '../components/Common/Card'
import './StubPage.css'

export default function Settings() {
  return (
    <div className="stub-page">
      <div className="stub-page-header">
        <h1>Settings</h1>
        <p className="stub-page-subtitle">Application configuration and preferences.</p>
      </div>
      <div className="stub-sections">
        <Card title="General Settings">
          <p className="stub-placeholder">Settings module — coming soon.</p>
        </Card>
      </div>
    </div>
  )
}
