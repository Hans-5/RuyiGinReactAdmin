import './PageHeader.css'

/**
 * PageHeader — standard page title + subtitle block.
 *
 * Used by all admin pages except Dashboard (which has its own branded header).
 * Keeps the title/subtitle pattern consistent and DRY across pages.
 */
export default function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      <h1 className="page-header-title">{title}</h1>
      {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
    </div>
  )
}
