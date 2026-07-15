/**
 * User domain constants — shared by UserForm and SystemUsers.
 * Single source of truth for roles, statuses, and display mappings.
 */

export const USER_ROLES    = ['admin', 'editor', 'viewer']
export const USER_STATUSES = ['active', 'inactive', 'suspended']

/** SearchBar filter options — {value, label} pairs. */
export const ROLE_FILTER_OPTIONS = USER_ROLES.map(r => ({
  value: r,
  label: r.charAt(0).toUpperCase() + r.slice(1),
}))

export const STATUS_FILTER_OPTIONS = USER_STATUSES.map(s => ({
  value: s,
  label: s.charAt(0).toUpperCase() + s.slice(1),
}))

/** Maps user status → Badge variant. */
export const STATUS_BADGE_VARIANT = {
  active:    'success',
  inactive:  'default',
  suspended: 'error',
}
