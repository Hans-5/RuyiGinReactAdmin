import { useState, useEffect } from 'react'

/**
 * useMenu - Hook for managing menu state (open/close submenu)
 */
export function useMenu(defaultOpen = null) {
  const [expandedMenu, setExpandedMenu] = useState(defaultOpen)

  const toggleMenu = (id) => {
    setExpandedMenu(expandedMenu === id ? null : id)
  }

  return { expandedMenu, setExpandedMenu, toggleMenu }
}

/**
 * useMockData - Hook for loading mock data with loading state
 * Replace fetch logic for real API calls
 */
export function useMockData(dataGenerator, dependencies = []) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      setLoading(true)
      // Simulate API delay
      setTimeout(() => {
        setData(dataGenerator())
        setLoading(false)
      }, 100)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }, dependencies)

  return { data, loading, error }
}

/**
 * useTheme - Hook for theme switching (future enhancement)
 */
export function useTheme() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}
