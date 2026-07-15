import Card from '../components/Common/Card'
import PageHeader from '../components/Common/PageHeader'
import './StubPage.css'

export default function Settings() {
  return (
    <div className="stub-page">
      <PageHeader title="Settings" subtitle="Application configuration and preferences." />
      <div className="stub-sections">
        <Card title="General Settings">
          <p className="stub-placeholder">Settings module — coming soon.</p>
        </Card>
      </div>
    </div>
  )
}
