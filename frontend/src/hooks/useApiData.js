import { useState, useEffect } from 'react'
import { getData } from '../api/apiClient'

/**
 * useApiData — load data for an endpoint through the API client.
 *
 * Works identically whether the client serves mock data or a real backend,
 * so pages never change when VITE_USE_MOCK is toggled.
 *
 * @param {string} endpoint   API path, e.g. '/dashboard/stats'
 * @param {*}      initial    initial value before data loads (default: [])
 * @returns {{ data, loading, error }}
 */
export function useApiData(endpoint, initial = []) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    getData(endpoint)
      .then(result => { if (alive) setData(result) })
      .catch(err  => { if (alive) setError(err.message) })
      .finally(()  => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [endpoint])

  return { data, loading, error }
}
