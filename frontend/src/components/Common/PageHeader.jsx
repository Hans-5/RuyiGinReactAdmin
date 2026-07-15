import './PageHeader.css'

/**
 * PageHeader — standard page title + subtitle block.
 *
 * Props:
 *   title    {string}     required
 *   subtitle {string}     optional description line
 *   action   {ReactNode}  optional — renders a button/control aligned to the right
 */
export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="page-header">
      <div className="page-header-main">
        <div>
          <h1 className="page-header-title">{title}</h1>
          {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
        </div>
        {action && <div className="page-header-action">{action}</div>}
      </div>
    </div>
  )
}
