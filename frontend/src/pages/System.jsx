import Card from '../components/Common/Card'
import './StubPage.css'

export default function System() {
  return (
    <div className="stub-page">
      <div className="stub-page-header">
        <h1>System Management</h1>
        <p className="stub-page-subtitle">User accounts, roles, and permissions.</p>
      </div>
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
