import { Navigate } from 'react-router-dom'

// /content redirects to the first real sub-page.
export default function Content() {
  return <Navigate to="/content/articles" replace />
}
