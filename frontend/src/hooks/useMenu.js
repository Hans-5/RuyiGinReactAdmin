import { useState } from 'react'

/**
 * useMenu — manage sidebar submenu open/close state.
 *
 * @param {string|null} defaultOpen  id of the initially expanded item
 * @returns {{ expandedMenu, setExpandedMenu, toggleMenu }}
 */
export function useMenu(defaultOpen = null) {
  const [expandedMenu, setExpandedMenu] = useState(defaultOpen)

  const toggleMenu = (id) => {
    setExpandedMenu(prev => prev === id ? null : id)
  }

  return { expandedMenu, setExpandedMenu, toggleMenu }
}
