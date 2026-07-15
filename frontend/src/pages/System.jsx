import Card from '../components/Common/Card'
import PageHeader from '../components/Common/PageHeader'
import './StubPage.css'

export default function System() {
  return (
    <div className="stub-page">
      <PageHeader title="System Management" subtitle="User accounts, roles, and permissions." />
      <div className="stub-sections">
        <Card title="User Management">
          <p className="stub-placeholder">User management module — coming soon.</p>
        </Card>
        <Card title="Role Management">
          <p className="stub-placeholder">Role management module — coming soon.</p>
        </Card>
        <Card title="Permissions">
          <p className="stub-placeholder">Permissions management module — coming soon.</p>
        </Card>
      </div>
    </div>
  )
}
