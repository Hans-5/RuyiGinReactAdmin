import Card from '../components/Common/Card'
import PageHeader from '../components/Common/PageHeader'
import './StubPage.css'

export default function Content() {
  return (
    <div className="stub-page">
      <PageHeader title="Content Management" subtitle="Articles, categories, and tags." />
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
