import { useState, useEffect } from 'react'
import { getData } from '../api/apiClient'

/**
 * useMenu - Manage sidebar submenu open/close state.
 */
export function useMenu(defaultOpen = null) {
  const [expandedMenu, setExpandedMenu] = useState(defaultOpen)

  const toggleMenu = (id) => {
    setExpandedMenu(expandedMenu === id ? null : id)
  }

  return { expandedMenu, setExpandedMenu, toggleMenu }
}

/**
 * useApiData - Load data for an endpoint through the API client, with
 * loading/error state. Works the same whether the client serves mock data or
 * a real backend, so pages never change when you switch VITE_USE_MOCK off.
 */
export function useApiData(endpoint, initial = []) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    getData(endpoint)
      .then((result) => {
        if (alive) setData(result)
      })
      .catch((err) => {
        if (alive) setError(err.message)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [endpoint])

  return { data, loading, error }
}
