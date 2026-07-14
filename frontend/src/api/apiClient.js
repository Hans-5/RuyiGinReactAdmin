// Data access layer — the single place that decides where data comes from.
//
// While building the frontend, VITE_USE_MOCK stays on and data comes from
// config/mockData.js. When the Gin backend is ready, set VITE_USE_MOCK=false
// (and VITE_API_BASE) and every page keeps working unchanged — only this file
// knows the difference. Add one line to MOCK per new endpoint.
import {
  generateStatsData,
  generateChartData,
  generateActivitiesData,
  generateTableData,
} from '../config/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function realFetch(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`)
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${endpoint}`)
  return res.json()
}

// endpoint -> mock generator. Mirror these paths in the real backend later.
const MOCK = {
  '/dashboard/stats': generateStatsData,
  '/dashboard/chart': generateChartData,
  '/dashboard/activities': generateActivitiesData,
  '/dashboard/table': generateTableData,
}

export async function getData(endpoint) {
  if (USE_MOCK) {
    const generate = MOCK[endpoint]
    if (!generate) throw new Error(`No mock registered for ${endpoint}`)
    return generate()
  }
  return realFetch(endpoint)
}
