// Data access layer — the single place that decides where data comes from.
//
// While building the frontend, VITE_USE_MOCK stays on and data comes from
// config/mockData.js. When the Gin backend is ready, set VITE_USE_MOCK=false
// (and VITE_API_BASE) and every page keeps working unchanged — only this file
// knows the difference.
//
// Read  → getData(endpoint)
// Write → postData / putData / deleteData (same mock/real toggle)
import {
  generateStatsData,
  generateChartData,
  generateActivitiesData,
  generateTableData,
  generateUsersData,
  createUserMock,
  updateUserMock,
  deleteUserMock,
  generateArticlesData,
  createArticleMock,
  updateArticleMock,
  deleteArticleMock,
} from '../config/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const API_BASE = import.meta.env.VITE_API_BASE || '/api'

// ── Real fetch helpers ────────────────────────────────────────────────────────

async function realFetch(method, endpoint, body) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${method} ${endpoint}`)
  return res.json()
}

// ── Mock registries ───────────────────────────────────────────────────────────
// GET: endpoint → generator fn
const MOCK_GET = {
  '/dashboard/stats':       generateStatsData,
  '/dashboard/chart':       generateChartData,
  '/dashboard/activities':  generateActivitiesData,
  '/dashboard/table':       generateTableData,
  '/system/users':          generateUsersData,
  '/content/articles':      generateArticlesData,
}

const MOCK_POST   = {
  '/system/users':     (_id, body) => createUserMock(body),
  '/content/articles': (_id, body) => createArticleMock(body),
}
const MOCK_PUT    = {
  '/system/users/:id':     (id, body) => updateUserMock(id, body),
  '/content/articles/:id': (id, body) => updateArticleMock(id, body),
}
const MOCK_DELETE = {
  '/system/users/:id':     (id) => deleteUserMock(id),
  '/content/articles/:id': (id) => deleteArticleMock(id),
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getData(endpoint) {
  if (USE_MOCK) {
    const generate = MOCK_GET[endpoint]
    if (!generate) throw new Error(`No mock registered for GET ${endpoint}`)
    return generate()
  }
  return realFetch('GET', endpoint)
}

export async function postData(endpoint, body) {
  if (USE_MOCK) {
    const handler = MOCK_POST[endpoint]
    if (!handler) throw new Error(`No mock registered for POST ${endpoint}`)
    return handler(null, body)
  }
  return realFetch('POST', endpoint, body)
}

export async function putData(endpoint, id, body) {
  if (USE_MOCK) {
    const handler = MOCK_PUT[`${endpoint}/:id`]
    if (!handler) throw new Error(`No mock registered for PUT ${endpoint}/:id`)
    return handler(id, body)
  }
  return realFetch('PUT', `${endpoint}/${id}`, body)
}

export async function deleteData(endpoint, id) {
  if (USE_MOCK) {
    const handler = MOCK_DELETE[`${endpoint}/:id`]
    if (!handler) throw new Error(`No mock registered for DELETE ${endpoint}/:id`)
    return handler(id)
  }
  return realFetch('DELETE', `${endpoint}/${id}`)
}
