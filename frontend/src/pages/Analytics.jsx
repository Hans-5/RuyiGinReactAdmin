import Card from '../components/Common/Card'
import PageHeader from '../components/Common/PageHeader'
import './StubPage.css'

export default function Analytics() {
  return (
    <div className="stub-page">
      <PageHeader title="Analytics" subtitle="Traffic, engagement, and performance metrics." />
      <div className="stub-sections">
        <Card title="Overview">
          <p className="stub-placeholder">Analytics module — coming soon.</p>
        </Card>
      </div>
    </div>
  )
}
