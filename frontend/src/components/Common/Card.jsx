import './Card.css'

/**
 * Card - Reusable glassmorphic base component
 * Use this as a wrapper for any card-like content
 */
export default function Card({
  children,
  className = '',
  title,
  action,
  onClick,
  elevation = 'md',
  ...props
}) {
  return (
    <div
      className={`glass-card glass-card--${elevation} ${className}`}
      onClick={onClick}
      {...props}
    >
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {action && <div className="card-action">{action}</div>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}
