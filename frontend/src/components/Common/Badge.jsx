import './Badge.css'

/**
 * Badge - Status indicator component with multiple variants
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <span
      className={`badge badge--${variant} badge--${size} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
