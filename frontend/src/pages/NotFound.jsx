import PageHeader from '../components/Common/PageHeader'
import Card from '../components/Common/Card'
import { useNavigate } from 'react-router-dom'
import './StubPage.css'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="stub-page">
      <PageHeader title="404 — Page Not Found" subtitle="The page you requested doesn't exist." />
      <div className="stub-sections">
        <Card title="Navigation">
          <p className="stub-placeholder">
            <span
              style={{ color: 'var(--primary-color)', cursor: 'pointer' }}
              onClick={() => navigate('/dashboard')}
            >
              ← Back to Dashboard
            </span>
          </p>
        </Card>
      </div>
    </div>
  )
}
