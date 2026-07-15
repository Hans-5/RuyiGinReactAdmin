import { Navigate } from 'react-router-dom'

// /system redirects to the first real sub-page.
export default function System() {
  return <Navigate to="/system/users" replace />
}
