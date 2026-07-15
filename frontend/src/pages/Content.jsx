import Card from '../components/Common/Card'
import './StubPage.css'

export default function Content() {
  return (
    <div className="stub-page">
      <div className="stub-page-header">
        <h1>Content Management</h1>
        <p className="stub-page-subtitle">Articles, categories, and tags.</p>
      </div>
      <div className="stub-sections">
        <Card title="Articles">
          <p className="stub-placeholder">Articles module — coming soon.</p>
        </Card>
        <Card title="Categories">
          <p className="stub-placeholder">Categories module — coming soon.</p>
        </Card>
        <Card title="Tags">
          <p className="stub-placeholder">Tags module — coming soon.</p>
        </Card>
      </div>
    </div>
  )
}
