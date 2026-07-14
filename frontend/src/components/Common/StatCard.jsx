import './StatCard.css'

/**
 * StatCard - Specialized card for displaying KPI metrics
 * Extends Card functionality with icon, value, and change indicators
 */
export default function StatCard({
  icon,
  title,
  value,
  change,
  color = '#1890ff',
  trend = 'up',
  onClick
}) {
  return (
    <div className="stat-card" onClick={onClick}>
      <div className="stat-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-info">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        <div className={`stat-change stat-change--${trend}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </div>
      </div>
    </div>
  )
}
